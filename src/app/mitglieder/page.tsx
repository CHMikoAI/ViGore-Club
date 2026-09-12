import type { Metadata } from "next";
import LoginForm from "@/components/LoginForm";
import Reveal from "@/components/Reveal";
import {
  Container,
  OutlineButton,
  Section,
  SectionHeader,
} from "@/components/ui";
import { applicationSteps } from "@/content/mitglieder";

export const metadata: Metadata = {
  title: "Mitgliederbereich",
  description:
    "Anmeldung für Mitglieder des ViGORE Clubs – und der Weg hinein für " +
    "alle, die dabei sein wollen.",
};

/**
 * Die Tür zum Mitgliederbereich.
 *
 *   Anmelden         zuerst, ohne Umschweife – für die, die dabei sind
 *   Mitglied werden  darunter: der Ablauf in drei Schritten und der Knopf
 *                    zur Bewerbung, die auf /kontakt/mitglied-werden liegt
 *
 * Espresso für „Mitglied werden": das ist Ansprache, wie der Hero und die
 * Schlussabschnitte der anderen Seiten – derselbe Knopf, dieselbe Fläche.
 *
 * ── Später ─────────────────────────────────────────────────────────────────
 * Der geschützte Bereich kommt unter /mitglieder/… dazu. Diese Seite bleibt
 * die Tür: Wer angemeldet ist, wird dann direkt hineingeleitet, alle anderen
 * sehen weiterhin Anmeldung und den Weg hinein.
 */
export default function MembersPage() {
  return (
    <>
      {/* ── Anmelden ─────────────────────────────────────────────────────
          Schmaler Kasten: zwei Felder brauchen keine Formularbreite. */}
      <Section band="cream" className="!pt-16 md:!pt-24">
        <Container>
          <SectionHeader
            as="h1"
            label="Mitgliederbereich"
            heading="Anmelden"
            lede="Der Bereich für alle, die dabei sind. Zugangsdaten bekommst du von uns persönlich."
          />

          <Reveal delay={220}>
            <div className="mx-auto mt-12 max-w-md border border-line bg-surface p-6 text-left md:p-10">
              <LoginForm />
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ── Mitglied werden · Ansprache ──────────────────────────────────
          Drei Schritte mit den grossen Ziffern des Ansatzes auf der
          Startseite, dann der Knopf. */}
      <Section band="espresso">
        <Container>
          <SectionHeader
            label="Noch nicht dabei"
            heading="Mitglied werden"
            lede="Wir sind bewusst wenige und nehmen nicht jeden. So läuft es:"
          />

          <div className="mx-auto mt-14 grid max-w-5xl gap-12 sm:grid-cols-3 sm:gap-10">
            {applicationSteps.map((step, i) => (
              <Reveal key={step.title} delay={i * 90} className="text-center">
                <span
                  aria-hidden
                  className="font-display block text-[2.75rem] leading-none text-accent/40"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="display-4 mt-4">{step.title}</h3>
                <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-muted">
                  {step.body}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={320}>
            <div className="mt-14 flex justify-center">
              <OutlineButton href="/kontakt/mitglied-werden" tone="light">
                Mitglied werden
              </OutlineButton>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
