import { STATUS_LABELS, type ProjectStatus } from "@/content/projects";

/**
 * Der Status eines Projekts. Ein farbiger Punkt trägt die Bedeutung, der Text
 * benennt sie – so bleibt es auch für Farbfehlsichtige lesbar und funktioniert
 * auf hellem wie auf dunklem Grund.
 */

const DOT: Record<ProjectStatus, string> = {
  laufend: "bg-forest",
  bald: "bg-brass",
  "coming-soon": "bg-muted",
};

export default function StatusChip({ status }: { status: ProjectStatus }) {
  return (
    <span className="inline-flex items-center gap-2 text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-muted">
      <span className={`h-1.5 w-1.5 rounded-full ${DOT[status]}`} aria-hidden />
      {STATUS_LABELS[status]}
    </span>
  );
}
