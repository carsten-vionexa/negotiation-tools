import Link from "next/link";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ArrowLeft, ArrowRight, MessageSquareText, Save, Target, UserCheck } from "lucide-react";
import type { ReactNode } from "react";

import { EmptyState, ErrorState } from "@/components/state-patterns";
import { PageHeader } from "@/components/page-header";
import { getCompany } from "@/lib/api/companies";
import { getNegotiationProject, listNegotiationProjects, type NegotiationProjectRead } from "@/lib/api/negotiation-projects";
import { getSimulationScenario, listSimulationScenarios, type SimulationScenarioRead } from "@/lib/api/simulation-scenarios";
import { getStrategy } from "@/lib/api/strategies";
import { createTrainerComment, listTrainerComments, updateTrainerComment, type TrainerCommentRead } from "@/lib/api/trainer-comments";
import { listUserProfiles, type UserProfileSummary } from "@/lib/api/user-profiles";
import { optionalFormString, requiredFormString } from "@/lib/form-data";

type TrainerReviewSearchParams = {
  projectId?: string;
  scenarioId?: string;
};

export default async function TrainerReviewPage({ searchParams }: { searchParams: Promise<TrainerReviewSearchParams> }) {
  const { projectId, scenarioId } = await searchParams;

  if (scenarioId) {
    return <ScenarioReview scenarioId={scenarioId} />;
  }

  if (projectId) {
    return <ProjectReviewSelection projectId={projectId} />;
  }

  return <ReviewSelection />;
}

