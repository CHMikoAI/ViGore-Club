import type { Metadata } from "next";
import ApplicationForm from "@/components/ApplicationForm";

export const metadata: Metadata = {
  title: "Mitglied werden",
  description:
    "Bewirb dich um eine Mitgliedschaft im ViGORE Club – ein paar ehrliche " +
    "Sätze reichen. Wir melden uns persönlich.",
};

/**
 * Mitglied werden – die Bewerbung. Kopf, Reiter und Rahmen kommen aus
 * ../layout.tsx; hier steht nur, was in den Kasten gehört.
 *
 * Alle „Mitglied werden"-Knöpfe der Seite führen hierher, nicht auf /kontakt:
 * Wer sich bewerben will, soll nicht erst den Reiter suchen müssen.
 */
export default function ApplyPage() {
  return (
    <>
      <p className="mb-8 text-sm leading-relaxed text-muted">
        Kein Lebenslauf, keine Formalitäten. Ein paar ehrliche Sätze reichen –
        wir melden uns und lernen uns kennen, bevor irgendjemand etwas
        entscheidet.
      </p>
      <ApplicationForm />
    </>
  );
}
