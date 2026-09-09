import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";
import {
  ArrowLink,
  Container,
  OutlineButton,
  Section,
  SectionHeader,
} from "@/components/ui";
import { approach, quote, values } from "@/content/club";
import { projects } from "@/content/projects";

/**
 * Die Startseite folgt zwei Regeln, an denen sich alles ausrichtet:
 *
 *   Espresso + „Mitglied werden"  →  Ansprache.
 *   Genau zweimal: hier oben und ganz unten. Zusammen mit dem Header (auch
 *   Espresso) bilden sie die Klammer um die Seite.
 *
 *   Hell oder Tiefdunkel + Haarlinie/Marke  →  Inhalt.
 *   Alles dazwischen, immer über <SectionHeader>.
 *
 * Ausgerichtet ist ALLES linksbündig an derselben Kante – vom Hero bis zum
 * Schriftzug im Footer. Die Bedeutung trägt allein die Fläche, nicht zusätzlich
 * die Ausrichtung. Einzig der Header bleibt mittig, wie ein Zeitungstitelkopf.
 *
 * Die Bänder wechseln sich ab, damit nie zwei dunkle Flächen aneinander-
 * stossen: Espresso → Creme → Tiefdunkel → Papier → Creme → Espresso.
 */
export default function HomePage() {
  return (
    <>
      {/* ── Hero · Ansprache ──────────────────────────────────────────────
          Linksbündig an derselben Kante wie jeder Inhaltsabschnitt darunter.
          Nur der Header darüber bleibt mittig – wie der Titelkopf einer
          Zeitung über linksbündig gesetzten Spalten. */}
      <section className="band-espresso flex min-h-[max(650px,90svh)] items-center">
        <Container className="py-24">
          <Reveal>
            <p className="eyebrow">Männerclub in Graubünden</p>
          </Reveal>

          <Reveal delay={120}>
            <h1 className="display-hero mt-6 max-w-4xl text-cream">
              Ein Kreis von Männern, die Verantwortung übernehmen.
            </h1>
          </Reveal>

          <Reveal delay={280}>
            <p className="mt-7 max-w-2xl text-lg text-cream/80 md:text-xl">
              ViGORE Club ist eine exklusive Gemeinschaft für Stärke, Klarheit
              und persönliche Entwicklung.
            </p>
          </Reveal>

          <Reveal delay={420}>
            <div className="mt-10">
              <OutlineButton href="/kontakt" tone="light">
                Mitglied werden
              </OutlineButton>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── Der Club · Inhalt ─────────────────────────────────────────────── */}
      <Section band="cream">
        <Container>
          <SectionHeader
            number="01"
            label="Der Club"
            heading="Männer reden anders, wenn sie nebeneinander arbeiten."
            lede="Deshalb reden wir nicht über Zusammenhalt. Wir setzen eine Trüffelplantage, pressen Most, nehmen uns das Nächste vor. Was dabei zwischen uns entsteht, lässt sich schlecht planen und noch schlechter erklären – es hält trotzdem."
          />

          <Reveal delay={240}>
            <p className="mt-5 max-w-2xl text-[1.0625rem] leading-relaxed">
              Wir sind bewusst wenige. Wer dabei ist, bringt sich ein –
              Zuschauer hat jeder von uns genug im Leben.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-10 sm:grid-cols-3">
            {approach.map((step, i) => (
              <Reveal key={step.title} delay={i * 90}>
                <div className="hairline mb-5" />
                <span className="font-display text-[2.75rem] leading-none text-accent/35">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="display-4 mt-4">{step.title}</h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
                  {step.body}
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Leitsatz · Inhalt ─────────────────────────────────────────────
          Steht bewusst hier und nicht am Schluss: dort stiess das dunkle Band
          direkt auf den Espresso des Abschlusses und die beiden verschmolzen
          zu einer schweren Masse. */}
      <Section band="dark">
        <Container>
          <SectionHeader label="Leitsatz" />

          <figure className="mt-5">
            <Reveal delay={120}>
              <blockquote className="display-2 max-w-4xl">
                &laquo;{quote.text}&raquo;
              </blockquote>
            </Reveal>

            <Reveal delay={180}>
              <figcaption className="mt-8 flex items-center gap-4">
                <span aria-hidden className="h-px w-12 shrink-0 bg-accent/50" />
                <span className="text-[0.6875rem] uppercase tracking-[0.18em]">
                  <span className="text-on-surface">{quote.author}</span>
                  <span className="text-muted"> · {quote.role}</span>
                </span>
              </figcaption>
            </Reveal>
          </figure>
        </Container>
      </Section>

      {/* ── Projekte · Inhalt ─────────────────────────────────────────────── */}
      <Section band="paper">
        <Container>
          <SectionHeader
            number="02"
            label="Projekte"
            heading="Woran wir gerade sind"
            lede="Jedes Projekt führt sein eigenes Protokoll. Was zuletzt passiert ist, steht direkt dort – mit Bildern und ohne Hochglanz."
            action={<ArrowLink href="/projekte">Alle Projekte</ArrowLink>}
          />

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {projects.map((project, i) => (
              <ProjectCard key={project.slug} project={project} delay={i * 80} />
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Haltung · Inhalt ──────────────────────────────────────────────── */}
      <Section band="cream">
        <Container>
          <SectionHeader
            number="03"
            label="Haltung"
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

      {/* ── Mitmachen · Ansprache ─────────────────────────────────────────
          Gleiche Fläche, gleiche Ausrichtung, gleicher Knopf wie der Hero –
          nur ohne die volle Höhe. Der Übergang zum hellen Footer schliesst
          die Seite ab, statt sie auslaufen zu lassen. */}
      <Section band="espresso">
        <Container>
          <div className="max-w-3xl">
            <Reveal>
              <h2 className="display-2 text-cream">
                Bereit, Verantwortung zu übernehmen?
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-6 max-w-2xl text-lg text-cream/80">
                Wenn du dich in unseren Werten wiedererkennst und bereit bist,
                dich aktiv einzubringen, freuen wir uns auf deine Bewerbung.
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
