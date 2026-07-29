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
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

  if (!accessKey) {
    return { ok: false };
  }

  const formData = new FormData();
  formData.append("access_key", accessKey);
  formData.append("subject", `[Portfolio] ${submission.subject}`);
  formData.append("name", submission.fullName);
  formData.append("email", submission.email);
  formData.append("enquiry_type", submission.enquiryType);
  formData.append("message", submission.message);
  formData.append("botcheck", "");

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = (await response.json().catch(() => null)) as { success?: boolean } | null;

    return { ok: response.ok && data?.success === true };
  } catch {
    return { ok: false };
  }
}
