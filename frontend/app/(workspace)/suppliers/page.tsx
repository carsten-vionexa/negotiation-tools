import Link from "next/link";
import { revalidatePath } from "next/cache";
import { ArrowRight, Handshake, Plus } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { EmptyState, ErrorState } from "@/components/state-patterns";
import { listCompanies } from "@/lib/api/companies";
import { createSupplierProfile, listSupplierProfiles } from "@/lib/api/supplier-profiles";
import { optionalFormString, requiredFormString } from "@/lib/form-data";

export default async function SuppliersPage() {
  let companies;
  let suppliers;

  try {
    [companies, suppliers] = await Promise.all([listCompanies(), listSupplierProfiles()]);
  } catch (error) {
    return (
      <>
        <PageHeader
          eyebrow="Stammdaten"
          title="Lieferanten"
          description="Strukturierte SupplierProfiles fuer Projektbeziehungen und Verhandlungskontext."
        />
        <ErrorState title="Lieferanten konnten nicht geladen werden." description={getErrorDescription(error)} />
      </>
    );
  }

  const companyById = new Map(companies.map((company) => [company.id, company]));

  return (
    <>
      <PageHeader
        eyebrow="Stammdaten"
        title="Lieferanten"
        description="Strukturierte SupplierProfiles fuer Projektbeziehungen und Verhandlungskontext."
      />

      <section className="rounded-md border border-border bg-card p-5">
        <h2 className="text-base font-semibold">Lieferantenprofil anlegen</h2>
        {companies.length === 0 ? (
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Lege zuerst eine Firma an, bevor Lieferantenprofile erstellt werden.
          </p>
        ) : (
          <form action={createSupplierAction} className="mt-4 grid gap-3 md:grid-cols-2">
            <SelectCompany companies={companies} />
            <Field label="Name" name="name" required />
            <Field label="Land" name="country" />
            <Field label="Region" name="region" />
            <Field label="Kategorie / Branche" name="industry" />
            <Field label="Lieferantentyp" name="supplier_type" />
            <Field label="Beziehungsstatus" name="relationship_status" />
            <Field label="Risiko" name="risk_level" />
            <Field label="Ansprechpartner" name="contact_name" />
            <Field label="E-Mail" name="contact_email" />
            <label className="md:col-span-2">
              <span className="text-sm font-medium">Notizen</span>
              <textarea name="notes" rows={3} className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm" />
            </label>
            <div className="md:col-span-2">
              <button className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
                <Plus className="size-4" />
                Anlegen
              </button>
            </div>
          </form>
        )}
      </section>

      {suppliers.length === 0 ? (
        <EmptyState
          title="Noch keine Lieferantenprofile vorhanden."
          description="Lege einen strukturierten Lieferanten an, um ihn danach in Verhandlungsprojekten auszuwaehlen."
        />
      ) : (
        <section className="grid gap-3">
          {suppliers.map((supplier) => (
            <Link
              key={supplier.id}
              href={`/suppliers/${supplier.id}`}
              className="rounded-md border border-border bg-card p-5 hover:bg-muted"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <Handshake className="size-4 shrink-0 text-muted-foreground" />
                    <h2 className="font-semibold">{supplier.name}</h2>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {[supplier.country, supplier.industry, supplier.supplier_type, companyById.get(supplier.company_id)?.name]
                      .filter(Boolean)
                      .join(" - ") || "Keine Kategorie oder Region gepflegt"}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Beziehung: {supplier.relationship_status || "Nicht gesetzt"} - Risiko: {supplier.risk_level || "Nicht gesetzt"}
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

async function createSupplierAction(formData: FormData) {
  "use server";

  await createSupplierProfile({
    company_id: requiredFormString(formData, "company_id", "Firma"),
    name: requiredFormString(formData, "name", "Name"),
    country: optionalFormString(formData, "country"),
    region: optionalFormString(formData, "region"),
    industry: optionalFormString(formData, "industry"),
    supplier_type: optionalFormString(formData, "supplier_type"),
    relationship_status: optionalFormString(formData, "relationship_status"),
    risk_level: optionalFormString(formData, "risk_level"),
    contact_name: optionalFormString(formData, "contact_name"),
    contact_email: optionalFormString(formData, "contact_email"),
    notes: optionalFormString(formData, "notes"),
  });
  revalidatePath("/suppliers");
  revalidatePath("/projects");
}

function SelectCompany({ companies }: { companies: { id: string; name: string }[] }) {
  return (
    <label>
      <span className="text-sm font-medium">Firma</span>
      <select name="company_id" required className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm">
        {companies.map((company) => (
          <option key={company.id} value={company.id}>
            {company.name}
          </option>
        ))}
      </select>
    </label>
  );
}

function Field({ label, name, required = false }: { label: string; name: string; required?: boolean }) {
  return (
    <label>
      <span className="text-sm font-medium">{label}</span>
      <input name={name} required={required} className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm" />
    </label>
  );
}

function getErrorDescription(error: unknown) {
  return error instanceof Error ? error.message : "Bitte pruefe, ob das Backend erreichbar ist.";
}
