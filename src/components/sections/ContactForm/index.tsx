"use client";

import { useId, useState, type FormEvent } from "react";
import { submitContactForm } from "@/lib/contact";
import type { FormSectionData } from "@/types/content";
import SectionShell from "../SectionShell";
import styles from "./ContactForm.module.css";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm({ data }: { data: FormSectionData }) {
  const formId = useId();
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const form = new FormData(event.currentTarget);
    const result = await submitContactForm({
      fullName: String(form.get("fullName") ?? ""),
      email: String(form.get("email") ?? ""),
      enquiryType: String(form.get("enquiryType") ?? ""),
      subject: String(form.get("subject") ?? ""),
      message: String(form.get("message") ?? ""),
      privacyConsent: form.get("privacyConsent") === "on",
    });

    setStatus(result.ok ? "success" : "error");
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

        <form onSubmit={handleSubmit} className="mt-12 flex flex-col gap-6" noValidate>
          {data.fields.map((field) => {
            const fieldId = `${formId}-${field.name}`;

            if (field.type === "checkbox") {
              return (
                <div key={field.name} className="flex items-start gap-3">
                  <input
                    id={fieldId}
                    name={field.name}
                    type="checkbox"
                    required={field.required}
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
                    required={field.required}
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
                    required={field.required}
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
                  required={field.required}
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
