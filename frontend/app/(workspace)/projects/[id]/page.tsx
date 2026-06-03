import Link from "next/link";
import { revalidatePath } from "next/cache";
import { ArrowLeft, ArrowRight, Building2, ClipboardList, Database, Handshake, MessageSquareText, Save, Sparkles, Target } from "lucide-react";
import type { ReactNode } from "react";

import { ErrorState } from "@/components/state-patterns";
import { PageHeader } from "@/components/page-header";
import { listCompanies } from "@/lib/api/companies";
import { getNegotiationProject, updateNegotiationProject, type NegotiationProjectRead } from "@/lib/api/negotiation-projects";
import { getRequestItem, listRequestItems, type RequestItemRead } from "@/lib/api/request-items";
import { listSupplierProfiles } from "@/lib/api/supplier-profiles";
import { listUserProfiles } from "@/lib/api/user-profiles";
import { optionalFormString, requiredFormString } from "@/lib/form-data";

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let companies;
  let profiles;
  let suppliers;
  let requestItems;
  let project;

  try {
    [companies, profiles, suppliers, requestItems, project] = await Promise.all([
      listCompanies(),
      listUserProfiles(),
      listSupplierProfiles(),
      listRequestItems(),
      getNegotiationProject(id),
    ]);
  } catch (error) {
    return (
      <>
        <PageHeader
          eyebrow="Projektflow"
          title="Projektdetail"
          description="Projektkontext, Beziehungen und operative Stammdaten."
          actions={<BackLink href="/projects" label="Zurueck" />}
        />
        <ErrorState title="Projekt konnte nicht geladen werden." description={getErrorDescription(error)} />
      </>
    );
  }

  const companyById = new Map(companies.map((company) => [company.id, company]));
  const profileById = new Map(profiles.map((profile) => [profile.id, profile]));
  const supplierById = new Map(suppliers.map((supplier) => [supplier.id, supplier]));
  const requestById = new Map(requestItems.map((item) => [item.id, item]));
  const company = companyById.get(project.company_id);
  const owner = profileById.get(project.owner_id ?? "");
  const supplier = supplierById.get(project.supplier_profile_id ?? "");
  let requestItem = requestById.get(project.request_item_id ?? "");

  if (project.request_item_id && !requestItem) {
    try {
      requestItem = await getRequestItem(project.request_item_id);
    } catch {
      requestItem = undefined;
    }
  }

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
    { label: "Interne Stakeholder", value: displayValue(owner?.display_name) },
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
  const strategySnapshotFields = buildStrategySnapshotFields(project, requestItem);

  return (
    <>
      <PageHeader
        eyebrow="Projektflow"
        title={project.title}
        description="Projektkontext, Beziehungen und operative Stammdaten."
        actions={<BackLink href="/projects" label="Zurueck" />}
      />

      <section className="rounded-md border border-border bg-card p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold">Verhandlungsvorbereitung</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Diese Uebersicht bildet die Ausgangslage fuer die spaetere Strategieentwicklung, ZOPA-/BATNA-Arbeit und Simulation.
            </p>
          </div>
          {requestItem ? (
            <Link
              href={`/request-items/${requestItem.id}`}
              className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm font-medium text-primary hover:bg-muted"
            >
              <ClipboardList className="size-4" />
              Anfrageposition oeffnen
            </Link>
          ) : null}
        </div>

        <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
          {preparationOverviewFields.map((item) => (
            <Meta key={item.label} label={item.label} value={item.value} />
          ))}
        </dl>

        <div className="mt-4 grid gap-4 border-t border-border pt-4 md:grid-cols-2">
          <div>
            <h3 className="text-sm font-medium">Verknuepfter RequestItem-Kontext</h3>
            <dl className="mt-3 grid gap-3 text-sm">
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
            <p className="mt-3 whitespace-pre-line text-sm leading-6 text-muted-foreground">{requestItemContext || "Noch nicht angegeben"}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium">Projektkontext</h3>
            <p className="mt-3 whitespace-pre-line text-sm leading-6 text-muted-foreground">{displayValue(project.context)}</p>
          </div>
        </div>
      </section>

      <section className="rounded-md border border-border bg-card p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold">Strategie-Snapshot</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Vorbereitende Demo-Struktur fuer Strategiebausteine. Diese Werte sind nicht KI-generiert und enthalten keine automatische ZOPA-,
              BATNA- oder Preisanker-Berechnung.
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

      <section className="grid gap-4 lg:grid-cols-[1fr_22rem]">
        <div className="rounded-md border border-border bg-card p-5">
          <h2 className="text-base font-semibold">Projekt bearbeiten</h2>
          <form action={updateProjectAction.bind(null, project.id)} className="mt-4 grid gap-3 md:grid-cols-2">
            <Field label="Titel" name="title" defaultValue={project.title} required />
            <Select
              label="Firma"
              name="company_id"
              required
              defaultValue={project.company_id}
              options={companies.map((item) => ({ value: item.id, label: item.name }))}
            />
            <Select
              label="Owner"
              name="owner_id"
              defaultValue={project.owner_id}
              options={profiles.map((profile) => ({
                value: profile.id,
                label: `${profile.display_name} (${companyById.get(profile.company_id)?.name ?? "Firma unbekannt"})`,
              }))}
            />
            <Select
              label="Lieferantenprofil"
              name="supplier_profile_id"
              defaultValue={project.supplier_profile_id}
              options={suppliers.map((supplier) => ({
                value: supplier.id,
                label: `${supplier.name} (${companyById.get(supplier.company_id)?.name ?? "Firma unbekannt"})`,
              }))}
            />
            <p className="text-xs leading-5 text-muted-foreground md:col-span-2">
              Lieferantenprofile lassen sich unter{" "}
              <Link href="/suppliers" className="font-medium text-primary hover:underline">
                Lieferanten
              </Link>{" "}
              anlegen und pflegen. Der Freitextwert fuer aktuelle Lieferanten bleibt fuer bestehenden Projektkontext erhalten.
            </p>
            <Select
              label="Anfrageposition"
              name="request_item_id"
              defaultValue={project.request_item_id}
              options={requestItems.map((item) => ({
                value: item.id,
                label: `${item.title} (${companyById.get(item.company_id)?.name ?? "Firma unbekannt"})`,
              }))}
            />
            <p className="text-xs leading-5 text-muted-foreground md:col-span-2">
              Strukturierte Bedarfe lassen sich unter{" "}
              <Link href="/request-items" className="font-medium text-primary hover:underline">
                Anfragepositionen
              </Link>{" "}
              anlegen und pflegen. Projektinterne Anfragefelder bleiben fuer zusaetzlichen Kontext erhalten.
            </p>
            <Field label="Status" name="status" defaultValue={project.status} />
            <Field label="Kategorie" name="category" defaultValue={project.category} />
            <Field label="Prioritaet" name="priority" defaultValue={project.priority} />
            <Field label="Verhandlungsart" name="negotiation_type" defaultValue={project.negotiation_type} />
            <Field label="Projekttyp" name="project_type" defaultValue={project.project_type} />
            <Field label="Artikel / Service" name="article_or_service" defaultValue={project.article_or_service} />
            <Field label="Menge" name="quantity" defaultValue={project.quantity} />
            <Field label="Zielregion" name="target_region" defaultValue={project.target_region} />
            <Field label="Ziel-Lieferzeit" name="desired_delivery_time" defaultValue={project.desired_delivery_time} />
            <Field label="Interne Preisannahme" name="internal_price_expectation" defaultValue={project.internal_price_expectation} />
            <Field label="Waehrung" name="currency" defaultValue={project.currency} />
            <Field label="Aktueller Lieferant" name="current_supplier" defaultValue={project.current_supplier} />
            <Field label="Business Pressure" name="business_pressure" defaultValue={project.business_pressure} />
            <Field label="Technische Abhaengigkeit" name="technical_dependency_level" defaultValue={project.technical_dependency_level} />
            <Field label="Supplier Power" name="supplier_power_level" defaultValue={project.supplier_power_level} />
            <Field label="Risiko" name="risk_level" defaultValue={project.risk_level} />
            <label className="md:col-span-2">
              <span className="text-sm font-medium">Ziel / Objective</span>
              <textarea
                name="objective"
                rows={3}
                defaultValue={project.objective ?? ""}
                className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
              />
            </label>
            <label className="md:col-span-2">
              <span className="text-sm font-medium">Kontext / Notizen</span>
              <textarea
                name="context"
                rows={5}
                defaultValue={project.context ?? ""}
                className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
              />
            </label>
            <div className="md:col-span-2">
              <button className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
                <Save className="size-4" />
                Speichern
              </button>
            </div>
          </form>
        </div>

        <aside className="rounded-md border border-border bg-card p-5">
          <h2 className="text-base font-semibold">Beziehungen</h2>
          <dl className="mt-4 grid gap-3 text-sm">
            <Meta
              label="Company"
              value={
                company ? (
                  <Link href={`/companies/${company.id}`} className="inline-flex items-center gap-2 text-primary">
                    <Building2 className="size-4" />
                    {company.name}
                  </Link>
                ) : (
                  "Unbekannt"
                )
              }
            />
            <Meta label="Owner" value={profileById.get(project.owner_id ?? "")?.display_name ?? "Nicht gesetzt"} />
            <Meta
              label="Lieferantenprofil"
              value={
                supplier ? (
                  <Link href={`/suppliers/${supplier.id}`} className="inline-flex items-center gap-2 text-primary">
                    <Handshake className="size-4" />
                    {supplier.name}
                  </Link>
                ) : (
                  "Nicht gesetzt"
                )
              }
            />
            {supplier ? (
              <Meta
                label="Lieferantenkontext"
                value={[supplier.country, supplier.industry, supplier.relationship_status].filter(Boolean).join(" - ") || "Keine Details gepflegt"}
              />
            ) : null}
            <Meta
              label="Anfrageposition"
              value={
                requestItem ? (
                  <Link href={`/request-items/${requestItem.id}`} className="inline-flex items-center gap-2 text-primary">
                    <ClipboardList className="size-4" />
                    {requestItem.title}
                  </Link>
                ) : (
                  "Nicht gesetzt"
                )
              }
            />
            {requestItem ? (
              <>
                <Meta label="Artikel / Service" value={requestItem.article_name || "Nicht gesetzt"} />
                <Meta label="Menge" value={[requestItem.requested_quantity, requestItem.unit].filter(Boolean).join(" ") || "Nicht gesetzt"} />
                <Meta label="Zielpreis" value={[requestItem.target_price, requestItem.currency].filter(Boolean).join(" ") || "Nicht gesetzt"} />
                <Meta label="Lieferdatum" value={requestItem.required_delivery_date || requestItem.target_delivery_time || "Nicht gesetzt"} />
                <Meta label="Zielregion" value={requestItem.target_region || "Nicht gesetzt"} />
              </>
            ) : null}
            <Meta label="Status" value={project.status} />
            <Meta label="Kategorie" value={project.category || "Nicht gesetzt"} />
            <Meta label="Prioritaet" value={project.priority || "Nicht gesetzt"} />
          </dl>
          <div className="mt-5 rounded-md border border-border bg-muted/40 p-3 text-sm leading-6">
            <p className="font-medium">Naechster Schritt</p>
            <p className="mt-1 text-muted-foreground">Projektdaten pruefen und anschliessend Analyse oder Strategie vorbereiten.</p>
          </div>
          <div className="mt-5 grid gap-2 border-t border-border pt-4">
            <FlowLink href={`/knowledge-base?projectId=${project.id}`} label="Datenbasis anzeigen" icon={<Database className="size-4" />} />
            <FlowLink href={`/analysis?projectId=${project.id}`} label="Analyse vorbereiten" icon={<Sparkles className="size-4" />} />
            <FlowLink href={`/strategy?projectId=${project.id}`} label="Strategie vorbereiten" icon={<Target className="size-4" />} />
            <FlowLink href={`/simulation?projectId=${project.id}`} label="Szenario konfigurieren" icon={<ClipboardList className="size-4" />} />
            <FlowLink href={`/trainer-review?projectId=${project.id}`} label="Trainerreview" icon={<MessageSquareText className="size-4" />} />
          </div>
        </aside>
      </section>
    </>
  );
}

