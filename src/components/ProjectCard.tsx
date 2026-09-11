import Link from "next/link";
import Figure from "./Figure";
import Reveal from "./Reveal";
import StatusChip from "./StatusChip";
import {
  formatDate,
  hasPage,
  lastUpdatedAt,
  type Project,
} from "@/content/projects";

/**
 * Eine Projektkarte, Inhalt auf der Mittelachse wie alles andere. Unten das
 * Datum des letzten Updates – das Lebenszeichen der Seite, seit das Journal
 * in den Projekten aufgegangen ist.
 *
 * Projekte ohne eigene Seite (Status "coming-soon") sind auf den ersten Blick
 * als „noch nicht" erkennbar: das Bild ist entsättigt und aufgehellt, mitten
 * darauf steht das Ornament „Coming soon", der Rahmen ist gestrichelt wie bei
 * den Bildplatzhaltern. Die Karte ist kein Link und hebt sich beim Überfahren
 * nicht.
 */
export default function ProjectCard({
  project,
  delay = 0,
  priority = false,
}: {
  project: Project;
  delay?: number;
  priority?: boolean;
}) {
  const updated = lastUpdatedAt(project);
  const linked = hasPage(project);
  const shell = linked
    ? "card-lift group flex h-full flex-col border border-line bg-surface"
    : "flex h-full flex-col border border-dashed border-line bg-surface";

  const inner = (
    <>
        <div className="relative overflow-hidden">
          <div className={linked ? "card-zoom" : "grayscale"}>
            <Figure
              src={project.hero}
              alt={project.title}
              ratio="4/5"
              reveal={false}
              priority={priority}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>

          {/* Der Schleier über dem Bild nimmt ihm die Farbe und die Gegenwart;
              das Ornament darauf sagt, warum. */}
          {!linked ? (
            <div className="absolute inset-0 flex items-center justify-center bg-cream/60">
              <div className="ornament">
                <span aria-hidden className="ornament-rule ornament-rule--left" />
                <span className="eyebrow text-espresso">Coming soon</span>
                <span aria-hidden className="ornament-rule ornament-rule--right" />
              </div>
            </div>
          ) : null}
        </div>

        <div className="flex flex-1 flex-col items-center px-5 pb-6 pt-5 text-center">
          <StatusChip status={project.status} />
          <h3 className="display-4 mt-3">{project.title}</h3>
          <p className="mt-1 text-sm text-accent">{project.tagline}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            {project.summary}
          </p>

          {/* mt-auto schiebt die Fusszeile nach unten, damit die Karten im
              Raster trotz unterschiedlich langer Texte bündig abschliessen. */}
          <div className="mt-auto flex flex-col items-center gap-2 pt-6">
            {linked ? (
            <span className="inline-flex items-center gap-2 text-[0.6875rem] uppercase tracking-[0.16em] text-accent">
              Ansehen
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
                className="h-3.5 w-3.5 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
            ) : (
              <span aria-hidden />
            )}

            {updated ? (
              <time
                dateTime={updated}
                className="text-[0.6875rem] uppercase tracking-[0.12em] text-muted"
              >
                {formatDate(updated)}
              </time>
            ) : null}
          </div>
        </div>
    </>
  );

  return (
    <Reveal delay={delay} className="h-full">
      {linked ? (
        <Link href={`/projekte/${project.slug}`} className={shell}>
          {inner}
        </Link>
      ) : (
        <div className={shell}>{inner}</div>
      )}
    </Reveal>
  );
}
