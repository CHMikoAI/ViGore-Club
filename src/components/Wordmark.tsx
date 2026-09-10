"use client";

import { useCallback, useEffect, useRef } from "react";

/**
 * Der grosse ViGORE-Schriftzug im Footer.
 *
 * Beim Überfahren mit der Maus werden die Buchstaben unter dem Zeiger dünner
 * und laufen zu den Rändern hin wieder ins volle Gewicht zurück – eine Welle,
 * die dem Zeiger folgt. Cormorant Garamond ist als variable Schrift geladen
 * (siehe src/lib/fonts.ts), deshalb wandert das Gewicht stufenlos statt in
 * Sprüngen.
 *
 * ── Warum jeder Buchstabe eine feste Breite bekommt ────────────────────────
 * Der Schriftzug soll exakt so breit sein wie der Inhalt darüber. Dünnere
 * Buchstaben sind aber schmaler – ohne Gegenmassnahme würde das Wort beim
 * Überfahren schrumpfen und die Passung wäre dahin. Deshalb misst die
 * Komponente einmal die natürliche Breite jedes Buchstabens im Grundgewicht
 * und friert sie ein. Die Glyphe wird darin nur noch dünner, ihr Platz bleibt.
 *
 * Weil die Schriftgrösse an der Containerbreite hängt, wird nach jeder
 * Grössenänderung neu gemessen.
 */

const BASE_WEIGHT = 700;
const MIN_WEIGHT = 300;

export default function Wordmark({ text = "ViGORE" }: { text?: string }) {
  const rootRef = useRef<HTMLParagraphElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  /** Natürliche Breite jedes Buchstabens messen und als feste Breite setzen. */
  const lockWidths = useCallback(() => {
    const root = rootRef.current;
    const letters = letterRefs.current.filter(Boolean) as HTMLSpanElement[];
    if (!root || !letters.length) return;

    // Erst freigeben, sonst misst man die zuvor gesetzte Breite nach.
    for (const el of letters) {
      el.style.width = "";
      el.style.fontWeight = String(BASE_WEIGHT);
    }

    const widths = letters.map((el) => el.getBoundingClientRect().width);
    letters.forEach((el, i) => {
      el.style.width = `${widths[i]}px`;
    });

    // Nachjustieren: die gemessene Breite eines Buchstabenfeldes enthält die
    // Laufweite, die zwischen den Feldern zusätzlich wirkt – in Summe stand
    // das Wort dadurch ein paar Pixel über. Die Differenz zur Sollbreite wird
    // gleichmässig auf alle Felder verteilt, das bleibt unsichtbar und macht
    // die Passung exakt.
    const target = root.getBoundingClientRect().width;
    const first = letters[0].getBoundingClientRect();
    const last = letters[letters.length - 1].getBoundingClientRect();
    const overshoot = last.right - first.left - target;

    if (Math.abs(overshoot) > 0.5) {
      const perLetter = overshoot / letters.length;
      letters.forEach((el, i) => {
        el.style.width = `${Math.max(0, widths[i] - perLetter)}px`;
      });
    }
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    lockWidths();

    // Die Schrift kommt asynchron; vorher gemessene Breiten wären die des
    // Ersatzschnitts.
    let cancelled = false;
    document.fonts?.ready.then(() => {
      if (!cancelled) lockWidths();
    });

    const observer = new ResizeObserver(() => lockWidths());
    observer.observe(root);

    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [lockWidths]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // Nur für Zeigegeräte, die wirklich schweben können – und nicht, wenn
    // reduzierte Bewegung gewünscht ist.
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!canHover.matches || reduced.matches) return;

    const reset = () => {
      for (const el of letterRefs.current) {
        if (el) el.style.fontWeight = String(BASE_WEIGHT);
      }
    };

    const onMove = (event: PointerEvent) => {
      const letters = letterRefs.current.filter(Boolean) as HTMLSpanElement[];
      if (!letters.length) return;

      const boxes = letters.map((el) => el.getBoundingClientRect());
      const average =
        boxes.reduce((sum, b) => sum + b.width, 0) / boxes.length;
      // Etwa drei Buchstaben reagieren gleichzeitig.
      const radius = average * 1.6;

      letters.forEach((el, i) => {
        const centre = boxes[i].left + boxes[i].width / 2;
        const distance = Math.abs(event.clientX - centre);
        // 1 direkt unter dem Zeiger, 0 ausserhalb des Radius.
        const nearness = Math.max(0, 1 - distance / radius);
        // Weiches Ein- und Ausblenden statt linearem Abfall.
        const eased = nearness * nearness * (3 - 2 * nearness);
        const weight = BASE_WEIGHT - (BASE_WEIGHT - MIN_WEIGHT) * eased;
        el.style.fontWeight = String(Math.round(weight));
      });
    };

    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerleave", reset);

    return () => {
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", reset);
      reset();
    };
  }, []);

  return (
    <p
      ref={rootRef}
      // Der Schriftzug wiederholt nur den Vereinsnamen, der im Header schon
      // steht – für Vorlesesoftware also überflüssig.
      aria-hidden
      className="wordmark select-none text-on-surface"
    >
      {text.split("").map((letter, i) => (
        <span
          key={`${letter}-${i}`}
          ref={(el) => {
            letterRefs.current[i] = el;
          }}
          className="wordmark-letter"
        >
          {letter}
        </span>
      ))}
    </p>
  );
}
