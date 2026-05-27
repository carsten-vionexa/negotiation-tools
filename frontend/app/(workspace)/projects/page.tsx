import Link from "next/link";
import { revalidatePath } from "next/cache";
import { ArrowRight, FolderKanban, Plus } from "lucide-react";

import { EmptyState, ErrorState } from "@/components/state-patterns";
import { PageHeader } from "@/components/page-header";
import { listCompanies } from "@/lib/api/companies";
import { createNegotiationProject, listNegotiationProjects } from "@/lib/api/negotiation-projects";
import { listRequestItems } from "@/lib/api/request-items";
import { listSupplierProfiles } from "@/lib/api/supplier-profiles";
import { listUserProfiles } from "@/lib/api/user-profiles";

export default async function ProjectsPage() {
  let companies;
  let profiles;
  let suppliers;
  let requestItems;
  let projects;

  try {
    [companies, profiles, suppliers, requestItems, projects] = await Promise.all([
      listCompanies(),
      listUserProfiles(),
      listSupplierProfiles(),
      listRequestItems(),
      listNegotiationProjects(),
    ]);
  } catch (error) {
    return (
      <>
        <PageHeader
          eyebrow="Projektflow"
          title="Verhandlungsprojekte"
          description="Projektliste mit Company-, Owner-, Supplier- und Anfragebezug."
        />
        <ErrorState title="Projekte konnten nicht geladen werden." description={getErrorDescription(error)} />
      </>
    );
  }

  const companyById = new Map(companies.map((company) => [company.id, company]));
  const profileById = new Map(profiles.map((profile) => [profile.id, profile]));
  const supplierById = new Map(suppliers.map((supplier) => [supplier.id, supplier]));
  const requestById = new Map(requestItems.map((item) => [item.id, item]));

  return (
    <>
      <PageHeader
        eyebrow="Projektflow"
        title="Verhandlungsprojekte"
        description="Projektliste mit Company-, Owner-, Supplier- und Anfragebezug."
      />

      <section className="rounded-md border border-border bg-card p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-base font-semibold">Projekt anlegen</h2>
          <div className="flex flex-wrap gap-4">
            <Link href="/suppliers" className="text-sm font-medium text-primary hover:underline">
              Lieferantenprofile pflegen
            </Link>
            <Link href="/request-items" className="text-sm font-medium text-primary hover:underline">
              Anfragepositionen pflegen
            </Link>
          </div>
        </div>
        {companies.length === 0 ? (
          <p className="mt-3 text-sm leading-6 text-muted-foreground">Lege zuerst eine Firma an, bevor Projekte erstellt werden.</p>
        ) : (
          <>
            {suppliers.length === 0 ? (
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Noch kein strukturiertes Lieferantenprofil vorhanden. Lege eines unter Lieferanten an, damit es hier auswaehlbar ist.
              </p>
            ) : null}
            {requestItems.length === 0 ? (
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Noch keine strukturierte Anfrageposition vorhanden. Lege eine unter Anfragepositionen an, damit sie hier auswaehlbar ist.
              </p>
            ) : null}
            <form action={createProjectAction} className="mt-4 grid gap-3 md:grid-cols-2">
              <Field label="Titel" name="title" required />
              <Select label="Firma" name="company_id" required options={companies.map((company) => ({ value: company.id, label: company.name }))} />
              <Select
                label="Owner"
                name="owner_id"
                options={profiles.map((profile) => ({
                  value: profile.id,
                  label: `${profile.display_name} (${companyById.get(profile.company_id)?.name ?? "Firma unbekannt"})`,
                }))}
              />
              <Select
                label="Lieferantenprofil"
                name="supplier_profile_id"
                options={suppliers.map((supplier) => ({
                  value: supplier.id,
                  label: `${supplier.name} (${companyById.get(supplier.company_id)?.name ?? "Firma unbekannt"})`,
                }))}
              />
              <Select
                label="Anfrageposition"
                name="request_item_id"
                options={requestItems.map((item) => ({
                  value: item.id,
                  label: `${item.title} (${companyById.get(item.company_id)?.name ?? "Firma unbekannt"})`,
                }))}
              />
              <Field label="Status" name="status" defaultValue="draft" />
              <Field label="Kategorie" name="category" />
              <Field label="Prioritaet" name="priority" />
              <Field label="Artikel / Service" name="article_or_service" />
              <Field label="Zielregion" name="target_region" />
              <label className="md:col-span-2">
                <span className="text-sm font-medium">Ziel / Objective</span>
                <textarea name="objective" rows={3} className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm" />
              </label>
              <label className="md:col-span-2">
                <span className="text-sm font-medium">Kontext / Notizen</span>
                <textarea name="context" rows={3} className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm" />
              </label>
              <div className="md:col-span-2">
                <button className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
                  <Plus className="size-4" />
                  Anlegen
                </button>
              </div>
            </form>
          </>
        )}
      </section>

      {projects.length === 0 ? (
        <EmptyState title="Noch keine Verhandlungsprojekte vorhanden." description="Lege ein erstes Projekt mit Company-Bezug an." />
      ) : (
        <section className="grid gap-3">
          {projects.map((project) => (
            <Link key={project.id} href={`/projects/${project.id}`} className="rounded-md border border-border bg-card p-5 hover:bg-muted">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <FolderKanban className="size-4 shrink-0 text-muted-foreground" />
                    <h2 className="font-semibold">{project.title}</h2>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {[project.status, project.category, project.priority, companyById.get(project.company_id)?.name]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Owner: {profileById.get(project.owner_id ?? "")?.display_name ?? "Nicht gesetzt"} · Supplier:{" "}
                    {supplierById.get(project.supplier_profile_id ?? "")?.name ?? "Nicht gesetzt"} · Anfrage:{" "}
                    {requestById.get(project.request_item_id ?? "")?.title ?? "Nicht gesetzt"}
                  </p>
                </div>
                <ArrowRight className="mt-1 size-4 shrink-0" />
              </div>
            </Link>
          ))}
        </section>
      )}
    </>
  );
}

async function createProjectAction(formData: FormData) {
  "use server";

  await createNegotiationProject({
    company_id: requiredString(formData, "company_id"),
    owner_id: optionalString(formData, "owner_id"),
    supplier_profile_id: optionalString(formData, "supplier_profile_id"),
    request_item_id: optionalString(formData, "request_item_id"),
    title: requiredString(formData, "title"),
    status: optionalString(formData, "status") ?? "draft",
    category: optionalString(formData, "category"),
    priority: optionalString(formData, "priority"),
    article_or_service: optionalString(formData, "article_or_service"),
    target_region: optionalString(formData, "target_region"),
    objective: optionalString(formData, "objective"),
    context: optionalString(formData, "context"),
  });
  revalidatePath("/projects");
}

function Field({
  label,
  name,
  required = false,
  defaultValue,
}: {
  label: string;
  name: string;
  required?: boolean;
  defaultValue?: string;
}) {
  return (
    <label>
      <span className="text-sm font-medium">{label}</span>
      <input
        name={name}
        required={required}
        defaultValue={defaultValue}
        className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
      />
    </label>
  );
}

function Select({
  label,
  name,
  options,
  required = false,
}: {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  required?: boolean;
}) {
  return (
    <label>
      <span className="text-sm font-medium">{label}</span>
      <select name={name} required={required} className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm">
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
