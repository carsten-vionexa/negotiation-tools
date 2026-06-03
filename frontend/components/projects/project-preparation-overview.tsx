import Link from "next/link";
import { ClipboardList } from "lucide-react";
import type { ReactNode } from "react";

import type { NegotiationProjectRead } from "@/lib/api/negotiation-projects";
import type { RequestItemRead } from "@/lib/api/request-items";

export function ProjectPreparationOverview({
  project,
  requestItem,
  ownerDisplayName,
}: {
  project: NegotiationProjectRead;
  requestItem?: RequestItemRead;
  ownerDisplayName?: string | null;
}) {
  const preparationOverviewFields = [
    { label: "Projekttitel", value: displayValue(project.title) },
    { label: "Verhandlungsart", value: displayValue(project.negotiation_type) },
    { label: "Warengruppe", value: displayValue(project.category ?? requestItem?.category) },
    { label: "Artikel / Leistung", value: displayValue(project.article_or_service ?? requestItem?.article_name ?? requestItem?.title) },
    { label: "Menge", value: displayValue(formatQuantity(project.quantity ?? requestItem?.requested_quantity, requestItem?.unit)) },
    { label: "Zielregion", value: displayValue(project.target_region ?? requestItem?.target_region) },
    { label: "Gewuenschte Lieferzeit", value: displayValue(project.desired_delivery_time ?? requestItem?.target_delivery_time ?? requestItem?.required_delivery_date) },
    {
      label: "Grobe Preisvorstellung",
      value: displayValue(
        formatMoney(project.internal_price_expectation ?? requestItem?.target_price ?? requestItem?.rough_price_expectation, project.currency ?? requestItem?.currency),
      ),
    },
    { label: "Projektprioritaet", value: displayValue(project.priority ?? requestItem?.priority) },
    { label: "Status", value: displayValue(project.status) },
    { label: "Interne Stakeholder", value: displayValue(ownerDisplayName) },
  ];
  const requestItemContext = requestItem
    ? [
        requestItem.article_description ? `Beschreibung: ${requestItem.article_description}` : null,
        requestItem.specification ? `Spezifikation: ${requestItem.specification}` : null,
        requestItem.comment ? `Kommentar: ${requestItem.comment}` : null,
      ]
        .filter(Boolean)
        .join("\n")
    : null;

  return (
    <section className="rounded-md border border-border bg-card p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="max-w-3xl">
          <h2 className="text-base font-semibold">Verhandlungsvorbereitung</h2>
          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            Diese Uebersicht bildet die Ausgangslage fuer die spaetere Strategieentwicklung, ZOPA-/BATNA-Arbeit und Simulation.
          </p>
        </div>
        {requestItem ? (
          <Link
            href={`/request-items/${requestItem.id}`}
            className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-1.5 text-sm font-medium text-primary hover:bg-muted"
          >
            <ClipboardList className="size-4" />
            Anfrageposition oeffnen
          </Link>
        ) : null}
      </div>

      <dl className="mt-3 grid gap-x-4 gap-y-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
        {preparationOverviewFields.map((item) => (
          <Meta key={item.label} label={item.label} value={item.value} />
        ))}
      </dl>

      <div className="mt-3 grid gap-4 border-t border-border pt-3 md:grid-cols-2">
        <div>
          <h3 className="text-sm font-medium">Verknuepfter RequestItem-Kontext</h3>
          <dl className="mt-2 grid gap-2 text-sm">
            <Meta
              label="Anfrageposition"
              value={
                requestItem ? (
                  <Link href={`/request-items/${requestItem.id}`} className="inline-flex items-center gap-2 text-primary">
                    <ClipboardList className="size-4" />
                    {requestItem.title}
                  </Link>
                ) : project.request_item_id ? (
                  "RequestItem konnte nicht geladen werden"
                ) : (
                  "Noch nicht angegeben"
                )
              }
            />
            <Meta label="RequestItem-Status" value={displayValue(requestItem?.status)} />
          </dl>
          <p className="mt-2 whitespace-pre-line text-sm leading-5 text-muted-foreground">{requestItemContext || "Noch nicht angegeben"}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium">Projektkontext</h3>
          <p className="mt-2 whitespace-pre-line text-sm leading-5 text-muted-foreground">{displayValue(project.context)}</p>
        </div>
      </div>
    </section>
  );
}

function Meta({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div>
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="mt-0.5 font-medium">{value}</dd>
    </div>
  );
}

function displayValue(value?: string | null) {
  return value?.trim() || "Noch nicht angegeben";
}

function formatQuantity(quantity?: string | null, unit?: string | null) {
  return [quantity, unit].filter(Boolean).join(" ");
}

function formatMoney(amount?: string | null, currency?: string | null) {
  return [amount, currency].filter(Boolean).join(" ");
}
