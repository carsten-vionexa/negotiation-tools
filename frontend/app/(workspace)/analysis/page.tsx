import Link from "next/link";
import { ArrowRight, CircleAlert, CircleHelp, FileQuestion, Lightbulb, NotebookText, Sparkles, Users } from "lucide-react";
import type { ReactNode } from "react";

import { EmptyState, ErrorState } from "@/components/state-patterns";
import { PageHeader } from "@/components/page-header";
import { getCompany } from "@/lib/api/companies";
import { listKnowledgeClaims, type KnowledgeClaimSummary } from "@/lib/api/knowledge-claims";
import { getNegotiationProject, listNegotiationProjects } from "@/lib/api/negotiation-projects";
import { getRequestItem } from "@/lib/api/request-items";
import { getSupplierProfile } from "@/lib/api/supplier-profiles";

type AnalysisSearchParams = {
  projectId?: string;
};

export default async function AnalysisPage({ searchParams }: { searchParams: Promise<AnalysisSearchParams> }) {
  const { projectId } = await searchParams;

  if (!projectId) {
    return <ProjectSelection />;
  }

  let project;
  let company;
  let supplier;
  let requestItem;
  let claims: KnowledgeClaimSummary[];

  try {
    project = await getNegotiationProject(projectId);
    [company, supplier, requestItem, claims] = await Promise.all([
      getCompany(project.company_id),
      project.supplier_profile_id ? getSupplierProfile(project.supplier_profile_id) : Promise.resolve(null),
      project.request_item_id ? getRequestItem(project.request_item_id) : Promise.resolve(null),
      listKnowledgeClaims({
        negotiation_project_id: project.id,
        company_id: project.company_id,
      }),
    ]);
  } catch (error) {
    return (
      <>
        <PageHeader
          eyebrow="Analyse"
          title="Analyse vorbereiten"
          description="Projektbezogene Sicht auf Fakten, Annahmen, Hypothesen und offene Punkte."
        />
        <ErrorState title="Analysekontext konnte nicht geladen werden." description={getErrorDescription(error)} />
      </>
    );
  }

  const groupedClaims = groupClaims(claims);
  const riskClaims = filterClaims(claims, ["risk", "risiko"]);
  const opportunityClaims = filterClaims(claims, ["chance", "opportunity", "potential", "potenzial"]);
  const gapClaims = filterClaims(claims, ["gap", "luecke", "datenluecke", "missing"]);
  const questionClaims = filterClaims(claims, ["question", "frage", "open"]);
  const relationshipNotes = [
    project.context,
    supplier?.relationship_status ? `Beziehungsstatus: ${supplier.relationship_status}` : null,
    supplier?.notes,
    supplier?.cultural_context ? `Kultureller Kontext: ${supplier.cultural_context}` : null,
  ].filter(Boolean);

  return (
    <>
      <PageHeader
        eyebrow="Analyse"
        title="Analyse vorbereiten"
        description={`Projektbezogene Arbeitsansicht fuer "${project.title}" bei ${company.name}.`}
        actions={<ActionLink href={`/knowledge-base?projectId=${project.id}`} label="Datenbasis anzeigen" />}
      />

      <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-md border border-border bg-card p-5">
          <h2 className="text-base font-semibold">Projektkontext</h2>
          <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
            <Meta label="Company" value={company.name} />
            <Meta label="Status" value={project.status} />
            <Meta label="Kategorie" value={project.category || "Nicht gesetzt"} />
            <Meta label="Prioritaet" value={project.priority || "Nicht gesetzt"} />
            <Meta label="Artikel / Service" value={project.article_or_service || requestItem?.title || "Nicht gesetzt"} />
            <Meta label="Zielregion" value={project.target_region || requestItem?.target_region || "Nicht gesetzt"} />
            <Meta label="Supplier" value={supplier?.name || project.current_supplier || "Nicht gesetzt"} />
            <Meta label="Request Item" value={requestItem?.title || "Nicht gesetzt"} />
          </dl>
          {project.objective ? <p className="mt-4 text-sm leading-6 text-muted-foreground">{project.objective}</p> : null}
        </div>

        <div className="rounded-md border border-border bg-card p-5">
          <div className="flex items-center gap-2">
            <Users className="size-4 text-muted-foreground" />
            <h2 className="text-base font-semibold">Stakeholder / Lieferantenbeziehung</h2>
          </div>
          {relationshipNotes.length === 0 ? (
            <p className="mt-3 text-sm leading-6 text-muted-foreground">Noch keine eingebetteten Beziehungsnotizen gepflegt.</p>
          ) : (
            <div className="mt-4 grid gap-2">
              {relationshipNotes.map((note, index) => (
                <p key={index} className="rounded-md bg-muted px-3 py-2 text-sm leading-6 text-muted-foreground">
                  {note}
                </p>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <ClaimSection title="Fakten" icon={<NotebookText className="size-4" />} claims={groupedClaims.facts} empty="Keine Fakten-Claims gepflegt." />
        <ClaimSection title="Annahmen" icon={<CircleHelp className="size-4" />} claims={groupedClaims.assumptions} empty="Keine Annahmen gepflegt." />
        <ClaimSection title="Hypothesen" icon={<Sparkles className="size-4" />} claims={groupedClaims.hypotheses} empty="Keine Hypothesen gepflegt." />
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <ClaimSection title="Datenluecken" icon={<FileQuestion className="size-4" />} claims={gapClaims} empty="Keine Datenluecken-Claims gepflegt." />
        <ClaimSection title="Risiken" icon={<CircleAlert className="size-4" />} claims={riskClaims} empty="Keine Risiko-Claims gepflegt." />
        <ClaimSection title="Chancen" icon={<Lightbulb className="size-4" />} claims={opportunityClaims} empty="Keine Chancen-Claims gepflegt." />
        <ClaimSection title="Offene Fragen" icon={<CircleHelp className="size-4" />} claims={questionClaims} empty="Keine offenen Fragen gepflegt." />
      </section>
    </>
  );
}

async function ProjectSelection() {
  let projects;

  try {
    projects = await listNegotiationProjects();
  } catch (error) {
    return (
      <>
        <PageHeader
          eyebrow="Analyse"
          title="Analyse vorbereiten"
          description="Waehle ein Projekt, um eine projektbezogene Analyseansicht zu laden."
        />
        <ErrorState title="Projektliste konnte nicht geladen werden." description={getErrorDescription(error)} />
      </>
    );
  }

  return (
    <>
      <PageHeader
        eyebrow="Analyse"
        title="Analyse vorbereiten"
        description="Waehle ein Projekt, um Fakten, Annahmen, Hypothesen und offene Punkte projektbezogen zu sichten."
      />

      {projects.length === 0 ? (
        <EmptyState title="Noch keine Projekte vorhanden." description="Lege zuerst ein Verhandlungsprojekt an, bevor die Analyse vorbereitet wird." />
      ) : (
        <section className="grid gap-3">
          {projects.map((project) => (
            <Link key={project.id} href={`/analysis?projectId=${project.id}`} className="rounded-md border border-border bg-card p-5 hover:bg-muted">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h2 className="font-semibold">{project.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {[project.status, project.category, project.priority].filter(Boolean).join(" - ") || "Keine Metadaten"}
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

function ClaimSection({ title, icon, claims, empty }: { title: string; icon: ReactNode; claims: KnowledgeClaimSummary[]; empty: string }) {
  return (
    <section className="rounded-md border border-border bg-card p-5">
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground">{icon}</span>
        <h2 className="text-base font-semibold">{title}</h2>
      </div>
      {claims.length === 0 ? (
        <p className="mt-4 text-sm leading-6 text-muted-foreground">{empty}</p>
      ) : (
        <div className="mt-4 grid gap-3">
          {claims.map((claim) => (
            <div key={claim.id} className="rounded-md border border-border p-3">
              <p className="text-sm font-medium leading-6">{claim.claim_text}</p>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                {[claim.information_kind, claim.claim_type, claim.claim_category, claim.confidence_level].filter(Boolean).join(" - ")}
              </p>
              {claim.evidence_text ? <p className="mt-2 text-sm leading-6 text-muted-foreground">{claim.evidence_text}</p> : null}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function groupClaims(claims: KnowledgeClaimSummary[]) {
  return {
    facts: claims.filter((claim) => matchesAny(claim, ["fact", "fakt"])),
    assumptions: claims.filter((claim) => matchesAny(claim, ["assumption", "annahme"])),
    hypotheses: claims.filter((claim) => matchesAny(claim, ["hypothesis", "hypothese"])),
  };
}

function filterClaims(claims: KnowledgeClaimSummary[], markers: string[]) {
  return claims.filter((claim) => matchesAny(claim, markers));
}

function matchesAny(claim: KnowledgeClaimSummary, markers: string[]) {
  const haystack = [claim.information_kind, claim.claim_type, claim.claim_category, claim.claim_text].filter(Boolean).join(" ").toLowerCase();
  return markers.some((marker) => haystack.includes(marker));
}

function ActionLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm font-medium hover:bg-muted">
      {label}
      <ArrowRight className="size-4" />
    </Link>
  );
}

function Meta({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div>
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="mt-1 font-medium">{value}</dd>
    </div>
  );
}

function getErrorDescription(error: unknown) {
  return error instanceof Error ? error.message : "Bitte pruefe, ob das Backend erreichbar ist.";
}
