import fs from "node:fs";
import path from "node:path";

/**
 * Gibt es die Bilddatei unter public/? Läuft auf dem Server zur Renderzeit.
 *
 * Damit das auch auf Vercel funktioniert, ist public/images in next.config.ts
 * unter `outputFileTracingIncludes` eingetragen. Nur für Server-Komponenten –
 * im Browser gibt es kein Dateisystem.
 */
export function imageExists(src: string): boolean {
  // Nur Pfade aus den eigenen Inhaltsdateien, trotzdem eng gehalten.
  if (!src.startsWith("/") || src.includes("..")) return false;
  try {
    return fs.existsSync(path.join(process.cwd(), "public", src));
  } catch {
    return false;
  }
}
