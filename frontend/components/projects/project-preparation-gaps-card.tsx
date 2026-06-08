import Link from "next/link";
import { ArrowRight, CheckCircle2, CircleDashed, Clock3 } from "lucide-react";

import type { NegotiationProjectRead } from "@/lib/api/negotiation-projects";
import type { RequestItemRead } from "@/lib/api/request-items";
import type { SupplierProfileSummary } from "@/lib/api/supplier-profiles";

type GapStatus = "present" | "open" | "later";

type GapItem = {
  label: string;
  status: GapStatus;
  text: string;
  href?: string;
  actionLabel?: string;
};

export function ProjectPreparationGapsCard({
  project,
  requestItem,
  supplier,
  strategyCount,
  strategyBuildingBlockCount,
  simulationScenarioCount,
  trainerCommentCount,
}: {
  project: NegotiationProjectRead;
  requestItem?: RequestItemRead;
  supplier?: SupplierProfileSummary;
  strategyCount?: number;
  strategyBuildingBlockCount?: number;
  simulationScenarioCount?: number;
  trainerCommentCount?: number;
}) {
  const items = buildGapItems({
    project,
    requestItem,
    supplier,
    strategyCount,
    strategyBuildingBlockCount,
    simulationScenarioCount,
    trainerCommentCount,
  });
  const presentItems = items.filter((item) => item.status === "present");
  const openItems = items.filter((item) => item.status === "open");
  const nextStep = openItems[0] ?? items.find((item) => item.status === "later");

  return (
    <section className="rounded-md border border-border bg-card p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="max-w-3xl">
          <h2 className="text-base font-semibold">Vorbereitungsluecken</h2>
          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            Kompakte Sicht auf vorhandene Vorbereitungselemente und offene naechste Arbeitsschritte.
          </p>
        </div>
        <span className="rounded-md border border-border bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground">
          {presentItems.length}/{items.length} vorhanden
        </span>
      </div>

      <ul className="mt-3 grid gap-2 text-sm md:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <li key={item.label} className="flex min-w-0 gap-2 rounded-md border border-border bg-background px-3 py-2">
            <StatusIcon status={item.status} />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-medium">{item.label}</span>
                <span className={statusLabelClassName(item.status)}>{statusLabel(item.status)}</span>
              </div>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">{item.text}</p>
              {item.href && item.actionLabel ? (
                <Link href={item.href} className="mt-1.5 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline">
                  {item.actionLabel}
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </Link>
              ) : null}
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-3 rounded-md border border-border bg-muted/20 px-3 py-2">
        <p className="text-sm leading-5">
          <span className="font-medium">Naechster sinnvoller Schritt: </span>
          <span className="text-muted-foreground">{nextStep ? nextStepText(nextStep) : "Vorbereitung aktualisiert halten."}</span>
        </p>
      </div>
    </section>
  );
}

