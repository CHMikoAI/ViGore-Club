import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Figure from "@/components/Figure";
import Gallery, { type GalleryPhoto } from "@/components/Gallery";
import InquiryForm from "@/components/InquiryForm";
import ProjectsCta from "@/components/ProjectsCta";
import Reveal from "@/components/Reveal";
import StatusChip from "@/components/StatusChip";
import { ArrowLink, Container, Section, SectionHeader } from "@/components/ui";
import {
  formatDate,
  getProject,
  hasPage,
  photoOf,
  projects,
  sortedUpdates,
  type Photo,
} from "@/content/projects";
import { imageExists } from "@/lib/images";

/**
 * Macht aus den Bildern eines Updates das, was die Galerie braucht – samt
 * der Frage, ob die Datei schon da ist. Die kann nur der Server beantworten.
 */
function galleryPhotos(images: Photo[], context: string): GalleryPhoto[] {
  return images.map((image, i) => {
    const { src, caption } = photoOf(image);
    return {
      src,
      caption,
      alt: caption ?? `${context} – Bild ${i + 1}`,
      exists: imageExists(src),
    };
  });
}

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
 *   Worum es geht Zwei Absätze. Was und warum, keine Ereignisse. Darunter
 *                 die Fakten als Reihe – nur, was der Text nicht schon sagt.
 *   [Bestellen]   Nur beim Most
 *   Verlauf       Was passiert ist, datiert, neueste zuerst – mit den Fotos,
 *                 beschriftet und auf Klick gross; ein Tag kann in Teile
 *                 gegliedert sein (Vormittag, Nachmittag)
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
      {/* ── Kopf ─────────────────────────────────────────────────────────
          Knapper als die anderen Seitenköpfe: der Rückweg „Alle Projekte"
          steht schon über der Marke, da darf oben nicht noch viel Luft sein. */}
      <header className="bg-cream pb-12 pt-8 text-center md:pt-12">
        <Container>
          <Reveal>
            <div className="flex justify-center">
              <ArrowLink href="/projekte">Alle Projekte</ArrowLink>
            </div>
          </Reveal>

          {/* Die Statusmarke sitzt zwischen den Ornamentlinien – an derselben
              Stelle, an der sonst die Abschnittsmarke steht. */}
          <Reveal delay={80}>
            <div className="ornament mt-4">
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
      </Container>

      {/* ── Worum es geht ────────────────────────────────────────────────
          Die Absätze, darunter die Fakten als Reihe – das Wesentliche auf
          einen Blick, nachdem man es gelesen hat. */}
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

          {/* Die Randnotiz – das Detail, das man am Stammtisch erzählt. Ein
              eigener Kasten, damit sie neben der Erklärung nicht untergeht. */}
          {project.aside ? (
            <Reveal delay={140}>
              <aside className="mx-auto mt-10 max-w-2xl border border-line bg-surface px-6 py-7 text-center md:px-9">
                <p className="eyebrow">{project.aside.label}</p>
                <p className="mt-3 text-[1.0625rem] leading-relaxed">
                  {project.aside.text}
                </p>
              </aside>
            </Reveal>
          ) : null}

          {project.facts.length > 0 ? (
            <Reveal delay={160}>
              <dl className="mx-auto mt-12 flex max-w-3xl flex-wrap justify-center gap-x-16 gap-y-8 border-t border-line pt-10 text-center">
                {project.facts.map((fact) => (
                  <div key={fact.label}>
                    <dt className="eyebrow">{fact.label}</dt>
                    <dd className="display-4 mt-2">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          ) : null}
        </Container>
      </Section>

      {/* ── Bestellen · nur, wenn das Projekt etwas zu bestellen hat ─────
          Kein Shop: eine Bestellung ist eine Nachricht mit Anzahl und
          Adresse, den Rest klären wir persönlich. Gebinde, Preis und
          Lieferung stehen als Reihe über dem Formular. Sitzt vor dem
          Verlauf, damit das dunkle Band nicht direkt auf den Espresso des
          Schlusses stösst. */}
      {project.order ? (
        <Section band="dark" id="bestellen">
          <Container>
            <SectionHeader
              label="Bestellen"
              heading={`${project.title} bestellen`}
              lede={project.order.lede}
            />

            <Reveal delay={160}>
              <dl className="mx-auto mt-12 flex max-w-3xl flex-wrap justify-center gap-x-16 gap-y-8 border-y border-line py-8 text-center">
                {project.order.facts.map((fact) => (
                  <div key={fact.label} className="max-w-[16rem]">
                    <dt className="eyebrow">{fact.label}</dt>
                    <dd className="display-4 mt-2">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            {/* Das Formular bleibt linksbündig: Beschriftungen über Feldern
                liest man am Rand, nicht auf einer Achse. */}
            <Reveal delay={240}>
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
                    {update.body.length > 0 ? (
                      <div className="prose-club mx-auto mt-6 max-w-2xl text-[1.0625rem] leading-relaxed">
                        {update.body.map((paragraph, j) => (
                          <p key={j}>{paragraph}</p>
                        ))}
                      </div>
                    ) : null}
                  </Reveal>

                  {update.images.length > 0 ? (
                    <div className="mt-8">
                      <Gallery photos={galleryPhotos(update.images, update.title)} />
                    </div>
                  ) : null}

                  {/* Ein Tag in Teilen. Jeder Teil hat seine eigene kurze
                      Messinglinie als Marke, dann Titel, Absätze und die
                      Bilder, die zu genau diesem Teil gehören. */}
                  {update.parts?.map((part) => (
                    <section key={part.title} className="mt-12">
                      <Reveal>
                        <div className="value-item text-center">
                          <span
                            aria-hidden
                            className="ornament-rule ornament-rule--center mx-auto block"
                          />
                          <h3 className="display-4 mt-5">{part.title}</h3>
                        </div>
                        <div className="prose-club mx-auto mt-5 max-w-2xl text-[1.0625rem] leading-relaxed">
                          {part.body.map((paragraph, j) => (
                            <p key={j}>{paragraph}</p>
                          ))}
                        </div>
                      </Reveal>

                      {part.images.length > 0 ? (
                        <div className="mt-8">
                          <Gallery
                            photos={galleryPhotos(part.images, part.title)}
                          />
                        </div>
                      ) : null}
                    </section>
                  ))}
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
