import type { NegotiationProjectRead } from "@/lib/api/negotiation-projects";
import type { RequestItemRead } from "@/lib/api/request-items";

export function ProjectStrategySnapshot({ project, requestItem }: { project: NegotiationProjectRead; requestItem?: RequestItemRead }) {
  const strategySnapshotFields = buildStrategySnapshotFields(project, requestItem);

  return (
    <section className="rounded-md border border-border bg-card p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold">Strategie-Snapshot</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Vorbereitende Demo-Struktur fuer Strategiebausteine. Diese Werte sind nicht KI-generiert und enthalten keine automatische ZOPA-, BATNA-
            oder Preisanker-Berechnung.
          </p>
        </div>
        <span className="rounded-md border border-border bg-muted/40 px-3 py-2 text-xs font-medium text-muted-foreground">Statisch vorbereitet</span>
      </div>

      <dl className="mt-4 grid gap-4 text-sm md:grid-cols-2">
        {strategySnapshotFields.map((item) => (
          <div key={item.label} className="rounded-md border border-border bg-background p-4">
            <dt className="font-medium">{item.label}</dt>
            <dd className="mt-2 leading-6 text-muted-foreground">{item.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function buildStrategySnapshotFields(project: NegotiationProjectRead, requestItem?: RequestItemRead) {
  const priceExpectation = formatMoney(
    project.internal_price_expectation ?? requestItem?.target_price ?? requestItem?.rough_price_expectation,
    project.currency ?? requestItem?.currency,
  );
  const riskSignals = [
    project.risk_level ? `Risikostufe: ${project.risk_level}` : null,
    project.business_pressure ? `Business Pressure: ${project.business_pressure}` : null,
    project.technical_dependency_level ? `Technische Abhaengigkeit: ${project.technical_dependency_level}` : null,
    project.supplier_power_level ? `Supplier Power: ${project.supplier_power_level}` : null,
    project.desired_delivery_time ?? requestItem?.target_delivery_time ?? requestItem?.required_delivery_date
      ? `Lieferzeit: ${project.desired_delivery_time ?? requestItem?.target_delivery_time ?? requestItem?.required_delivery_date}`
      : null,
  ].filter(Boolean);

  return [
    {
      label: "Verhandlungsziel",
      value: project.objective?.trim() || "Noch nicht definiert. Dieses Ziel sollte vor der Simulation konkretisiert werden.",
    },
    {
      label: "Preisanker",
      value: priceExpectation
        ? `Preisvorstellung als Ausgangswert vorhanden: ${priceExpectation}. Ein konkreter Preisanker ist noch nicht berechnet.`
        : "Noch nicht berechnet. Kann spaeter aus Preisvorstellung, Einkaufshistorie und Marktvergleich abgeleitet werden.",
    },
    {
      label: "WAP / Walk-away Point",
      value: "Noch nicht definiert. Der Walk-away Point sollte vor der Verhandlung festgelegt werden.",
    },
    {
      label: "BATNA",
      value: "Noch nicht definiert. Moegliche Alternativen sollten vor der Verhandlung geprueft werden.",
    },
    {
      label: "Hauptrisiken",
      value:
        riskSignals.length > 0
          ? `${riskSignals.join("; ")}. Diese Hinweise sind noch keine bewertete Risikoanalyse.`
          : "Noch keine Risiken bewertet. Relevante Risiken koennen aus Lieferzeit, Warengruppe, Lieferantenmacht und Abhaengigkeiten entstehen.",
    },
    {
      label: "Moegliche Konzessionen",
      value: "Noch nicht definiert. Konzessionen sollten nur gegen Gegenleistung geplant werden.",
    },
    {
      label: "Empfohlene Argumentationslinie",
      value: "Noch nicht ausgearbeitet. Spaeter koennen TCO, Lieferfaehigkeit, Qualitaet, Risiko und Beziehung als Argumentationsachsen genutzt werden.",
    },
    {
      label: "Offene Fragen vor der Verhandlung",
      value: "Welche Informationen fehlen noch, um Ziel, WAP, BATNA und Konzessionslogik belastbar zu definieren?",
    },
  ];
}

function formatMoney(amount?: string | null, currency?: string | null) {
  return [amount, currency].filter(Boolean).join(" ");
}
