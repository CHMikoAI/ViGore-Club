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

      {/* ── Warum es uns gibt ───────────────────────────────────────────── */}
      <Section band="cream">
        <Container>
          <SectionHeader number="01" label="Warum es uns gibt" />

          <div className="prose-club mt-8 max-w-2xl text-[1.0625rem] leading-relaxed">
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

      {/* ── Rhythmus ────────────────────────────────────────────────────── */}
      <Section band="dark">
        <Container>
          <SectionHeader
            number="02"
            label="Rhythmus"
            heading="Wie ein Monat aussieht"
          />

          <div className="mt-12 max-w-4xl">
            {rhythm.map((entry, i) => (
              <Reveal key={entry.what} delay={i * 80}>
                <div className="grid gap-2 border-b border-line py-7 sm:grid-cols-[minmax(0,12rem)_1fr] sm:gap-8">
                  <span className="text-[0.6875rem] uppercase tracking-[0.16em] text-accent">
                    {entry.when}
                  </span>
                  <div>
                    <h3 className="display-4">{entry.what}</h3>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
                      {entry.body}
                    </p>
                  </div>
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

          <div className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value, i) => (
              <Reveal key={value.title} delay={i * 60}>
                <div className="hairline mb-4" />
                <h3 className="display-4">{value.title}</h3>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
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

          <div className="mt-12 max-w-2xl">
            <ul>
              {notThis.map((item, i) => (
                <Reveal key={item} delay={i * 70}>
                  <li className="flex items-center gap-4 border-b border-line py-5">
                    <span aria-hidden className="h-px w-6 shrink-0 bg-accent/50" />
                    <span className="display-4">{item}</span>
                  </li>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={220}>
              <p className="mt-8 text-[1.0625rem] leading-relaxed text-muted">
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

      {/* ── Mitmachen · Ansprache ─────────────────────────────────────────
          Espresso wie der Hero der Startseite – überall dort, wo „Mitglied
          werden" steht, sieht die Seite gleich aus. */}
      <Section band="espresso">
        <Container>
          <div className="max-w-3xl">
            <Reveal>
              <h2 className="display-2 text-cream">Klingt nach dir?</h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-6 max-w-2xl text-lg text-cream/80">
                Dann schreib uns. Kein Formular-Marathon – ein paar Zeilen
                reichen. Den Rest klären wir im Gespräch, und zwar in beide
                Richtungen: es muss auch für dich passen.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-10">
                <OutlineButton href="/kontakt" tone="light">
                  Mitglied werden
                </OutlineButton>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}
