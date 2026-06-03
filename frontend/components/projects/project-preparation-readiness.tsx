import { CheckCircle2, CircleDashed, Clock3 } from "lucide-react";

import type { NegotiationProjectRead } from "@/lib/api/negotiation-projects";
import type { RequestItemRead } from "@/lib/api/request-items";

type ReadinessStatus = "present" | "open" | "later";

type ReadinessItem = {
  label: string;
  status: ReadinessStatus;
};

export function ProjectPreparationReadiness({ project, requestItem }: { project: NegotiationProjectRead; requestItem?: RequestItemRead }) {
  const items = buildReadinessItems(project, requestItem);
  const measurableItems = items.filter((item) => item.status !== "later");
  const presentCount = measurableItems.filter((item) => item.status === "present").length;

  return (
    <section className="rounded-md border border-border bg-card p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold">Vorbereitungs-Check</h2>
          <p className="mt-0.5 text-xs leading-5 text-muted-foreground">Welche Grundlagen fuer die naechste Verhandlungsphase bereits vorliegen.</p>
        </div>
        <span className="rounded-md border border-border bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground">
          {presentCount}/{measurableItems.length} Grundlagen
        </span>
      </div>

      <ul className="mt-3 grid gap-2 text-sm sm:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => (
          <li key={item.label} className="flex min-w-0 items-center gap-2 rounded-md border border-border bg-background px-3 py-1.5">
            <StatusIcon status={item.status} />
            <span className="min-w-0 flex-1">{item.label}</span>
            <span className={statusLabelClassName(item.status)}>{statusLabel(item.status)}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function buildReadinessItems(project: NegotiationProjectRead, requestItem?: RequestItemRead): ReadinessItem[] {
  return [
    {
      label: "Bedarf / Artikel",
      status: hasValue(project.article_or_service, requestItem?.article_name, requestItem?.article_description, requestItem?.specification, requestItem?.title)
        ? "present"
        : "open",
    },
    { label: "Menge", status: hasValue(project.quantity, requestItem?.requested_quantity) ? "present" : "open" },
    { label: "Zielregion", status: hasValue(project.target_region, requestItem?.target_region) ? "present" : "open" },
    {
      label: "Lieferzeitwunsch",
      status: hasValue(project.desired_delivery_time, requestItem?.target_delivery_time, requestItem?.required_delivery_date) ? "present" : "open",
    },
    {
      label: "Preisvorstellung",
      status: hasValue(project.internal_price_expectation, requestItem?.target_price, requestItem?.rough_price_expectation) ? "present" : "open",
    },
    { label: "Verhandlungsart", status: hasValue(project.negotiation_type) ? "present" : "open" },
    { label: "Warengruppe", status: hasValue(project.category, requestItem?.category) ? "present" : "open" },
    { label: "Strategiebausteine", status: "later" },
  ];
}

function hasValue(...values: Array<string | null | undefined>) {
  return values.some((value) => Boolean(value?.trim()));
}

function StatusIcon({ status }: { status: ReadinessStatus }) {
  if (status === "present") {
    return <CheckCircle2 aria-hidden="true" className="size-4 shrink-0 text-emerald-600" />;
  }

  if (status === "later") {
    return <Clock3 aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" />;
  }

  return <CircleDashed aria-hidden="true" className="size-4 shrink-0 text-amber-600" />;
}

function statusLabel(status: ReadinessStatus) {
  if (status === "present") {
    return "Vorhanden";
  }

  if (status === "later") {
    return "Spaeter";
  }

  return "Offen";
}

function statusLabelClassName(status: ReadinessStatus) {
  const baseClassName = "shrink-0 rounded-md px-2 py-0.5 text-xs font-medium";

  if (status === "present") {
    return `${baseClassName} bg-emerald-50 text-emerald-700`;
  }

  if (status === "later") {
    return `${baseClassName} bg-muted text-muted-foreground`;
  }

  return `${baseClassName} bg-amber-50 text-amber-700`;
}
