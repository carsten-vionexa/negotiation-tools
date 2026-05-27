import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { EmptyState, ErrorState } from "@/components/state-patterns";
import { listCompanies } from "@/lib/api/companies";
import { listNegotiationProjects } from "@/lib/api/negotiation-projects";

import { ImportUploadForm } from "./upload-form";

export default async function NewImportPage() {
  let companies;
  let projects;

  try {
    [companies, projects] = await Promise.all([listCompanies(), listNegotiationProjects()]);
  } catch (error) {
    return (
      <>
        <PageHeader
          eyebrow="Datenbasis"
          title="ImportJob hochladen"
          description="Neue CSV- oder XLSX-Importdatei mit Company- und optionalem Projektkontext anlegen."
          actions={<BackLink />}
        />
        <ErrorState title="Uploadformular konnte nicht geladen werden." description={getErrorDescription(error)} />
      </>
    );
  }

  const companyById = new Map(companies.map((company) => [company.id, company.name]));

  return (
    <>
      <PageHeader
        eyebrow="Datenbasis"
        title="ImportJob hochladen"
        description="Neue CSV- oder XLSX-Importdatei mit Company- und optionalem Projektkontext anlegen."
        actions={<BackLink />}
      />

      {companies.length === 0 ? (
        <EmptyState
          title="Keine Company fuer den Import vorhanden."
          description="Lege zuerst eine Company an. Jeder ImportJob benoetigt einen Company-Kontext."
        />
      ) : (
        <ImportUploadForm
          companies={companies.map((company) => ({ value: company.id, label: company.name }))}
          projects={projects.map((project) => ({
            value: project.id,
            label: `${project.title} (${companyById.get(project.company_id) ?? "Company unbekannt"})`,
          }))}
        />
      )}
    </>
  );
}

function BackLink() {
  return (
    <Link href="/imports" className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm font-medium hover:bg-muted">
      <ArrowLeft className="size-4" />
      Zurueck zu Imports
    </Link>
  );
}

function getErrorDescription(error: unknown) {
  return error instanceof Error ? error.message : "Bitte pruefe, ob das Backend erreichbar ist.";
}
