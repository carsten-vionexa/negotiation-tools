import Link from "next/link";
import { ArrowRight, Database, FileText, HelpCircle, History, Lightbulb, TableProperties } from "lucide-react";
import type { ReactNode } from "react";

import { EmptyState, ErrorState } from "@/components/state-patterns";
import { PageHeader } from "@/components/page-header";
import { listCompanies } from "@/lib/api/companies";
import { listImportJobs } from "@/lib/api/import-jobs";
import { listImportRows } from "@/lib/api/import-rows";
import { listKnowledgeClaims } from "@/lib/api/knowledge-claims";
import { listKnowledgeDocuments } from "@/lib/api/knowledge-documents";
import { getNegotiationProject, listNegotiationProjects, type NegotiationProjectSummary } from "@/lib/api/negotiation-projects";
import { listProcurementHistoryItems } from "@/lib/api/procurement-history-items";
import { listRequestItems } from "@/lib/api/request-items";

type KnowledgeBaseSearchParams = {
  companyId?: string;
  projectId?: string;
};

export default async function KnowledgeBasePage({ searchParams }: { searchParams: Promise<KnowledgeBaseSearchParams> }) {
  const { companyId, projectId } = await searchParams;

  let companies;
  let projects;
  let selectedProject: NegotiationProjectSummary | null = null;

  try {
    [companies, projects] = await Promise.all([listCompanies(), listNegotiationProjects()]);
    selectedProject = projectId ? await getNegotiationProject(projectId) : null;
  } catch (error) {
    return (
      <>
        <PageHeader
          eyebrow="Datenbasis"
          title="Datenbasis"
          description="Quellen, Wissensaussagen, Anfragepositionen und Einkaufsdaten als lesbare Arbeitsgrundlage."
        />
        <ErrorState title="Datenbasis konnte nicht geladen werden." description={getErrorDescription(error)} />
      </>
    );
  }

  const effectiveCompanyId = selectedProject?.company_id ?? companyId;
  const selectedCompany = companies.find((company) => company.id === effectiveCompanyId) ?? null;
  const projectOptions = effectiveCompanyId ? projects.filter((project) => project.company_id === effectiveCompanyId) : projects;

  let documents;
  let claims;
  let requestItems;
  let historyItems;
  let importJobs;
  let importRows;

  try {
    [documents, claims, requestItems, historyItems, importJobs, importRows] = await Promise.all([
      listKnowledgeDocuments({
        company_id: effectiveCompanyId,
        negotiation_project_id: selectedProject?.id,
      }),
      listKnowledgeClaims({
        company_id: effectiveCompanyId,
        negotiation_project_id: selectedProject?.id,
      }),
      listRequestItems({ company_id: effectiveCompanyId }),
      listProcurementHistoryItems({ company_id: effectiveCompanyId }),
      listImportJobs({
        company_id: effectiveCompanyId,
        negotiation_project_id: selectedProject?.id,
      }),
      listImportRows({
        company_id: effectiveCompanyId,
        negotiation_project_id: selectedProject?.id,
        limit: 20,
      }),
    ]);
  } catch (error) {
    return (
      <>
        <PageHeader
          eyebrow="Datenbasis"
          title="Datenbasis"
          description={getScopeDescription(selectedCompany?.name, selectedProject?.title)}
        />
        <ErrorState title="Datenbasis-Listen konnten nicht geladen werden." description={getErrorDescription(error)} />
      </>
    );
  }

  const scopedRequestItems = selectedProject?.request_item_id
    ? requestItems.filter((item) => item.id === selectedProject.request_item_id)
    : requestItems;

  const gaps = buildDataGaps({
    hasScope: Boolean(effectiveCompanyId || selectedProject),
    documents: documents.length,
    claims: claims.length,
    requestItems: scopedRequestItems.length,
    historyItems: historyItems.length,
  });

  return (
    <>
      <PageHeader
        eyebrow="Datenbasis"
        title="Datenbasis"
        description={getScopeDescription(selectedCompany?.name, selectedProject?.title)}
        actions={selectedProject ? <ActionLink href={`/analysis?projectId=${selectedProject.id}`} label="Analyse vorbereiten" /> : null}
      />

      <section className="rounded-md border border-border bg-card p-5">
        <div className="flex items-start gap-3">
          <Database className="mt-1 size-5 text-muted-foreground" />
          <div className="min-w-0 flex-1">
            <h2 className="text-base font-semibold">Auswahl</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {selectedProject
                ? `Projektkontext: ${selectedProject.title}`
                : selectedCompany
                  ? `Company-Kontext: ${selectedCompany.name}`
                  : "Waehle eine Company oder ein Projekt, um die Datenbasis fachlich einzugrenzen."}
            </p>
            <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {companies.map((company) => (
                <Link key={company.id} href={`/knowledge-base?companyId=${company.id}`} className="rounded-md border border-border px-3 py-2 text-sm hover:bg-muted">
                  {company.name}
                </Link>
              ))}
              {projectOptions.slice(0, 6).map((project) => (
                <Link key={project.id} href={`/knowledge-base?projectId=${project.id}`} className="rounded-md border border-border px-3 py-2 text-sm hover:bg-muted">
                  {project.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <DataSection
          icon={<FileText className="size-4" />}
          title="Quellen / Dokumente"
          emptyTitle="Keine Quellen vorhanden."
          emptyDescription="Fuer diesen Kontext sind noch keine Knowledge Documents angelegt."
          items={documents}
          renderItem={(document) => (
            <ItemBlock
              title={document.title || document.original_filename || document.filename}
              meta={[document.document_type, document.source, document.parsing_status, `${document.chunk_count} Chunks`]}
              description={document.description}
            />
          )}
        />

        <DataSection
          icon={<Lightbulb className="size-4" />}
          title="Claims / Wissensaussagen"
          emptyTitle="Keine Claims vorhanden."
          emptyDescription="Wissensaussagen werden hier sichtbar, sobald sie manuell oder spaeter ueber einen separaten Prozess gepflegt wurden."
          items={claims}
          renderItem={(claim) => (
            <ItemBlock
              title={claim.claim_text}
              meta={[claim.information_kind, claim.claim_type, claim.claim_category, claim.confidence_level]}
              description={claim.evidence_text}
            />
          )}
        />

        <DataSection
          icon={<TableProperties className="size-4" />}
          title="Anfragepositionen"
          emptyTitle="Keine Anfragepositionen vorhanden."
          emptyDescription="Fuer diesen Kontext ist noch keine passende Anfrageposition gepflegt."
          items={scopedRequestItems}
          renderItem={(item) => (
            <ItemBlock
              title={item.title}
              meta={[item.category, item.priority, item.status, formatQuantity(item.requested_quantity, item.unit), item.target_region]}
              description={item.article_description || item.specification || item.comment}
            />
          )}
        />

        <DataSection
          icon={<History className="size-4" />}
          title="Einkaufshistorie"
          emptyTitle="Keine Einkaufshistorie vorhanden."
          emptyDescription="Historische Einkaufsdaten sind fuer diese Company noch nicht gepflegt."
          items={historyItems}
          renderItem={(item) => (
            <ItemBlock
              title={item.item_name}
              meta={[item.supplier_name, item.category, formatMoney(item.unit_price, item.currency), item.purchased_at]}
              description={item.notes || item.improvement_potential || item.price_assessment}
            />
          )}
        />
      </section>

      <section className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-md border border-border bg-card p-5">
          <div className="flex items-center gap-2">
            <HelpCircle className="size-4 text-muted-foreground" />
            <h2 className="text-base font-semibold">Datenlage / Datenluecken</h2>
          </div>
          <div className="mt-4 grid gap-2">
            {gaps.map((gap) => (
              <p key={gap} className="rounded-md bg-muted px-3 py-2 text-sm text-muted-foreground">
                {gap}
              </p>
            ))}
          </div>
        </div>

        <div className="rounded-md border border-border bg-card p-5">
          <h2 className="text-base font-semibold">Importstatus / Datenlage</h2>
          {importJobs.length === 0 && importRows.length === 0 ? (
            <p className="mt-3 text-sm leading-6 text-muted-foreground">Keine Importjobs oder Importzeilen fuer diesen Kontext vorhanden.</p>
          ) : (
            <div className="mt-4 grid gap-3">
              {importJobs.slice(0, 5).map((job) => (
                <ItemBlock
                  key={job.id}
                  title={job.original_filename || job.filename}
                  meta={[job.status, job.source_type, job.target_entity, `${job.valid_rows}/${job.total_rows} gueltig`]}
                  description={job.error_summary}
                />
              ))}
              {importRows.length > 0 ? (
                <p className="text-sm text-muted-foreground">{importRows.length} Importzeilen als Statusauszug geladen.</p>
              ) : null}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function DataSection<T>({
  icon,
  title,
  items,
  renderItem,
  emptyTitle,
  emptyDescription,
}: {
  icon: ReactNode;
  title: string;
  items: T[];
  renderItem: (item: T) => ReactNode;
  emptyTitle: string;
  emptyDescription: string;
}) {
  return (
    <section className="rounded-md border border-border bg-card p-5">
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground">{icon}</span>
        <h2 className="text-base font-semibold">{title}</h2>
      </div>
      {items.length === 0 ? (
        <div className="mt-4">
          <EmptyState title={emptyTitle} description={emptyDescription} />
        </div>
      ) : (
        <div className="mt-4 grid gap-3">{items.slice(0, 8).map((item, index) => <div key={index}>{renderItem(item)}</div>)}</div>
      )}
    </section>
  );
}

function ItemBlock({ title, meta, description }: { title: string; meta: Array<string | number | null | undefined>; description?: string | null }) {
  return (
    <div className="rounded-md border border-border p-3">
      <p className="text-sm font-medium leading-6">{title}</p>
      <p className="mt-1 text-xs leading-5 text-muted-foreground">{meta.filter(Boolean).join(" - ") || "Keine Metadaten"}</p>
      {description ? <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p> : null}
    </div>
  );
}

function ActionLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm font-medium hover:bg-muted">
      {label}
      <ArrowRight className="size-4" />
    </Link>
  );
}

function buildDataGaps({
  hasScope,
  documents,
  claims,
  requestItems,
  historyItems,
}: {
  hasScope: boolean;
  documents: number;
  claims: number;
  requestItems: number;
  historyItems: number;
}) {
  const gaps: string[] = [];

  if (!hasScope) {
    gaps.push("Noch kein Company- oder Projektkontext ausgewaehlt.");
  }
  if (documents === 0) {
    gaps.push("Quellenlage offen: keine Dokumente verknuepft.");
  }
  if (claims === 0) {
    gaps.push("Wissenslage offen: keine Claims gepflegt.");
  }
  if (requestItems === 0) {
    gaps.push("Anfragekontext offen: keine Anfrageposition zugeordnet.");
  }
  if (historyItems === 0) {
    gaps.push("Einkaufshistorie offen: keine Vergleichsdaten vorhanden.");
  }

  return gaps.length > 0 ? gaps : ["Datenbasis ist fuer einen ersten Analyse-Check befuellt."];
}

function getScopeDescription(companyName?: string, projectTitle?: string) {
  if (projectTitle) {
    return `Lesende Datenbasis fuer Projekt "${projectTitle}"${companyName ? ` bei ${companyName}` : ""}.`;
  }

  if (companyName) {
    return `Lesende Datenbasis fuer ${companyName}.`;
  }

  return "Quellen, Wissensaussagen, Anfragepositionen und Einkaufsdaten als lesbare Arbeitsgrundlage.";
}

function formatQuantity(quantity?: string | null, unit?: string | null) {
  return [quantity, unit].filter(Boolean).join(" ") || null;
}

function formatMoney(amount?: string | null, currency?: string | null) {
  return [amount, currency].filter(Boolean).join(" ") || null;
}

function getErrorDescription(error: unknown) {
  return error instanceof Error ? error.message : "Bitte pruefe, ob das Backend erreichbar ist.";
}
