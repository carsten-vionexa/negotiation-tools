"use client";

import { ArrowRightLeft } from "lucide-react";
import { useActionState } from "react";

import { ErrorState } from "@/components/state-patterns";

import { mapImportJobAction, type ImportMappingActionState } from "./actions";

type MappingField = {
  key: string;
  label: string;
  requirement?: string;
};

const TARGET_FIELDS: Record<string, MappingField[]> = {
  procurement_history_item: [
    { key: "item_name", label: "Artikelname", requirement: "Erforderlich fuer spaetere Validierung" },
    { key: "supplier_name", label: "Lieferant" },
    { key: "supplier_country", label: "Lieferantenland" },
    { key: "category", label: "Kategorie" },
    { key: "sku", label: "SKU" },
    { key: "quantity", label: "Menge" },
    { key: "unit", label: "Einheit" },
    { key: "unit_price", label: "Stueckpreis" },
    { key: "currency", label: "Waehrung" },
    { key: "lead_time_weeks", label: "Lieferzeit (Wochen)" },
    { key: "quality_rating", label: "Qualitaetsbewertung" },
    { key: "price_assessment", label: "Preiseinschaetzung" },
    { key: "improvement_potential", label: "Verbesserungspotenzial" },
    { key: "purchased_at", label: "Kaufdatum" },
    { key: "source_document", label: "Quelldokument" },
    { key: "notes", label: "Notizen" },
  ],
  request_item: [
    { key: "title", label: "Titel", requirement: "Titel oder Artikelname erforderlich fuer spaetere Validierung" },
    { key: "article_name", label: "Artikelname", requirement: "Titel oder Artikelname erforderlich fuer spaetere Validierung" },
    { key: "article_description", label: "Artikelbeschreibung" },
    { key: "category", label: "Kategorie" },
    { key: "specification", label: "Spezifikation" },
    { key: "requested_quantity", label: "Anfragemenge" },
    { key: "unit", label: "Einheit" },
    { key: "target_price", label: "Zielpreis" },
    { key: "rough_price_expectation", label: "Grobe Preiserwartung" },
    { key: "currency", label: "Waehrung" },
    { key: "required_delivery_date", label: "Lieferdatum" },
    { key: "target_delivery_time", label: "Ziellieferzeit" },
    { key: "target_region", label: "Zielregion" },
    { key: "priority", label: "Prioritaet" },
    { key: "comment", label: "Kommentar" },
  ],
};

export function ImportMappingForm({
  importJobId,
  targetEntity,
  sourceFields,
  existingMapping,
}: {
  importJobId: string;
  targetEntity: string;
  sourceFields: string[];
  existingMapping: Record<string, string>;
}) {
  const fields = TARGET_FIELDS[targetEntity] ?? [];
  const action = mapImportJobAction.bind(null, importJobId);
  const [state, formAction, pending] = useActionState<ImportMappingActionState, FormData>(action, null);

  return (
    <section className="rounded-md border border-border bg-card p-5">
      <h2 className="text-base font-semibold">Feldmapping erfassen</h2>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        Ordne Zielfelder explizit den Quellspalten aus den geparsten Rows zu. Das Mapping erzeugt nur gemappte Reviewdaten; Validierung und Zielobjekte werden nicht gestartet.
      </p>

      {state?.error ? (
        <div className="mt-4">
          <ErrorState title="Mapping fehlgeschlagen." description={state.error} />
        </div>
      ) : null}

      {fields.length === 0 ? (
        <p className="mt-4 text-sm leading-6 text-muted-foreground">
          Fuer das Target Entity {targetEntity} sind keine Mappingfelder in dieser Ansicht hinterlegt.
        </p>
      ) : sourceFields.length === 0 ? (
        <p className="mt-4 text-sm leading-6 text-muted-foreground">
          Der Job enthaelt keine sichtbaren Quellfelder, die einem Zielfeld zugeordnet werden koennen.
        </p>
      ) : (
        <form action={formAction} className="mt-5 grid gap-4">
          <div className="grid gap-4 md:grid-cols-2">
            {fields.map((field) => (
              <label key={field.key} className="grid gap-2 text-sm">
                <span className="font-medium">
                  {field.label} <span className="text-muted-foreground">({field.key})</span>
                </span>
                {field.requirement ? <span className="text-xs text-muted-foreground">{field.requirement}</span> : null}
                <select
                  name={`field_mapping.${field.key}`}
                  defaultValue={existingMapping[field.key] ?? ""}
                  className="rounded-md border border-input bg-background px-3 py-2"
                >
                  <option value="">Nicht mappen</option>
                  {sourceFields.map((sourceField) => (
                    <option key={sourceField} value={sourceField}>
                      {sourceField}
                    </option>
                  ))}
                </select>
              </label>
            ))}
          </div>
          <button
            type="submit"
            disabled={pending}
            className="inline-flex w-fit items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:cursor-not-allowed disabled:opacity-60"
          >
            <ArrowRightLeft className="size-4" />
            {pending ? "Mapping laeuft..." : "Mapping anwenden"}
          </button>
        </form>
      )}
    </section>
  );
}