async function ScenarioReview({ scenarioId }: { scenarioId: string }) {
  let scenario: SimulationScenarioRead;
  let project: NegotiationProjectRead;
  let company;
  let strategy;
  let comments: TrainerCommentRead[];
  let trainerProfiles: UserProfileSummary[];

  try {
    scenario = await getSimulationScenario(scenarioId);
    project = await getNegotiationProject(scenario.negotiation_project_id);
    [company, strategy, comments, trainerProfiles] = await Promise.all([
      getCompany(scenario.company_id),
      scenario.strategy_id ? getStrategy(scenario.strategy_id) : Promise.resolve(null),
      listTrainerComments({ simulation_scenario_id: scenario.id }),
      listUserProfiles({ company_id: scenario.company_id }),
    ]);
  } catch (error) {
    return (
      <>
        <PageHeader
          eyebrow="Trainerreview"
          title="Trainerkommentar"
          description="Kommentare und Lernpunkte zu einem vorbereiteten Szenario."
        />
        <ErrorState title="Review-Kontext konnte nicht geladen werden." description={getErrorDescription(error)} />
      </>
    );
  }

  const learningPoints = comments.filter((comment) => isLearningPoint(comment.comment_type));

  return (
    <>
      <PageHeader
        eyebrow="Trainerreview"
        title={scenario.title}
        description={`Menschliches Trainerfeedback fuer "${project.title}" bei ${company.name}. Sichtbarkeit ist nur eine fachliche Markierung.`}
        actions={
          <>
            <ActionLink href={`/simulation?projectId=${project.id}`} label="Zur Simulation" icon={<ArrowLeft className="size-4" />} />
            <ActionLink href={`/trainer-review?projectId=${project.id}`} label="Szenarien" icon={<ArrowRight className="size-4" />} />
            <ActionLink href={`/projects/${project.id}`} label="Zum Projekt" icon={<ArrowRight className="size-4" />} />
          </>
        }
      />

      <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-md border border-border bg-card p-5">
          <SectionTitle icon={<Target className="size-4" />} title="Szenario- und Projektkontext" />
          <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
            <Meta label="Projekt" value={project.title} />
            <Meta label="Company" value={company.name} />
            <Meta label="Strategiebezug" value={strategy?.title || "Nicht gesetzt"} />
            <Meta label="Schwierigkeit" value={scenario.difficulty_level || "Nicht gesetzt"} />
            <Meta label="Gespraechsphase" value={scenario.negotiation_phase || "Nicht gesetzt"} />
            <Meta label="Sprache" value={scenario.language || "Nicht gesetzt"} />
            <Meta label="Trainingsziel" value={scenario.training_goal || "Nicht gesetzt"} />
            <Meta label="Erfolgskriterien" value={scenario.success_criteria || "Nicht gesetzt"} />
          </dl>
        </div>

        <div className="rounded-md border border-border bg-card p-5">
          <SectionTitle icon={<UserCheck className="size-4" />} title="Lernpunkte / naechster Fokus" />
          {learningPoints.length === 0 ? (
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              Noch keine Lernpunkte markiert. Nutze den Kommentartyp `learning_point` oder `next_focus`, um den naechsten Fokus sichtbar zu machen.
            </p>
          ) : (
            <div className="mt-4 grid gap-3">
              {learningPoints.map((comment) => (
                <div key={comment.id} className="rounded-md border border-border p-3">
                  <p className="text-sm font-medium">{comment.related_competency || "Naechster Fokus"}</p>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{comment.comment_text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="rounded-md border border-border bg-card p-5">
        <SectionTitle icon={<MessageSquareText className="size-4" />} title="Review-Liste" />
        {comments.length === 0 ? (
          <div className="mt-4">
            <EmptyState
              title="Noch keine Trainerkommentare vorhanden."
              description="Erfasse einen Kommentar, eine trainerinterne Notiz oder einen trainee-sichtbaren Lernpunkt."
            />
          </div>
        ) : (
          <div className="mt-4 grid gap-4">
            {comments.map((comment) => (
              <CommentCard key={comment.id} comment={comment} scenario={scenario} projectId={project.id} trainerProfiles={trainerProfiles} />
            ))}
          </div>
        )}
      </section>

      <section className="rounded-md border border-border bg-card p-5">
        <SectionTitle icon={<MessageSquareText className="size-4" />} title="Kommentar erfassen" />
        <CommentForm action={createCommentAction.bind(null, scenario.id, project.id)} trainerProfiles={trainerProfiles} />
      </section>
    </>
  );
}

async function ProjectReviewSelection({ projectId }: { projectId: string }) {
  let project;
  let company;
  let scenarios: SimulationScenarioRead[];

  try {
    project = await getNegotiationProject(projectId);
    [company, scenarios] = await Promise.all([
      getCompany(project.company_id),
      listSimulationScenarios({ negotiation_project_id: project.id, company_id: project.company_id }),
    ]);
  } catch (error) {
    return (
      <>
        <PageHeader eyebrow="Trainerreview" title="Trainerreview" description="Waehle ein Szenario fuer Kommentare und Lernpunkte." />
        <ErrorState title="Review-Kontext konnte nicht geladen werden." description={getErrorDescription(error)} />
      </>
    );
  }

  return (
    <>
      <PageHeader
        eyebrow="Trainerreview"
        title="Trainerreview"
        description={`Szenarien fuer "${project.title}" bei ${company.name} auswaehlen und reviewen.`}
        actions={
          <>
            <ActionLink href={`/simulation?projectId=${project.id}`} label="Zur Simulation" icon={<ArrowLeft className="size-4" />} />
            <ActionLink href={`/projects/${project.id}`} label="Zum Projekt" icon={<ArrowRight className="size-4" />} />
          </>
        }
      />
      {scenarios.length === 0 ? (
        <EmptyState
          title="Noch kein Szenario fuer Review vorhanden."
          description="Lege zuerst in der Simulation-Konfiguration ein Szenario an. Trainerreview nutzt im MVP das Szenario als fachlichen Anker."
        />
      ) : (
        <section className="grid gap-3">
          {scenarios.map((scenario) => (
            <Link key={scenario.id} href={`/trainer-review?scenarioId=${scenario.id}`} className="rounded-md border border-border bg-card p-5 hover:bg-muted">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h2 className="font-semibold">{scenario.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {[scenario.status, scenario.difficulty_level, scenario.negotiation_phase, scenario.language].filter(Boolean).join(" - ") || "Keine Metadaten"}
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

async function ReviewSelection() {
  let projects;
  let scenarios;

  try {
    [projects, scenarios] = await Promise.all([listNegotiationProjects(), listSimulationScenarios({ limit: 25 })]);
  } catch (error) {
    return (
      <>
        <PageHeader eyebrow="Trainerreview" title="Trainerreview" description="Waehle ein Projekt oder ein vorhandenes Szenario." />
        <ErrorState title="Auswahl konnte nicht geladen werden." description={getErrorDescription(error)} />
      </>
    );
  }

  return (
    <>
      <PageHeader
        eyebrow="Trainerreview"
        title="Trainerreview"
        description="Waehle ein Projekt oder direkt ein Szenario. Im MVP gibt es Kommentare, Sichtbarkeitsmarkierung und einfache Lernpunkte, aber keine automatische Bewertung."
      />
      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-md border border-border bg-card p-5">
          <h2 className="text-base font-semibold">Projekte</h2>
          {projects.length === 0 ? (
            <p className="mt-4 text-sm leading-6 text-muted-foreground">Noch keine Projekte vorhanden.</p>
          ) : (
            <div className="mt-4 grid gap-3">
              {projects.map((project) => (
                <Link key={project.id} href={`/trainer-review?projectId=${project.id}`} className="rounded-md border border-border p-3 text-sm font-medium hover:bg-muted">
                  {project.title}
                </Link>
              ))}
            </div>
          )}
        </div>
        <div className="rounded-md border border-border bg-card p-5">
          <h2 className="text-base font-semibold">Vorhandene Szenarien</h2>
          {scenarios.length === 0 ? (
            <p className="mt-4 text-sm leading-6 text-muted-foreground">Noch keine Szenarien vorhanden.</p>
          ) : (
            <div className="mt-4 grid gap-3">
              {scenarios.map((scenario) => (
                <Link key={scenario.id} href={`/trainer-review?scenarioId=${scenario.id}`} className="rounded-md border border-border p-3 hover:bg-muted">
                  <p className="text-sm font-medium">{scenario.title}</p>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    {[scenario.status, scenario.difficulty_level, scenario.negotiation_phase].filter(Boolean).join(" - ") || "Keine Metadaten"}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function CommentCard({
  comment,
  scenario,
  projectId,
  trainerProfiles,
}: {
  comment: TrainerCommentRead;
  scenario: SimulationScenarioRead;
  projectId: string;
  trainerProfiles: UserProfileSummary[];
}) {
  return (
    <article className="rounded-md border border-border p-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="font-semibold">{comment.comment_type || "Trainerkommentar"}</h3>
          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            {[comment.severity, comment.related_competency, visibilityLabel(comment.is_visible_to_trainee)].filter(Boolean).join(" - ")}
          </p>
        </div>
        <p className="text-xs leading-5 text-muted-foreground">{formatDate(comment.updated_at || comment.created_at)}</p>
      </div>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{comment.comment_text}</p>
      <details className="mt-4">
        <summary className="cursor-pointer text-sm font-medium text-primary">Kommentar bearbeiten</summary>
        <CommentForm action={updateCommentAction.bind(null, comment.id, scenario.id, projectId)} comment={comment} trainerProfiles={trainerProfiles} />
      </details>
    </article>
  );
}

function CommentForm({
  action,
  comment,
  trainerProfiles,
}: {
  action: (formData: FormData) => Promise<void>;
  comment?: TrainerCommentRead;
  trainerProfiles: UserProfileSummary[];
}) {
  return (
    <form action={action} className="mt-4 grid gap-3 md:grid-cols-2">
      <Field label="Kommentartyp" name="comment_type" defaultValue={comment?.comment_type ?? "trainer_note"} />
      <Field label="Kompetenzbezug" name="related_competency" defaultValue={comment?.related_competency} />
      <Field label="Severity / Prioritaet" name="severity" defaultValue={comment?.severity ?? "normal"} />
      {trainerProfiles.length ? (
        <Select
          label="Trainerprofil"
          name="trainer_user_profile_id"
          defaultValue={comment?.trainer_user_profile_id}
          options={trainerProfiles.map((profile) => ({ value: profile.id, label: profile.display_name }))}
        />
      ) : null}
      <Select
        label="Sichtbarkeit"
        name="visibility"
        defaultValue={comment?.is_visible_to_trainee ? "trainee_visible" : "trainer_internal"}
        options={[
          { value: "trainer_internal", label: "Trainerintern" },
          { value: "trainee_visible", label: "Trainee-sichtbar" },
        ]}
        required
      />
      <TextArea label="Kommentartext / Lernpunkt" name="comment_text" defaultValue={comment?.comment_text} required />
      <SubmitButton label={comment ? "Kommentar speichern" : "Kommentar anlegen"} />
    </form>
  );
}

async function createCommentAction(scenarioId: string, projectId: string, formData: FormData) {
  "use server";
  await createTrainerComment({
    simulation_scenario_id: scenarioId,
    ...commentPayload(formData),
  });
  refreshReview(scenarioId, projectId);
}

async function updateCommentAction(id: string, scenarioId: string, projectId: string, formData: FormData) {
  "use server";
  await updateTrainerComment(id, commentPayload(formData));
  refreshReview(scenarioId, projectId);
}

function refreshReview(scenarioId: string, projectId: string): never {
  revalidatePath("/trainer-review");
  revalidatePath("/simulation");
  revalidatePath(`/projects/${projectId}`);
  redirect(`/trainer-review?scenarioId=${scenarioId}`);
}

function commentPayload(formData: FormData) {
  return {
    trainer_user_profile_id: optionalFormString(formData, "trainer_user_profile_id"),
    comment_type: optionalFormString(formData, "comment_type"),
    comment_text: requiredFormString(formData, "comment_text", "Kommentartext / Lernpunkt"),
    related_competency: optionalFormString(formData, "related_competency"),
    severity: optionalFormString(formData, "severity"),
    is_visible_to_trainee: optionalFormString(formData, "visibility") === "trainee_visible",
  };
}

function isLearningPoint(commentType?: string | null) {
  const value = commentType?.toLowerCase() ?? "";
  return ["learning_point", "lernpunkt", "learning", "next_focus"].some((marker) => value.includes(marker));
}

function visibilityLabel(isVisible: boolean) {
  return isVisible ? "Trainee-sichtbar" : "Trainerintern";
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

function Field({ label, name, defaultValue }: { label: string; name: string; defaultValue?: string | null }) {
  return (
    <label>
      <span className="text-sm font-medium">{label}</span>
      <input name={name} defaultValue={defaultValue ?? ""} className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm" />
    </label>
  );
}

function Select({
  label,
  name,
  options,
  defaultValue,
  required = false,
}: {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  defaultValue?: string | null;
  required?: boolean;
}) {
  return (
    <label>
      <span className="text-sm font-medium">{label}</span>
      <select
        name={name}
        required={required}
        defaultValue={defaultValue ?? ""}
        className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
      >
        {!required ? <option value="">Nicht gesetzt</option> : null}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function TextArea({ label, name, defaultValue, required = false }: { label: string; name: string; defaultValue?: string | null; required?: boolean }) {
  return (
    <label className="md:col-span-2">
      <span className="text-sm font-medium">{label}</span>
      <textarea
        name={name}
        rows={4}
        required={required}
        defaultValue={defaultValue ?? ""}
        className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
      />
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

function formatDate(value?: string | null) {
  return value ? new Intl.DateTimeFormat("de-DE", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value)) : "Kein Datum";
}

function getErrorDescription(error: unknown) {
  return error instanceof Error ? error.message : "Bitte pruefe, ob das Backend erreichbar ist.";
}
