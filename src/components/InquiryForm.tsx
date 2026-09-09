"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/content/site";

/**
 * Das Formular für Kontaktanfragen und Most-Vormerkungen.
 *
 * Es schickt an /api/kontakt. Solange dort kein Mailversand eingerichtet ist
 * (siehe src/app/api/kontakt/route.ts), öffnet es stattdessen das
 * Mailprogramm mit fertigem Text. So funktioniert es ab dem ersten Tag.
 */

type Topic = "club" | "most";
type State = "idle" | "sending" | "sent" | "handoff" | "error";

// 16px ist Pflicht, kein Geschmack: iOS Safari zoomt die Seite hinein, sobald
// ein fokussiertes Feld kleiner gesetzt ist. Darunter darf hier nichts.
const FIELD =
  "w-full border border-line bg-transparent px-4 py-3 text-base text-on-surface " +
  "placeholder:text-muted/60 transition-colors duration-200 focus:border-accent focus:outline-none";

const LABEL = "block text-[0.6875rem] uppercase tracking-[0.16em] text-muted";

export default function InquiryForm({ topic = "club" }: { topic?: Topic }) {
  const [state, setState] = useState<State>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    setState("sending");

    try {
      const response = await fetch("/api/kontakt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, topic }),
      });
      const result = (await response.json()) as { ok: boolean; reason?: string };

      if (result.ok) {
        setState("sent");
        form.reset();
        return;
      }

      if (result.reason === "not-configured") {
        // Noch kein Versand eingerichtet: Mailprogramm mit fertigem Text öffnen.
        window.location.href = mailtoFor(topic, data);
        setState("handoff");
        return;
      }

      setState("error");
    } catch {
      setState("error");
    }
  }

  if (state === "sent") {
    return (
      <div className="border border-accent/40 bg-surface p-8">
        <p className="display-4">Angekommen.</p>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Danke für deine Nachricht – wir melden uns. Wir sind ein kleiner Club
          und lesen alles selbst, das kann also ein paar Tage dauern.
        </p>
      </div>
    );
  }

  if (state === "handoff") {
    return (
      <div className="border border-accent/40 bg-surface p-8">
        <p className="display-4">Dein Mailprogramm ist offen.</p>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Die Nachricht ist fertig vorbereitet – du musst sie nur noch
          abschicken. Falls sich nichts geöffnet hat, schreib uns direkt an{" "}
          <a href={`mailto:${site.email}`} className="link-quiet text-accent">
            {site.email}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Honigtopf – für Menschen unsichtbar, für Bots verlockend. */}
      <div className="absolute left-[-9999px]" aria-hidden>
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={LABEL}>
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            maxLength={120}
            className={`${FIELD} mt-2`}
          />
        </div>

        <div>
          <label htmlFor="email" className={LABEL}>
            E-Mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            maxLength={200}
            className={`${FIELD} mt-2`}
          />
        </div>
      </div>

      {topic === "most" ? (
        <div>
          <label htmlFor="quantity" className={LABEL}>
            Ungefähre Menge <span className="normal-case tracking-normal">(optional)</span>
          </label>
          <input
            id="quantity"
            name="quantity"
            type="text"
            maxLength={40}
            placeholder="z. B. 6 Flaschen"
            className={`${FIELD} mt-2`}
          />
        </div>
      ) : null}

      <div>
        <label htmlFor="message" className={LABEL}>
          Nachricht{" "}
          {topic === "most" ? (
            <span className="normal-case tracking-normal">(optional)</span>
          ) : null}
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required={topic === "club"}
          maxLength={4000}
          placeholder={
            topic === "most"
              ? "Wenn du uns noch etwas mitgeben willst."
              : "Erzähl uns kurz, wer du bist und was dich hierher bringt."
          }
          className={`${FIELD} mt-2 resize-y`}
        />
      </div>

      {state === "error" ? (
        <p className="text-sm text-red-700" role="alert">
          Das hat leider nicht geklappt. Schreib uns bitte direkt an{" "}
          <a href={`mailto:${site.email}`} className="link-quiet">
            {site.email}
          </a>
          .
        </p>
      ) : null}

      <button
        type="submit"
        disabled={state === "sending"}
        className="group inline-flex min-h-11 items-center gap-2.5 bg-on-surface px-6 text-[0.8125rem] uppercase tracking-[0.14em] text-surface transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {state === "sending"
          ? "Wird gesendet …"
          : topic === "most"
            ? "Vormerken"
            : "Absenden"}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
          className="h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
        >
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </button>
    </form>
  );
}

function mailtoFor(topic: Topic, data: Record<string, string>): string {
  const subject =
    topic === "most" ? "Most-Vormerkung" : "Anfrage über die Website";

  const body = [
    `Name: ${data.name ?? ""}`,
    `E-Mail: ${data.email ?? ""}`,
    data.quantity ? `Menge: ${data.quantity}` : null,
    "",
    data.message ?? "",
  ]
    .filter((line): line is string => line !== null)
    .join("\n");

  return `mailto:${site.email}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;
}
