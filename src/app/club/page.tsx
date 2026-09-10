import type { Metadata } from "next";
import Figure from "@/components/Figure";
import Reveal from "@/components/Reveal";
import ValueGrid from "@/components/ValueGrid";
import {
  Container,
  OutlineButton,
  Section,
  SectionHeader,
} from "@/components/ui";
import {
  facts,
  founders,
  notThis,
  notThisNote,
  rhythm,
  values,
} from "@/content/club";

export const metadata: Metadata = {
  title: "Der Club",
  description:
    "Warum es den ViGORE Club gibt, wer dahintersteht und was bei uns fest " +
    "im Kalender steht. Ein Männerclub in Graubünden.",
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

          <div className="prose-club mx-auto mt-10 max-w-2xl text-center text-[1.0625rem] leading-relaxed">
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

          {/* Die harten Zahlen direkt hinter der Erzählung – erst warum,
              dann wie klein und wie jung das Ganze tatsächlich ist. */}
          <Reveal delay={220}>
            <dl className="mx-auto mt-16 flex max-w-3xl flex-wrap justify-center gap-x-24 gap-y-10 border-y border-line py-10 text-center">
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
            number="02"
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
            number="03"
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
            number="04"
            label="Werte"
            heading="Worauf wir uns verlassen"
          />

          <ValueGrid values={values} />
        </Container>
      </Section>

      {/* ── Abgrenzung ───────────────────────────────────────────────────── */}
      <Section band="paper">
        <Container>
          <SectionHeader
            number="05"
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

            <div className="prose-club mx-auto mt-12 text-center text-[1.0625rem] leading-relaxed text-muted">
              {notThisNote.map((paragraph, i) => (
                <Reveal key={i} delay={i * 80}>
                  <p>{paragraph}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* ── Sei dabei · Ansprache ────────────────────────────────────────
          Wortgleich mit dem Schluss der Startseite: wo „Mitglied werden"
          steht, soll überall dasselbe stehen. */}
      <Section band="espresso">
        <Container>
          <SectionHeader
            label="Sei dabei!"
            heading="Bereit, Verantwortung zu übernehmen?"
            lede="Wenn du dich in unseren Werten wiedererkennst und bereit bist, dich einzubringen, dann melde dich bei uns."
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
