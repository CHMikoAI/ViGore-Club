import Link from "next/link";
import { InstagramIcon, LinkedinIcon } from "./icons";
import { legalLinks, site, socials } from "@/content/site";

/**
 * Der Footer der zentrierten Fassung: alles auf der Mittelachse gestapelt –
 * Kontakt, Social, Rechtliches, Copyright – und darunter der grosse
 * ViGORE-Schriftzug.
 *
 * Der Schriftzug ist genau so breit wie der Inhalt: .wordmark-band misst als
 * Container seine eigene Breite, .wordmark rechnet daraus die Schriftgrösse
 * (siehe globals.css). Er steht im normalen Fluss und bringt seine Höhe selbst
 * mit – der Footer muss keinen Platz für ihn freihalten.
 */

const ICONS = {
  instagram: InstagramIcon,
  linkedin: LinkedinIcon,
} as const;

export default function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-cream">
      <div className="mx-auto max-w-[1400px] px-5 pt-14 text-center md:px-8">
        <div className="space-y-1">
          <a
            href={`mailto:${site.email}`}
            className="link-quiet inline-block text-brass"
          >
            {site.email}
          </a>
          <p className="text-sm text-muted">{site.location}</p>
        </div>

        <div className="mt-8 flex items-center justify-center gap-3">
          {socials.map((social) => {
            const Icon = ICONS[social.name];

            // Solange kein Kanal hinterlegt ist, steht das Icon da, ist aber
            // kein Link – ein Link ins Leere ist schlimmer als keiner.
            if (!social.href) {
              return (
                <span
                  key={social.name}
                  role="img"
                  aria-label={`${social.label} – folgt`}
                  title={`${social.label} – folgt`}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-espresso/35 text-cream"
                >
                  <Icon className="h-[1.15rem] w-[1.15rem]" />
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
                <Icon className="h-[1.15rem] w-[1.15rem]" />
              </a>
            );
          })}
        </div>

        <div className="mt-8 flex items-center justify-center gap-5 text-sm">
          {legalLinks.map((link) => (
            <Link key={link.href} href={link.href} className="link-quiet font-medium">
              {link.label}
            </Link>
          ))}
        </div>

        <p className="mt-6 text-xs text-muted">
          © {new Date().getFullYear()} {site.name}. Alle Rechte vorbehalten.
        </p>
      </div>

      <div className="mx-auto max-w-[1400px] px-5 pt-10 md:px-8">
        <div className="wordmark-band">
          <p
            className="wordmark pointer-events-none select-none text-on-surface"
            aria-hidden
          >
            ViGORE
          </p>
        </div>
      </div>
    </footer>
  );
}