function buildGapItems({
  project,
  requestItem,
  supplier,
  strategyCount,
  strategyBuildingBlockCount,
  simulationScenarioCount,
  trainerCommentCount,
}: {
  project: NegotiationProjectRead;
  requestItem?: RequestItemRead;
  supplier?: SupplierProfileSummary;
  strategyCount?: number;
  strategyBuildingBlockCount?: number;
  simulationScenarioCount?: number;
  trainerCommentCount?: number;
}): GapItem[] {
  const hasRequestContext = Boolean(project.request_item_id || requestItem);
  const hasSupplierProfile = Boolean(project.supplier_profile_id || supplier);
  const hasSupplierContext = Boolean(
    supplier &&
      (hasAnyText(supplier.country, supplier.region, supplier.industry, supplier.supplier_type, supplier.relationship_status, supplier.cultural_context) ||
        hasRecordValues(supplier.interests_json) ||
        hasRecordValues(supplier.constraints_json) ||
        hasRecordValues(supplier.likely_tactics_json)),
  );

  return [
    {
      label: "Bedarfskontext",
      status: hasRequestContext ? "present" : "open",
      text: hasRequestContext ? "Eine Anfrageposition ist mit dem Projekt verbunden." : "Eine Anfrageposition kann den Bedarf strukturierter einordnen.",
      href: requestItem ? `/request-items/${requestItem.id}` : "/request-items",
      actionLabel: hasRequestContext ? "Anfrageposition oeffnen" : "Anfragepositionen ansehen",
    },
    {
      label: "Lieferantenprofil",
      status: hasSupplierProfile ? "present" : "open",
      text: hasSupplierProfile ? "Ein SupplierProfile ist verknuepft." : "Ein Lieferantenprofil kann den Kontext fuer Strategie und Simulation ergaenzen.",
      href: supplier ? `/suppliers/${supplier.id}` : "/suppliers",
      actionLabel: hasSupplierProfile ? "Lieferantenprofil oeffnen" : "Lieferanten ansehen",
    },
    {
      label: "Supplier Context",
      status: hasSupplierContext ? "present" : hasSupplierProfile ? "open" : "later",
      text: hasSupplierContext
        ? "Profilfelder fuer Region, Kategorie, Beziehung oder Verhandlungssignale sind gepflegt."
        : hasSupplierProfile
          ? "Weitere Profilfelder koennen den Lieferantenkontext schaerfen."
          : "Nach Verknuepfung eines SupplierProfiles pruefbar.",
      href: supplier ? `/suppliers/${supplier.id}` : undefined,
      actionLabel: supplier ? "Profil ergaenzen" : undefined,
    },
    {
      label: "Strategie",
      status: loadedStatus(strategyCount),
      text:
        strategyCount === undefined
          ? "Strategiedaten konnten hier noch nicht verlaesslich eingeordnet werden."
          : strategyCount > 0
            ? "Mindestens ein Strategieobjekt liegt fuer dieses Projekt vor."
            : "Eine Strategie kann als naechster Vorbereitungsschritt angelegt werden.",
      href: `/strategy?projectId=${project.id}`,
      actionLabel: "Strategie vorbereiten",
    },
    {
      label: "Strategiebausteine",
      status: loadedStatus(strategyBuildingBlockCount),
      text:
        strategyBuildingBlockCount === undefined
          ? "ZOPA-, BATNA-, Argumentations- oder Konzessionsdaten sind spaeter genauer pruefbar."
          : strategyBuildingBlockCount > 0
            ? "Mindestens ein ZOPA-, BATNA-, Argumentations- oder Konzessionsbaustein ist vorhanden."
            : "ZOPA, BATNA, Argumentationslinie oder Konzessionen sind noch offen.",
      href: `/strategy?projectId=${project.id}`,
      actionLabel: "Bausteine pflegen",
    },
    {
      label: "Simulation",
      status: loadedStatus(simulationScenarioCount),
      text:
        simulationScenarioCount === undefined
          ? "Simulationsdaten konnten hier noch nicht verlaesslich eingeordnet werden."
          : simulationScenarioCount > 0
            ? "Mindestens ein SimulationScenario ist vorbereitet."
            : "Ein SimulationScenario kann nach der Strategie vorbereitet werden.",
      href: `/simulation?projectId=${project.id}`,
      actionLabel: "Szenario konfigurieren",
    },
    {
      label: "Trainerreview",
      status: loadedStatus(trainerCommentCount),
      text:
        trainerCommentCount === undefined
          ? "Trainerkommentare sind nach vorhandener Simulation genauer pruefbar."
          : trainerCommentCount > 0
            ? "Mindestens ein TrainerComment ist vorhanden."
            : "Trainerreview ist noch offen.",
      href: `/trainer-review?projectId=${project.id}`,
      actionLabel: "Trainerreview oeffnen",
    },
  ];
}

function loadedStatus(count?: number): GapStatus {
  if (count === undefined) {
    return "later";
  }

  return count > 0 ? "present" : "open";
}

function hasAnyText(...values: Array<string | null | undefined>) {
  return values.some((value) => Boolean(value?.trim()));
}

function hasRecordValues(record?: Record<string, unknown>) {
  if (!record || Object.keys(record).length === 0) {
    return false;
  }

  return Object.values(record)
    .flatMap((value) => (Array.isArray(value) ? value : [value]))
    .some((value) => (typeof value === "string" ? Boolean(value.trim()) : value != null));
}

function StatusIcon({ status }: { status: GapStatus }) {
  if (status === "present") {
    return <CheckCircle2 aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-emerald-600" />;
  }

  if (status === "later") {
    return <Clock3 aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-muted-foreground" />;
  }

  return <CircleDashed aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-amber-600" />;
}

function statusLabel(status: GapStatus) {
  if (status === "present") {
    return "Vorhanden";
  }

  if (status === "later") {
    return "Optional spaeter";
  }

  return "Noch offen";
}

function statusLabelClassName(status: GapStatus) {
  const baseClassName = "shrink-0 rounded-md px-2 py-0.5 text-xs font-medium";

  if (status === "present") {
    return `${baseClassName} bg-emerald-50 text-emerald-700`;
  }

  if (status === "later") {
    return `${baseClassName} bg-muted text-muted-foreground`;
  }

  return `${baseClassName} bg-amber-50 text-amber-700`;
}

function nextStepText(item: GapItem) {
  if (item.status === "later") {
    return `${item.label} spaeter pruefen.`;
  }

  return `${item.label} vorbereiten.`;
}
