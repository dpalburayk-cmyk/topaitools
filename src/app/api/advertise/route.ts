import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

interface AdInquiry {
  id: string;
  name: string;
  email: string;
  company: string;
  toolUrl: string;
  budget: string;
  message: string;
  status: "pending";
  submittedAt: string;
}

const DATA_FILE = path.join(process.cwd(), "data", "ad-inquiries.json");

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
    const { name, email, company, toolUrl, budget, message } = body;

    // Validate required fields
    if (!name || !email || !company || !toolUrl || !budget || !message) {
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
      new URL(toolUrl);
    } catch {
      return NextResponse.json(
        { error: "Invalid tool URL" },
        { status: 400 }
      );
    }

    // Validate budget
    const validBudgets = ["under-100", "100-300", "300-500", "500-plus", "one-time"];
    if (!validBudgets.includes(budget)) {
      return NextResponse.json(
        { error: "Invalid budget range" },
        { status: 400 }
      );
    }

    await ensureDataFile();

    const fileContent = await fs.readFile(DATA_FILE, "utf-8");
    const inquiries: AdInquiry[] = JSON.parse(fileContent);

    const newInquiry: AdInquiry = {
      id: crypto.randomUUID(),
      name: name.trim(),
      email: email.trim(),
      company: company.trim(),
      toolUrl: toolUrl.trim(),
      budget,
      message: message.trim(),
      status: "pending",
      submittedAt: new Date().toISOString(),
    };

    inquiries.push(newInquiry);
    await fs.writeFile(DATA_FILE, JSON.stringify(inquiries, null, 2));

    return NextResponse.json(
      {
        success: true,
        message: "Inquiry received! We'll get back to you within 24 hours.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Advertise inquiry error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
