"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation, site } from "@/content/site";

/**
 * Der Header: Espresso-Balken, 80 Pixel hoch – wie auf der bisherigen Website.
 *
 * Das Logo steht links an derselben Kante wie jede Überschrift darunter. Damit
 * beginnt die senkrechte Linie, die durch die ganze Seite läuft, ganz oben.
 * Vorher stand es mittig; das war die letzte Stelle, die nicht mitmachte.
 *
 * Die Navigation sitzt rechts, das Menü auf dem Handy öffnet als Vollfläche
 * in derselben Farbe.
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

  return (
    <>
      <header className="band-espresso sticky top-0 z-50 w-full">
        {/* Gleiche Breite und gleiche Innenabstände wie <Container> – nur so
            landet das Logo exakt auf der Kante des Inhalts. */}
        <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-5 md:px-8">
          <Link
            href="/"
            aria-label={`${site.name} – zur Startseite`}
            className="shrink-0 transition-opacity duration-200 hover:opacity-80"
          >
            <Image
              src="/logo-vigore.png"
              alt={site.name}
              width={640}
              height={236}
              priority
              className="h-8 w-auto brightness-0 invert md:h-9"
            />
          </Link>

          <nav
            aria-label="Hauptnavigation"
            className="hidden items-center gap-9 lg:flex"
          >
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`link-underline text-[0.8125rem] uppercase tracking-[0.14em] transition-colors duration-200 ${
                  isActive(item.href)
                    ? "text-cream"
                    : "text-cream/60 hover:text-cream focus-visible:text-cream"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            // 44px Trefferfläche – kleiner wird auf dem Handy zum Glücksspiel.
            // Der negative Rand holt die optische Kante wieder nach aussen.
            className="-mr-2 flex h-11 w-11 items-center justify-center text-cream lg:hidden"
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
      </header>

      {/* Menü auf dem Handy – volle Fläche, gleiche Farbe wie der Header.
          px-5 wie der Container, damit auch hier alles auf der Kante sitzt. */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="band-espresso fixed inset-0 z-40 lg:hidden"
      >
        <nav
          aria-label="Hauptnavigation"
          className="flex h-full flex-col justify-center gap-2 px-5 pb-24"
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
            className="link-quiet mt-8 self-start text-sm text-brass"
          >
            {site.email}
          </a>
        </nav>
      </div>
    </>
  );
}
