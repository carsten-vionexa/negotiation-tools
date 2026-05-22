import Link from "next/link";
import { revalidatePath } from "next/cache";
import { ArrowLeft, ArrowRight, Building2, ClipboardList, Database, MessageSquareText, Save, Sparkles, Target } from "lucide-react";
import type { ReactNode } from "react";

import { ErrorState } from "@/components/state-patterns";
import { PageHeader } from "@/components/page-header";
import { listCompanies } from "@/lib/api/companies";
import { getNegotiationProject, updateNegotiationProject } from "@/lib/api/negotiation-projects";
import { listRequestItems } from "@/lib/api/request-items";
import { listSupplierProfiles } from "@/lib/api/supplier-profiles";
import { listUserProfiles } from "@/lib/api/user-profiles";

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

  return (
    <>
      <PageHeader
        eyebrow="Projektflow"
        title={project.title}
        description="Projektkontext, Beziehungen und operative Stammdaten."
        actions={<BackLink href="/projects" label="Zurueck" />}
      />

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
              label="Supplier Profile"
              name="supplier_profile_id"
              defaultValue={project.supplier_profile_id}
              options={suppliers.map((supplier) => ({
                value: supplier.id,
                label: `${supplier.name} (${companyById.get(supplier.company_id)?.name ?? "Firma unbekannt"})`,
              }))}
            />
            <Select
              label="Request Item"
              name="request_item_id"
              defaultValue={project.request_item_id}
              options={requestItems.map((item) => ({
                value: item.id,
                label: `${item.title} (${companyById.get(item.company_id)?.name ?? "Firma unbekannt"})`,
              }))}
            />
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
            <Meta label="Supplier" value={supplierById.get(project.supplier_profile_id ?? "")?.name ?? "Nicht gesetzt"} />
            <Meta label="Request Item" value={requestById.get(project.request_item_id ?? "")?.title ?? "Nicht gesetzt"} />
            <Meta label="Status" value={project.status} />
            <Meta label="Kategorie" value={project.category || "Nicht gesetzt"} />
            <Meta label="Prioritaet" value={project.priority || "Nicht gesetzt"} />
          </dl>
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
    company_id: requiredString(formData, "company_id"),
    owner_id: optionalString(formData, "owner_id"),
    supplier_profile_id: optionalString(formData, "supplier_profile_id"),
    request_item_id: optionalString(formData, "request_item_id"),
    title: requiredString(formData, "title"),
    status: optionalString(formData, "status") ?? "draft",
    negotiation_type: optionalString(formData, "negotiation_type"),
    project_type: optionalString(formData, "project_type"),
    category: optionalString(formData, "category"),
    article_or_service: optionalString(formData, "article_or_service"),
    quantity: optionalString(formData, "quantity"),
    target_region: optionalString(formData, "target_region"),
    desired_delivery_time: optionalString(formData, "desired_delivery_time"),
    internal_price_expectation: optionalString(formData, "internal_price_expectation"),
    currency: optionalString(formData, "currency"),
    current_supplier: optionalString(formData, "current_supplier"),
    priority: optionalString(formData, "priority"),
    business_pressure: optionalString(formData, "business_pressure"),
    technical_dependency_level: optionalString(formData, "technical_dependency_level"),
    supplier_power_level: optionalString(formData, "supplier_power_level"),
    risk_level: optionalString(formData, "risk_level"),
    objective: optionalString(formData, "objective"),
    context: optionalString(formData, "context"),
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

function optionalString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function requiredString(formData: FormData, key: string) {
  return optionalString(formData, key) ?? "";
}

function getErrorDescription(error: unknown) {
  return error instanceof Error ? error.message : "Bitte pruefe, ob das Backend erreichbar ist.";
}
