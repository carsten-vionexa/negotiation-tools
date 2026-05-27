import Link from "next/link";
import { revalidatePath } from "next/cache";
import { ArrowRight, ClipboardList, Plus } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { EmptyState, ErrorState } from "@/components/state-patterns";
import { listCompanies } from "@/lib/api/companies";
import { createRequestItem, listRequestItems } from "@/lib/api/request-items";
import { optionalFormString, requiredFormString } from "@/lib/form-data";

export default async function RequestItemsPage() {
  let companies;
  let requestItems;

  try {
    [companies, requestItems] = await Promise.all([listCompanies(), listRequestItems()]);
  } catch (error) {
    return (
      <>
        <PageHeader
          eyebrow="Stammdaten"
          title="Anfragepositionen"
          description="Strukturierte Bedarfe fuer importierte Anfragenkataloge und Verhandlungsprojekte."
        />
        <ErrorState title="Anfragepositionen konnten nicht geladen werden." description={getErrorDescription(error)} />
      </>
    );
  }

  const companyById = new Map(companies.map((company) => [company.id, company]));

  return (
    <>
      <PageHeader
        eyebrow="Stammdaten"
        title="Anfragepositionen"
        description="Strukturierte Bedarfe fuer importierte Anfragenkataloge und Verhandlungsprojekte."
      />

      <section className="rounded-md border border-border bg-card p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-base font-semibold">Anfrageposition anlegen</h2>
          <Link href="/projects" className="text-sm font-medium text-primary hover:underline">
            In Projekten zuordnen
          </Link>
        </div>
        {companies.length === 0 ? (
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Lege zuerst eine Firma an, bevor Anfragepositionen erstellt werden.
          </p>
        ) : (
          <form action={createRequestItemAction} className="mt-4 grid gap-3 md:grid-cols-2">
            <SelectCompany companies={companies} />
            <Field label="Titel" name="title" required />
            <Field label="Artikel / Service" name="article_name" />
            <Field label="Kategorie" name="category" />
            <Field label="Menge" name="requested_quantity" type="number" step="any" />
            <Field label="Einheit" name="unit" />
            <Field label="Zielpreis" name="target_price" type="number" step="any" />
            <Field label="Preisannahme" name="rough_price_expectation" type="number" step="any" />
            <Field label="Waehrung" name="currency" />
            <Field label="Benoetigtes Lieferdatum" name="required_delivery_date" type="date" />
            <Field label="Ziel-Lieferzeit" name="target_delivery_time" />
            <Field label="Zielregion" name="target_region" />
            <Field label="Prioritaet" name="priority" />
            <Field label="Status" name="status" defaultValue="open" />
            <TextArea label="Artikel-/Servicebeschreibung" name="article_description" />
            <TextArea label="Spezifikation" name="specification" />
            <TextArea label="Kommentar" name="comment" />
            <div className="md:col-span-2">
              <button className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
                <Plus className="size-4" />
                Anlegen
              </button>
            </div>
          </form>
        )}
      </section>

      {requestItems.length === 0 ? (
        <EmptyState
          title="Noch keine Anfragepositionen vorhanden."
          description="Lege einen strukturierten Bedarf an oder importiere einen Anfragenkatalog, um ihn danach in Projekten auszuwaehlen."
        />
      ) : (
        <section className="grid gap-3">
          {requestItems.map((item) => (
            <Link
              key={item.id}
              href={`/request-items/${item.id}`}
              className="rounded-md border border-border bg-card p-5 hover:bg-muted"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <ClipboardList className="size-4 shrink-0 text-muted-foreground" />
                    <h2 className="font-semibold">{item.title}</h2>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {[item.article_name, item.category, companyById.get(item.company_id)?.name, item.status].filter(Boolean).join(" - ")}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Menge: {formatQuantity(item.requested_quantity, item.unit)} - Zielpreis: {formatPrice(item.target_price, item.currency)} -
                    Lieferung: {item.required_delivery_date || item.target_delivery_time || "Nicht gesetzt"} - Region:{" "}
                    {item.target_region || "Nicht gesetzt"}
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

async function createRequestItemAction(formData: FormData) {
  "use server";

  await createRequestItem({
    company_id: requiredFormString(formData, "company_id", "Firma"),
    title: requiredFormString(formData, "title", "Titel"),
    article_name: optionalFormString(formData, "article_name"),
    article_description: optionalFormString(formData, "article_description"),
    category: optionalFormString(formData, "category"),
    specification: optionalFormString(formData, "specification"),
    requested_quantity: optionalFormString(formData, "requested_quantity"),
    unit: optionalFormString(formData, "unit"),
    target_price: optionalFormString(formData, "target_price"),
    rough_price_expectation: optionalFormString(formData, "rough_price_expectation"),
    currency: optionalFormString(formData, "currency"),
    required_delivery_date: optionalFormString(formData, "required_delivery_date"),
    target_delivery_time: optionalFormString(formData, "target_delivery_time"),
    target_region: optionalFormString(formData, "target_region"),
    priority: optionalFormString(formData, "priority"),
    status: optionalFormString(formData, "status") ?? "open",
    comment: optionalFormString(formData, "comment"),
  });
  revalidatePath("/request-items");
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

function Field({
  label,
  name,
  required = false,
  defaultValue,
  type = "text",
  step,
}: {
  label: string;
  name: string;
  required?: boolean;
  defaultValue?: string;
  type?: string;
  step?: string;
}) {
  return (
    <label>
      <span className="text-sm font-medium">{label}</span>
      <input
        name={name}
        required={required}
        defaultValue={defaultValue}
        type={type}
        step={step}
        className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
      />
    </label>
  );
}

function TextArea({ label, name }: { label: string; name: string }) {
  return (
    <label className="md:col-span-2">
      <span className="text-sm font-medium">{label}</span>
      <textarea name={name} rows={3} className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm" />
    </label>
  );
}

function formatQuantity(quantity?: string | null, unit?: string | null) {
  return [quantity, unit].filter(Boolean).join(" ") || "Nicht gesetzt";
}

function formatPrice(price?: string | null, currency?: string | null) {
  return [price, currency].filter(Boolean).join(" ") || "Nicht gesetzt";
}

function getErrorDescription(error: unknown) {
  return error instanceof Error ? error.message : "Bitte pruefe, ob das Backend erreichbar ist.";
}
