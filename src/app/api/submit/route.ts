import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

interface Submission {
  id: string;
  name: string;
  url: string;
  description: string;
  category: string;
  pricingModel: string;
  email: string;
  notes: string;
  status: "pending";
  submittedAt: string;
}

const DATA_FILE = path.join(process.cwd(), "data", "submissions.json");

async function ensureDataFile() {
  try {
    await fs.access(path.dirname(DATA_FILE));
  } catch {
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  }
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, JSON.stringify([], null, 2));
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, url, description, category, pricingModel, email, notes } = body;

    // Validate required fields
    if (!name || !url || !description || !category || !pricingModel || !email) {
      return NextResponse.json(
        { error: "All required fields must be provided" },
        { status: 400 }
      );
    }

    // Validate email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Validate URL
    try {
      new URL(url);
    } catch {
      return NextResponse.json(
        { error: "Invalid URL" },
        { status: 400 }
      );
    }

    // Validate pricing model
    const validPricing = ["free", "freemium", "paid"];
    if (!validPricing.includes(pricingModel)) {
      return NextResponse.json(
        { error: "Invalid pricing model" },
        { status: 400 }
      );
    }

    await ensureDataFile();

    const fileContent = await fs.readFile(DATA_FILE, "utf-8");
    const submissions: Submission[] = JSON.parse(fileContent);

    // Check for duplicate URL
    if (submissions.some((s) => s.url.toLowerCase() === url.toLowerCase() && s.status === "pending")) {
      return NextResponse.json(
        { error: "This tool has already been submitted and is pending review" },
        { status: 409 }
      );
    }

    const newSubmission: Submission = {
      id: crypto.randomUUID(),
      name: name.trim(),
      url: url.trim(),
      description: description.trim(),
      category,
      pricingModel,
      email: email.trim(),
      notes: (notes || "").trim(),
      status: "pending",
      submittedAt: new Date().toISOString(),
    };

    submissions.push(newSubmission);
    await fs.writeFile(DATA_FILE, JSON.stringify(submissions, null, 2));

    return NextResponse.json(
      {
        success: true,
        message: "Submission received! We'll review it within 48 hours.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Submit error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// GET endpoint for admin review (optional, protected by secret in production)
export async function GET() {
  try {
    await ensureDataFile();
    const fileContent = await fs.readFile(DATA_FILE, "utf-8");
    const submissions = JSON.parse(fileContent);
    return NextResponse.json({ submissions });
  } catch {
    return NextResponse.json({ submissions: [] });
  }
}
