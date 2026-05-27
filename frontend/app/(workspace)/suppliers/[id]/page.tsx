import Link from "next/link";
import { revalidatePath } from "next/cache";
import { ArrowLeft, ArrowRight, Save } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { EmptyState, ErrorState } from "@/components/state-patterns";
import { listCompanies } from "@/lib/api/companies";
import { listNegotiationProjects } from "@/lib/api/negotiation-projects";
import { getSupplierProfile, updateSupplierProfile } from "@/lib/api/supplier-profiles";
import { optionalFormString, requiredFormString } from "@/lib/form-data";

export default async function SupplierDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let companies;
  let supplier;
  let projects;

  try {
    [companies, supplier, projects] = await Promise.all([
      listCompanies(),
      getSupplierProfile(id),
      listNegotiationProjects({ supplier_profile_id: id }),
    ]);
  } catch (error) {
    return (
      <>
        <PageHeader
          eyebrow="Stammdaten"
          title="Lieferantendetail"
          description="SupplierProfile und verknuepfte Verhandlungsprojekte."
          actions={<BackLink href="/suppliers" label="Zurueck" />}
        />
        <ErrorState title="Lieferantenprofil konnte nicht geladen werden." description={getErrorDescription(error)} />
      </>
    );
  }

  return (
    <>
      <PageHeader
        eyebrow="Stammdaten"
        title={supplier.name}
        description="SupplierProfile und verknuepfte Verhandlungsprojekte."
        actions={<BackLink href="/suppliers" label="Zurueck" />}
      />

      <section className="rounded-md border border-border bg-card p-5">
        <h2 className="text-base font-semibold">Lieferantenprofil bearbeiten</h2>
        <form action={updateSupplierAction.bind(null, supplier.id)} className="mt-4 grid gap-3 md:grid-cols-2">
          <label>
            <span className="text-sm font-medium">Firma</span>
            <select
              name="company_id"
              required
              defaultValue={supplier.company_id}
              className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
            >
              {companies.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.name}
                </option>
              ))}
            </select>
          </label>
          <Field label="Name" name="name" defaultValue={supplier.name} required />
          <Field label="Land" name="country" defaultValue={supplier.country} />
          <Field label="Region" name="region" defaultValue={supplier.region} />
          <Field label="Kategorie / Branche" name="industry" defaultValue={supplier.industry} />
          <Field label="Lieferantentyp" name="supplier_type" defaultValue={supplier.supplier_type} />
          <Field label="Supplier Power" name="power_level" defaultValue={supplier.power_level} />
          <Field label="Risiko" name="risk_level" defaultValue={supplier.risk_level} />
          <Field label="Beziehungsstatus" name="relationship_status" defaultValue={supplier.relationship_status} />
          <Field label="Website" name="website" defaultValue={supplier.website} />
          <Field label="Ansprechpartner" name="contact_name" defaultValue={supplier.contact_name} />
          <Field label="E-Mail" name="contact_email" defaultValue={supplier.contact_email} />
          <label className="md:col-span-2">
            <span className="text-sm font-medium">Kultureller Kontext</span>
            <textarea
              name="cultural_context"
              rows={3}
              defaultValue={supplier.cultural_context ?? ""}
              className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
            />
          </label>
          <label className="md:col-span-2">
            <span className="text-sm font-medium">Notizen</span>
            <textarea
              name="notes"
              rows={4}
              defaultValue={supplier.notes ?? ""}
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
      </section>

      <section className="rounded-md border border-border bg-card p-5">
        <h2 className="text-base font-semibold">Verknuepfte Projekte</h2>
        {projects.length === 0 ? (
          <div className="mt-4">
            <EmptyState
              title="Keine Projekte verknuepft."
              description="Dieses Lieferantenprofil kann in der Projektanlage oder Projektbearbeitung ausgewaehlt werden."
            />
          </div>
        ) : (
          <div className="mt-4 grid gap-2">
            {projects.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.id}`}
                className="flex items-center justify-between gap-3 rounded-md border border-border px-3 py-2 text-sm hover:bg-muted"
              >
                <span>
                  <span className="font-medium">{project.title}</span>
                  <span className="ml-2 text-muted-foreground">{project.status}</span>
                </span>
                <ArrowRight className="size-4 shrink-0" />
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

async function updateSupplierAction(id: string, formData: FormData) {
  "use server";

  await updateSupplierProfile(id, {
    company_id: requiredFormString(formData, "company_id", "Firma"),
    name: requiredFormString(formData, "name", "Name"),
    country: optionalFormString(formData, "country"),
    region: optionalFormString(formData, "region"),
    industry: optionalFormString(formData, "industry"),
    supplier_type: optionalFormString(formData, "supplier_type"),
    power_level: optionalFormString(formData, "power_level"),
    risk_level: optionalFormString(formData, "risk_level"),
    website: optionalFormString(formData, "website"),
    contact_name: optionalFormString(formData, "contact_name"),
    contact_email: optionalFormString(formData, "contact_email"),
    relationship_status: optionalFormString(formData, "relationship_status"),
    cultural_context: optionalFormString(formData, "cultural_context"),
    notes: optionalFormString(formData, "notes"),
  });
  revalidatePath("/suppliers");
  revalidatePath(`/suppliers/${id}`);
  revalidatePath("/projects");
}

function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm font-medium hover:bg-muted">
      <ArrowLeft className="size-4" />
      {label}
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

function getErrorDescription(error: unknown) {
  return error instanceof Error ? error.message : "Bitte pruefe, ob das Backend erreichbar ist.";
}
