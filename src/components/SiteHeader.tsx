"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MemberIcon } from "./icons";
import { memberArea, navigation, site } from "@/content/site";

/**
 * Der Header: Espresso-Balken, 80 Pixel hoch – wie auf der bisherigen Website.
 *
 * Das Logo steht mittig. Links die Navigation, rechts – abgesetzt als Knopf –
 * die Tür zum Mitgliederbereich. Beide Seiten liegen auf flex-1, dadurch
 * bleibt das Logo exakt auf der Mittelachse, unabhängig davon, wie lang die
 * Beschriftungen sind.
 *
 * Auf dem Handy bleibt das Logo mittig; rechts stehen Mitglieder-Icon und
 * Menüknopf, links hält ein Platzhalter die Mitte. Im Menü selbst steht der
 * Mitgliederbereich noch einmal als Knopf – wer die Liste liest, soll ihn
 * nicht suchen müssen.
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

  const memberActive = isActive(memberArea.href);

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
          {/* Links: die Navigation */}
          <nav
            aria-label="Hauptnavigation"
            className="hidden flex-1 items-center gap-9 lg:flex"
          >
            {navigation.map((item) => navLink(item.href, item.label))}
          </nav>

          {/* Handy: Platzhalter, damit das Logo mittig bleibt. Beide Seiten
              teilen sich den Platz neben dem Logo gleich auf; auf sehr
              schmalen Geräten darf der Platzhalter schrumpfen, die Knöpfe
              rechts nicht. */}
          <div className="min-w-0 flex-1 lg:hidden" aria-hidden />

          <Link
            href="/"
            aria-label={`${site.name} – zur Startseite`}
            className="shrink-0 px-4 transition-opacity duration-200 hover:opacity-80 md:px-6"
          >
            {/* logo.png ist aus ViGORE_Logos.png (im selben Ordner) erzeugt:
                freigestellt und auf den Inhalt beschnitten. Die Quelldatei
                selbst hat einen deckend weissen Hintergrund und darf hier
                nicht direkt stehen – der Weiss-Filter machte daraus einen
                weissen Kasten. brightness-0 invert färbt den Schriftzug auf
                dem Espresso weiss. */}
            <Image
              src="/images/allgemein/logo.png"
              alt={site.name}
              width={1938}
              height={653}
              priority
              className="h-10 w-auto brightness-0 invert md:h-12"
            />
          </Link>

          {/* Rechts: die Tür zum Mitgliederbereich. Umrandet wie der grosse
              Knopf im Hero, nur in Header-Grösse; auf der Seite selbst ist
              er gefüllt – man sieht, dass man angekommen ist. */}
          <div className="hidden flex-1 justify-end lg:flex">
            <Link
              href={memberArea.href}
              aria-current={memberActive ? "page" : undefined}
              className={`inline-flex h-10 items-center gap-2.5 border px-4 text-[0.75rem] uppercase tracking-[0.14em] transition-colors duration-300 ${
                memberActive
                  ? "border-cream bg-cream text-espresso"
                  : "border-cream/40 text-cream hover:border-cream hover:bg-cream hover:text-espresso focus-visible:border-cream"
              }`}
            >
              <MemberIcon className="h-4 w-4" />
              {memberArea.label}
            </Link>
          </div>

          <div className="flex flex-1 justify-end lg:hidden">
            {/* Handy: das Icon allein, 44px Trefferfläche wie der Menüknopf */}
            <Link
              href={memberArea.href}
              aria-label={memberArea.label}
              aria-current={memberActive ? "page" : undefined}
              className={`flex h-11 w-11 items-center justify-center transition-colors duration-200 ${
                memberActive ? "text-accent" : "text-cream"
              }`}
            >
              <MemberIcon className="h-[1.375rem] w-[1.375rem]" />
            </Link>

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

      {/*
        Menü auf dem Handy. Bleibt im Dokument und wird über Sichtbarkeit
        ein- und ausgeblendet, damit der Übergang laufen kann; `inert`
        nimmt es im geschlossenen Zustand aus Tastatur und Vorlesesoftware.

        Der Aufbau folgt der übrigen Seite: Ornament, dann die Punkte mit
        ihren Nummern zwischen Haarlinien, unten der direkte Draht. Die
        Punkte steigen nacheinander auf.
      */}
      <div
        id="mobile-menu"
        inert={!open}
        className={`band-espresso fixed inset-0 z-40 transition-[opacity,visibility] duration-300 lg:hidden ${
          open ? "menu-open visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="flex h-full flex-col justify-center overflow-y-auto px-5 pb-16 pt-28 text-center">
          <div
            className={`ornament menu-stagger ${open ? "is-visible" : ""}`}
            style={{ transitionDelay: open ? "60ms" : "0ms" }}
          >
            <span aria-hidden className="ornament-rule ornament-rule--left" />
            <p className="eyebrow">Menü</p>
            <span aria-hidden className="ornament-rule ornament-rule--right" />
          </div>

          <nav aria-label="Hauptnavigation" className="mt-10">
            {navigation.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className="menu-link menu-stagger group border-b border-line py-5 first:border-t"
                style={{ transitionDelay: open ? `${140 + i * 70}ms` : "0ms" }}
              >
                <span aria-hidden className="ornament-rule ornament-rule--left" />
                <span
                  className={`display-3 transition-colors duration-200 ${
                    isActive(item.href)
                      ? "text-cream"
                      : "text-cream/70 group-hover:text-cream"
                  }`}
                >
                  {item.label}
                </span>
                <span aria-hidden className="ornament-rule ornament-rule--right" />
              </Link>
            ))}
          </nav>

          {/* Der Mitgliederbereich als Knopf unter der Liste – derselbe
              Umriss wie im Header, hier in voller Grösse. */}
          <div
            className="menu-stagger mt-10 flex justify-center"
            style={{ transitionDelay: open ? `${140 + navigation.length * 70}ms` : "0ms" }}
          >
            <Link
              href={memberArea.href}
              aria-current={memberActive ? "page" : undefined}
              className={`inline-flex h-12 items-center gap-3 border px-7 text-[0.8125rem] uppercase tracking-[0.14em] transition-colors duration-300 ${
                memberActive
                  ? "border-cream bg-cream text-espresso"
                  : "border-cream/40 text-cream active:bg-cream active:text-espresso"
              }`}
            >
              <MemberIcon className="h-[1.125rem] w-[1.125rem]" />
              {memberArea.label}
            </Link>
          </div>

          <div
            className="menu-stagger mt-12 space-y-1"
            style={{ transitionDelay: open ? `${220 + navigation.length * 70}ms` : "0ms" }}
          >
            <a
              href={`mailto:${site.email}`}
              className="link-quiet inline-block text-brass"
            >
              {site.email}
            </a>
            <p className="text-sm text-muted">{site.location}</p>
          </div>
        </div>
      </div>
    </>
  );
}
