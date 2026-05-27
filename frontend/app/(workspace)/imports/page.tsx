import Link from "next/link";
import { ArrowRight, FileInput } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { EmptyState, ErrorState } from "@/components/state-patterns";
import { listCompanies } from "@/lib/api/companies";
import { listImportJobs } from "@/lib/api/import-jobs";
import { listNegotiationProjects } from "@/lib/api/negotiation-projects";

export default async function ImportsPage() {
  let companies;
  let imports;
  let projects;

  try {
    [companies, imports, projects] = await Promise.all([
      listCompanies(),
      listImportJobs(),
      listNegotiationProjects(),
    ]);
  } catch (error) {
    return (
      <>
        <PageHeader
          eyebrow="Datenbasis"
          title="Imports"
          description="Status- und Reviewansicht bestehender CSV- und XLSX-ImportJobs."
        />
        <ErrorState title="ImportJobs konnten nicht geladen werden." description={getErrorDescription(error)} />
      </>
    );
  }

  const companyById = new Map(companies.map((company) => [company.id, company.name]));
  const projectById = new Map(projects.map((project) => [project.id, project.title]));

  return (
    <>
      <PageHeader
        eyebrow="Datenbasis"
        title="Imports"
        description="Status- und Reviewansicht bestehender CSV- und XLSX-ImportJobs."
      />

      {imports.length === 0 ? (
        <EmptyState
          title="Noch keine ImportJobs vorhanden."
          description="Sobald ein ImportJob angelegt wurde, werden Datei, Verarbeitungsstand und Reviewdaten hier sichtbar."
        />
      ) : (
        <section className="grid gap-3">
          {imports.map((importJob) => (
            <Link
              key={importJob.id}
              href={`/imports/${importJob.id}`}
              className="rounded-md border border-border bg-card p-5 hover:bg-muted"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <FileInput className="size-4 shrink-0 text-muted-foreground" />
                    <h2 className="font-semibold">{importJob.original_filename || importJob.filename}</h2>
                    <Status value={importJob.status} />
                  </div>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Company: {companyById.get(importJob.company_id) ?? "Unbekannt"} - Projekt:{" "}
                    {importJob.project_id ? projectById.get(importJob.project_id) ?? "Unbekannt" : "Nicht gesetzt"}
                  </p>
                  <p className="text-sm leading-6 text-muted-foreground">
                    Quelle: {importJob.source_type} - Zielobjekt: {importJob.target_entity} - Erstellt: {formatDate(importJob.created_at)}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm">
                    <Counter label="Zeilen" value={importJob.total_rows} />
                    <Counter label="Verarbeitet" value={importJob.processed_rows} />
                    <Counter label="Gueltig" value={importJob.valid_rows} />
                    <Counter label="Fehler" value={importJob.error_rows} />
                  </div>
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

function Status({ value }: { value: string }) {
  return <span className="rounded-full border border-border px-2 py-0.5 text-xs font-medium text-muted-foreground">{value}</span>;
}

function Counter({ label, value }: { label: string; value: number }) {
  return (
    <span>
      <span className="text-muted-foreground">{label}:</span> {value}
    </span>
  );
}

function formatDate(date?: string) {
  if (!date) {
    return "Nicht vorhanden";
  }

  return new Intl.DateTimeFormat("de-DE", { dateStyle: "medium", timeStyle: "short" }).format(new Date(date));
}

function getErrorDescription(error: unknown) {
  return error instanceof Error ? error.message : "Bitte pruefe, ob das Backend erreichbar ist.";
}
