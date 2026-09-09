import type { Metadata } from "next";
import ProjectCard from "@/components/ProjectCard";
import { Container, PageHeader, Section } from "@/components/ui";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Projekte",
  description:
    "Woran der ViGORE Club gerade arbeitet: eine Trüffelplantage in " +
    "Graubünden, selbst gepresster Most, die Erdnuss-Challenge – und jede " +
    "Woche Padel.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Projekte"
        title="Was wir anpacken"
        lede="Echte Arbeit, echtes Ergebnis. Dass wir dabei zusammenwachsen, ist kein Nebeneffekt – es ist der ganze Punkt. Jedes Projekt führt unten sein eigenes Protokoll."
      />

      <Section band="cream" className="!pt-4">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, i) => (
              <ProjectCard
                key={project.slug}
                project={project}
                delay={i * 80}
                priority={i < 3}
              />
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
