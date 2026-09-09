/**
 * Die Schriften der Website.
 *
 * Cormorant Garamond für Überschriften, Inter für den Fliesstext – wie auf der
 * bisherigen Website. Beide liefert Next.js selbst aus, es gehen also keine
 * Anfragen an Google.
 *
 * Falls doch einmal eine andere Schrift kommen soll: hier Import und Aufruf
 * austauschen und in globals.css `--font-display` anpassen. Achtung – der
 * grosse ViGORE-Schriftzug im Footer rechnet mit `--wordmark-ratio` (ebenfalls
 * globals.css). Der Wert ist auf Cormorant gemessen und müsste für eine andere
 * Schrift neu bestimmt werden, sonst passt das Wort nicht mehr in die Breite.
 */

import { Cormorant_Garamond, Inter } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/** Die Font-Klassen für das <html>-Element. */
export const fontClassNames = `${cormorant.variable} ${inter.variable}`;
