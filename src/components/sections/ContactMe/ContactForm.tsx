"use client";

import { FormEvent, useState } from "react";
import styles from "./ContactMe.module.css";

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

    if (!accessKey) {
      setStatus("error");
      setErrorMessage("Contact form is not configured yet.");
      return;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.get("name"),
          email: formData.get("email"),
          subject: formData.get("subject"),
          message: formData.get("message"),
        }),
      });

      const result = (await response.json()) as {
        success?: boolean;
        message?: string;
      };

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Something went wrong. Please try again.");
      }

      form.reset();
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    }
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate={false}>
      <label className={styles.field}>
        <span className={styles.label}>Name</span>
        <input
          className={styles.input}
          type="text"
          name="name"
          placeholder="John Doe"
          autoComplete="name"
          required
          disabled={status === "submitting"}
        />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>Email</span>
        <input
          className={styles.input}
          type="email"
          name="email"
          placeholder="john@example.com"
          autoComplete="email"
          required
          disabled={status === "submitting"}
        />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>Subject</span>
        <input
          className={styles.input}
          type="text"
          name="subject"
          placeholder="Just saying hi"
          required
          disabled={status === "submitting"}
        />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>Message</span>
        <textarea
          className={styles.textarea}
          name="message"
          rows={5}
          placeholder="Hello..."
          required
          disabled={status === "submitting"}
        />
      </label>

      <button
        type="submit"
        className={styles.submit}
        disabled={status === "submitting"}
      >
        {status === "submitting" ? "Sending..." : "Submit"}
      </button>

      {status === "success" || status === "error" ? (
        <p
          className={`${styles.status} ${
            status === "success" ? styles.statusSuccess : styles.statusError
          }`}
          role="status"
          aria-live="polite"
        >
          {status === "success"
            ? "Thanks — your message is on its way."
            : errorMessage}
        </p>
      ) : null}
    </form>
  );
}
