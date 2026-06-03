import { ArrowRight } from "lucide-react";

import type { NegotiationProjectRead } from "@/lib/api/negotiation-projects";
import type { RequestItemRead } from "@/lib/api/request-items";

type NextAction = {
  label: string;
  detail: string;
};

export function ProjectNextActionGuidance({ project, requestItem }: { project: NegotiationProjectRead; requestItem?: RequestItemRead }) {
  const action = deriveNextAction(project, requestItem);

  return (
    <div className="mt-5 rounded-md border border-border bg-muted/40 p-3 text-sm leading-6">
      <div className="flex items-center justify-between gap-3">
        <p className="font-medium">Naechster Schritt</p>
        <span className="shrink-0 rounded-md border border-border bg-background px-2 py-0.5 text-xs font-medium text-muted-foreground">
          Frontend-Ableitung
        </span>
      </div>
      <p className="mt-1 flex gap-2 text-muted-foreground">
        <ArrowRight aria-hidden="true" className="mt-1 size-4 shrink-0" />
        <span>
          <span className="font-medium text-foreground">{action.label}</span>
          <span className="block text-xs leading-5">{action.detail}</span>
        </span>
      </p>
    </div>
  );
}

function deriveNextAction(project: NegotiationProjectRead, requestItem?: RequestItemRead): NextAction {
  if (!hasCentralFoundations(project, requestItem)) {
    return {
      label: "Projektgrundlagen ergaenzen",
      detail: "Bedarf, Menge, Lieferzeit, Preis oder Warengruppe sind noch nicht vollstaendig genug fuer die naechste Vorbereitung.",
    };
  }

  if (!hasStrategyBuildingBlocks(project)) {
    return {
      label: "Strategie konkretisieren",
      detail: "WAP, BATNA und Konzessionslogik manuell definieren.",
    };
  }

  if (!hasSupplierContext(project)) {
    return {
      label: "Lieferantenprofil ergaenzen",
      detail: "Machtverhaeltnis und Gespraechsrolle besser vorbereiten.",
    };
  }

  return {
    label: "Analyse oder Simulation vorbereiten",
    detail: "Die wichtigsten Grundlagen sind vorhanden.",
  };
}

function hasCentralFoundations(project: NegotiationProjectRead, requestItem?: RequestItemRead) {
  return (
    hasValue(project.article_or_service, requestItem?.article_name, requestItem?.article_description, requestItem?.specification, requestItem?.title) &&
    hasValue(project.quantity, requestItem?.requested_quantity) &&
    hasValue(project.desired_delivery_time, requestItem?.target_delivery_time, requestItem?.required_delivery_date) &&
    hasValue(project.internal_price_expectation, requestItem?.target_price, requestItem?.rough_price_expectation) &&
    hasValue(project.category, requestItem?.category)
  );
}

function hasStrategyBuildingBlocks(project: NegotiationProjectRead) {
  const strategyData = project.strategy_data;

  return (
    hasRecordValue(strategyData, "walk_away_point", "wap") &&
    hasRecordValue(strategyData, "batna_summary", "batna") &&
    hasRecordValue(strategyData, "concession_strategy", "concessions", "concession_logic")
  );
}

function hasSupplierContext(project: NegotiationProjectRead) {
  return hasValue(project.supplier_profile_id, project.current_supplier);
}

function hasRecordValue(record: Record<string, unknown> | undefined, ...keys: string[]) {
  if (!record) {
    return false;
  }

  return keys.some((key) => {
    const value = record[key];
    return typeof value === "string" ? Boolean(value.trim()) : Boolean(value);
  });
}

function hasValue(...values: Array<string | null | undefined>) {
  return values.some((value) => Boolean(value?.trim()));
}
