import type { Metadata } from "next";
import { Container, Section } from "@/components/ui";
import { site } from "@/content/site";

/**
 * ⚠ BITTE VOR DEM LIVEGANG GEGENLESEN
 *
 * Der Text stammt von der bisherigen Website. Zwei Abschnitte mussten
 * angepasst werden, weil sich die Technik ändert:
 *
 *   • Hosting: bisher Cloudflare, neu Vercel.
 *   • Formulare: bisher Google Forms, neu ein eigenes Formular auf dieser
 *     Seite. Der Abschnitt beschreibt jetzt den Versand per E-Mail (und
 *     Resend, sofern eingerichtet – siehe src/app/api/kontakt/route.ts).
 *   • Webanalyse: neu Vercel Web Analytics (Abschnitt 4). Ohne Cookies und
 *     ohne Profile – deshalb kein Cookie-Banner nötig.
 *
 * Wenn ihr am Ende doch woanders hostet oder auf Resend verzichtet, muss
 * dieser Text entsprechend angepasst werden.
 */

export const metadata: Metadata = {
  title: "Datenschutz",
  robots: { index: false },
};

export default function DatenschutzPage() {
  return (
    <Section band="cream" className="!pt-16 md:!pt-24">
      <Container>
        <div className="mx-auto max-w-2xl">
          <h1 className="display-2 text-center">Datenschutzbestimmungen</h1>

          <p className="lede mt-8 text-center">
            Der Schutz deiner Personendaten ist uns ein wichtiges Anliegen. In
            dieser Datenschutzerklärung informieren wir dich darüber, welche
            Personendaten wir auf dieser Website bearbeiten und zu welchem
            Zweck.
          </p>

          <div className="mt-12 space-y-10 text-[1.0625rem] leading-relaxed text-muted">
            <section>
              <h2 className="display-3 text-on-surface">
                1. Verantwortliche Stelle
              </h2>
              <p className="mt-4">
                Verantwortlich für die Bearbeitung von Personendaten ist:
              </p>
              <p className="mt-4">
                ViGORE Club
                <br />
                {site.location}
                <br />
                Schweiz
              </p>
              <p className="mt-4">
                E-Mail:{" "}
                <a href={`mailto:${site.email}`} className="link-quiet text-accent">
                  {site.email}
                </a>
              </p>
            </section>

            <section>
              <h2 className="display-3 text-on-surface">
                2. Bearbeitung von Personendaten
              </h2>
              <p className="mt-4">
                Wir bearbeiten Personendaten ausschliesslich im Rahmen der
                gesetzlichen Bestimmungen der Schweiz (insbesondere gemäss
                Bundesgesetz über den Datenschutz, DSG).
              </p>
              <p className="mt-4">
                Personendaten werden nur dann erhoben, wenn du uns diese
                freiwillig mitteilst oder wenn dies technisch notwendig ist, um
                die Website bereitzustellen.
              </p>
            </section>

            <section>
              <h2 className="display-3 text-on-surface">3. Hosting</h2>
              <p className="mt-4">
                Diese Website wird bei einem externen Hosting-Dienstleister
                betrieben:
              </p>
              <p className="mt-4">
                Vercel Inc.
                <br />
                USA
              </p>
              <p className="mt-4">
                Der Hosting-Dienstleister speichert technische Zugriffsdaten
                (z. B. IP-Adresse, Zeitpunkt des Zugriffs) in Server-Logfiles,
                soweit dies für den sicheren und stabilen Betrieb der Website
                erforderlich ist. Diese Daten werden ausschliesslich zu
                technischen Zwecken verarbeitet und nicht mit anderen
                Datenquellen zusammengeführt.
              </p>
            </section>

            <section>
              <h2 className="display-3 text-on-surface">4. Webanalyse</h2>
              <p className="mt-4">
                Um zu verstehen, wie diese Website genutzt wird, setzen wir
                Vercel Web Analytics ein, einen Dienst der Vercel Inc., USA.
                Erfasst werden Seitenaufrufe sowie technische Angaben wie
                Gerätetyp, Browser, Bildschirmgrösse und das Land, aus dem der
                Aufruf kommt.
              </p>
              <p className="mt-4">
                Dabei werden keine Cookies gesetzt und keine
                Nutzungsprofile über mehrere Websites hinweg erstellt. Die
                IP-Adresse wird nicht gespeichert; Besucher werden nur für die
                Dauer eines Tages über einen nicht rückführbaren Hashwert
                unterschieden. Die Auswertung dient ausschliesslich dazu, die
                Website zu verbessern.
              </p>
              <p className="mt-4">
                Weitere Informationen:{" "}
                <a
                  href="https://vercel.com/docs/analytics/privacy-policy"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="link-quiet text-accent"
                >
                  vercel.com/docs/analytics/privacy-policy
                </a>
              </p>
            </section>

            <section>
              <h2 className="display-3 text-on-surface">
                5. Kontakt-, Bestell- und Bewerbungsformular
              </h2>
              <p className="mt-4">
                Auf dieser Website kannst du uns über ein Formular eine
                Nachricht schicken. Die von dir eingegebenen Angaben (Name,
                E-Mail-Adresse und deine Nachricht) werden uns per E-Mail
                zugestellt und dort so lange aufbewahrt, wie es zur Bearbeitung
                deines Anliegens nötig ist.
              </p>
              <p className="mt-4">
                Wer sich um eine Mitgliedschaft bewirbt, gibt zusätzlich seinen
                Wohnort an, auf Wunsch eine Telefonnummer und wie er auf uns
                gekommen ist. Diese Angaben verwenden wir ausschliesslich, um
                die Bewerbung zu prüfen und uns bei dir zu melden. Kommt keine
                Mitgliedschaft zustande, löschen wir sie.
              </p>
              <p className="mt-4">
                Für den Versand dieser E-Mails setzen wir einen technischen
                Dienstleister ein. Die Angaben werden ausschliesslich zur
                Beantwortung deiner Anfrage verwendet und nicht für Werbung
                genutzt.
              </p>
            </section>

            <section>
              <h2 className="display-3 text-on-surface">
                6. Weitergabe von Daten
              </h2>
              <p className="mt-4">
                Wir geben Personendaten nicht an Dritte weiter, ausser wenn dies
                zur Nutzung der genannten Dienste erforderlich ist oder wir
                gesetzlich dazu verpflichtet sind. Eine Weitergabe zu Werbe-
                oder Marketingzwecken erfolgt nicht.
              </p>
            </section>

            <section>
              <h2 className="display-3 text-on-surface">7. Speicherdauer</h2>
              <p className="mt-4">
                Personendaten werden nur so lange gespeichert, wie dies für den
                jeweiligen Zweck erforderlich ist oder gesetzliche
                Aufbewahrungspflichten bestehen.
              </p>
            </section>

            <section>
              <h2 className="display-3 text-on-surface">8. Deine Rechte</h2>
              <p className="mt-4">
                Du hast im Rahmen des geltenden Datenschutzrechts insbesondere
                das Recht auf:
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex gap-3">
                  <span aria-hidden className="mt-3 h-px w-4 shrink-0 bg-accent/50" />
                  Auskunft über die bearbeiteten Personendaten
                </li>
                <li className="flex gap-3">
                  <span aria-hidden className="mt-3 h-px w-4 shrink-0 bg-accent/50" />
                  Berichtigung unrichtiger Daten
                </li>
                <li className="flex gap-3">
                  <span aria-hidden className="mt-3 h-px w-4 shrink-0 bg-accent/50" />
                  Löschung deiner Daten, soweit keine gesetzlichen Pflichten
                  entgegenstehen
                </li>
              </ul>
              <p className="mt-4">
                Anfragen kannst du jederzeit per E-Mail an{" "}
                <a href={`mailto:${site.email}`} className="link-quiet text-accent">
                  {site.email}
                </a>{" "}
                richten.
              </p>
            </section>

            <section>
              <h2 className="display-3 text-on-surface">9. Änderungen</h2>
              <p className="mt-4">
                Wir behalten uns vor, diese Datenschutzerklärung bei Bedarf
                anzupassen, insbesondere bei Änderungen der eingesetzten Dienste
                oder rechtlichen Vorgaben.
              </p>
            </section>
          </div>
        </div>
      </Container>
    </Section>
  );
}
