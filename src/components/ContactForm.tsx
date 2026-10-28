"use client";

import { useId, useState } from "react";

import { copy } from "@/lib/copy";
import { ArrowRight, Check } from "./Icons";

type Status = "idle" | "loading" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function ContactForm() {
  const id = useId();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");

  const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (name.trim().length < 2) {
      setStatus("error");
      setFeedback(copy.contact.form.invalidName);
      return;
    }
    if (!EMAIL_RE.test(email.trim())) {
      setStatus("error");
      setFeedback(copy.contact.form.invalidEmail);
      return;
    }
    if (message.trim().length < 20) {
      setStatus("error");
      setFeedback(copy.contact.form.invalidMessage);
      return;
    }

    setStatus("loading");
    setFeedback("");

    try {
      if (endpoint) {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            subject: subject.trim(),
            message: message.trim(),
          }),
        });
        if (!response.ok) throw new Error("contact request failed");
        setStatus("success");
        setFeedback(copy.contact.form.successWebhook);
      } else {
        const mailto = new URL("mailto:contato@sobraria.com.br");
        mailto.searchParams.set("subject", subject.trim() || "Contato pelo site");
        mailto.searchParams.set("body", `${message.trim()}\n\n— ${name.trim()} (${email.trim()})`);
        window.location.href = mailto.toString();
        setStatus("success");
        setFeedback(copy.contact.form.success);
      }
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch {
      setStatus("error");
      setFeedback(copy.contact.form.error);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-name`} className="label">
            {copy.contact.form.name}
          </label>
          <input
            id={`${id}-name`}
            name="name"
            autoComplete="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder={copy.contact.form.namePlaceholder}
            className="field"
            aria-invalid={status === "error" && name.trim().length < 2}
          />
        </div>
        <div>
          <label htmlFor={`${id}-email`} className="label">
            {copy.contact.form.email}
          </label>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder={copy.contact.form.emailPlaceholder}
            className="field"
            aria-invalid={status === "error" && !EMAIL_RE.test(email.trim())}
          />
        </div>
      </div>

      <div>
        <label htmlFor={`${id}-subject`} className="label">
          {copy.contact.form.subject}
        </label>
        <input
          id={`${id}-subject`}
          name="subject"
          value={subject}
          onChange={(event) => setSubject(event.target.value)}
          placeholder={copy.contact.form.subjectPlaceholder}
          className="field"
        />
      </div>

      <div>
        <label htmlFor={`${id}-message`} className="label">
          {copy.contact.form.message}
        </label>
        <textarea
          id={`${id}-message`}
          name="message"
          rows={6}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder={copy.contact.form.messagePlaceholder}
          className="field resize-y"
          aria-invalid={status === "error" && message.trim().length < 20}
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn btn-primary w-full disabled:cursor-wait disabled:opacity-70 sm:w-auto"
      >
        {status === "loading" ? copy.contact.form.sending : copy.contact.form.submit}
        {status === "success" ? <Check size={16} /> : <ArrowRight size={16} />}
      </button>

      <div aria-live="polite" className="min-h-[22px]">
        {feedback && (
          <p
            className={`flex items-start gap-2 text-xs leading-relaxed ${
              status === "success" ? "text-green" : "text-red"
            }`}
          >
            {status === "success" && <Check size={14} className="mt-0.5 shrink-0" />}
            {feedback}
          </p>
        )}
      </div>
    </form>
  );
}
