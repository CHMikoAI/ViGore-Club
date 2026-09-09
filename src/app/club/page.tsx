import type { Metadata } from "next";
import Figure from "@/components/Figure";
import Reveal from "@/components/Reveal";
import {
  Container,
  OutlineButton,
  Section,
  SectionHeader,
} from "@/components/ui";
import { notThis, rhythm, values } from "@/content/club";

export const metadata: Metadata = {
  title: "Der Club",
  description:
    "Warum es den ViGORE Club gibt, wie ein Monat bei uns aussieht und " +
    "worauf wir uns verlassen. Ein Männerclub in Graubünden.",
};

export default function ClubPage() {
  return (
    <>
      <header className="bg-cream pb-14 pt-16 md:pb-20 md:pt-24">
        <Container>
          <SectionHeader
            as="h1"
            label="Der Club"
            heading="Ein Ort, an dem man nichts vorspielen muss."
            lede="Eine kleine Runde aus Graubünden. Kein Verein mit Programm, kein Netzwerk mit Visitenkarten – ein Club, der Dinge gemeinsam macht und dabei ehrlich miteinander umgeht."
          />
        </Container>
      </header>

      <Container>
        <Figure
          src="/images/club/club-gruppe.jpg"
          alt="Der Club"
          ratio="21/9"
          sizes="(max-width: 1400px) 100vw, 1400px"
        />
      </Container>

      {/* ── Warum es uns gibt ─────────────────────────────────────────────
          Fliesstext in schmaler, mittiger Spalte. Zentrierte Absätze wären
          hier falsch – mehrzeiliger Fliesstext bleibt linksbündig gesetzt,
          nur die Spalte selbst sitzt auf der Achse. */}
      <Section band="cream">
        <Container>
          <SectionHeader number="01" label="Warum es uns gibt" />

          <div className="prose-club mx-auto mt-10 max-w-2xl text-[1.0625rem] leading-relaxed">
            <Reveal>
              <p>
                Die meisten Männer haben Kollegen, mit denen sie über alles
                reden – ausser über das, was sie wirklich beschäftigt. Man kennt
                sich seit Jahren und weiss trotzdem nicht, wie es dem anderen
                geht. Kein Vorwurf. Es wächst einfach so.
              </p>
            </Reveal>
            <Reveal delay={70}>
              <p>
                Wir wollten einen Ort, an dem das anders läuft. An dem man sagen
                kann, dass es gerade nicht rund geht, ohne dass es peinlich wird
                oder man gleich zum Fall erklärt wird.
              </p>
            </Reveal>
            <Reveal delay={140}>
              <p>
                So einen Ort kann man aber nicht beschliessen. Vertrauen
                entsteht nicht, weil man es sich vornimmt, sondern nebenbei –
                wenn man miteinander etwas tut. Deshalb die Projekte. Sie sind
                der Anlass. Was dabei zwischen uns wächst, ist der Grund.
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ── Rhythmus ──────────────────────────────────────────────────────
          Gestapelt auf der Achse statt zweispaltig: die Zeitangabe steht über
          dem Titel, nicht daneben. */}
      <Section band="dark">
        <Container>
          <SectionHeader
            number="02"
            label="Rhythmus"
            heading="Wie ein Monat aussieht"
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

      {/* ── Werte ───────────────────────────────────────────────────────── */}
      <Section band="cream">
        <Container>
          <SectionHeader
            number="03"
            label="Werte"
            heading="Worauf wir uns verlassen"
          />

          <div className="mx-auto mt-16 grid max-w-5xl gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value, i) => (
              <Reveal key={value.title} delay={i * 60} className="text-center">
                <h3 className="display-4">{value.title}</h3>
                <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-muted">
                  {value.body}
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Abgrenzung ──────────────────────────────────────────────────── */}
      <Section band="paper">
        <Container>
          <SectionHeader
            number="04"
            label="Abgrenzung"
            heading="Was wir nicht sind"
          />

          <div className="mx-auto mt-14 max-w-2xl">
            <ul className="text-center">
              {notThis.map((item, i) => (
                <Reveal key={item} delay={i * 70}>
                  <li className="border-b border-line py-6 last:border-0">
                    <span className="display-4">{item}</span>
                  </li>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={220}>
              <p className="mx-auto mt-10 text-[1.0625rem] leading-relaxed text-muted">
                Wer eine Therapie oder professionelle Begleitung braucht, ist
                bei Fachleuten besser aufgehoben. Das ist keine Schwäche,
                sondern die richtige Entscheidung. Wir sind das, was daneben
                steht: ein Kreis von Männern, die füreinander da sind, weil sie
                einander kennen.
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ── Mitmachen · Ansprache ─────────────────────────────────────────── */}
      <Section band="espresso">
        <Container>
          <SectionHeader
            number="05"
            label="Mitmachen"
            heading="Klingt nach dir?"
            lede="Dann schreib uns. Kein Formular-Marathon – ein paar Zeilen reichen. Den Rest klären wir im Gespräch, und zwar in beide Richtungen: es muss auch für dich passen."
            action={
              <OutlineButton href="/kontakt" tone="light">
                Mitglied werden
              </OutlineButton>
            }
          />
        </Container>
      </Section>
    </>
  );
}
