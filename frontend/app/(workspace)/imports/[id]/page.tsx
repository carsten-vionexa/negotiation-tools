import Link from "next/link";
import { ArrowLeft, Building2, BriefcaseBusiness, PackageCheck } from "lucide-react";
import type { ReactNode } from "react";

import { PageHeader } from "@/components/page-header";
import { EmptyState, ErrorState } from "@/components/state-patterns";
import { getCompany } from "@/lib/api/companies";
import { getImportJob } from "@/lib/api/import-jobs";
import { listImportRows, type ImportRowSummary } from "@/lib/api/import-rows";
import { getNegotiationProject } from "@/lib/api/negotiation-projects";

import { ImportCreateTargetsForm } from "./create-targets-form";
import { ImportMappingForm } from "./mapping-form";
import { ImportParseForm } from "./parse-form";
import { ImportValidateForm } from "./validate-form";

export default async function ImportDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let company;
  let importJob;
  let project;
  let rows;

  try {
    [importJob, rows] = await Promise.all([getImportJob(id), listImportRows({ import_job_id: id })]);
    [company, project] = await Promise.all([
      getCompany(importJob.company_id),
      importJob.project_id ? getNegotiationProject(importJob.project_id) : Promise.resolve(null),
    ]);
  } catch (error) {
    return (
      <>
        <PageHeader
          eyebrow="Datenbasis"
          title="ImportJob"
          description="ImportJob-Status, Verarbeitungsmetadaten und reviewbare ImportRows."
          actions={<BackLink />}
        />
        <ErrorState title="ImportJob konnte nicht geladen werden." description={getErrorDescription(error)} />
      </>
    );
  }

  return (
    <>
      <PageHeader
        eyebrow="Datenbasis"
        title={importJob.original_filename || importJob.filename}
        description="ImportJob-Status, Verarbeitungsmetadaten und reviewbare ImportRows."
        actions={<BackLink />}
      />

      <section className="grid gap-4 lg:grid-cols-[1fr_22rem]">
        <div className="rounded-md border border-border bg-card p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-base font-semibold">Datei und Verarbeitung</h2>
            <Status value={importJob.status} />
          </div>
          <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
            <Meta label="Dateiname" value={importJob.original_filename || importJob.filename} />
            <Meta label="Gespeicherter Name" value={importJob.filename} />
            <Meta label="Source Type" value={importJob.source_type} />
            <Meta label="Target Entity" value={importJob.target_entity} />
            <Meta label="MIME-Type" value={importJob.mime_type || "Nicht vorhanden"} />
            <Meta label="Dateigroesse" value={formatBytes(importJob.file_size_bytes)} />
            <Meta label="Erstellt" value={formatDate(importJob.created_at)} />
            <Meta label="Aktualisiert" value={formatDate(importJob.updated_at)} />
            <Meta label="Gestartet" value={formatDate(importJob.started_at)} />
            <Meta label="Abgeschlossen" value={formatDate(importJob.completed_at)} />
            <Meta label="Storage Key" value={importJob.storage_key || "Nicht vorhanden"} />
            <Meta label="Checksum" value={importJob.checksum || "Nicht vorhanden"} />
          </dl>
        </div>

        <aside className="rounded-md border border-border bg-card p-5">
          <h2 className="text-base font-semibold">Beziehungen und Zaehler</h2>
          <dl className="mt-4 grid gap-3 text-sm">
            <Meta
              label="Company"
              value={
                <Link href={`/companies/${company.id}`} className="inline-flex items-center gap-2 text-primary hover:underline">
                  <Building2 className="size-4" />
                  {company.name}
                </Link>
              }
            />
            <Meta
              label="Projekt"
              value={
                project ? (
                  <Link href={`/projects/${project.id}`} className="inline-flex items-center gap-2 text-primary hover:underline">
                    <BriefcaseBusiness className="size-4" />
                    {project.title}
                  </Link>
                ) : (
                  "Nicht gesetzt"
                )
              }
            />
            <Meta label="Total Rows" value={importJob.total_rows} />
            <Meta label="Processed Rows" value={importJob.processed_rows} />
            <Meta label="Valid Rows" value={importJob.valid_rows} />
            <Meta label="Error Rows" value={importJob.error_rows} />
          </dl>
        </aside>
      </section>

      {importJob.status === "pending" ? (
        <ImportParseForm importJobId={importJob.id} />
      ) : (
        <section className="rounded-md border border-border bg-card p-5">
          <h2 className="text-base font-semibold">Parsing</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Parsing ist nur fuer ImportJobs im Status pending verfuegbar. Dieser Job hat bereits den Status {importJob.status}.
          </p>
        </section>
      )}

      {importJob.status === "parsed" ? (
        <ImportMappingForm
          importJobId={importJob.id}
          targetEntity={importJob.target_entity}
          sourceFields={getSourceFields(rows)}
          existingMapping={getExistingFieldMapping(importJob.mapping_json)}
        />
      ) : (
        <section className="rounded-md border border-border bg-card p-5">
          <h2 className="text-base font-semibold">Mapping</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Mapping ist nur fuer ImportJobs im Status parsed verfuegbar. Dieser Job hat den Status {importJob.status}.
          </p>
        </section>
      )}

      {importJob.status === "mapped" ? (
        <ImportValidateForm importJobId={importJob.id} />
      ) : (
        <section className="rounded-md border border-border bg-card p-5">
          <h2 className="text-base font-semibold">Validierung</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Validierung ist nur fuer ImportJobs im Status mapped verfuegbar. Dieser Job hat den Status {importJob.status}.
          </p>
        </section>
      )}

      {importJob.status === "validated" ? (
        <ImportCreateTargetsForm importJobId={importJob.id} />
      ) : isCompletedTargetCreationStatus(importJob.status) ? (
        <ImportCreateTargetsCompletedNotice
          status={importJob.status}
          createdTargetCount={getCreatedTargetCount(rows, importJob.valid_rows)}
          errorRows={importJob.error_rows}
        />
      ) : (
        <section className="rounded-md border border-border bg-card p-5">
          <h2 className="text-base font-semibold">Zielobjekte erzeugen</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Zielobjekte koennen nur fuer ImportJobs im Status validated erzeugt werden. Dieser Job hat den Status {importJob.status}.
          </p>
        </section>
      )}

      <section className="grid gap-4 lg:grid-cols-2">
        <JsonPanel title="Mapping-Konfiguration" value={importJob.mapping_json} />
        <JsonPanel title="Validation Summary" value={importJob.validation_summary_json} />
        <div className="rounded-md border border-border bg-card p-5 lg:col-span-2">
          <h2 className="text-base font-semibold">Error Summary</h2>
          <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-muted-foreground">
            {importJob.error_summary || "Keine Job-Level-Fehler erfasst."}
          </p>
        </div>
      </section>

      <section className="grid gap-4">
        <h2 className="text-base font-semibold">ImportRows</h2>
        {rows.length === 0 ? (
          <EmptyState
            title="Keine ImportRows vorhanden."
            description="Fuer diesen ImportJob liegen derzeit keine geparsten oder reviewbaren Zeilen vor."
          />
        ) : (
          rows
            .slice()
            .sort((left, right) => left.row_number - right.row_number)
            .map((row) => <ImportRowCard key={row.id} row={row} />)
        )}
      </section>
    </>
  );
}

