"use client";

import { useId, useState, type FormEvent } from "react";
import { submitContactForm } from "@/lib/contact";
import type { FormSectionData } from "@/types/content";
import SectionShell from "../SectionShell";
import styles from "./ContactForm.module.css";

type Status = "idle" | "submitting" | "success" | "error";

function getTrimmedValue(form: FormData, name: string) {
  return String(form.get(name) ?? "").trim();
}

export default function ContactForm({ data }: { data: FormSectionData }) {
  const formId = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [validationMessage, setValidationMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const privacyConsent = formData.get("privacyConsent") === "on";
    const submission = {
      fullName: getTrimmedValue(formData, "fullName"),
      email: getTrimmedValue(formData, "email"),
      enquiryType: getTrimmedValue(formData, "enquiryType"),
      subject: getTrimmedValue(formData, "subject"),
      message: getTrimmedValue(formData, "message"),
      privacyConsent,
    };

    const consentField = form.querySelector<HTMLInputElement>('input[name="privacyConsent"]');

    if (!privacyConsent && consentField) {
      consentField.setCustomValidity("You must agree before submitting.");
    } else {
      consentField?.setCustomValidity("");
    }

    const hasEmptyRequiredField =
      !submission.fullName ||
      !submission.email ||
      !submission.enquiryType ||
      !submission.subject ||
      !submission.message ||
      !submission.privacyConsent;

    if (!form.checkValidity() || hasEmptyRequiredField) {
      if (!privacyConsent && consentField) {
        consentField.reportValidity();
      } else {
        form.reportValidity();
      }

      setValidationMessage("Please complete all required fields.");
      setStatus("idle");
      return;
    }

    setValidationMessage(null);
    setStatus("submitting");

    const result = await submitContactForm(submission);

    setStatus(result.ok ? "success" : "error");

    if (result.ok) {
      form.reset();
    }
  }

  return (
    <SectionShell>
      <div className="w-full">
        <div className="flex flex-col items-start text-left sm:items-center sm:text-center">
          {data.eyebrow && (
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              {data.eyebrow}
            </p>
          )}
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {data.heading}
          </h2>
          {data.description && (
            <p className="mt-4 text-base leading-7 text-muted sm:text-lg">{data.description}</p>
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          onInput={() => setValidationMessage(null)}
          className="mt-12 flex flex-col gap-6"
        >
          <input
            type="checkbox"
            name="botcheck"
            className={styles.botcheck}
            tabIndex={-1}
            autoComplete="off"
          />
          {data.fields.map((field) => {
            const fieldId = `${formId}-${field.name}`;

            if (field.type === "checkbox") {
              return (
                <div key={field.name} className="flex items-start gap-3">
                  <input
                    id={fieldId}
                    name={field.name}
                    type="checkbox"
                    required={field.required ?? true}
                    className={`theme-transition ${styles.checkbox}`}
                  />
                  <label htmlFor={fieldId} className="text-sm leading-6 text-muted">
                    {field.label}
                  </label>
                </div>
              );
            }

            if (field.type === "select") {
              return (
                <div key={field.name} className="flex flex-col gap-2.5">
                  <label htmlFor={fieldId} className={styles.label}>
                    {field.label}
                  </label>
                  <select
                    id={fieldId}
                    name={field.name}
                    required={field.required ?? true}
                    className={`theme-transition ${styles.field}`}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select an option
                    </option>
                    {field.options?.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              );
            }

            if (field.type === "textarea") {
              return (
                <div key={field.name} className="flex flex-col gap-2.5">
                  <label htmlFor={fieldId} className={styles.label}>
                    {field.label}
                  </label>
                  <textarea
                    id={fieldId}
                    name={field.name}
                    required={field.required ?? true}
                    placeholder={field.placeholder}
                    rows={5}
                    className={`theme-transition ${styles.field}`}
                  />
                </div>
              );
            }

            return (
              <div key={field.name} className="flex flex-col gap-2.5">
                <label htmlFor={fieldId} className={styles.label}>
                  {field.label}
                </label>
                <input
                  id={fieldId}
                  name={field.name}
                  type={field.type}
                  required={field.required ?? true}
                  placeholder={field.placeholder}
                  className={`theme-transition ${styles.field}`}
                />
              </div>
            );
          })}

          <button
            type="submit"
            disabled={status === "submitting"}
            className={`theme-transition ${styles.submit}`}
          >
            {status === "submitting" ? "Sending…" : data.submitLabel}
          </button>

          <div role="status" aria-live="polite">
            {validationMessage && (
              <p className="text-sm font-medium text-muted">{validationMessage}</p>
            )}
            {status === "success" && (
              <p className="text-sm font-medium text-foreground">{data.successMessage}</p>
            )}
            {status === "error" && (
              <p className="text-sm font-medium text-muted">{data.errorMessage}</p>
            )}
          </div>
        </form>
      </div>
    </SectionShell>
  );
}
