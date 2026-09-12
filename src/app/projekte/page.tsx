import type { Metadata } from "next";
import LatestUpdate from "@/components/LatestUpdate";
import ProjectCard from "@/components/ProjectCard";
import ProjectsCta from "@/components/ProjectsCta";
import ValueGrid from "@/components/ValueGrid";
import {
  Container,
  PageHeader,
  Section,
  SectionHeader,
} from "@/components/ui";
import { criteria, projects } from "@/content/projects";

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
 *   Kopf          Kurz, warum gemeinsame Projekte unsere Identität sind –
 *                 mehr Erklärung braucht es hier nicht, die Projekte selbst
 *                 erklären es besser
 *   01 Aktuelles  Das neueste Update über alle Projekte hinweg (LatestUpdate,
 *                 wortgleich mit der Startseite)
 *   02 Projekte   Alle Vorhaben als Karten
 *   03 Kriterien  Woran wir neue Ideen messen
 *   Schluss       Dabei sein – oder selbst etwas anstossen
 *
 * Bänder: Creme, Tiefdunkel, Creme, Papier, Espresso.
 */
export default function ProjectsPage() {
  return (
    <>
      {/* ── Kopf ─────────────────────────────────────────────────────────── */}
      <PageHeader
        eyebrow="Projekte"
        title="Gemeinsame Projekte sind unsere Identität."
        lede="Weil Vertrauen nicht am Tisch entsteht, sondern beim Arbeiten: wenn man nebeneinander steht, die Hände beschäftigt sind und keiner eine Rolle spielen muss. Das Ergebnis ist schön. Der eigentliche Ertrag ist das, was dabei zwischen uns passiert."
      />

      {/* ── Aktuelles ────────────────────────────────────────────────── */}
      <LatestUpdate number="01" />

      {/* ── Alle Projekte ────────────────────────────────────────────────── */}
      <Section band="cream">
        <Container>
          <SectionHeader
            number="02"
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
            number="03"
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