function ImportRowCard({ row }: { row: ImportRowSummary }) {
  return (
    <article className="rounded-md border border-border bg-card p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-semibold">Zeile {row.row_number}</h3>
        <Status value={row.validation_status} />
      </div>
      <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
        <Meta label="Sheet" value={row.sheet_name || "Nicht gesetzt"} />
        <Meta label="Target Entity" value={row.target_entity || "Nicht gesetzt"} />
        <Meta label="Target Record ID" value={getTargetRecordValue(row)} />
        <Meta label="Validation Status" value={row.validation_status} />
      </dl>
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <JsonPanel title="Raw Data" value={row.raw_data_json} compact />
        <JsonPanel title="Mapped Data" value={row.mapped_data_json} compact />
      </div>
      <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
        <Meta label="Error Message" value={row.error_message || "Keine"} />
        <Meta label="Warning Message" value={row.warning_message || "Keine"} />
      </dl>
    </article>
  );
}

function ImportCreateTargetsCompletedNotice({
  status,
  createdTargetCount,
  errorRows,
}: {
  status: string;
  createdTargetCount: number;
  errorRows: number;
}) {
  const targetObjectLabel = formatTargetObjectCount(createdTargetCount);
  const targetObjectVerb = createdTargetCount === 1 ? "wurde" : "wurden";
  const errorRowVerb = errorRows === 1 ? "konnte" : "konnten";

  return (
    <section className="rounded-md border border-border bg-card p-5">
      <div className="flex items-start gap-3">
        <PackageCheck className="mt-0.5 size-5 text-primary" />
        <div>
          <h2 className="text-base font-semibold">Zielobjekte erzeugen abgeschlossen</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {createdTargetCount > 0
              ? `Die Aktion ist abgeschlossen. ${targetObjectLabel} ${targetObjectVerb} erzeugt und in den ImportRows als Zielreferenz hinterlegt.`
              : "Die Aktion ist abgeschlossen. Es wurden keine Zielobjekte erzeugt."}
          </p>
          {status === "completed_with_errors" ? (
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {formatErrorRowCount(errorRows)} {errorRowVerb} nicht importiert werden. Details stehen in den betroffenen ImportRows.
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function getTargetRecordValue(row: ImportRowSummary) {
  if (!row.target_record_id) {
    return "Nicht gesetzt";
  }

  if (row.target_entity === "request_item") {
    return (
      <Link href={`/request-items/${row.target_record_id}`} className="text-primary hover:underline">
        {row.target_record_id}
      </Link>
    );
  }

  return row.target_record_id;
}

function isCompletedTargetCreationStatus(status: string) {
  return status === "completed" || status === "completed_with_errors";
}

function getCreatedTargetCount(rows: ImportRowSummary[], validRows: number) {
  const rowsWithTargetRecord = rows.filter((row) => row.target_record_id).length;

  return rowsWithTargetRecord || validRows;
}

function formatTargetObjectCount(count: number) {
  return count === 1 ? "1 Zielobjekt" : `${new Intl.NumberFormat("de-DE").format(count)} Zielobjekte`;
}

function formatErrorRowCount(count: number) {
  return count === 1 ? "1 Zeile" : `${new Intl.NumberFormat("de-DE").format(count)} Zeilen`;
}

function JsonPanel({ title, value, compact = false }: { title: string; value?: Record<string, unknown>; compact?: boolean }) {
  return (
    <div className={`rounded-md border border-border bg-card ${compact ? "p-4" : "p-5"}`}>
      <h2 className={compact ? "text-sm font-semibold" : "text-base font-semibold"}>{title}</h2>
      <pre className="mt-3 overflow-x-auto rounded-md bg-muted p-3 text-xs leading-5">{JSON.stringify(value ?? {}, null, 2)}</pre>
    </div>
  );
}

function Meta({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div>
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="mt-1 break-all font-medium">{value}</dd>
    </div>
  );
}

function Status({ value }: { value: string }) {
  return <span className="rounded-full border border-border px-2 py-0.5 text-xs font-medium text-muted-foreground">{value}</span>;
}

function BackLink() {
  return (
    <Link href="/imports" className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm font-medium hover:bg-muted">
      <ArrowLeft className="size-4" />
      Zurueck
    </Link>
  );
}

function formatBytes(value?: number | null) {
  if (value === null || value === undefined) {
    return "Nicht vorhanden";
  }

  return `${new Intl.NumberFormat("de-DE").format(value)} Bytes`;
}

function formatDate(date?: string | null) {
  if (!date) {
    return "Nicht vorhanden";
  }

  return new Intl.DateTimeFormat("de-DE", { dateStyle: "medium", timeStyle: "short" }).format(new Date(date));
}

function getErrorDescription(error: unknown) {
  return error instanceof Error ? error.message : "Bitte pruefe, ob das Backend erreichbar ist.";
}

function getSourceFields(rows: ImportRowSummary[]) {
  return Array.from(new Set(rows.flatMap((row) => Object.keys(row.raw_data_json ?? {})))).sort((left, right) =>
    left.localeCompare(right, "de"),
  );
}

function getExistingFieldMapping(value?: Record<string, unknown>) {
  const fieldMapping = value?.field_mapping;

  if (!fieldMapping || typeof fieldMapping !== "object" || Array.isArray(fieldMapping)) {
    return {};
  }

  return Object.fromEntries(
    Object.entries(fieldMapping).filter((entry): entry is [string, string] => typeof entry[1] === "string"),
  );
}
