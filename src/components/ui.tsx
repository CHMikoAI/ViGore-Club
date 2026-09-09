import Link from "next/link";
import type { ReactNode } from "react";
import Reveal from "./Reveal";

/**
 * Die wiederkehrenden Bausteine des Layouts. Wer hier etwas ändert, ändert es
 * überall – das hält die Seite ruhig.
 */

/* ── Breite ────────────────────────────────────────────────────────────────
   Ein einziger Container für die ganze Seite. 1400px ist bewusst grosszügig:
   die Seite lebt von Bildern, nicht von einer engen Textspalte. */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1400px] px-5 md:px-8 ${className}`}>
      {children}
    </div>
  );
}

/* ── Abschnitt ─────────────────────────────────────────────────────────────
   `band` bestimmt die Fläche. "dark" kippt über .band-dark alle semantischen
   Farben, sodass der Inhalt sich ohne Sonderfälle anpasst. */
export function Section({
  children,
  band = "cream",
  className = "",
  id,
}: {
  children: ReactNode;
  band?: "cream" | "paper" | "dark" | "espresso";
  className?: string;
  id?: string;
}) {
  const bandClass =
    band === "dark"
      ? "band-dark"
      : band === "espresso"
        ? "band-espresso"
        : band === "paper"
          ? "band-paper"
          : "bg-cream";

  return (
    <section
      id={id}
      className={`${bandClass} py-20 md:py-28 lg:py-32 ${className}`}
    >
      {children}
    </section>
  );
}

/* ── Der Kopf eines Abschnitts ────────────────────────────────────────────
   DAS Layout-Gesetz dieser Seite. Jeder Abschnitt fängt gleich an:

       ────────────────────────────────────────────  Haarlinie, volle Breite
       02 — PROJEKTE                                 Marke
       Woran wir gerade sind                         Überschrift
       Vorspann, höchstens zwei Zeilen breit.        optional
       Weiterführender Link                          optional

   Alles linksbündig an derselben Kante, der Inhalt darunter über die volle
   Breite. Vorher gab es dafür fünf verschiedene Muster – mal eine schmale
   Label-Spalte links, mal ein Link rechts aussen, mal mittig. Das ist der
   Grund, warum die Seite unruhig wirkte.

   Zentriert ist nur noch zweierlei: der Hero und der Schlussabschnitt. Beide
   tragen denselben „Mitglied werden"-Knopf, und genau daran erkennt man sie.

   Die Haarlinie zeichnet sich beim Erscheinen selbst – dafür muss sie in
   einem <Reveal> stehen und darf NICHT selbst `is-visible` tragen. */
export function SectionHeader({
  number,
  label,
  heading,
  lede,
  action,
  as: Heading = "h2",
  className = "",
}: {
  number?: string;
  label: string;
  heading?: string;
  lede?: string;
  action?: ReactNode;
  /** Auf Unterseiten ist die Abschnittsüberschrift die Seitenüberschrift. */
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <div className={className}>
      <Reveal>
        <div className="hairline" />
      </Reveal>

      <Reveal delay={60}>
        <p className="eyebrow mt-6">
          {number ? `${number} — ` : ""}
          {label}
        </p>
      </Reveal>

      {heading ? (
        <Reveal delay={120}>
          <Heading className="display-2 mt-5 max-w-3xl">{heading}</Heading>
        </Reveal>
      ) : null}

      {lede ? (
        <Reveal delay={180}>
          <p className="lede mt-6 max-w-2xl">{lede}</p>
        </Reveal>
      ) : null}

      {action ? (
        <Reveal delay={240}>
          <div className="mt-8">{action}</div>
        </Reveal>
      ) : null}
    </div>
  );
}

/* ── Seitenkopf ────────────────────────────────────────────────────────────
   Derselbe Aufbau wie SectionHeader, nur mit <h1> und dem Abstand, den der
   Auftakt einer Unterseite braucht. */
export function PageHeader({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
}) {
  return (
    <header className="bg-cream pb-14 pt-16 md:pb-20 md:pt-24">
      <Container>
        <SectionHeader as="h1" label={eyebrow} heading={title} lede={lede} />
      </Container>
    </header>
  );
}

/* ── Knöpfe ────────────────────────────────────────────────────────────────
   Beide Varianten benutzen die semantischen Farben und funktionieren dadurch
   auf hellen wie auf dunklen Bändern, ohne dass man etwas mitgeben muss. */

function arrow() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

const BUTTON_BASE =
  "group inline-flex min-h-11 items-center gap-2.5 px-6 text-[0.8125rem] uppercase tracking-[0.14em] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]";

export function ButtonLink({
  href,
  children,
  variant = "primary",
  external = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  external?: boolean;
  className?: string;
}) {
  const style =
    variant === "primary"
      ? "bg-on-surface text-surface hover:-translate-y-0.5 hover:opacity-90"
      : "border border-line text-on-surface hover:-translate-y-0.5 hover:border-accent hover:text-accent";

  const content = (
    <>
      {children}
      {arrow()}
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        className={`${BUTTON_BASE} ${style} ${className}`}
        target="_blank"
        rel="noreferrer noopener"
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={`${BUTTON_BASE} ${style} ${className}`}>
      {content}
    </Link>
  );
}

/**
 * Der grosse umrandete Knopf der bisherigen Website: transparent mit Rand,
 * beim Hover füllt er sich und dreht die Farben um.
 *
 * `tone` sagt, worauf er steht – "light" auf dunklem Grund (Hero),
 * "dark" auf hellem Grund (Schlussabschnitt).
 */
export function OutlineButton({
  href,
  children,
  tone = "dark",
  className = "",
}: {
  href: string;
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  const style =
    tone === "light"
      ? "border-cream text-cream hover:bg-cream hover:text-espresso"
      : "border-espresso text-espresso hover:bg-espresso hover:text-cream";

  return (
    <Link
      href={href}
      className={`inline-flex h-16 items-center justify-center border px-10 text-lg font-semibold transition-colors duration-300 ${style} ${className}`}
    >
      {children}
    </Link>
  );
}

/** Ein Textlink mit Pfeil – für „weiterlesen"-Stellen ohne Knopfgewicht. */
export function ArrowLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      // min-h-11 gibt dem Textlink auf dem Handy eine Trefferfläche von 44px,
      // ohne ihn optisch schwerer zu machen.
      className={`group inline-flex min-h-11 items-center gap-2 text-[0.8125rem] uppercase tracking-[0.14em] text-accent transition-colors duration-200 ${className}`}
    >
      <span className="link-underline">{children}</span>
      {arrow()}
    </Link>
  );
}
