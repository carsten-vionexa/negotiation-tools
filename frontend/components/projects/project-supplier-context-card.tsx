import Link from "next/link";
import { ArrowRight, CheckCircle2, CircleDashed, Handshake } from "lucide-react";
import type { ReactNode } from "react";

import type { SupplierProfileSummary } from "@/lib/api/supplier-profiles";

export function ProjectSupplierContextCard({ supplier }: { supplier?: SupplierProfileSummary }) {
  if (!supplier) {
    return (
      <section className="rounded-md border border-border bg-card p-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="max-w-3xl">
            <h2 className="text-base font-semibold">Supplier Context</h2>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              Noch kein Lieferantenprofil verknuepft. Verknuepfe ein SupplierProfile, um Machtverhaeltnis, Interessen, Risiken und kulturellen
              Kontext in die Vorbereitung einzubeziehen.
            </p>
          </div>
          <span className="rounded-md border border-border bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground">Optionaler Kontext</span>
        </div>
      </section>
    );
  }

  const overviewFields = [
    { label: "Lieferant", value: supplier.name },
    { label: "Land / Region", value: displayValue([supplier.country, supplier.region].filter(Boolean).join(" / ")) },
    { label: "Branche / Kategorie", value: displayValue([supplier.industry, supplier.supplier_type].filter(Boolean).join(" / ")) },
    { label: "Beziehung", value: displayValue(supplier.relationship_status) },
  ];
  const negotiationSignals = [
    supplier.power_level ? `Machtverhaeltnis: ${supplier.power_level}` : null,
    supplier.risk_level ? `Risiko: ${supplier.risk_level}` : null,
    summarizeRecord("Interessen", supplier.interests_json),
    summarizeRecord("Constraints", supplier.constraints_json),
  ].filter(Boolean);
  const readinessHints = buildReadinessHints(supplier);

  return (
    <section className="rounded-md border border-border bg-card p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="max-w-3xl">
          <h2 className="text-base font-semibold">Supplier Context</h2>
          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            Verhandlungsnaher Kontext aus dem verknuepften SupplierProfile fuer Strategie, Kulturbriefing und Simulation.
          </p>
        </div>
        <Link
          href={`/suppliers/${supplier.id}`}
          className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-1.5 text-sm font-medium text-primary hover:bg-muted"
        >
          <Handshake className="size-4" />
          Vollstaendiges Profil
          <ArrowRight className="size-4" />
        </Link>
      </div>

      <dl className="mt-3 grid gap-x-4 gap-y-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
        {overviewFields.map((item) => (
          <Meta key={item.label} label={item.label} value={item.value} />
        ))}
      </dl>

      <div className="mt-3 grid gap-4 border-t border-border pt-3 md:grid-cols-2">
        <div>
          <h3 className="text-sm font-medium">Verhandlungssignale</h3>
          <p className="mt-2 text-sm leading-5 text-muted-foreground">
            {negotiationSignals.length > 0 ? negotiationSignals.join("; ") : "Noch keine Macht-, Risiko- oder Interessenhinweise gepflegt."}
          </p>
        </div>
        <div>
          <h3 className="text-sm font-medium">Kultureller Kontext</h3>
          <p className="mt-2 whitespace-pre-line text-sm leading-5 text-muted-foreground">{displayValue(firstValue(supplier.cultural_context, supplier.notes))}</p>
        </div>
      </div>

      <div className="mt-3 border-t border-border pt-3">
        <h3 className="text-sm font-medium">Vorbereitungsstand Lieferant</h3>
        <p className="mt-1 text-xs leading-5 text-muted-foreground">
          Kurze Orientierung, welche Profilinformationen fuer die weitere Vorbereitung bereits nutzbar sind und welche sich gezielt nachpflegen lassen.
        </p>
        <ul className="mt-2 grid gap-2 text-sm sm:grid-cols-2">
          {readinessHints.map((hint) => (
            <li key={hint.label} className="flex gap-2 rounded-md border border-border bg-muted/20 px-3 py-2">
              {hint.isReady ? (
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
              ) : (
                <CircleDashed className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
              )}
              <span className="leading-5 text-muted-foreground">
                <span className="font-medium text-foreground">{hint.label}: </span>
                {hint.text}
              </span>
            </li>
          ))}
        </ul>
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

function firstValue(...values: Array<string | null | undefined>) {
  return values.find((value) => Boolean(value?.trim())) ?? null;
}

function buildReadinessHints(supplier: SupplierProfileSummary) {
  const hints = [
    {
      label: "Region",
      isReady: hasAnyText(supplier.country, supplier.region),
      readyText: "Land oder Region sind fuer die Vorbereitung eingeordnet.",
      missingText: "Land oder Region ergaenzen, damit regionale Rahmenbedingungen schneller greifbar sind.",
    },
    {
      label: "Kategorie",
      isReady: hasAnyText(supplier.industry, supplier.supplier_type),
      readyText: "Branche oder Lieferantentyp sind als Kontext verfuegbar.",
      missingText: "Branche oder Lieferantentyp nachpflegen, um Vergleich und Einordnung zu erleichtern.",
    },
    {
      label: "Beziehung",
      isReady: hasAnyText(supplier.relationship_status),
      readyText: "Der Beziehungsstand ist fuer die Gespraechsvorbereitung sichtbar.",
      missingText: "Beziehungsstand ergaenzen, damit Vorerfahrung und Naehe klarer werden.",
    },
    {
      label: "Verhandlungssignale",
      isReady:
        hasAnyText(supplier.power_level, supplier.risk_level) ||
        hasRecordValues(supplier.interests_json) ||
        hasRecordValues(supplier.constraints_json) ||
        hasRecordValues(supplier.likely_tactics_json),
      readyText: "Macht-, Risiko-, Interessen- oder Constraint-Hinweise sind vorhanden.",
      missingText: "Macht-, Risiko-, Interessen- oder Constraint-Hinweise sammeln, falls sie fuer die Vorbereitung relevant sind.",
    },
    {
      label: "Kultureller Kontext",
      isReady: hasAnyText(supplier.cultural_context),
      readyText: "Kulturelle Hinweise sind als Vorbereitungskontext gepflegt.",
      missingText: "Kulturellen Kontext ergaenzen, wenn Gespraechsstil oder Erwartungshaltung wichtig sind.",
    },
  ];

  return [...hints.filter((hint) => !hint.isReady), ...hints.filter((hint) => hint.isReady)]
    .slice(0, 5)
    .map((hint) => ({
      label: hint.label,
      isReady: hint.isReady,
      text: hint.isReady ? hint.readyText : hint.missingText,
    }));
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

function summarizeRecord(label: string, record?: Record<string, unknown>) {
  if (!record || Object.keys(record).length === 0) {
    return null;
  }

  const values = Object.values(record)
    .flatMap((value) => (Array.isArray(value) ? value : [value]))
    .filter((value): value is string => typeof value === "string" && Boolean(value.trim()))
    .slice(0, 2);

  return values.length > 0 ? `${label}: ${values.join(", ")}` : `${label}: gepflegt`;
}
