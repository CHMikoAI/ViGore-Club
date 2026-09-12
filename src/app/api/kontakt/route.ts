import { site } from "@/content/site";

/**
 * Nimmt die Formulare der Seite entgegen: Kontakt, Most-Bestellung und die
 * Bewerbung um eine Mitgliedschaft (Thema „bewerbung", von /mitglieder).
 *
 * ── Mailversand einschalten ────────────────────────────────────────────────
 * Ohne Konfiguration antwortet diese Route mit `reason: "not-configured"`.
 * Das Formular öffnet dann das Mailprogramm mit fertig ausgefülltem Text –
 * es geht also nichts verloren, auch bevor etwas eingerichtet ist.
 *
 * Für echten Versand bei Resend (resend.com) ein Konto anlegen, die Domain
 * vigore-club.ch verifizieren und in Vercel zwei Variablen setzen:
 *
 *   RESEND_API_KEY = re_...
 *   CONTACT_FROM   = website@vigore-club.ch     (muss zur Domain gehören)
 *
 * Mehr ist nicht nötig – der Code unten nutzt sie automatisch.
 */

type Topic = "club" | "most" | "bewerbung";

type Payload = {
  topic?: string;
  name?: string;
  email?: string;
  message?: string;
  /** Nur Most-Bestellung: Anzahl Container und Lieferadresse. */
  quantity?: string;
  address?: string;
  /** Nur Bewerbung. */
  phone?: string;
  place?: string;
  source?: string;
  /** Honigtopf: von Menschen nie ausgefüllt, von Bots fast immer. */
  website?: string;
};

const MAX = {
  name: 120,
  email: 200,
  message: 4000,
  quantity: 40,
  address: 200,
  phone: 40,
  place: 120,
  source: 200,
};

function clean(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function looksLikeEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

export async function POST(request: Request) {
  let payload: Payload;
  try {
    payload = (await request.json()) as Payload;
  } catch {
    return Response.json({ ok: false, reason: "bad-request" }, { status: 400 });
  }

  // Bot hat den Honigtopf ausgefüllt: freundlich bestätigen, nichts senden.
  if (clean(payload.website, 100)) {
    return Response.json({ ok: true });
  }

  const name = clean(payload.name, MAX.name);
  const email = clean(payload.email, MAX.email);
  const message = clean(payload.message, MAX.message);
  const quantity = clean(payload.quantity, MAX.quantity);
  const address = clean(payload.address, MAX.address);
  const phone = clean(payload.phone, MAX.phone);
  const place = clean(payload.place, MAX.place);
  const source = clean(payload.source, MAX.source);
  const topic: Topic =
    payload.topic === "most"
      ? "most"
      : payload.topic === "bewerbung"
        ? "bewerbung"
        : "club";

  if (!name || !looksLikeEmail(email)) {
    return Response.json({ ok: false, reason: "invalid" }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM;

  if (!apiKey || !from) {
    // Noch nicht eingerichtet – das Formular weicht auf mailto aus.
    return Response.json({ ok: false, reason: "not-configured" }, { status: 200 });
  }

  const subject =
    topic === "bewerbung"
      ? `Bewerbung: ${name}`
      : topic === "most"
        ? `Most-Bestellung: ${name}`
        : `Anfrage über die Website: ${name}`;

  const lines = (
    topic === "bewerbung"
      ? [
          `Name:     ${name}`,
          `E-Mail:   ${email}`,
          phone ? `Telefon:  ${phone}` : null,
          `Wohnort:  ${place || "(keine Angabe)"}`,
          "",
          "Warum dabei sein:",
          message || "(keine Angabe)",
          source ? "" : null,
          source ? `Auf uns gekommen über: ${source}` : null,
        ]
      : [
          `Name:    ${name}`,
          `E-Mail:  ${email}`,
          quantity ? `Anzahl:  ${quantity} Container à 5 Liter` : null,
          address ? `Adresse: ${address}` : null,
          "",
          message || "(keine Nachricht)",
        ]
  ).filter((line): line is string => line !== null);

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [site.email],
        reply_to: email,
        subject,
        text: lines.join("\n"),
      }),
    });

    if (!response.ok) {
      console.error("Resend antwortete mit", response.status, await response.text());
      return Response.json({ ok: false, reason: "send-failed" }, { status: 502 });
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error("Mailversand fehlgeschlagen:", error);
    return Response.json({ ok: false, reason: "send-failed" }, { status: 502 });
  }
}