async function updateProjectAction(id: string, formData: FormData) {
  "use server";

  await updateNegotiationProject(id, {
    company_id: requiredFormString(formData, "company_id", "Firma"),
    owner_id: optionalFormString(formData, "owner_id"),
    supplier_profile_id: optionalFormString(formData, "supplier_profile_id"),
    request_item_id: optionalFormString(formData, "request_item_id"),
    title: requiredFormString(formData, "title", "Titel"),
    status: optionalFormString(formData, "status") ?? "draft",
    negotiation_type: optionalFormString(formData, "negotiation_type"),
    project_type: optionalFormString(formData, "project_type"),
    category: optionalFormString(formData, "category"),
    article_or_service: optionalFormString(formData, "article_or_service"),
    quantity: optionalFormString(formData, "quantity"),
    target_region: optionalFormString(formData, "target_region"),
    desired_delivery_time: optionalFormString(formData, "desired_delivery_time"),
    internal_price_expectation: optionalFormString(formData, "internal_price_expectation"),
    currency: optionalFormString(formData, "currency"),
    current_supplier: optionalFormString(formData, "current_supplier"),
    priority: optionalFormString(formData, "priority"),
    business_pressure: optionalFormString(formData, "business_pressure"),
    technical_dependency_level: optionalFormString(formData, "technical_dependency_level"),
    supplier_power_level: optionalFormString(formData, "supplier_power_level"),
    risk_level: optionalFormString(formData, "risk_level"),
    objective: optionalFormString(formData, "objective"),
    context: optionalFormString(formData, "context"),
  });
  revalidatePath("/projects");
  revalidatePath(`/projects/${id}`);
}

