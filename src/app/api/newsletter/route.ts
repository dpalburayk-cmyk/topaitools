import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const audienceId = process.env.RESEND_AUDIENCE_ID;

    if (!apiKey || !audienceId) {
      // In development without API keys, simulate success silently
      return NextResponse.json({ success: true, message: "Subscribed successfully!" });
    }

    // Lazy import to avoid build-time error when RESEND_API_KEY is not set
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    const { data, error } = await resend.contacts.create({
      email,
      audienceId,
    });

    if (error) {
      if (error.message?.includes("already exists")) {
        return NextResponse.json({ success: true, message: "Already subscribed" });
      }
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
    }

    await resend.emails.send({
      from: "Top AI Tools <newsletter@topaitools.xyz>",
      to: email,
      subject: "Welcome to Top AI Tools!",
      html: `
        <div style="max-width: 500px; margin: 0 auto; font-family: system-ui, sans-serif;">
          <div style="text-align: center; padding: 32px 0;">
            <h1 style="font-size: 24px; font-weight: bold; margin: 0;">
              Welcome to <span style="color: #6366f1;">Top AI Tools</span>
            </h1>
          </div>
          <p style="color: #64748b; line-height: 1.6;">
            Thanks for subscribing! You'll receive weekly updates on the best new AI tools, reviews, and industry insights.
          </p>
          <p style="color: #94a3b8; font-size: 14px;">
            No spam, ever. Unsubscribe anytime.
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Newsletter signup error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
