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

// No backend, database, or email service is wired up yet. Replace this
// function's body with a real API call (a route handler, a transactional
// email provider, a CRM webhook, etc.) before this form goes live — until
// then it deliberately reports failure rather than faking a success state.
export async function submitContactForm(
  submission: ContactSubmission
): Promise<ContactSubmissionResult> {
  void submission;
  await new Promise((resolve) => setTimeout(resolve, 400));
  return { ok: false };
}
