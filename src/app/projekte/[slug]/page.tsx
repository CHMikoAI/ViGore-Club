import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Figure from "@/components/Figure";
import InquiryForm from "@/components/InquiryForm";
import Reveal from "@/components/Reveal";
import StatusChip from "@/components/StatusChip";
import { ArrowLink, Container, Section, SectionHeader } from "@/components/ui";
import {
  formatDate,
  getProject,
  projects,
  sortedUpdates,
} from "@/content/projects";

type Params = { params: Promise<{ slug: string }> };

/** Alle Projektseiten werden beim Build fest erzeugt. */
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return { title: project.title, description: project.summary };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const updates = sortedUpdates(project);

  return (
    <>
      <header className="bg-cream pb-12 pt-16 md:pt-24">
        <Container>
          <Reveal>
            <ArrowLink href="/projekte">Alle Projekte</ArrowLink>
          </Reveal>

          {/* Gleicher Rhythmus wie SectionHeader: Haarlinie, Marke,
              Überschrift. Die Statusmarke steht hier an der Stelle, an der
              sonst „01 — Projekte" steht. */}
          <Reveal>
            <div className="hairline mt-8" />
          </Reveal>

          <Reveal delay={60}>
            <div className="mt-6">
              <StatusChip status={project.status} />
            </div>
          </Reveal>

          <Reveal delay={120}>
            <h1 className="display-2 mt-5 max-w-3xl">{project.title}</h1>
          </Reveal>

          <Reveal delay={180}>
            <p className="mt-3 text-lg text-accent">{project.tagline}</p>
          </Reveal>

          {project.intro ? (
            <Reveal delay={240}>
              <p className="lede mt-8 max-w-2xl">{project.intro}</p>
            </Reveal>
          ) : null}
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
      </Container>

      {/* ── Text und Fakten ─────────────────────────────────────────────── */}
      <Section band="cream">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,17rem)] lg:gap-20">
            <div className="max-w-2xl">
              {project.sections.map((section, i) => (
                <div key={section.heading} className={i > 0 ? "mt-14" : ""}>
                  <Reveal>
                    <div className="hairline mb-5" />
                    <h2 className="display-3">{section.heading}</h2>
                  </Reveal>
                  <div className="prose-club mt-5 text-[1.0625rem] leading-relaxed">
                    {section.body.map((paragraph, j) => (
                      <Reveal key={j} delay={j * 60}>
                        <p>{paragraph}</p>
                      </Reveal>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {project.facts.length > 0 ? (
              <aside className="lg:pt-2">
                <Reveal>
                  <div className="hairline mb-5" />
                  <p className="eyebrow">Auf einen Blick</p>
                  <dl className="mt-6 space-y-4">
                    {project.facts.map((fact) => (
                      <div
                        key={fact.label}
                        className="border-b border-line pb-4 last:border-0"
                      >
                        <dt className="text-[0.6875rem] uppercase tracking-[0.16em] text-muted">
                          {fact.label}
                        </dt>
                        <dd className="mt-1 text-[15px]">{fact.value}</dd>
                      </div>
                    ))}
                  </dl>
                </Reveal>
              </aside>
            ) : null}
          </div>
        </Container>
      </Section>

      {/* ── Galerie ─────────────────────────────────────────────────────── */}
      {project.gallery.length > 0 ? (
        <Section band="paper" className="!py-16 md:!py-20">
          <Container>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {project.gallery.map((image, i) => (
                <Figure
                  key={image}
                  src={image}
                  alt={`${project.title} – Bild ${i + 1}`}
                  ratio="4/5"
                  delay={i * 90}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      {/* ── Vormerkung ──────────────────────────────────────────────────
          Nur beim Most: kein Shop, nur eine Adresse für die Nachricht,
          sobald es so weit ist. */}
      {project.slug === "most" ? (
        <Section band="dark">
          <Container>
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
              <SectionHeader
                label="Vormerken"
                heading="Sag Bescheid, wenn du welchen willst."
                lede="Wir melden uns, sobald der Most bereitsteht – mit Preis und allem, was du wissen musst. Unverbindlich, keine Vorauszahlung, kein Newsletter."
              />

              <Reveal delay={100}>
                <InquiryForm topic="most" />
              </Reveal>
            </div>
          </Container>
        </Section>
      ) : null}

      {/* ── Was seither passiert ist ─────────────────────────────────────
          Das frühere Journal, jetzt beim Projekt. Neueste zuerst, mit einer
          durchgehenden Linie links als Zeitstrahl. */}
      {updates.length > 0 ? (
        <Section band="cream">
          <Container>
            <SectionHeader label="Was seither passiert ist" />

            <div className="mt-12 max-w-3xl">
              {updates.map((update, i) => (
                <article
                  key={`${update.date}-${update.title}`}
                  className="relative border-l border-line pb-12 pl-8 last:pb-0 md:pl-12"
                >
                  {/* Der Punkt sitzt auf der Linie: halbe Punktbreite nach links. */}
                  <span
                    aria-hidden
                    className="absolute left-0 top-2 h-2 w-2 -translate-x-1/2 rounded-full bg-accent"
                  />

                  <Reveal delay={i * 60}>
                    <time
                      dateTime={update.date}
                      className="text-[0.6875rem] uppercase tracking-[0.16em] text-muted"
                    >
                      {formatDate(update.date)}
                    </time>
                    <h3 className="display-3 mt-2">{update.title}</h3>
                    <div className="prose-club mt-4 text-[1.0625rem] leading-relaxed">
                      {update.body.map((paragraph, j) => (
                        <p key={j}>{paragraph}</p>
                      ))}
                    </div>
                  </Reveal>

                  {update.images.length > 0 ? (
                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      {update.images.map((image, j) => (
                        <Figure
                          key={image}
                          src={image}
                          alt={`${update.title} – Bild ${j + 1}`}
                          ratio="4/3"
                          delay={j * 80}
                          sizes="(max-width: 640px) 100vw, 50vw"
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
    </>
  );
}
