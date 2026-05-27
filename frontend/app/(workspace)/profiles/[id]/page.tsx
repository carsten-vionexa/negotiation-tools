import Link from "next/link";
import { revalidatePath } from "next/cache";
import { ArrowLeft, ArrowRight, Save } from "lucide-react";

import { EmptyState, ErrorState } from "@/components/state-patterns";
import { PageHeader } from "@/components/page-header";
import { listCompanies } from "@/lib/api/companies";
import { listNegotiationProjects } from "@/lib/api/negotiation-projects";
import { getUserProfile, updateUserProfile } from "@/lib/api/user-profiles";
import { optionalFormString, requiredFormString } from "@/lib/form-data";

export default async function ProfileDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let companies;
  let profile;
  let projects;

  try {
    [companies, profile, projects] = await Promise.all([
      listCompanies(),
      getUserProfile(id),
      listNegotiationProjects({ owner_id: id }),
    ]);
  } catch (error) {
    return (
      <>
        <PageHeader
          eyebrow="Stammdaten"
          title="Profildetail"
          description="Rollenprofil und verknuepfte Projekte."
          actions={<BackLink href="/profiles" label="Zurueck" />}
        />
        <ErrorState title="Profil konnte nicht geladen werden." description={getErrorDescription(error)} />
      </>
    );
  }

  return (
    <>
      <PageHeader
        eyebrow="Stammdaten"
        title={profile.display_name}
        description="Rollenprofil und verknuepfte Projekte."
        actions={<BackLink href="/profiles" label="Zurueck" />}
      />

      <section className="rounded-md border border-border bg-card p-5">
        <h2 className="text-base font-semibold">Profil bearbeiten</h2>
        <form action={updateProfileAction.bind(null, profile.id)} className="mt-4 grid gap-3 md:grid-cols-2">
          <label>
            <span className="text-sm font-medium">Firma</span>
            <select
              name="company_id"
              required
              defaultValue={profile.company_id}
              className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
            >
              {companies.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.name}
                </option>
              ))}
            </select>
          </label>
          <Field label="Display Name" name="display_name" defaultValue={profile.display_name} required />
          <Field label="Rolle" name="role" defaultValue={profile.role} />
          <Field label="Department" name="department" defaultValue={profile.department} />
          <Field label="E-Mail" name="email" defaultValue={profile.email} />
          <label className="md:col-span-2">
            <span className="text-sm font-medium">Notizen / Profilhinweise</span>
            <textarea
              name="notes"
              rows={4}
              defaultValue={profile.notes ?? ""}
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
        <h2 className="text-base font-semibold">Als Owner verknuepfte Projekte</h2>
        {projects.length === 0 ? (
          <div className="mt-4">
            <EmptyState title="Keine Projekte verknuepft." description="Das Profil kann in der Projektanlage als Owner ausgewaehlt werden." />
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

async function updateProfileAction(id: string, formData: FormData) {
  "use server";

  await updateUserProfile(id, {
    company_id: requiredFormString(formData, "company_id", "Firma"),
    display_name: requiredFormString(formData, "display_name", "Display Name"),
    role: optionalFormString(formData, "role"),
    department: optionalFormString(formData, "department"),
    email: optionalFormString(formData, "email"),
    notes: optionalFormString(formData, "notes"),
  });
  revalidatePath("/profiles");
  revalidatePath(`/profiles/${id}`);
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
