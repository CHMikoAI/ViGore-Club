import type { ReactNode } from "react";
import { site } from "@/content/site";

/**
 * Was alle Formulare der Seite teilen: Feldstile, Honigtopf, Sendeknopf,
 * die Meldungen danach – und den Versand über /api/kontakt.
 *
 * InquiryForm (Kontakt, Most-Bestellung) und ApplicationForm (Bewerbung) setzen daraus
 * ihre Felder zusammen. Wer hier etwas ändert, ändert es in allen dreien.
 */

export type FormState = "idle" | "sending" | "sent" | "handoff" | "error";

// 16px ist Pflicht, kein Geschmack: iOS Safari zoomt die Seite hinein, sobald
// ein fokussiertes Feld kleiner gesetzt ist. Darunter darf hier nichts.
export const FIELD =
  "w-full border border-line bg-transparent px-4 py-3 text-base text-on-surface " +
  "placeholder:text-muted/60 transition-colors duration-200 focus:border-accent focus:outline-none";

export const LABEL =
  "block text-[0.6875rem] uppercase tracking-[0.16em] text-muted";

/** Klammer für den Zusatz „(optional)" hinter einer Beschriftung. */
export function Optional() {
  return <span className="normal-case tracking-normal">(optional)</span>;
}

/**
 * Schickt die Angaben an /api/kontakt und liefert den Folgezustand.
 *
 * Solange dort kein Mailversand eingerichtet ist (siehe
 * src/app/api/kontakt/route.ts), öffnet der Browser stattdessen das
 * Mailprogramm mit dem fertigen Text aus `mailto` – der Zustand ist dann
 * "handoff". So funktioniert jedes Formular ab dem ersten Tag.
 */
export async function submitToKontakt(
  payload: Record<string, string>,
  mailto: string,
): Promise<FormState> {
  try {
    const response = await fetch("/api/kontakt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const result = (await response.json()) as { ok: boolean; reason?: string };

    if (result.ok) return "sent";

    if (result.reason === "not-configured") {
      window.location.href = mailto;
      return "handoff";
    }

    return "error";
  } catch {
    return "error";
  }
}

/** Baut den mailto-Link für die Ausweichlösung. Zeilen mit `null` fallen weg. */
export function mailtoFor(subject: string, lines: (string | null)[]): string {
  const body = lines
    .filter((line): line is string => line !== null)
    .join("\n");

  return `mailto:${site.email}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;
}

/** Honigtopf – für Menschen unsichtbar, für Bots verlockend. */
export function Honeypot() {
  return (
    <div className="absolute left-[-9999px]" aria-hidden>
      <label>
        Website
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}

/**
 * Der Sendeknopf – wie ButtonLink in ui.tsx, nur als <button>. Steht auf
 * der Mittelachse: Die Felder sind linksbündig, weil man Beschriftungen am
 * Rand liest – der Knopf aber ist eine Handlung, und Handlungen sitzen auf
 * dieser Seite überall in der Mitte.
 */
export function SubmitButton({
  children,
  sending = false,
}: {
  children: ReactNode;
  sending?: boolean;
}) {
  return (
    <div className="flex justify-center pt-2">
      <button
        type="submit"
        disabled={sending}
        className="group inline-flex min-h-11 items-center gap-2.5 bg-on-surface px-6 text-[0.8125rem] uppercase tracking-[0.14em] text-surface transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {sending ? "Wird gesendet …" : children}
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
    </div>
  );
}

/** Die Meldung nach erfolgreichem Versand. */
export function SentNotice({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="border border-accent/40 bg-surface p-8 text-center">
      <p className="display-4">{title}</p>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
        {children}
      </p>
    </div>
  );
}

/** Die Meldung, wenn das Mailprogramm übernommen hat. */
export function HandoffNotice() {
  return (
    <div className="border border-accent/40 bg-surface p-8 text-center">
      <p className="display-4">Dein Mailprogramm ist offen.</p>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
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

/** Die Meldung, wenn der Versand fehlgeschlagen ist. */
export function ErrorNotice() {
  return (
    <p className="text-center text-sm text-red-700" role="alert">
      Das hat leider nicht geklappt. Schreib uns bitte direkt an{" "}
      <a href={`mailto:${site.email}`} className="link-quiet">
        {site.email}
      </a>
      .
    </p>
  );
}
