import { NextResponse } from "next/server";
import type { ContactSubmission } from "@/lib/contact";

function isValidSubmission(body: Partial<ContactSubmission>): body is ContactSubmission {
  return Boolean(
    body.fullName?.trim() &&
      body.email?.trim() &&
      body.enquiryType?.trim() &&
      body.subject?.trim() &&
      body.message?.trim() &&
      body.privacyConsent,
  );
}
export async function POST(request: Request) {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;

  if (!accessKey) {
    return NextResponse.json(
      { ok: false, error: "Contact form is not configured." },
      { status: 503 },
    );
  }

  const body = (await request.json().catch(() => ({}))) as Partial<ContactSubmission>;

  if (!isValidSubmission(body)) {
    return NextResponse.json({ ok: false, error: "Invalid submission." }, { status: 400 });
  }

  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      access_key: accessKey,
      subject: `[Portfolio] ${body.subject}`,
      from_name: body.fullName,
      email: body.email,
      enquiry_type: body.enquiryType,
      message: body.message,
    }),
  });

  const result = (await response.json().catch(() => null)) as { success?: boolean } | null;

  if (!response.ok || !result?.success) {
    return NextResponse.json({ ok: false, error: "Failed to send message." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
