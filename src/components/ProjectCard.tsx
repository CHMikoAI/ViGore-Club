import Link from "next/link";
import Figure from "./Figure";
import Reveal from "./Reveal";
import StatusChip from "./StatusChip";
import { formatDate, lastUpdatedAt, type Project } from "@/content/projects";

/**
 * Eine Projektkarte. Zeigt unten das Datum des letzten Updates – das ist das
 * Lebenszeichen der Seite, seit das Journal in den Projekten aufgegangen ist.
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

  return (
    <Reveal delay={delay} className="h-full">
      <Link
        href={`/projekte/${project.slug}`}
        className="card-lift group flex h-full flex-col border border-line bg-surface"
      >
        <div className="overflow-hidden">
          <div className="card-zoom">
            <Figure
              src={project.hero}
              alt={project.title}
              ratio="4/5"
              reveal={false}
              priority={priority}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        </div>

        <div className="flex flex-1 flex-col px-5 pb-6 pt-5">
          <StatusChip status={project.status} />
          <h3 className="display-4 mt-3">{project.title}</h3>
          <p className="mt-1 text-sm text-accent">{project.tagline}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            {project.summary}
          </p>

          {/* mt-auto schiebt die Fusszeile nach unten, damit die Karten im
              Raster trotz unterschiedlich langer Texte bündig abschliessen. */}
          <div className="mt-auto flex items-center justify-between gap-3 pt-5">
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
      </Link>
    </Reveal>
  );
}
