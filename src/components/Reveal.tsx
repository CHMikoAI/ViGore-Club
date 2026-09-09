"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Versatz in Millisekunden – für gestaffelte Listen (0, 60, 120, …). */
  delay?: number;
  className?: string;
  /**
   * "fade"  – Inhalt steigt 14px auf und blendet ein (Standard).
   * "image" – Maske fährt auf, das Bild fährt den letzten Zoom zurück.
   */
  variant?: "fade" | "image";
};

/**
 * Blendet seinen Inhalt ein, sobald er ins Bild kommt – einmalig.
 *
 * Die eigentliche Bewegung steht in globals.css (.reveal / .reveal-image).
 * Hier wird nur der Zeitpunkt bestimmt. Wer Bewegung reduziert haben will,
 * bekommt den Inhalt sofort und ohne Animation.
 */
export default function Reveal({
  children,
  delay = 0,
  className = "",
  variant = "fade",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      // Erst auslösen, wenn das Element ein Stück im Bild ist – sonst ist die
      // Animation vorbei, bevor man hinschaut.
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const base = variant === "image" ? "reveal-image" : "reveal";

  return (
    <div
      ref={ref}
      className={`${base}${visible ? " is-visible" : ""} ${className}`}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </div>
  );
}
