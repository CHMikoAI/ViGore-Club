"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation, site } from "@/content/site";

/**
 * Der Header: Espresso-Balken, 80 Pixel hoch – wie auf der bisherigen Website.
 *
 * Das Logo steht mittig, die Navigation legt sich symmetrisch darum: zwei
 * Punkte links, einer rechts. Beide Gruppen liegen auf flex-1, dadurch bleibt
 * das Logo exakt auf der Mittelachse – unabhängig davon, wie lang die
 * Beschriftungen sind.
 *
 * Auf dem Handy bleibt das Logo mittig, rechts steht der Menüknopf; links
 * hält ein gleich breiter Platzhalter die Mitte.
 */
export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Beim Seitenwechsel schliesst sich das Menü von selbst.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Bei offenem Menü scrollt die Seite dahinter nicht mit, und Escape schliesst.
  useEffect(() => {
    if (!open) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  const left = navigation.slice(0, 2);
  const right = navigation.slice(2);

  const navLink = (href: string, label: string) => (
    <Link
      key={href}
      href={href}
      aria-current={isActive(href) ? "page" : undefined}
      className={`link-underline text-[0.8125rem] uppercase tracking-[0.14em] transition-colors duration-200 ${
        isActive(href)
          ? "text-cream"
          : "text-cream/60 hover:text-cream focus-visible:text-cream"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <>
      <header className="band-espresso sticky top-0 z-50 w-full">
        {/* Gleiche Breite und Innenabstände wie <Container>, damit die
            Navigation aussen bündig mit dem Inhalt abschliesst. */}
        <div className="mx-auto flex h-20 max-w-[1400px] items-center px-5 md:px-8">
          {/* Links: die ersten Navigationspunkte */}
          <nav
            aria-label="Hauptnavigation"
            className="hidden flex-1 items-center gap-9 lg:flex"
          >
            {left.map((item) => navLink(item.href, item.label))}
          </nav>

          {/* Handy: Platzhalter in Knopfbreite, damit das Logo mittig bleibt */}
          <div className="w-11 flex-1 lg:hidden" aria-hidden />

          <Link
            href="/"
            aria-label={`${site.name} – zur Startseite`}
            className="shrink-0 px-6 transition-opacity duration-200 hover:opacity-80"
          >
            {/* Das Original aus ViGORE_Logos.png, freigestellt und auf den
                Inhalt beschnitten – dadurch steht der Schriftzug ohne den
                Weissrand der Quelldatei und wirkt bei gleicher Höhe grösser.
                brightness-0 invert färbt ihn auf dem Espresso weiss. */}
            <Image
              src="/logo-vigore.png"
              alt={site.name}
              width={1938}
              height={653}
              priority
              className="h-10 w-auto brightness-0 invert md:h-12"
            />
          </Link>

          {/* Rechts: die übrigen Navigationspunkte */}
          <nav
            aria-label="Hauptnavigation"
            className="hidden flex-1 items-center justify-end gap-9 lg:flex"
          >
            {right.map((item) => navLink(item.href, item.label))}
          </nav>

          <div className="flex flex-1 justify-end lg:hidden">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              // 44px Trefferfläche – kleiner wird auf dem Handy zum Glücksspiel.
              className="-mr-2 flex h-11 w-11 items-center justify-center text-cream"
            >
              <span className="sr-only">
                {open ? "Menü schliessen" : "Menü öffnen"}
              </span>
              <span aria-hidden className="relative block h-4 w-6">
                <span
                  className={`absolute left-0 block h-px w-6 bg-current transition-all duration-300 ${
                    open ? "top-2 rotate-45" : "top-0.5"
                  }`}
                />
                <span
                  className={`absolute left-0 top-2 block h-px w-6 bg-current transition-opacity duration-200 ${
                    open ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 block h-px w-6 bg-current transition-all duration-300 ${
                    open ? "top-2 -rotate-45" : "top-[0.875rem]"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Menü auf dem Handy – volle Fläche, gleiche Farbe wie der Header,
          Inhalt auf der Mittelachse wie überall sonst. */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="band-espresso fixed inset-0 z-40 lg:hidden"
      >
        <nav
          aria-label="Hauptnavigation"
          className="flex h-full flex-col items-center justify-center gap-2 px-5 pb-24 text-center"
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`display-3 py-2 transition-colors duration-200 ${
                isActive(item.href) ? "text-cream" : "text-cream/65"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <a
            href={`mailto:${site.email}`}
            className="link-quiet mt-8 text-sm text-brass"
          >
            {site.email}
          </a>
        </nav>
      </div>
    </>
  );
}
