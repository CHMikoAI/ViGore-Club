import type { ReactNode } from "react";
import ContactTabs from "@/components/ContactTabs";
import Reveal from "@/components/Reveal";
import { Container, Section, SectionHeader } from "@/components/ui";
import { site } from "@/content/site";

/**
 * Der Rahmen der Kontaktseite – für beide Anliegen derselbe:
 *
 *   /kontakt                  Club kontaktieren   (Kontaktformular)
 *   /kontakt/mitglied-werden  Mitglied werden     (Bewerbung)
 *
 * Kopf, Direktkontakt, die zwei Reiter und der Schluss stehen hier einmal;
 * die Seiten darunter liefern nur das Formular. Weil ein Layout beim Wechsel
 * zwischen seinen Seiten stehen bleibt, tauscht sich beim Klick auf einen
 * Reiter nur das Formular aus – nichts blendet neu ein, nichts springt.
 */
export default function ContactLayout({ children }: { children: ReactNode }) {
  return (
    <Section band="cream" className="!pt-16 md:!pt-24">
      <Container>
        <SectionHeader
          as="h1"
          label="Kontakt"
          heading="Schreib uns."
          lede="Ob du Mitglied werden willst, eine Frage zu einem Projekt hast oder wissen willst, was hier eigentlich läuft: melde dich."
        />

        {/* Direkter Draht und Standort als Reihe über dem Formular. Auf
            dieselbe Breite begrenzt wie das Formular darunter (max-w-3xl),
            damit die beiden Linien mit dessen Rahmen fluchten. */}
        <Reveal delay={220}>
          <div className="mx-auto mt-14 flex max-w-3xl flex-wrap justify-center gap-x-24 gap-y-8 border-y border-line py-10 text-center">
            <div>
              <p className="eyebrow">Direkt</p>
              <a
                href={`mailto:${site.email}`}
                className="link-quiet mt-2 inline-block text-[1.0625rem]"
              >
                {site.email}
              </a>
            </div>
            <div>
              <p className="eyebrow">Wo wir sind</p>
              <p className="mt-2 text-[1.0625rem] text-muted">{site.location}</p>
            </div>
          </div>
        </Reveal>

        {/* Reiter und Kasten. Der Kasten hat keinen oberen Rand – den
            bringen die Reiter mit, und der offene Reiter lässt ihn weg, damit
            er in den Kasten übergeht.

            Das Formular bleibt linksbündig gesetzt: Beschriftungen über
            Feldern liest man am Rand, nicht auf einer Achse. Nur die Spalte
            selbst sitzt mittig. */}
        <Reveal delay={280}>
          <div className="mx-auto mt-14 max-w-3xl">
            <ContactTabs />
            <div className="border border-t-0 border-line bg-surface p-6 text-left md:p-10">
              {children}
            </div>
          </div>
        </Reveal>

        <Reveal delay={340}>
          <p className="mx-auto mt-10 max-w-xl text-center text-sm leading-relaxed text-muted">
            Wir sind wenige und lesen alles selbst. Es kann ein paar Tage dauern
            – aber es kommt eine Antwort.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
