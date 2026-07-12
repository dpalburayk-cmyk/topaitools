import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  submittedAt: string;
}

const DATA_FILE = path.join(process.cwd(), 'data', 'contact-messages.json');

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
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    await ensureDataFile();

    const fileContent = await fs.readFile(DATA_FILE, 'utf-8');
    const messages: ContactMessage[] = JSON.parse(fileContent);

    const newMessage: ContactMessage = {
      id: crypto.randomUUID(),
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
      submittedAt: new Date().toISOString(),
    };

    messages.push(newMessage);
    await fs.writeFile(DATA_FILE, JSON.stringify(messages, null, 2));

    try {
      const resendKey = process.env.RESEND_API_KEY;
      if (resendKey) {
        const { Resend } = await import('resend');
        const resend = new Resend(resendKey);
        const subjectLabels: Record<string, string> = {
          general: 'General Inquiry',
          feedback: 'Feedback / Suggestion',
          bug: 'Bug Report',
          advertising: 'Advertising Inquiry',
          'tool-submission': 'Tool Submission',
          other: 'Other',
        };
        await resend.emails.send({
          from: 'Top AI Tools <noreply@topaitools.xyz>',
          to: ['hello@topaitools.xyz', 'dpalburayk@gmail.com'],
          subject: `Contact: ${subjectLabels[newMessage.subject] || newMessage.subject} from ${newMessage.name}`,
          html: `
            <h2>New Contact Message</h2>
            <table style="border-collapse:collapse; font-family:sans-serif;">
              <tr><td style="padding:8px; border:1px solid #ddd;"><strong>Name</strong></td><td style="padding:8px; border:1px solid #ddd;">${newMessage.name}</td></tr>
              <tr><td style="padding:8px; border:1px solid #ddd;"><strong>Email</strong></td><td style="padding:8px; border:1px solid #ddd;">${newMessage.email}</td></tr>
              <tr><td style="padding:8px; border:1px solid #ddd;"><strong>Subject</strong></td><td style="padding:8px; border:1px solid #ddd;">${subjectLabels[newMessage.subject] || newMessage.subject}</td></tr>
              <tr><td style="padding:8px; border:1px solid #ddd;"><strong>Message</strong></td><td style="padding:8px; border:1px solid #ddd;">${newMessage.message.replace(/\n/g, '<br>')}</td></tr>
            </table>
            <p style="margin-top:16px; color:#666;">Submitted: ${new Date(newMessage.submittedAt).toLocaleString()}</p>
          `,
        });
      }
    } catch (emailError) {
      console.error('Failed to send contact email:', emailError);
    }

    return NextResponse.json(
      { success: true, message: "Message sent! We'll get back to you within 24-48 hours." },
      { status: 201 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