function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm font-medium hover:bg-muted">
      <ArrowLeft className="size-4" />
      {label}
    </Link>
  );
}

function FlowLink({ href, label, icon }: { href: string; label: string; icon: ReactNode }) {
  return (
    <Link href={href} className="inline-flex items-center justify-between gap-3 rounded-md border border-border px-3 py-2 text-sm font-medium hover:bg-muted">
      <span className="inline-flex items-center gap-2">
        {icon}
        {label}
      </span>
      <ArrowRight className="size-4" />
    </Link>
  );
}

function Field({
  label,
  name,
  defaultValue,
  required = false,
}: {
  label: string;
  name: string;
  defaultValue?: string | null;
  required?: boolean;
}) {
  return (
    <label>
      <span className="text-sm font-medium">{label}</span>
      <input
        name={name}
        required={required}
        defaultValue={defaultValue ?? ""}
        className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
      />
    </label>
  );
}

function Select({
  label,
  name,
  options,
  defaultValue,
  required = false,
}: {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  defaultValue?: string | null;
  required?: boolean;
}) {
  return (
    <label>
      <span className="text-sm font-medium">{label}</span>
      <select
        name={name}
        required={required}
        defaultValue={defaultValue ?? ""}
        className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
      >
        {!required ? <option value="">Nicht gesetzt</option> : null}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function Meta({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div>
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="mt-1 font-medium">{value}</dd>
    </div>
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

function displayValue(value?: string | null) {
  return value?.trim() || "Noch nicht angegeben";
}

function formatQuantity(quantity?: string | null, unit?: string | null) {
  return [quantity, unit].filter(Boolean).join(" ");
}

function formatMoney(amount?: string | null, currency?: string | null) {
  return [amount, currency].filter(Boolean).join(" ");
}

function getErrorDescription(error: unknown) {
  return error instanceof Error ? error.message : "Bitte pruefe, ob das Backend erreichbar ist.";
}
