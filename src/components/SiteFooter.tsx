import Link from "next/link";
import { InstagramIcon, LinkedinIcon } from "./icons";
import Wordmark from "./Wordmark";
import { legalLinks, site, socials } from "@/content/site";

/**
 * Der Footer der bisherigen Website: Kontakt und Rechtliches links, Social
 * und Copyright rechts – darunter der grosse ViGORE-Schriftzug.
 *
 * Bewusst NICHT mittig, obwohl der Rest der Seite auf der Achse sitzt: die
 * zwei Blöcke links und rechts geben dem Fuss eine Breite, die ein mittiger
 * Stapel nicht hat, und der Schriftzug darunter spannt ohnehin über alles.
 */

const ICONS = {
  instagram: InstagramIcon,
  linkedin: LinkedinIcon,
} as const;

export default function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-cream">
      <div className="mx-auto max-w-[1400px] px-5 pt-10 md:px-8">
        <div className="flex flex-wrap items-start justify-between gap-10 text-sm">
          <div className="space-y-6">
            <div className="space-y-1">
              <a
                href={`mailto:${site.email}`}
                className="link-quiet block text-brass"
              >
                {site.email}
              </a>
              <p className="text-muted">{site.location}</p>
            </div>

            <div className="space-y-2">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="link-quiet block font-medium"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="ml-auto flex flex-col items-end gap-6">
            <div className="flex items-center gap-3">
              {socials.map((social) => {
                const Icon = ICONS[social.name];

                // Solange kein Kanal hinterlegt ist, steht das Icon da, ist
                // aber kein Link – ein Link ins Leere ist schlimmer als keiner.
                if (!social.href) {
                  return (
                    <span
                      key={social.name}
                      role="img"
                      aria-label={`${social.label} – folgt`}
                      title={`${social.label} – folgt`}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-espresso/35 text-cream"
                    >
                      <Icon className="h-[1.15rem] w-[1.15rem]" aria-hidden />
                    </span>
                  );
                }

                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-espresso text-cream transition-colors duration-200 hover:bg-brass"
                  >
                    <Icon className="h-[1.15rem] w-[1.15rem]" aria-hidden />
                  </a>
                );
              })}
            </div>

            <p className="w-full text-right text-xs text-muted">
              © {new Date().getFullYear()} {site.name}. Alle Rechte vorbehalten.
            </p>
          </div>
        </div>
      </div>

      {/*
        Der Schriftzug sitzt in derselben Spalte wie der Inhalt darüber – er
        ist also genau so breit wie die Seite, nicht wie das Fenster, und
        schliesst links und rechts bündig mit dem Text ab.

        .wordmark-band misst dazu seine eigene Breite; .wordmark rechnet daraus
        die Schriftgrösse, die das Wort exakt füllen lässt (siehe globals.css).
        Er steht im normalen Fluss, bringt seine Höhe also selbst mit.
      */}
      <div className="mx-auto max-w-[1400px] px-5 pt-10 md:px-8">
        <div className="wordmark-band">
          <Wordmark />
        </div>
      </div>
    </footer>
  );
}
