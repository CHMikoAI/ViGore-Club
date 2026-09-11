import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Figure from "@/components/Figure";
import InquiryForm from "@/components/InquiryForm";
import ProjectsCta from "@/components/ProjectsCta";
import Reveal from "@/components/Reveal";
import StatusChip from "@/components/StatusChip";
import { ArrowLink, Container, Section, SectionHeader } from "@/components/ui";
import {
  formatDate,
  getProject,
  hasPage,
  projects,
  sortedUpdates,
} from "@/content/projects";

type Params = { params: Promise<{ slug: string }> };

/** Alle Projektseiten werden beim Build fest erzeugt – Teaser ausgenommen. */
export function generateStaticParams() {
  return projects.filter(hasPage).map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project || !hasPage(project)) return {};

  return { title: project.title, description: project.summary };
}

/**
 * Eine Projektseite. Auf allen Projekten gleich aufgebaut:
 *
 *   Kopf          Status, Titel, ein Satz
 *   Bild          Das Kopfbild
 *   Fakten        Eine Reihe – nur, was der Kopf nicht schon sagt
 *   Worum es geht Zwei Absätze. Was und warum, keine Ereignisse.
 *   [Vormerken]   Nur beim Most
 *   Verlauf       Was passiert ist, datiert, neueste zuerst – mit den Fotos
 *   Schluss       Wortgleich mit der Projektübersicht
 *
 * Der feste Teil ist kurz, der Verlauf wächst. Weil jedes Ereignis nur dort
 * steht und jedes Foto zu einem Ereignis gehört, wiederholt sich nichts.
 */
export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project || !hasPage(project)) notFound();

  const updates = sortedUpdates(project);

  return (
    <>
      {/* ── Kopf ─────────────────────────────────────────────────────────── */}
      <header className="bg-cream pb-12 pt-16 text-center md:pt-24">
        <Container>
          <Reveal>
            <div className="flex justify-center">
              <ArrowLink href="/projekte">Alle Projekte</ArrowLink>
            </div>
          </Reveal>

          {/* Die Statusmarke sitzt zwischen den Ornamentlinien – an derselben
              Stelle, an der sonst die Abschnittsmarke steht. */}
          <Reveal delay={80}>
            <div className="ornament mt-8">
              <span aria-hidden className="ornament-rule ornament-rule--left" />
              <StatusChip status={project.status} />
              <span aria-hidden className="ornament-rule ornament-rule--right" />
            </div>
          </Reveal>

          <Reveal delay={140}>
            <h1 className="display-2 mx-auto mt-6 max-w-3xl">{project.title}</h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="lede mx-auto mt-6 max-w-2xl">{project.intro}</p>
          </Reveal>
        </Container>
      </header>

      <Container>
        <Figure
          src={project.hero}
          alt={project.title}
          ratio="21/9"
          priority
          sizes="(max-width: 1400px) 100vw, 1400px"
        />

        {project.facts.length > 0 ? (
          <Reveal>
            <dl className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-x-14 gap-y-6 text-center">
              {project.facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="text-[0.6875rem] uppercase tracking-[0.16em] text-muted">
                    {fact.label}
                  </dt>
                  <dd className="mt-1 text-[15px]">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        ) : null}
      </Container>

      {/* ── Worum es geht ────────────────────────────────────────────────── */}
      <Section band="paper">
        <Container>
          <SectionHeader label="Worum es geht" />

          <div className="prose-club mx-auto mt-10 max-w-2xl text-center text-[1.0625rem] leading-relaxed">
            {project.about.map((paragraph, i) => (
              <Reveal key={i} delay={i * 70}>
                <p>{paragraph}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Vormerken · nur beim Most ────────────────────────────────────
          Kein Shop, nur eine Adresse für die Nachricht, sobald es so weit
          ist. Sitzt vor dem Verlauf, damit das dunkle Band nicht direkt auf
          den Espresso des Schlusses stösst. */}
      {project.slug === "most" ? (
        <Section band="dark">
          <Container>
            <SectionHeader
              label="Vormerken"
              heading="Sag Bescheid, wenn du welchen willst."
              lede="Wir melden uns, sobald der Most bereitsteht – mit Preis und allem, was du wissen musst. Unverbindlich, keine Vorauszahlung, kein Newsletter."
            />

            {/* Das Formular bleibt linksbündig: Beschriftungen über Feldern
                liest man am Rand, nicht auf einer Achse. */}
            <Reveal delay={200}>
              <div className="mx-auto mt-12 max-w-xl text-left">
                <InquiryForm topic="most" />
              </div>
            </Reveal>
          </Container>
        </Section>
      ) : null}

      {/* ── Verlauf ──────────────────────────────────────────────────────
          Das Lebendige der Seite. Neueste zuerst; Fotos stehen beim Eintrag,
          zu dem sie gehören. */}
      {updates.length > 0 ? (
        <Section band="cream" id="verlauf">
          <Container>
            <SectionHeader label="Verlauf" />

            <div className="mx-auto mt-14 max-w-3xl">
              {updates.map((update, i) => (
                <article
                  key={`${update.date}-${update.title}`}
                  className={i > 0 ? "mt-16 border-t border-line pt-16" : ""}
                >
                  <Reveal delay={i * 60}>
                    <div className="text-center">
                      <time
                        dateTime={update.date}
                        className="text-[0.6875rem] uppercase tracking-[0.16em] text-muted"
                      >
                        {formatDate(update.date)}
                      </time>
                      <h2 className="display-3 mt-2">{update.title}</h2>
                    </div>
                    <div className="prose-club mx-auto mt-6 max-w-2xl text-[1.0625rem] leading-relaxed">
                      {update.body.map((paragraph, j) => (
                        <p key={j}>{paragraph}</p>
                      ))}
                    </div>
                  </Reveal>

                  {update.images.length > 0 ? (
                    <div
                      className={`mt-8 grid gap-4 ${
                        update.images.length === 1
                          ? "mx-auto max-w-xl"
                          : update.images.length === 2
                            ? "sm:grid-cols-2"
                            : "sm:grid-cols-2 md:grid-cols-3"
                      }`}
                    >
                      {update.images.map((image, j) => (
                        <Figure
                          key={image}
                          src={image}
                          alt={`${update.title} – Bild ${j + 1}`}
                          ratio={update.images.length === 1 ? "4/3" : "4/5"}
                          delay={j * 70}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ))}
                    </div>
                  ) : null}
                </article>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <ProjectsCta />
    </>
  );
}
