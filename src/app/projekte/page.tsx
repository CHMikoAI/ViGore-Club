import type { Metadata } from "next";
import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import ProjectsCta from "@/components/ProjectsCta";
import Reveal from "@/components/Reveal";
import ValueGrid from "@/components/ValueGrid";
import { ArrowLink, Container, Section, SectionHeader } from "@/components/ui";
import {
  criteria,
  formatDate,
  latestUpdates,
  projects,
} from "@/content/projects";

export const metadata: Metadata = {
  title: "Projekte",
  description:
    "Woran der ViGORE Club gerade arbeitet: eine Trüffelplantage in " +
    "Graubünden, selbst gepresster Most und bald die Erdnuss-Challenge. " +
    "Plus: was ein Projekt bei uns erfüllen muss.",
};

/**
 * Die Projektübersicht – der Ort, an dem man sieht, was der Club tut.
 *
 *   Kopf          Titel und Vorspann
 *   01 Wieso      Warum wir überhaupt Projekte machen
 *   02 Aktuelles  Die neuesten Updates über alle Projekte hinweg
 *   03 Projekte   Alle Vorhaben als Karten
 *   04 Kriterien  Woran wir neue Ideen messen
 *   Schluss       Dabei sein – oder selbst etwas anstossen
 *
 * Bänder: Creme, Papier, Tiefdunkel, Creme, Papier, Espresso.
 */
export default function ProjectsPage() {
  const news = latestUpdates(3);

  return (
    <>
      {/* ── Kopf ─────────────────────────────────────────────────────────── */}
      <header className="bg-cream pb-14 pt-16 md:pb-20 md:pt-24">
        <Container>
          <SectionHeader
            as="h1"
            label="Projekte"
            heading="Was wir anpacken"
            lede="Echte Arbeit, echtes Ergebnis. Dass wir dabei zusammenwachsen, ist kein Nebeneffekt – es ist der ganze Punkt."
          />
        </Container>
      </header>

      {/* ── Wieso Projekte ───────────────────────────────────────────────── */}
      <Section band="paper">
        <Container>
          <SectionHeader
            number="01"
            label="Wieso Projekte"
            heading="Reden schafft kein Vertrauen. Arbeiten schon."
            lede="Man kann sich vornehmen, offener miteinander zu sein – es passiert trotzdem nicht am Tisch. Es passiert, wenn man nebeneinander steht, die Hände beschäftigt sind und keiner eine Rolle spielen muss."
          />

          <div className="prose-club mx-auto mt-10 max-w-2xl text-center text-[1.0625rem] leading-relaxed">
            <Reveal>
              <p>
                Deshalb gibt es bei uns Projekte. Nicht als Beschäftigung,
                sondern als Anlass: eine Trüffelplantage, die Jahre braucht.
                Ein Most, den man mit den Händen presst. Etwas, das ohne uns
                nicht entstehen würde.
              </p>
            </Reveal>
            <Reveal delay={70}>
              <p>
                Das Ergebnis ist schön. Der eigentliche Ertrag ist das, was
                dabei zwischen uns passiert – und das lässt sich weder planen
                noch beschliessen. Nur erarbeiten.
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ── Aktuelles ────────────────────────────────────────────────────
          Die neuesten Updates aus allen Projekten. Solange es wenige sind,
          sind es eben wenige – ehrlicher als Füllmaterial. */}
      <Section band="dark">
        <Container>
          <SectionHeader
            number="02"
            label="Aktuelles"
            heading="Was zuletzt passiert ist"
          />

          <div className="mx-auto mt-14 max-w-2xl">
            {news.map((item, i) => (
              <Reveal key={`${item.project.slug}-${item.date}`} delay={i * 80}>
                <article className="border-b border-line py-8 text-center last:border-0">
                  <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[0.6875rem] uppercase tracking-[0.16em]">
                    <time dateTime={item.date} className="text-muted">
                      {formatDate(item.date)}
                    </time>
                    <span aria-hidden className="text-line">
                      ·
                    </span>
                    <Link
                      href={`/projekte/${item.project.slug}`}
                      className="link-quiet text-accent"
                    >
                      {item.project.title}
                    </Link>
                  </div>

                  <h3 className="display-4 mt-3">{item.title}</h3>
                  <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-muted">
                    {item.body[0]}
                  </p>

                  <div className="mt-5 flex justify-center">
                    <ArrowLink href={`/projekte/${item.project.slug}#verlauf`}>
                      Weiterlesen
                    </ArrowLink>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Alle Projekte ────────────────────────────────────────────────── */}
      <Section band="cream">
        <Container>
          <SectionHeader
            number="03"
            label="Alle Projekte"
            heading="Woran wir gerade sind"
            lede="Jedes Projekt führt sein eigenes Protokoll. Was zuletzt passiert ist, steht direkt dort – mit Bildern und ohne Hochglanz."
          />

          <div className="mx-auto mt-14 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, i) => (
              <ProjectCard
                key={project.slug}
                project={project}
                delay={i * 80}
                priority={i < 2}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Kriterien ────────────────────────────────────────────────────
          Dasselbe Raster wie die Werte – die Kriterien sind im Grunde die
          Werte, angewandt auf die Frage, ob eine Idee ein Projekt wird. */}
      <Section band="paper">
        <Container>
          <SectionHeader
            number="04"
            label="Kriterien"
            heading="Woran wir neue Ideen messen"
            lede="Nicht jede Idee wird ein Projekt. Damit eine durchkommt, muss sie zu dem passen, worauf wir uns verlassen – und zu dem, was uns Freude macht."
          />

          <ValueGrid values={criteria} />
        </Container>
      </Section>

      <ProjectsCta />
    </>
  );
}
