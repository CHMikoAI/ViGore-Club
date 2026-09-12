"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Die zwei Reiter über dem Formular auf der Kontaktseite: Mitglied werden
 * oder den Club kontaktieren.
 *
 * Es sind Links, keine Schalter. Jedes Anliegen hat eine eigene Adresse, die
 * man verlinken und teilen kann – „Mitglied werden" auf der Startseite führt
 * so direkt auf die Bewerbung. Welcher Reiter gerade offen ist, ergibt sich
 * aus der Adresse.
 *
 * Der offene Reiter hat keinen unteren Rand und läuft in den Kasten darunter
 * hinein; der geschlossene steht auf Papier und wirkt dadurch dahinter.
 * `scroll={false}`: beim Wechsel bleibt die Seite, wo sie ist – es tauscht
 * sich nur das Formular aus.
 */

const TABS = [
  { href: "/kontakt/mitglied-werden", label: "Mitglied werden" },
  { href: "/kontakt", label: "Club kontaktieren" },
] as const;

export default function ContactTabs() {
  const pathname = usePathname();

  return (
    <nav aria-label="Anliegen" className="grid grid-cols-2">
      {TABS.map((tab, i) => {
        const active = pathname === tab.href;

        return (
          <Link
            key={tab.href}
            href={tab.href}
            scroll={false}
            aria-current={active ? "page" : undefined}
            className={`flex min-h-12 items-center justify-center border border-line px-2 py-3 text-center text-[0.625rem] uppercase leading-tight tracking-[0.14em] transition-colors duration-200 sm:px-3 sm:text-[0.6875rem] ${
              i > 0 ? "border-l-0" : ""
            } ${
              active
                ? "border-b-transparent bg-surface font-medium text-on-surface"
                : "bg-paper text-muted hover:text-on-surface"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
