"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { copy } from "@/lib/copy";
import { ArrowRight, Check } from "./Icons";

type Status = "idle" | "loading" | "success" | "error";

type NewsletterFormProps = {
  source?: string;
  variant?: "default" | "compact" | "stacked";
  className?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function NewsletterForm({
  source = "site",
  variant = "default",
  className = "",
}: NewsletterFormProps) {
  const id = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const endpoint = process.env.NEXT_PUBLIC_NEWSLETTER_ENDPOINT;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!EMAIL_RE.test(email.trim())) {
      setStatus("error");
      setMessage(copy.newsletter.invalid);
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      if (endpoint) {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email.trim(), source }),
        });
        if (!response.ok) throw new Error("newsletter request failed");
      } else {
        // Fallback gracioso: sem endpoint configurado, simulamos o envio.
        await new Promise((resolve) => setTimeout(resolve, 700));
      }

      setStatus("success");
      setMessage(copy.newsletter.success);
      setEmail("");
    } catch {
      setStatus("error");
      setMessage(copy.newsletter.error);
    }
  }

  const isStacked = variant === "stacked";
  const isCompact = variant === "compact";

  return (
    <div className={className}>
      <form
        onSubmit={handleSubmit}
        noValidate
        className={isStacked ? "flex flex-col gap-3" : "flex flex-col gap-3 sm:flex-row"}
      >
        <div className="flex-1">
          <label htmlFor={id} className="sr-only">
            {copy.newsletter.label}
          </label>
          <input
            id={id}
            type="email"
            name="email"
            autoComplete="email"
            inputMode="email"
            required
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              if (status === "error") {
                setStatus("idle");
                setMessage("");
              }
            }}
            placeholder={copy.newsletter.placeholder}
            aria-describedby={`${id}-status`}
            aria-invalid={status === "error"}
            className={`field ${isCompact ? "py-2.5 text-xs" : ""}`}
          />
        </div>
        <button
          type="submit"
          disabled={status === "loading"}
          className={`btn btn-primary shrink-0 disabled:cursor-wait disabled:opacity-70 ${
            isCompact ? "btn-sm" : ""
          }`}
        >
          {status === "loading" ? copy.newsletter.loading : copy.newsletter.button}
          {status === "success" ? <Check size={16} /> : <ArrowRight size={16} />}
        </button>
      </form>

      <div id={`${id}-status`} aria-live="polite" className="min-h-[20px]">
        {message && (
          <p
            className={`mt-2.5 flex items-start gap-1.5 text-xs leading-relaxed ${
              status === "success" ? "text-green" : "text-red"
            }`}
          >
            {status === "success" && <Check size={14} className="mt-0.5 shrink-0" />}
            {message}
          </p>
        )}
      </div>

      <p className="mt-1 text-[10px] leading-relaxed text-ink-2/75">
        {copy.newsletter.privacy}{" "}
        <Link href="/politica-de-privacidade" className="underline decoration-line underline-offset-2 hover:text-ink-2">
          Privacidade
        </Link>
        .
      </p>

      {!endpoint && process.env.NODE_ENV === "development" && (
        <p className="mt-2 font-mono text-[9px] uppercase tracking-wider text-amber/60">
          {copy.newsletter.demo}
        </p>
      )}
    </div>
  );
}
