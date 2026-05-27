import Link from "next/link";
import { revalidatePath } from "next/cache";
import { ArrowLeft, ArrowRight, Save } from "lucide-react";

import { EmptyState, ErrorState } from "@/components/state-patterns";
import { PageHeader } from "@/components/page-header";
import { getCompany, updateCompany } from "@/lib/api/companies";
import { listNegotiationProjects } from "@/lib/api/negotiation-projects";
import { optionalFormString, requiredFormString } from "@/lib/form-data";

export default async function CompanyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let company;
  let projects;

  try {
    [company, projects] = await Promise.all([getCompany(id), listNegotiationProjects({ company_id: id })]);
  } catch (error) {
    return (
      <>
        <PageHeader
          eyebrow="Stammdaten"
          title="Firmendetail"
          description="Stammdaten und verknuepfte Verhandlungsprojekte."
          actions={<BackLink href="/companies" label="Zurueck" />}
        />
        <ErrorState title="Firma konnte nicht geladen werden." description={getErrorDescription(error)} />
      </>
    );
  }

  return (
    <>
      <PageHeader
        eyebrow="Stammdaten"
        title={company.name}
        description="Stammdaten und verknuepfte Verhandlungsprojekte."
        actions={<BackLink href="/companies" label="Zurueck" />}
      />

      <section className="grid gap-4 lg:grid-cols-[1fr_22rem]">
        <div className="rounded-md border border-border bg-card p-5">
          <h2 className="text-base font-semibold">Stammdaten bearbeiten</h2>
          <form action={updateCompanyAction.bind(null, company.id)} className="mt-4 grid gap-3 md:grid-cols-2">
            <Field label="Name" name="name" defaultValue={company.name} required />
            <Field label="Branche" name="industry" defaultValue={company.industry} />
            <Field label="Land" name="country" defaultValue={company.country} />
            <Field label="Website" name="website" defaultValue={company.website} />
            <label className="md:col-span-2">
              <span className="text-sm font-medium">Beschreibung</span>
              <textarea
                name="description"
                rows={5}
                defaultValue={company.description ?? ""}
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
          <h2 className="text-base font-semibold">Kurzprofil</h2>
          <dl className="mt-4 grid gap-3 text-sm">
            <Meta label="Branche" value={company.industry} />
            <Meta label="Land" value={company.country} />
            <Meta label="Website" value={company.website} />
          </dl>
        </aside>
      </section>

      <section className="rounded-md border border-border bg-card p-5">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-base font-semibold">Verknuepfte Projekte</h2>
          <Link href="/projects" className="text-sm font-medium text-primary">
            Alle Projekte
          </Link>
        </div>
        {projects.length === 0 ? (
          <div className="mt-4">
            <EmptyState title="Noch keine Projekte fuer diese Firma." description="Projekte koennen in der Projektliste angelegt werden." />
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

async function updateCompanyAction(id: string, formData: FormData) {
  "use server";

  await updateCompany(id, {
    name: requiredFormString(formData, "name", "Name"),
    industry: optionalFormString(formData, "industry"),
    country: optionalFormString(formData, "country"),
    website: optionalFormString(formData, "website"),
    description: optionalFormString(formData, "description"),
  });
  revalidatePath("/companies");
  revalidatePath(`/companies/${id}`);
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

function Meta({ label, value }: { label: string; value?: string | null }) {
  return (
    <div>
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="mt-1 font-medium">{value || "Nicht gepflegt"}</dd>
    </div>
  );
}

function getErrorDescription(error: unknown) {
  return error instanceof Error ? error.message : "Bitte pruefe, ob das Backend erreichbar ist.";
}
