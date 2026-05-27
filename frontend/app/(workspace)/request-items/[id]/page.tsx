import Link from "next/link";
import { revalidatePath } from "next/cache";
import { ArrowLeft, ArrowRight, Save } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { EmptyState, ErrorState } from "@/components/state-patterns";
import { listCompanies } from "@/lib/api/companies";
import { listNegotiationProjects } from "@/lib/api/negotiation-projects";
import { getRequestItem, updateRequestItem } from "@/lib/api/request-items";

export default async function RequestItemDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let companies;
  let requestItem;
  let projects;

  try {
    [companies, requestItem, projects] = await Promise.all([
      listCompanies(),
      getRequestItem(id),
      listNegotiationProjects({ request_item_id: id }),
    ]);
  } catch (error) {
    return (
      <>
        <PageHeader
          eyebrow="Stammdaten"
          title="Anfrageposition"
          description="Strukturierter Bedarf und verknuepfte Verhandlungsprojekte."
          actions={<BackLink href="/request-items" label="Zurueck" />}
        />
        <ErrorState title="Anfrageposition konnte nicht geladen werden." description={getErrorDescription(error)} />
      </>
    );
  }

  return (
    <>
      <PageHeader
        eyebrow="Stammdaten"
        title={requestItem.title}
        description="Strukturierter Bedarf und verknuepfte Verhandlungsprojekte."
        actions={<BackLink href="/request-items" label="Zurueck" />}
      />

      <section className="rounded-md border border-border bg-card p-5">
        <h2 className="text-base font-semibold">Anfrageposition bearbeiten</h2>
        <form action={updateRequestItemAction.bind(null, requestItem.id)} className="mt-4 grid gap-3 md:grid-cols-2">
          <label>
            <span className="text-sm font-medium">Firma</span>
            <select
              name="company_id"
              required
              defaultValue={requestItem.company_id}
              className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
            >
              {companies.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.name}
                </option>
              ))}
            </select>
          </label>
          <Field label="Titel" name="title" defaultValue={requestItem.title} required />
          <Field label="Artikel / Service" name="article_name" defaultValue={requestItem.article_name} />
          <Field label="Kategorie" name="category" defaultValue={requestItem.category} />
          <Field label="Menge" name="requested_quantity" defaultValue={requestItem.requested_quantity} type="number" step="any" />
          <Field label="Einheit" name="unit" defaultValue={requestItem.unit} />
          <Field label="Zielpreis" name="target_price" defaultValue={requestItem.target_price} type="number" step="any" />
          <Field
            label="Preisannahme"
            name="rough_price_expectation"
            defaultValue={requestItem.rough_price_expectation}
            type="number"
            step="any"
          />
          <Field label="Waehrung" name="currency" defaultValue={requestItem.currency} />
          <Field label="Benoetigtes Lieferdatum" name="required_delivery_date" defaultValue={requestItem.required_delivery_date} type="date" />
          <Field label="Ziel-Lieferzeit" name="target_delivery_time" defaultValue={requestItem.target_delivery_time} />
          <Field label="Zielregion" name="target_region" defaultValue={requestItem.target_region} />
          <Field label="Prioritaet" name="priority" defaultValue={requestItem.priority} />
          <Field label="Status" name="status" defaultValue={requestItem.status} required />
          <TextArea label="Artikel-/Servicebeschreibung" name="article_description" defaultValue={requestItem.article_description} />
          <TextArea label="Spezifikation" name="specification" defaultValue={requestItem.specification} />
          <TextArea label="Kommentar" name="comment" defaultValue={requestItem.comment} />
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
              description="Diese Anfrageposition kann in der Projektanlage oder Projektbearbeitung ausgewaehlt werden."
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

async function updateRequestItemAction(id: string, formData: FormData) {
  "use server";

  await updateRequestItem(id, {
    company_id: requiredString(formData, "company_id"),
    title: requiredString(formData, "title"),
    article_name: optionalString(formData, "article_name"),
    article_description: optionalString(formData, "article_description"),
    category: optionalString(formData, "category"),
    specification: optionalString(formData, "specification"),
    requested_quantity: optionalString(formData, "requested_quantity"),
    unit: optionalString(formData, "unit"),
    target_price: optionalString(formData, "target_price"),
    rough_price_expectation: optionalString(formData, "rough_price_expectation"),
    currency: optionalString(formData, "currency"),
    required_delivery_date: optionalString(formData, "required_delivery_date"),
    target_delivery_time: optionalString(formData, "target_delivery_time"),
    target_region: optionalString(formData, "target_region"),
    priority: optionalString(formData, "priority"),
    status: requiredString(formData, "status"),
    comment: optionalString(formData, "comment"),
  });
  revalidatePath("/request-items");
  revalidatePath(`/request-items/${id}`);
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
  type = "text",
  step,
}: {
  label: string;
  name: string;
  defaultValue?: string | null;
  required?: boolean;
  type?: string;
  step?: string;
}) {
  return (
    <label>
      <span className="text-sm font-medium">{label}</span>
      <input
        name={name}
        required={required}
        defaultValue={defaultValue ?? ""}
        type={type}
        step={step}
        className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
      />
    </label>
  );
}

function TextArea({ label, name, defaultValue }: { label: string; name: string; defaultValue?: string | null }) {
  return (
    <label className="md:col-span-2">
      <span className="text-sm font-medium">{label}</span>
      <textarea
        name={name}
        rows={3}
        defaultValue={defaultValue ?? ""}
        className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
      />
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
