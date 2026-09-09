import type { Metadata } from "next";
import { Container, Section } from "@/components/ui";
import { site } from "@/content/site";

/**
 * Übernommen von der bisherigen Website, inhaltlich unverändert.
 * Bitte vor dem Livegang trotzdem kurz gegenlesen.
 */

export const metadata: Metadata = {
  title: "Impressum",
  robots: { index: false },
};

export default function ImpressumPage() {
  return (
    <Section band="cream" className="!pt-16 md:!pt-24">
      <Container>
        <div className="max-w-2xl">
          <h1 className="display-2">Impressum</h1>

          <div className="mt-12 space-y-10 text-[1.0625rem] leading-relaxed">
            <div>
              <p className="font-medium">ViGORE Club</p>
              <p className="text-muted">Verein im Sinne von Art. 60 ff. ZGB</p>
              <p className="mt-4 text-muted">
                {site.location}
                <br />
                Schweiz
              </p>
              <p className="mt-4">
                <span className="text-muted">E-Mail: </span>
                <a href={`mailto:${site.email}`} className="link-quiet text-accent">
                  {site.email}
                </a>
              </p>
              <p className="mt-4 text-muted">
                Vertretungsberechtigt:
                <br />
                Vorstand des Vereins ViGORE Club
              </p>
            </div>

            <section>
              <h2 className="display-3">Haftungsausschluss</h2>
              <p className="mt-4 text-muted">
                Der Verein ViGORE Club übernimmt keine Gewähr für die
                Richtigkeit, Vollständigkeit und Aktualität der Inhalte dieser
                Website. Haftungsansprüche gegen den Verein wegen materieller
                oder immaterieller Schäden, welche aus dem Zugriff oder der
                Nutzung bzw. Nichtnutzung der veröffentlichten Informationen
                entstanden sind, werden – soweit gesetzlich zulässig –
                ausgeschlossen.
              </p>
            </section>

            <section>
              <h2 className="display-3">Urheberrechte</h2>
              <p className="mt-4 text-muted">
                Die Inhalte und Werke auf dieser Website unterliegen dem
                schweizerischen Urheberrecht. Beiträge Dritter sind als solche
                gekennzeichnet. Die Vervielfältigung, Bearbeitung, Verbreitung
                oder jede Art der Verwertung ausserhalb der Grenzen des
                Urheberrechts bedarf der vorherigen schriftlichen Zustimmung des
                Vereins ViGORE Club.
              </p>
            </section>

            <section>
              <h2 className="display-3">Datenschutz</h2>
              <p className="mt-4 text-muted">
                Informationen zur Bearbeitung von Personendaten finden sich in
                der Datenschutzerklärung dieser Website.
              </p>
            </section>
          </div>
        </div>
      </Container>
    </Section>
  );
}
