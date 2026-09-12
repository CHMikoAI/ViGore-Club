"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import {
  ErrorNotice,
  FIELD,
  HandoffNotice,
  Honeypot,
  LABEL,
  Optional,
  SentNotice,
  SubmitButton,
  mailtoFor,
  submitToKontakt,
  type FormState,
} from "./forms";

/**
 * Die Bewerbung um eine Mitgliedschaft. Steht auf /mitglieder.
 *
 * Bewusst kurz: Name, Kontakt, Wohnort – und ein Feld für das, was zählt.
 * Alles Weitere klärt sich beim Treffen. Die Bestätigung „gelesen, für wen
 * der Club ist“ ist kein Formalismus, sondern die erste kleine Hürde: Wer
 * sie nimmt, hat sich mit uns beschäftigt.
 *
 * Geht denselben Weg wie das Kontaktformular (/api/kontakt, Thema
 * „bewerbung“), mit derselben Ausweichlösung über das Mailprogramm.
 *
 * Die IDs sind mit „bewerbung-“ vorangestellt, weil auf derselben Seite das
 * Login steht und „email“ sonst zweimal vorkäme.
 */
export default function ApplicationForm() {
  const [state, setState] = useState<FormState>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    setState("sending");
    const next = await submitToKontakt(
      { ...data, topic: "bewerbung" },
      mailtoFor("Bewerbung ViGORE Club", [
        `Name: ${data.name ?? ""}`,
        `E-Mail: ${data.email ?? ""}`,
        data.phone ? `Telefon: ${data.phone}` : null,
        `Wohnort: ${data.place ?? ""}`,
        "",
        "Warum ich dabei sein will:",
        data.message ?? "",
        data.source ? "" : null,
        data.source ? `Auf euch gekommen über: ${data.source}` : null,
      ]),
    );

    if (next === "sent") form.reset();
    setState(next);
  }

  if (state === "sent") {
    return (
      <SentNotice title="Angekommen.">
        Danke für deine Bewerbung. Wir lesen sie alle selbst und melden uns
        persönlich bei dir – das kann ein paar Tage dauern.
      </SentNotice>
    );
  }

  if (state === "handoff") return <HandoffNotice />;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Honeypot />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="bewerbung-name" className={LABEL}>
            Name
          </label>
          <input
            id="bewerbung-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            maxLength={120}
            className={`${FIELD} mt-2`}
          />
        </div>

        <div>
          <label htmlFor="bewerbung-email" className={LABEL}>
            E-Mail
          </label>
          <input
            id="bewerbung-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            maxLength={200}
            className={`${FIELD} mt-2`}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="bewerbung-phone" className={LABEL}>
            Telefon <Optional />
          </label>
          <input
            id="bewerbung-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            maxLength={40}
            className={`${FIELD} mt-2`}
          />
        </div>

        <div>
          <label htmlFor="bewerbung-place" className={LABEL}>
            Wohnort
          </label>
          <input
            id="bewerbung-place"
            name="place"
            type="text"
            required
            autoComplete="address-level2"
            maxLength={120}
            placeholder="z. B. Chur"
            className={`${FIELD} mt-2`}
          />
        </div>
      </div>

      <div>
        <label htmlFor="bewerbung-message" className={LABEL}>
          Warum willst du dabei sein?
        </label>
        <textarea
          id="bewerbung-message"
          name="message"
          rows={6}
          required
          maxLength={4000}
          placeholder="Was dich hierher bringt, was du anpacken willst, was du dir vom Club erhoffst. Ehrlich reicht."
          className={`${FIELD} mt-2 resize-y`}
        />
      </div>

      <div>
        <label htmlFor="bewerbung-source" className={LABEL}>
          Wie bist du auf uns gekommen? <Optional />
        </label>
        <input
          id="bewerbung-source"
          name="source"
          type="text"
          maxLength={200}
          placeholder="Empfehlung, Instagram, Zufall …"
          className={`${FIELD} mt-2`}
        />
      </div>

      {/* Die Bestätigung. accent-brass färbt das native Kästchen in der
          Akzentfarbe – ohne eigenes Widget, das auf jedem Gerät nachgebaut
          werden müsste. */}
      <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-muted">
        <input
          type="checkbox"
          name="gelesen"
          required
          className="mt-1 h-4 w-4 shrink-0 accent-brass"
        />
        <span>
          Ich habe gelesen,{" "}
          <Link href="/club#fuer-wen" className="link-quiet text-on-surface">
            für wen der Club ist – und für wen nicht
          </Link>
          .
        </span>
      </label>

      {state === "error" ? <ErrorNotice /> : null}

      <SubmitButton sending={state === "sending"}>
        Bewerbung absenden
      </SubmitButton>

      <p className="mx-auto max-w-md text-center text-xs leading-relaxed text-muted">
        Mit dem Absenden bist du einverstanden, dass wir deine Angaben für die
        Bearbeitung deiner Bewerbung verwenden. Mehr dazu in der{" "}
        <Link href="/datenschutz" className="link-quiet">
          Datenschutzerklärung
        </Link>
        .
      </p>
    </form>
  );
}
