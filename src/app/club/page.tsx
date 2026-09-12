import type { Metadata } from "next";
import Figure from "@/components/Figure";
import Reveal from "@/components/Reveal";
import FitSection from "@/components/FitSection";
import ValueGrid from "@/components/ValueGrid";
import {
  Container,
  OutlineButton,
  Section,
  SectionHeader,
} from "@/components/ui";
import { facts, founders, rhythm, values } from "@/content/club";

export const metadata: Metadata = {
  title: "Der Club",
  description:
    "Warum es den ViGORE Club gibt, wer dahintersteht und was bei uns fest " +
    "im Kalender steht. Ein Männerclub in Graubünden.",
};

/**
 * Die Club-Seite.
 *
 *   Kopf          Kurz, wer wir sind und warum es uns gibt – direkt darunter
 *                 die harten Zahlen: wie klein und wie jung das Ganze ist
 *   01 Gründer    Bild und Vision der drei
 *   02 Rhythmus   Was fest im Kalender steht
 *   03 Werte      Worauf wir uns verlassen
 *   04 Für wen    Ob das etwas für dich ist
 *   Schluss       Klingt nach dir?
 *
 * Bänder: Creme, Papier, Tiefdunkel, Creme, Papier, Espresso.
 */
export default function ClubPage() {
  return (
    <>
      {/* ── Kopf ─────────────────────────────────────────────────────────
          Kein Bild, keine lange Erzählung: drei Sätze, dann die Zahlen. */}
      <Section band="cream" className="!pt-16 md:!pt-24">
        <Container>
          <SectionHeader
            as="h1"
            label="Der Club"
            heading="Ein Ort, an dem man nichts vorspielen muss."
            lede="Eine kleine Runde aus Graubünden – kein Verein mit Programm, kein Netzwerk mit Visitenkarten. Die meisten Männer haben Kollegen, mit denen sie über alles reden, ausser über das, was sie wirklich beschäftigt. Wir wollten einen Ort, an dem das anders läuft: ein Kreis, der Dinge gemeinsam macht und dabei ehrlich miteinander umgeht."
          />

          <Reveal delay={220}>
            <dl className="mx-auto mt-14 flex max-w-3xl flex-wrap justify-center gap-x-24 gap-y-10 border-y border-line py-10 text-center">
              {facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="eyebrow">{fact.label}</dt>
                  <dd className="display-2 mt-2">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </Container>
      </Section>

      {/* ── Die Gründer ──────────────────────────────────────────────────── */}
      <Section band="paper">
        <Container>
          <SectionHeader
            number="01"
            label="Die Gründer"
            heading="Zu dritt angefangen"
          />

          <div className="mx-auto mt-12 max-w-4xl text-center">
            <Figure
              src={founders.image}
              alt={`${founders.names.join(", ")} – die Gründer des ViGORE Clubs`}
              ratio="3/2"
              sizes="(max-width: 1024px) 100vw, 56rem"
            />

            <Reveal delay={120}>
              <p className="eyebrow mt-6">{founders.names.join(" · ")}</p>
            </Reveal>
          </div>

          <div className="prose-club mx-auto mt-12 max-w-2xl text-center text-[1.0625rem] leading-relaxed">
            {founders.vision.map((paragraph, i) => (
              <Reveal key={i} delay={i * 70}>
                <p>{paragraph}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Rhythmus ─────────────────────────────────────────────────────── */}
      <Section band="dark">
        <Container>
          <SectionHeader
            number="02"
            label="Rhythmus"
            heading="Was fest im Kalender steht"
          />

          <div className="mx-auto mt-14 max-w-2xl">
            {rhythm.map((entry, i) => (
              <Reveal key={entry.what} delay={i * 80}>
                <div className="border-b border-line py-8 text-center last:border-0">
                  <span className="text-[0.6875rem] uppercase tracking-[0.16em] text-accent">
                    {entry.when}
                  </span>
                  <h3 className="display-4 mt-2">{entry.what}</h3>
                  <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
                    {entry.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Werte ────────────────────────────────────────────────────────── */}
      <Section band="cream">
        <Container>
          <SectionHeader
            number="03"
            label="Werte"
            heading="Worauf wir uns verlassen"
          />

          <ValueGrid values={values} />
        </Container>
      </Section>

      <FitSection number="04" />

      {/* ── Sei dabei · Ansprache ──────────────────────────────────────── */}
      <Section band="espresso">
        <Container>
          <SectionHeader
            label="Sei dabei!"
            heading="Klingt nach dir?"
            lede="Wenn du dich in unseren Werten wiedererkennst und bereit bist, dich einzubringen, dann melde dich bei uns."
            action={
              <OutlineButton href="/kontakt/mitglied-werden" tone="light">
                Mitglied werden
              </OutlineButton>
            }
          />
        </Container>
      </Section>
    </>
  );
}
