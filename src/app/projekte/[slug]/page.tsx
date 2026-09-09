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
      <header className="bg-cream pb-12 pt-16 text-center md:pt-24">
        <Container>
          <Reveal>
            <div className="flex justify-center">
              <ArrowLink href="/projekte">Alle Projekte</ArrowLink>
            </div>
          </Reveal>

          {/* Die Statusmarke steht zwischen den Ornamentlinien – an derselben
              Stelle, an der sonst die Abschnittsmarke sitzt. */}
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
            <p className="mt-3 text-lg text-accent">{project.tagline}</p>
          </Reveal>

          {project.intro ? (
            <Reveal delay={260}>
              <p className="lede mx-auto mt-8 max-w-2xl">{project.intro}</p>
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

      {/* ── Fakten ──────────────────────────────────────────────────────────
          In der zentrierten Fassung keine Randspalte, sondern eine mittige
          Reihe unter dem Kopfbild – eine Spalte am Rand hätte die Achse
          gebrochen. */}
      {project.facts.length > 0 ? (
        <Container>
          <Reveal>
            <dl className="mx-auto mt-14 flex max-w-4xl flex-wrap justify-center gap-x-14 gap-y-8 border-y border-line py-8 text-center">
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
        </Container>
      ) : null}

      {/* ── Text ────────────────────────────────────────────────────────────
          Überschriften auf der Achse, Fliesstext linksbündig in schmaler
          Spalte – zentrierte Absätze wären über mehrere Zeilen unlesbar. */}
      <Section band="cream">
        <Container>
          <div className="mx-auto max-w-2xl">
            {project.sections.map((section, i) => (
              <div key={section.heading} className={i > 0 ? "mt-16" : ""}>
                <Reveal>
                  <h2 className="display-3 text-center">{section.heading}</h2>
                </Reveal>
                <div className="prose-club mt-6 text-[1.0625rem] leading-relaxed">
                  {section.body.map((paragraph, j) => (
                    <Reveal key={j} delay={j * 60}>
                      <p>{paragraph}</p>
                    </Reveal>
                  ))}
                </div>
              </div>
            ))}
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
            <SectionHeader
              label="Vormerken"
              heading="Sag Bescheid, wenn du welchen willst."
              lede="Wir melden uns, sobald der Most bereitsteht – mit Preis und allem, was du wissen musst. Unverbindlich, keine Vorauszahlung, kein Newsletter."
            />

            {/* Das Formular selbst bleibt linksbündig: Beschriftungen über
                Feldern liest man am Rand, nicht auf einer Achse. */}
            <Reveal delay={200}>
              <div className="mx-auto mt-12 max-w-xl text-left">
                <InquiryForm topic="most" />
              </div>
            </Reveal>
          </Container>
        </Section>
      ) : null}

      {/* ── Was seither passiert ist ─────────────────────────────────────
          Das frühere Journal, jetzt beim Projekt. Neueste zuerst. Statt des
          Zeitstrahls am linken Rand trennt hier eine Linie auf der Achse. */}
      {updates.length > 0 ? (
        <Section band="cream">
          <Container>
            <SectionHeader label="Was seither passiert ist" />

            <div className="mx-auto mt-14 max-w-2xl">
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
                      <h3 className="display-3 mt-2">{update.title}</h3>
                    </div>
                    <div className="prose-club mt-6 text-[1.0625rem] leading-relaxed">
                      {update.body.map((paragraph, j) => (
                        <p key={j}>{paragraph}</p>
                      ))}
                    </div>
                  </Reveal>

                  {update.images.length > 0 ? (
                    <div className="mt-8 grid gap-4 sm:grid-cols-2">
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
