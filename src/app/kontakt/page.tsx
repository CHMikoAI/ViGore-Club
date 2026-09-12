import type { Metadata } from "next";
import InquiryForm from "@/components/InquiryForm";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Interesse am ViGORE Club oder eine Frage zu einem Projekt? Schreib uns.",
};

/**
 * Club kontaktieren – das allgemeine Formular. Kopf, Reiter und Rahmen kommen
 * aus layout.tsx; hier steht nur, was in den Kasten gehört.
 */
export default function ContactPage() {
  return (
    <>
      <p className="mb-8 text-sm leading-relaxed text-muted">
        Ob Frage, Idee oder etwas zum Most – schreib, was du auf dem Herzen
        hast.
      </p>
      <InquiryForm topic="club" />
    </>
  );
}
