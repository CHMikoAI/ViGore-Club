"use client";

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
 * Das Formular für Kontaktanfragen und Most-Bestellungen.
 *
 * Eine Bestellung ist bewusst kein Shop: Name, E-Mail, Anzahl Container,
 * Adresse für die Lieferung – und wir melden uns mit allem Weiteren. Preis
 * und Gebinde stehen in src/content/projects.ts beim Projekt (`order`), das
 * Formular rechnet nichts nach. Es schickt an /api/kontakt. Solange
 * dort kein Mailversand eingerichtet ist (siehe src/app/api/kontakt/route.ts),
 * öffnet es stattdessen das Mailprogramm mit fertigem Text. So funktioniert
 * es ab dem ersten Tag.
 *
 * Feldstile, Honigtopf, Sendeknopf und Meldungen kommen aus forms.tsx – das
 * Bewerbungsformular (ApplicationForm) benutzt dieselben.
 */

type Topic = "club" | "most";

export default function InquiryForm({ topic = "club" }: { topic?: Topic }) {
  const [state, setState] = useState<FormState>("idle");
  const order = topic === "most";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    setState("sending");
    const next = await submitToKontakt(
      { ...data, topic },
      mailtoFor(order ? "Most-Bestellung" : "Anfrage über die Website", [
        `Name: ${data.name ?? ""}`,
        `E-Mail: ${data.email ?? ""}`,
        data.quantity ? `Anzahl: ${data.quantity} Container à 5 Liter` : null,
        data.address ? `Adresse: ${data.address}` : null,
        "",
        data.message ?? "",
      ]),
    );

    if (next === "sent") form.reset();
    setState(next);
  }

  if (state === "sent") {
    return order ? (
      <SentNotice title="Bestellt.">
        Danke – wir melden uns persönlich wegen Lieferung und Bezahlung. Wir
        sind ein kleiner Club und lesen alles selbst, das kann also ein paar
        Tage dauern.
      </SentNotice>
    ) : (
      <SentNotice title="Angekommen.">
        Danke für deine Nachricht – wir melden uns. Wir sind ein kleiner Club
        und lesen alles selbst, das kann also ein paar Tage dauern.
      </SentNotice>
    );
  }

  if (state === "handoff") return <HandoffNotice />;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Honeypot />

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

      {order ? (
        <div className="grid gap-5 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <div>
            <label htmlFor="quantity" className={LABEL}>
              Anzahl Container
            </label>
            <input
              id="quantity"
              name="quantity"
              type="number"
              inputMode="numeric"
              min={1}
              max={99}
              step={1}
              required
              placeholder="z. B. 2"
              className={`${FIELD} mt-2`}
            />
          </div>

          <div>
            <label htmlFor="address" className={LABEL}>
              Lieferadresse <Optional />
            </label>
            <input
              id="address"
              name="address"
              type="text"
              autoComplete="street-address"
              maxLength={200}
              placeholder="Strasse, PLZ Ort"
              className={`${FIELD} mt-2`}
            />
          </div>
        </div>
      ) : null}

      <div>
        <label htmlFor="message" className={LABEL}>
          Nachricht {order ? <Optional /> : null}
        </label>
        <textarea
          id="message"
          name="message"
          rows={order ? 3 : 5}
          required={!order}
          maxLength={4000}
          placeholder={
            order
              ? "Wunschtermin, Abholung statt Lieferung – alles, was wir wissen sollten."
              : "Deine Frage, deine Idee – oder was du sonst loswerden willst."
          }
          className={`${FIELD} mt-2 resize-y`}
        />
      </div>

      {state === "error" ? <ErrorNotice /> : null}

      <SubmitButton sending={state === "sending"}>
        {order ? "Bestellen" : "Absenden"}
      </SubmitButton>
    </form>
  );
}
