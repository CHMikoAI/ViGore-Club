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
 * Die zentrierte Fassung. Alles sitzt auf der Mittelachse – Header, Hero,
 * jeder Abschnitt, jede Karte, der Footer.
 *
 * Damit das nicht bloss „zentrierter Text" ist, sondern ein Aufbau, hängen
 * drei Dinge daran:
 *
 *   1. Begrenztes Mass. Zentrierter Satz braucht schmale Spalten, sonst muss
 *      das Auge bei jeder Zeile den Anfang neu suchen. Fliesstext läuft
 *      deshalb nie breiter als max-w-2xl, Überschriften nie über max-w-3xl.
 *   2. Symmetrische Ornamente statt Kanten. Wo die linksbündige Fassung eine
 *      Haarlinie über die volle Breite zieht, stehen hier zwei kurze Linien
 *      links und rechts der Marke – dem Logo abgeschaut.
 *   3. Symmetrie bis in die Details: Raster mit ungerader Spaltenzahl,
 *      Karteninhalt mittig, Knöpfe mittig.
 *
 * Die Espresso-Regel bleibt: Espresso = Ansprache (Header, Hero, Schluss),
 * Creme/Papier/Tiefdunkel = Inhalt.
 */
export default function HomePage() {
  return (
    <>
      {/* ── Hero · Ansprache ──────────────────────────────────────────────── */}
      <section className="band-espresso flex min-h-[max(650px,90svh)] items-center">
        <Container className="py-24 text-center">
          <Reveal>
            <div className="ornament">
              <span aria-hidden className="ornament-rule ornament-rule--left" />
              <p className="eyebrow">Männerclub in Graubünden</p>
              <span aria-hidden className="ornament-rule ornament-rule--right" />
            </div>
          </Reveal>

          <Reveal delay={140}>
            <h1 className="display-hero mx-auto mt-8 max-w-4xl text-cream">
              Ein Kreis von Männern, die Verantwortung übernehmen.
            </h1>
          </Reveal>

          <Reveal delay={300}>
            <p className="mx-auto mt-7 max-w-2xl text-lg text-cream/80 md:text-xl">
              ViGORE Club ist eine exklusive Gemeinschaft für Stärke, Klarheit
              und persönliche Entwicklung.
            </p>
          </Reveal>

          <Reveal delay={440}>
            <div className="mt-11 flex justify-center">
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

          <Reveal delay={220}>
            <p className="mx-auto mt-5 max-w-2xl text-center text-[1.0625rem] leading-relaxed">
              Wir sind bewusst wenige. Wer dabei ist, bringt sich ein –
              Zuschauer hat jeder von uns genug im Leben.
            </p>
          </Reveal>

          <div className="mx-auto mt-16 grid max-w-5xl gap-12 sm:grid-cols-3 sm:gap-10">
            {approach.map((step, i) => (
              <Reveal key={step.title} delay={i * 90} className="text-center">
                <span className="font-display block text-[2.75rem] leading-none text-accent/35">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="display-4 mt-4">{step.title}</h3>
                <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-muted">
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

          <figure className="mt-8 text-center">
            <Reveal delay={120}>
              <blockquote className="display-2 mx-auto max-w-3xl text-balance">
                &laquo;{quote.text}&raquo;
              </blockquote>
            </Reveal>

            <Reveal delay={200}>
              <figcaption className="mt-9 text-[0.6875rem] uppercase tracking-[0.18em]">
                <span className="text-on-surface">{quote.author}</span>
                <span className="text-muted"> · {quote.role}</span>
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
          />

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {projects.map((project, i) => (
              <ProjectCard key={project.slug} project={project} delay={i * 80} />
            ))}
          </div>

          <Reveal delay={200}>
            <div className="mt-12 flex justify-center">
              <ArrowLink href="/projekte">Alle Projekte</ArrowLink>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ── Haltung · Inhalt ──────────────────────────────────────────────
          Drei Spalten, nicht zwei: eine ungerade Spaltenzahl hat selbst eine
          Mitte und passt damit zur Achse der ganzen Seite. */}
      <Section band="cream">
        <Container>
          <SectionHeader
            number="03"
            label="Haltung"
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

      {/* ── Mitmachen · Ansprache ─────────────────────────────────────────
          Gleiche Fläche und gleicher Knopf wie der Hero, nur ohne die volle
          Höhe. Der Übergang zum hellen Footer schliesst die Seite ab. */}
      <Section band="espresso">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <h2 className="display-2 text-cream">
                Bereit, Verantwortung zu übernehmen?
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-cream/80">
                Wenn du dich in unseren Werten wiedererkennst und bereit bist,
                dich aktiv einzubringen, freuen wir uns auf deine Bewerbung.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-11 flex justify-center">
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
