"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import FigureView, { type Ratio } from "./FigureView";
import Reveal from "./Reveal";

/**
 * Die Bilder eines Updates: beschriftet, und auf Klick gross.
 *
 * Jedes Bild ist ein Knopf. Der öffnet ein <dialog> mit dem Bild in voller
 * Grösse, der Unterschrift und – bei mehreren – Pfeilen nach links und
 * rechts. Escape und ein Klick neben das Bild schliessen wieder; die
 * Pfeiltasten blättern. Der Browser kümmert sich um den Rest: <dialog>
 * hält den Fokus im Fenster und gibt ihn danach zurück.
 *
 * Bilder, die noch fehlen, zeigen den Platzhalter und lassen sich nicht
 * öffnen – ob eine Datei da ist, weiss nur der Server; er gibt es als
 * `exists` mit.
 *
 * Aufteilung: ein Bild allein steht quer in einer schmalen Spalte, zwei
 * nebeneinander, ab drei zu dritt. Die Reihen sind mittig gesetzt – bleiben
 * in der letzten ein oder zwei Bilder übrig, stehen sie auf der Achse statt
 * links, wie alles auf dieser Seite.
 */

export type GalleryPhoto = {
  src: string;
  alt: string;
  caption?: string;
  exists: boolean;
};

/**
 * Liegt der Klick auf dem sichtbaren Bild? Das <img> füllt den ganzen Kasten
 * (`fill`), das eingepasste Foto aber nur einen Teil davon – links und rechts
 * oder oben und unten bleibt Rand. Ein Klick in diesen Rand soll schliessen,
 * ein Klick aufs Foto nicht.
 */
function isOnPicture(
  img: HTMLImageElement,
  event: { clientX: number; clientY: number },
): boolean {
  const { naturalWidth, naturalHeight } = img;
  if (!naturalWidth || !naturalHeight) return true;

  const box = img.getBoundingClientRect();
  const scale = Math.min(box.width / naturalWidth, box.height / naturalHeight);
  const width = naturalWidth * scale;
  const height = naturalHeight * scale;
  const left = box.left + (box.width - width) / 2;
  const top = box.top + (box.height - height) / 2;

  return (
    event.clientX >= left &&
    event.clientX <= left + width &&
    event.clientY >= top &&
    event.clientY <= top + height
  );
}

export default function Gallery({ photos }: { photos: GalleryPhoto[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [current, setCurrent] = useState<number | null>(null);

  const count = photos.length;
  const ratio: Ratio = count === 1 ? "4/3" : "4/5";
  // Ein Flex-Umbruch statt eines Rasters: so lässt sich die letzte Reihe
  // mittig setzen. Die Breiten ziehen den Zwischenraum (1rem) anteilig ab.
  const layout =
    count === 1
      ? "mx-auto max-w-xl"
      : "flex flex-wrap justify-center gap-4";
  const item =
    count === 1
      ? ""
      : count === 2
        ? "w-full sm:w-[calc(50%-0.5rem)]"
        : "w-full sm:w-[calc(50%-0.5rem)] md:w-[calc(33.333%-0.667rem)]";

  const open = (index: number) => setCurrent(index);
  const close = useCallback(() => dialogRef.current?.close(), []);
  const step = useCallback(
    (delta: number) =>
      setCurrent((i) => (i === null ? i : (i + delta + count) % count)),
    [count],
  );

  // Öffnen und Schliessen laufen über das <dialog> selbst; `current` folgt.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (current !== null && !dialog.open) dialog.showModal();
    if (current === null && dialog.open) dialog.close();
  }, [current]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const onClose = () => setCurrent(null);
    dialog.addEventListener("close", onClose);
    return () => dialog.removeEventListener("close", onClose);
  }, []);

  // Bei offenem Fenster scrollt die Seite dahinter nicht mit; die Pfeiltasten
  // blättern. Escape schliesst der Browser von selbst – wir tun es zur
  // Sicherheit auch, doppelt schliessen ist harmlos.
  useEffect(() => {
    if (current === null) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [current, step, close]);

  const shown = current === null ? null : photos[current];

  return (
    <>
      <div className={layout}>
        {photos.map((photo, i) => (
          <Reveal key={photo.src} variant="image" delay={i * 70} className={item}>
            <figure>
              {photo.exists ? (
                <button
                  type="button"
                  onClick={() => open(i)}
                  aria-label={`Bild vergrössern${photo.caption ? `: ${photo.caption}` : ""}`}
                  className="group block w-full cursor-zoom-in overflow-hidden"
                >
                  <div className="card-zoom">
                    <FigureView
                      src={photo.src}
                      alt={photo.alt}
                      exists
                      ratio={ratio}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                </button>
              ) : (
                <FigureView
                  src={photo.src}
                  alt={photo.alt}
                  exists={false}
                  ratio={ratio}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              )}

              {photo.caption ? (
                <figcaption className="mt-2.5 text-center text-[0.8125rem] leading-snug text-muted">
                  {photo.caption}
                </figcaption>
              ) : null}
            </figure>
          </Reveal>
        ))}
      </div>

      {/* Die Vergrösserung. Ein Klick neben das Bild schliesst – alles, was
          nicht das Bild, seine Unterschrift oder ein Knopf ist, gilt als
          Hintergrund. Die Knöpfe behandeln ihre Klicks selbst. */}
      <dialog
        ref={dialogRef}
        onClick={(e) => {
          const target = e.target as HTMLElement;
          if (target.closest("button, .lightbox-caption")) return;
          if (target instanceof HTMLImageElement && isOnPicture(target, e)) return;
          close();
        }}
        aria-label={shown?.caption ?? shown?.alt}
        className="lightbox"
      >
        {shown ? (
          <div className="flex h-full w-full flex-col items-center justify-center gap-5 p-4 sm:p-8">
            <div className="relative min-h-0 w-full flex-1">
              <Image
                src={shown.src}
                alt={shown.alt}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>

            <div className="lightbox-caption flex max-w-2xl flex-col items-center gap-1 text-center">
              {shown.caption ? (
                <p className="text-sm leading-snug text-cream/85">{shown.caption}</p>
              ) : null}
              {count > 1 ? (
                <p className="text-[0.6875rem] uppercase tracking-[0.16em] text-cream/50">
                  {current! + 1} / {count}
                </p>
              ) : null}
            </div>
          </div>
        ) : null}

        <button
          type="button"
          onClick={close}
          aria-label="Schliessen"
          className="lightbox-button absolute right-3 top-3 sm:right-5 sm:top-5"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden className="h-5 w-5">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        {count > 1 ? (
          <>
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Vorheriges Bild"
              className="lightbox-button absolute left-3 top-1/2 -translate-y-1/2 sm:left-5"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="h-5 w-5">
                <path d="M15 5l-7 7 7 7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Nächstes Bild"
              className="lightbox-button absolute right-3 top-1/2 -translate-y-1/2 sm:right-5"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="h-5 w-5">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        ) : null}
      </dialog>
    </>
  );
}
