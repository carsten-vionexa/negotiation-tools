import Link from "next/link";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ArrowLeft, ArrowRight, ClipboardList, Globe2, Save, Users } from "lucide-react";
import type { ReactNode } from "react";

import { EmptyState, ErrorState } from "@/components/state-patterns";
import { PageHeader } from "@/components/page-header";
import { getCompany } from "@/lib/api/companies";
import { getNegotiationProject, listNegotiationProjects } from "@/lib/api/negotiation-projects";
import { getRequestItem } from "@/lib/api/request-items";
import {
  createSimulationScenario,
  listSimulationScenarios,
  updateSimulationScenario,
  type SimulationScenarioRead,
} from "@/lib/api/simulation-scenarios";
import { listStrategies, type StrategyRead } from "@/lib/api/strategies";
import { getSupplierProfile, type SupplierProfileRead } from "@/lib/api/supplier-profiles";
import { getUserProfile, listUserProfiles, type UserProfileSummary } from "@/lib/api/user-profiles";

type SimulationSearchParams = {
  projectId?: string;
};

export default async function SimulationPage({ searchParams }: { searchParams: Promise<SimulationSearchParams> }) {
  const { projectId } = await searchParams;

  if (!projectId) {
    return <ProjectSelection />;
  }

  let project;
  let company;
  let supplier: SupplierProfileRead | null;
  let requestItem;
  let owner: UserProfileSummary | null;
  let strategies: StrategyRead[];
  let scenarios: SimulationScenarioRead[];
  let userProfiles: UserProfileSummary[];

  try {
    project = await getNegotiationProject(projectId);
    [company, supplier, requestItem, owner, strategies, scenarios, userProfiles] = await Promise.all([
      getCompany(project.company_id),
      project.supplier_profile_id ? getSupplierProfile(project.supplier_profile_id) : Promise.resolve(null),
      project.request_item_id ? getRequestItem(project.request_item_id) : Promise.resolve(null),
      project.owner_id ? getUserProfile(project.owner_id) : Promise.resolve(null),
      listStrategies({ negotiation_project_id: project.id, company_id: project.company_id }),
      listSimulationScenarios({ negotiation_project_id: project.id, company_id: project.company_id }),
      listUserProfiles({ company_id: project.company_id }),
    ]);
  } catch (error) {
    return (
      <>
        <PageHeader
          eyebrow="Simulation"
          title="Szenario konfigurieren"
          description="Projektbezogene Vorbereitung fuer Trainingsszenarien ohne produktive Simulation."
        />
        <ErrorState title="Szenariokontext konnte nicht geladen werden." description={getErrorDescription(error)} />
      </>
    );
  }

  const strategyById = new Map(strategies.map((strategy) => [strategy.id, strategy]));
  const firstScenario = scenarios[0];

  return (
    <>
      <PageHeader
        eyebrow="Simulation"
        title="Szenario konfigurieren"
        description={`Trainingsszenarien fuer "${project.title}" bei ${company.name} vorbereiten. Kein Chat, kein Voice-Modus und keine automatische Auswertung.`}
        actions={
          <>
            <ActionLink href={`/projects/${project.id}`} label="Zum Projekt" icon={<ArrowLeft className="size-4" />} />
            <ActionLink href={`/strategy?projectId=${project.id}`} label="Zur Strategie" icon={<ArrowRight className="size-4" />} />
            <ActionLink href={`/trainer-review?projectId=${project.id}`} label="Zum Trainerreview" icon={<ArrowRight className="size-4" />} />
          </>
        }
      />

      <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-md border border-border bg-card p-5">
          <SectionTitle icon={<ClipboardList className="size-4" />} title="Projekt- und Vorbereitungskontext" />
          <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
            <Meta label="Projekt" value={project.title} />
            <Meta label="Company" value={company.name} />
            <Meta label="Supplier / Gegenrolle" value={supplier?.name || project.current_supplier || "Nicht gesetzt"} />
            <Meta label="Owner / Trainee-Rolle" value={owner?.display_name || "Nicht gesetzt"} />
            <Meta label="Projektstatus" value={project.status} />
            <Meta label="Prioritaet" value={project.priority || "Nicht gesetzt"} />
            <Meta label="Kategorie" value={project.category || requestItem?.category || "Nicht gesetzt"} />
            <Meta label="Artikel / Service" value={project.article_or_service || requestItem?.title || "Nicht gesetzt"} />
          </dl>
          {project.objective ? <p className="mt-4 text-sm leading-6 text-muted-foreground">{project.objective}</p> : null}
        </div>

        <div className="rounded-md border border-border bg-card p-5">
          <SectionTitle icon={<Globe2 className="size-4" />} title="Kultur- und Rollenbriefing" />
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Hinweise werden als Arbeitshypothesen gepflegt. Es gibt kein automatisches Laenderprofil, keine Zuschreibung und keine Bias-Bewertung.
          </p>
          <div className="mt-4 grid gap-3 text-sm">
            <Read label="Lieferant / Gegenrolle" value={supplier?.name || project.current_supplier} />
            <Read label="Rollenbeschreibung der Gegenseite" value={firstScenario?.counterparty_role} />
            <Read label="Erwartete Interessen oder Constraints" value={firstScenario?.scenario_brief || supplier?.notes} />
            <Read label="Kulturelle Arbeitshypothesen" value={firstScenario?.cultural_context || supplier?.cultural_context} />
            <Read label="Kommunikationsrisiken" value={firstScenario?.communication_style} />
            <Read label="Offene Unsicherheiten / Prueffragen" value={firstScenario?.success_criteria} />
          </div>
        </div>
      </section>

      <section className="rounded-md border border-border bg-card p-5">
        <SectionTitle icon={<Users className="size-4" />} title="Szenario-Liste" />
        {scenarios.length === 0 ? (
          <div className="mt-4">
            <EmptyState
              title="Noch kein Szenario vorbereitet."
              description="Lege ein Szenario an, um Gegenrolle, Schwierigkeit, Gespraechsphase, Sprache, Trainingsziel und Erfolgskriterien zu beschreiben."
            />
          </div>
        ) : (
          <div className="mt-4 grid gap-4">
            {scenarios.map((scenario) => (
              <ScenarioCard
                key={scenario.id}
                scenario={scenario}
                strategy={scenario.strategy_id ? strategyById.get(scenario.strategy_id) : undefined}
                projectId={project.id}
                strategies={strategies}
                userProfiles={userProfiles}
                supplier={supplier}
                owner={owner}
              />
            ))}
          </div>
        )}
      </section>

      <section className="rounded-md border border-border bg-card p-5">
        <SectionTitle icon={<ClipboardList className="size-4" />} title="Szenario anlegen" />
        <ScenarioForm
          action={createScenarioAction.bind(null, project.id, project.company_id)}
          strategies={strategies}
          userProfiles={userProfiles}
          supplier={supplier}
          owner={owner}
          projectTitle={project.title}
        />
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
        <PageHeader eyebrow="Simulation" title="Szenario konfigurieren" description="Waehle ein Projekt, um Trainingsszenarien vorzubereiten." />
        <ErrorState title="Projektliste konnte nicht geladen werden." description={getErrorDescription(error)} />
      </>
    );
  }

  return (
    <>
      <PageHeader
        eyebrow="Simulation"
        title="Szenario konfigurieren"
        description="Waehle ein Projekt fuer die Szenario-Konfiguration. Der MVP bereitet Training vor, fuehrt aber keine produktive Simulation aus."
      />
      {projects.length === 0 ? (
        <EmptyState title="Noch keine Projekte vorhanden." description="Lege zuerst ein Verhandlungsprojekt an, bevor ein Trainingsszenario vorbereitet wird." />
      ) : (
        <section className="grid gap-3">
          {projects.map((project) => (
            <Link key={project.id} href={`/simulation?projectId=${project.id}`} className="rounded-md border border-border bg-card p-5 hover:bg-muted">
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

function ScenarioCard({
  scenario,
  strategy,
  projectId,
  strategies,
  userProfiles,
  supplier,
  owner,
}: {
  scenario: SimulationScenarioRead;
  strategy?: StrategyRead;
  projectId: string;
  strategies: StrategyRead[];
  userProfiles: UserProfileSummary[];
  supplier?: SupplierProfileRead | null;
  owner?: UserProfileSummary | null;
}) {
  return (
    <article className="rounded-md border border-border p-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="font-semibold">{scenario.title}</h3>
          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            {[scenario.status, scenario.scenario_type, scenario.difficulty_level, scenario.negotiation_phase, scenario.language].filter(Boolean).join(" - ") ||
              "Noch nicht vollstaendig eingeordnet"}
          </p>
        </div>
        <Link href={`/trainer-review?scenarioId=${scenario.id}`} className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm font-medium hover:bg-muted">
          Review
          <ArrowRight className="size-4" />
        </Link>
      </div>
      <dl className="mt-4 grid gap-3 text-sm md:grid-cols-3">
        <Read label="Gegenrolle" value={[scenario.counterparty_name, scenario.counterparty_role].filter(Boolean).join(" - ")} />
        <Read label="Strategiebezug" value={strategy?.title} />
        <Read label="Startbereitschaft" value={readinessLabel(scenario)} />
        <Read label="Trainingsziel" value={scenario.training_goal} />
        <Read label="Erfolgskriterien" value={scenario.success_criteria} />
        <Read label="Zeitrahmen" value={scenario.time_limit_minutes ? `${scenario.time_limit_minutes} Minuten` : null} />
      </dl>
      <details className="mt-4">
        <summary className="cursor-pointer text-sm font-medium text-primary">Szenario bearbeiten</summary>
        <ScenarioForm
          action={updateScenarioAction.bind(null, scenario.id, projectId)}
          scenario={scenario}
          strategies={strategies}
          userProfiles={userProfiles}
          supplier={supplier}
          owner={owner}
        />
      </details>
    </article>
  );
}

function ScenarioForm({
  action,
  scenario,
  strategies,
  userProfiles,
  supplier,
  owner,
  projectTitle,
}: {
  action: (formData: FormData) => Promise<void>;
  scenario?: SimulationScenarioRead;
  strategies: StrategyRead[];
  userProfiles: UserProfileSummary[];
  supplier?: SupplierProfileRead | null;
  owner?: UserProfileSummary | null;
  projectTitle?: string;
}) {
  const strategyOptions = strategies.map((strategy) => ({ value: strategy.id, label: strategy.title }));
  const profileOptions = userProfiles.map((profile) => ({ value: profile.id, label: `${profile.display_name}${profile.role ? ` (${profile.role})` : ""}` }));

  return (
    <form action={action} className="mt-4 grid gap-3 md:grid-cols-2">
      <Field label="Titel" name="title" defaultValue={scenario?.title ?? (projectTitle ? `${projectTitle} - Trainingsszenario` : null)} required />
      <Field label="Status" name="status" defaultValue={scenario?.status ?? "draft"} />
      {strategies.length ? <Select label="Strategiebezug" name="strategy_id" defaultValue={scenario?.strategy_id} options={strategyOptions} /> : <input type="hidden" name="strategy_id" value={scenario?.strategy_id ?? ""} />}
      <input type="hidden" name="supplier_profile_id" value={scenario?.supplier_profile_id ?? supplier?.id ?? ""} />
      {profileOptions.length ? (
        <Select label="Owner / Trainee-Rolle" name="user_profile_id" defaultValue={scenario?.user_profile_id ?? owner?.id} options={profileOptions} />
      ) : (
        <input type="hidden" name="user_profile_id" value={scenario?.user_profile_id ?? owner?.id ?? ""} />
      )}
      <Field label="Szenariotyp" name="scenario_type" defaultValue={scenario?.scenario_type ?? "guided_practice"} />
      <Field label="Gegenueber Name" name="counterparty_name" defaultValue={scenario?.counterparty_name ?? supplier?.contact_name ?? supplier?.name} />
      <Field label="Gegenrolle / Rollenbeschreibung" name="counterparty_role" defaultValue={scenario?.counterparty_role ?? supplier?.supplier_type} />
      <Field label="Land oder Region" name="country_or_region" defaultValue={scenario?.country_or_region ?? supplier?.country ?? supplier?.region} />
      <Field label="Schwierigkeit" name="difficulty_level" defaultValue={scenario?.difficulty_level ?? "guided_practice"} />
      <Field label="Kommunikationsstil / Kommunikationsrisiken" name="communication_style" defaultValue={scenario?.communication_style} />
      <Field label="Gespraechsphase" name="negotiation_phase" defaultValue={scenario?.negotiation_phase ?? "preparation"} />
      <Field label="Sprache" name="language" defaultValue={scenario?.language ?? "de"} />
      <Field label="Zeitlimit Minuten" name="time_limit_minutes" type="number" defaultValue={scenario?.time_limit_minutes?.toString()} />
      <TextArea label="Trainingsziel" name="training_goal" defaultValue={scenario?.training_goal} />
      <TextArea label="Szenario-Briefing mit Interessen, Constraints und offenen Prueffragen" name="scenario_brief" defaultValue={scenario?.scenario_brief} />
      <TextArea label="Kulturelle Arbeitshypothesen" name="cultural_context" defaultValue={scenario?.cultural_context ?? supplier?.cultural_context} />
      <TextArea label="Erfolgskriterien" name="success_criteria" defaultValue={scenario?.success_criteria} />
      <SubmitButton label={scenario ? "Szenario speichern" : "Szenario anlegen"} />
    </form>
  );
}

async function createScenarioAction(projectId: string, companyId: string, formData: FormData) {
  "use server";
  await createSimulationScenario({
    company_id: companyId,
    negotiation_project_id: projectId,
    ...scenarioPayload(formData),
  });
  refreshSimulation(projectId);
}

async function updateScenarioAction(id: string, projectId: string, formData: FormData) {
  "use server";
  await updateSimulationScenario(id, scenarioPayload(formData));
  refreshSimulation(projectId);
}

function refreshSimulation(projectId: string): never {
  revalidatePath("/simulation");
  revalidatePath("/trainer-review");
  revalidatePath(`/projects/${projectId}`);
  redirect(`/simulation?projectId=${projectId}`);
}

function scenarioPayload(formData: FormData) {
  return {
    strategy_id: optionalString(formData, "strategy_id"),
    supplier_profile_id: optionalString(formData, "supplier_profile_id"),
    user_profile_id: optionalString(formData, "user_profile_id"),
    title: requiredString(formData, "title"),
    status: optionalString(formData, "status") ?? "draft",
    scenario_type: optionalString(formData, "scenario_type"),
    counterparty_name: optionalString(formData, "counterparty_name"),
    counterparty_role: optionalString(formData, "counterparty_role"),
    country_or_region: optionalString(formData, "country_or_region"),
    cultural_context: optionalString(formData, "cultural_context"),
    difficulty_level: optionalString(formData, "difficulty_level"),
    communication_style: optionalString(formData, "communication_style"),
    negotiation_phase: optionalString(formData, "negotiation_phase"),
    training_goal: optionalString(formData, "training_goal"),
    scenario_brief: optionalString(formData, "scenario_brief"),
    success_criteria: optionalString(formData, "success_criteria"),
    time_limit_minutes: optionalNumber(formData, "time_limit_minutes"),
    language: optionalString(formData, "language"),
  };
}

function readinessLabel(scenario: SimulationScenarioRead) {
  const hasCore = Boolean(scenario.title && scenario.training_goal && scenario.success_criteria && scenario.negotiation_phase && scenario.difficulty_level);
  if (scenario.status === "ready" || hasCore) {
    return "fachlich startbereit";
  }
  return "Entwurf / Vorbereitung offen";
}

function ActionLink({ href, label, icon }: { href: string; label: string; icon: ReactNode }) {
  return (
    <Link href={href} className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm font-medium hover:bg-muted">
      {icon}
      {label}
    </Link>
  );
}

function SectionTitle({ icon, title }: { icon: ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-muted-foreground">{icon}</span>
      <h2 className="text-base font-semibold">{title}</h2>
    </div>
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

function Read({ label, value }: { label: string; value?: ReactNode | null }) {
  return (
    <div>
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="mt-1 leading-6">{value || "Nicht gesetzt"}</dd>
    </div>
  );
}

function Field({ label, name, defaultValue, required = false, type = "text" }: { label: string; name: string; defaultValue?: string | null; required?: boolean; type?: string }) {
  return (
    <label>
      <span className="text-sm font-medium">{label}</span>
      <input
        type={type}
        name={name}
        required={required}
        defaultValue={defaultValue ?? ""}
        className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
      />
    </label>
  );
}

function Select({ label, name, options, defaultValue }: { label: string; name: string; options: { value: string; label: string }[]; defaultValue?: string | null }) {
  return (
    <label>
      <span className="text-sm font-medium">{label}</span>
      <select name={name} defaultValue={defaultValue ?? ""} className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm">
        <option value="">Nicht gesetzt</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function TextArea({ label, name, defaultValue }: { label: string; name: string; defaultValue?: string | null }) {
  return (
    <label className="md:col-span-2">
      <span className="text-sm font-medium">{label}</span>
      <textarea name={name} rows={3} defaultValue={defaultValue ?? ""} className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm" />
    </label>
  );
}

function SubmitButton({ label }: { label: string }) {
  return (
    <div className="md:col-span-2">
      <button className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
        <Save className="size-4" />
        {label}
      </button>
    </div>
  );
}

function optionalString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function requiredString(formData: FormData, key: string) {
  return optionalString(formData, key) ?? "";
}

function optionalNumber(formData: FormData, key: string) {
  const value = optionalString(formData, key);
  return value ? Number(value) : null;
}

function getErrorDescription(error: unknown) {
  return error instanceof Error ? error.message : "Bitte pruefe, ob das Backend erreichbar ist.";
}
