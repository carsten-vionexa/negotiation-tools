import Link from "next/link";
import { revalidatePath } from "next/cache";
import { ArrowRight, Plus, UserRound } from "lucide-react";

import { EmptyState, ErrorState } from "@/components/state-patterns";
import { PageHeader } from "@/components/page-header";
import { listCompanies } from "@/lib/api/companies";
import { createUserProfile, listUserProfiles } from "@/lib/api/user-profiles";

export default async function ProfilesPage() {
  let companies;
  let profiles;

  try {
    [companies, profiles] = await Promise.all([listCompanies(), listUserProfiles()]);
  } catch (error) {
    return (
      <>
        <PageHeader
          eyebrow="Stammdaten"
          title="Rollenprofile"
          description="UserProfile-Liste fuer interne Rollen, Owner und fachliche Hinweise."
        />
        <ErrorState title="Profile konnten nicht geladen werden." description={getErrorDescription(error)} />
      </>
    );
  }

  const companyById = new Map(companies.map((company) => [company.id, company]));

  return (
    <>
      <PageHeader
        eyebrow="Stammdaten"
        title="Rollenprofile"
        description="UserProfile-Liste fuer interne Rollen, Owner und fachliche Hinweise."
      />

      <section className="rounded-md border border-border bg-card p-5">
        <h2 className="text-base font-semibold">Profil anlegen</h2>
        {companies.length === 0 ? (
          <p className="mt-3 text-sm leading-6 text-muted-foreground">Lege zuerst eine Firma an, bevor Rollenprofile erstellt werden.</p>
        ) : (
          <form action={createProfileAction} className="mt-4 grid gap-3 md:grid-cols-2">
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
            <Field label="Display Name" name="display_name" required />
            <Field label="Rolle" name="role" />
            <Field label="Department" name="department" />
            <Field label="E-Mail" name="email" />
            <label className="md:col-span-2">
              <span className="text-sm font-medium">Notizen / Profilhinweise</span>
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

      {profiles.length === 0 ? (
        <EmptyState title="Noch keine Rollenprofile vorhanden." description="Profile koennen als Owner in Verhandlungsprojekten verwendet werden." />
      ) : (
        <section className="grid gap-3">
          {profiles.map((profile) => (
            <Link key={profile.id} href={`/profiles/${profile.id}`} className="rounded-md border border-border bg-card p-5 hover:bg-muted">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <UserRound className="size-4 shrink-0 text-muted-foreground" />
                    <h2 className="font-semibold">{profile.display_name}</h2>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {[profile.role, profile.department, companyById.get(profile.company_id)?.name].filter(Boolean).join(" · ") ||
                      "Keine Rolle gepflegt"}
                  </p>
                  {profile.notes ? <p className="mt-3 text-sm leading-6 text-muted-foreground">{profile.notes}</p> : null}
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

async function createProfileAction(formData: FormData) {
  "use server";

  await createUserProfile({
    company_id: requiredString(formData, "company_id"),
    display_name: requiredString(formData, "display_name"),
    role: optionalString(formData, "role"),
    department: optionalString(formData, "department"),
    email: optionalString(formData, "email"),
    notes: optionalString(formData, "notes"),
  });
  revalidatePath("/profiles");
}

function Field({ label, name, required = false }: { label: string; name: string; required?: boolean }) {
  return (
    <label>
      <span className="text-sm font-medium">{label}</span>
      <input name={name} required={required} className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm" />
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
