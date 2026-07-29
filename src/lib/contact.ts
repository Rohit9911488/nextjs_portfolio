export interface ContactSubmission {
  fullName: string;
  email: string;
  enquiryType: string;
  subject: string;
  message: string;
  privacyConsent: boolean;
}

export interface ContactSubmissionResult {
  ok: boolean;
}

export async function submitContactForm(
  submission: ContactSubmission,
): Promise<ContactSubmissionResult> {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(submission),
  });

  if (!response.ok) {
    return { ok: false };
  }

  return response.json();
}
