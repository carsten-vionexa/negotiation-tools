import Link from "next/link";
import { revalidatePath } from "next/cache";
import { ArrowRight, Building2, Plus } from "lucide-react";

import { EmptyState, ErrorState } from "@/components/state-patterns";
import { PageHeader } from "@/components/page-header";
import { createCompany, listCompanies } from "@/lib/api/companies";
import { optionalFormString, requiredFormString } from "@/lib/form-data";

export default async function CompaniesPage() {
  let companies;

  try {
    companies = await listCompanies();
  } catch (error) {
    return (
      <>
        <PageHeader
          eyebrow="Stammdaten"
          title="Firmen"
          description="Company-Kontext fuer Projekte, Rollenprofile und Lieferantenprofile."
        />
        <ErrorState title="Firmen konnten nicht geladen werden." description={getErrorDescription(error)} />
      </>
    );
  }

  return (
    <>
      <PageHeader
        eyebrow="Stammdaten"
        title="Firmen"
        description="Company-Kontext fuer Projekte, Rollenprofile und Lieferantenprofile."
      />

      <section className="rounded-md border border-border bg-card p-5">
        <h2 className="text-base font-semibold">Firma anlegen</h2>
        <form action={createCompanyAction} className="mt-4 grid gap-3 md:grid-cols-2">
          <Field label="Name" name="name" required />
          <Field label="Branche" name="industry" />
          <Field label="Land" name="country" />
          <Field label="Website" name="website" />
          <label className="md:col-span-2">
            <span className="text-sm font-medium">Beschreibung</span>
            <textarea
              name="description"
              rows={3}
              className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
            />
          </label>
          <div className="md:col-span-2">
            <button className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
              <Plus className="size-4" />
              Anlegen
            </button>
          </div>
        </form>
      </section>

      {companies.length === 0 ? (
        <EmptyState title="Noch keine Firmen vorhanden." description="Lege eine Firma an, um Profile und Projekte daran zu verknuepfen." />
      ) : (
        <section className="grid gap-3">
          {companies.map((company) => (
            <Link
              key={company.id}
              href={`/companies/${company.id}`}
              className="rounded-md border border-border bg-card p-5 hover:bg-muted"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <Building2 className="size-4 shrink-0 text-muted-foreground" />
                    <h2 className="font-semibold">{company.name}</h2>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {[company.industry, company.country].filter(Boolean).join(" · ") || "Keine Branche oder Land gepflegt"}
                  </p>
                  {company.description ? (
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">{company.description}</p>
                  ) : null}
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

async function createCompanyAction(formData: FormData) {
  "use server";

  await createCompany({
    name: requiredFormString(formData, "name", "Name"),
    industry: optionalFormString(formData, "industry"),
    country: optionalFormString(formData, "country"),
    website: optionalFormString(formData, "website"),
    description: optionalFormString(formData, "description"),
  });
  revalidatePath("/companies");
}

function Field({ label, name, required = false }: { label: string; name: string; required?: boolean }) {
  return (
    <label>
      <span className="text-sm font-medium">{label}</span>
      <input
        name={name}
        required={required}
        className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
      />
    </label>
  );
}

function getErrorDescription(error: unknown) {
  return error instanceof Error ? error.message : "Bitte pruefe, ob das Backend erreichbar ist.";
}
