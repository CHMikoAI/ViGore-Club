import Link from "next/link";
import Figure from "./Figure";
import Reveal from "./Reveal";
import { Container, Section, SectionHeader } from "./ui";
import { formatDate, latestUpdate, photoOf } from "@/content/projects";

/**
 * „Aktuelles" – das neueste Update über alle Projekte hinweg, genau eines.
 * Steht auf der Startseite (zweiter Abschnitt) und auf der Projektübersicht,
 * deshalb hier einmal statt zweimal.
 *
 * Bewusst klein: ein schmales dunkles Band, darin eine Karte in Textbreite –
 * links ein kleines Vorschaubild, rechts Datum · Projekt, der Titel, zwei
 * Zeilen Text und „Weiterlesen". Eine Notiz, keine Bühne; die Bühne hat das
 * Update auf der Projektseite, wo es mit allen Bildern steht. Die ganze
 * Karte führt dorthin und verhält sich beim Überfahren wie die Projektkarten.
 *
 * Es gibt keine Abschnittsüberschrift: der Titel des Updates ist die
 * Überschrift, die Zeile darüber liefert den Zusammenhang.
 *
 * Solange es noch kein Update gibt, fällt der Abschnitt weg.
 */
export default function LatestUpdate({ number }: { number?: string }) {
  const item = latestUpdate();
  if (!item) return null;

  // Das erste Bild des Updates – notfalls aus dem ersten Teil –, sonst das
  // Kopfbild des Projekts.
  const first = item.images[0] ?? item.parts?.[0]?.images[0];
  const image = first ? photoOf(first).src : item.project.hero;

  return (
    <Section band="dark" className="!py-14 md:!py-16">
      <Container>
        <SectionHeader number={number} label="Aktuelles" />

        <Reveal delay={120} className="mt-8">
          <Link
            href={`/projekte/${item.project.slug}#verlauf`}
            className="card-lift group mx-auto flex max-w-3xl items-stretch border border-line bg-surface"
          >
            {/* Das Bild füllt die Höhe, die der Text vorgibt – bleibt also
                immer ein kleines, aufrechtes Fenster, egal wie das Foto
                aufgenommen wurde. */}
            <div className="relative w-28 shrink-0 overflow-hidden sm:w-44">
              <div className="card-zoom absolute inset-0">
                <Figure
                  src={image}
                  alt={`${item.title} – ${item.project.title}`}
                  ratio="fill"
                  reveal={false}
                  sizes="11rem"
                />
              </div>
            </div>

            <div className="flex min-w-0 flex-1 flex-col justify-center px-5 py-5 sm:px-8 sm:py-6">
              <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.6875rem] uppercase tracking-[0.16em]">
                <time dateTime={item.date} className="text-muted">
                  {formatDate(item.date)}
                </time>
                {/* Auf dem Handy bricht die Zeile um – dann stünde der Punkt
                    allein am Zeilenende. Dort fällt er weg. */}
                <span aria-hidden className="hidden text-line sm:inline">
                  ·
                </span>
                <span className="text-accent">{item.project.title}</span>
              </p>

              <h2 className="display-3 mt-2">{item.title}</h2>

              {/* Höchstens zwei Zeilen – der Rest steht beim Projekt. */}
              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
                {item.body[0]}
              </p>

              <span className="mt-4 inline-flex items-center gap-2 text-[0.6875rem] uppercase tracking-[0.16em] text-accent">
                <span className="link-underline">Weiterlesen</span>
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
            </div>
          </Link>
        </Reveal>
      </Container>
    </Section>
  );
}
