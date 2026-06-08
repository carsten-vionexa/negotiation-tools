import Link from "next/link";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, FileText, Handshake, Save, Scale, ShieldCheck, Target } from "lucide-react";
import type { ReactNode } from "react";

import { EmptyState, ErrorState } from "@/components/state-patterns";
import { PageHeader } from "@/components/page-header";
import { createArgumentationLine, listArgumentationLines, updateArgumentationLine, type ArgumentationLineRead } from "@/lib/api/argumentation-lines";
import { createBatnaOption, listBatnaOptions, updateBatnaOption, type BatnaOptionRead } from "@/lib/api/batna-options";
import { getCompany } from "@/lib/api/companies";
import { createConcessionItem, listConcessionItems, updateConcessionItem, type ConcessionItemRead } from "@/lib/api/concession-items";
import { getNegotiationProject, listNegotiationProjects } from "@/lib/api/negotiation-projects";
import { getRequestItem } from "@/lib/api/request-items";
import { createStrategy, listStrategies, updateStrategy, type StrategyRead } from "@/lib/api/strategies";
import { getSupplierProfile } from "@/lib/api/supplier-profiles";
import { createZopaItem, listZopaItems, updateZopaItem, type ZopaItemRead } from "@/lib/api/zopa-items";
import { optionalFormString, requiredFormString } from "@/lib/form-data";

type StrategySearchParams = {
  projectId?: string;
  created?: string;
};

export default async function StrategyPage({ searchParams }: { searchParams: Promise<StrategySearchParams> }) {
  const { projectId, created } = await searchParams;

  if (!projectId) {
    return <ProjectSelection />;
  }

  let project;
  let company;
  let supplier;
  let requestItem;
  let strategies: StrategyRead[];

  try {
    project = await getNegotiationProject(projectId);
    [company, supplier, requestItem, strategies] = await Promise.all([
      getCompany(project.company_id),
      project.supplier_profile_id ? getSupplierProfile(project.supplier_profile_id) : Promise.resolve(null),
      project.request_item_id ? getRequestItem(project.request_item_id) : Promise.resolve(null),
      listStrategies({ negotiation_project_id: project.id, company_id: project.company_id, is_active: true }),
    ]);
  } catch (error) {
    return (
      <>
        <PageHeader
          eyebrow="Strategie"
          title="Strategie bauen"
          description="Projektbezogener Strategie-Builder fuer Ziele, ZOPA, BATNA, Konzessionen und Argumente."
        />
        <ErrorState title="Strategiekontext konnte nicht geladen werden." description={getErrorDescription(error)} />
      </>
    );
  }

  const strategy = strategies[0];
  const showCreatedGuidance = Boolean(strategy && created === "1");

  let zopaItems: ZopaItemRead[] = [];
  let batnaOptions: BatnaOptionRead[] = [];
  let concessionItems: ConcessionItemRead[] = [];
  let argumentationLines: ArgumentationLineRead[] = [];

  if (strategy) {
    try {
      [zopaItems, batnaOptions, concessionItems, argumentationLines] = await Promise.all([
        listZopaItems({ strategy_id: strategy.id }),
        listBatnaOptions({ strategy_id: strategy.id }),
        listConcessionItems({ strategy_id: strategy.id }),
        listArgumentationLines({ strategy_id: strategy.id }),
      ]);
    } catch (error) {
      return (
        <>
          <StrategyHeader projectId={project.id} projectTitle={project.title} companyName={company.name} />
          <ErrorState title="Strategiebausteine konnten nicht geladen werden." description={getErrorDescription(error)} />
        </>
      );
    }
  }

  return (
    <>
      <StrategyHeader projectId={project.id} projectTitle={project.title} companyName={company.name} />

      <section className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-md border border-border bg-card p-5">
          <h2 className="text-base font-semibold">Projekt- und Strategiekontext</h2>
          <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
            <Meta label="Projekt" value={project.title} />
            <Meta label="Company" value={company.name} />
            <Meta label="Status" value={project.status} />
            <Meta label="Prioritaet" value={project.priority || "Nicht gesetzt"} />
            <Meta label="Kategorie" value={project.category || "Nicht gesetzt"} />
            <Meta label="Supplier" value={supplier?.name || project.current_supplier || "Nicht gesetzt"} />
            <Meta label="Zielregion" value={project.target_region || requestItem?.target_region || "Nicht gesetzt"} />
            <Meta label="Artikel / Service" value={project.article_or_service || requestItem?.title || "Nicht gesetzt"} />
          </dl>
          {project.objective ? <p className="mt-4 text-sm leading-6 text-muted-foreground">{project.objective}</p> : null}
        </div>

        <div className="rounded-md border border-border bg-card p-5">
          <h2 className="text-base font-semibold">Offene Fragen und Hypothesen</h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Halte Annahmen klar als Hypothese oder offene Frage fest. Fuer B9 werden diese Hinweise bewusst im Strategie-Kopf gepflegt, nicht als neues Datenmodell.
          </p>
          {strategy?.risk_assessment || strategy?.notes ? (
            <div className="mt-4 grid gap-2 text-sm">
              {strategy.risk_assessment ? <Note title="Risikoannahmen / Hypothesen" value={strategy.risk_assessment} /> : null}
              {strategy.notes ? <Note title="Offene Fragen / Notizen" value={strategy.notes} /> : null}
            </div>
          ) : (
            <p className="mt-4 text-sm leading-6 text-muted-foreground">Noch keine Hypothesen, Risiken oder offenen Fragen im Strategie-Kopf gepflegt.</p>
          )}
        </div>
      </section>

      {!strategy ? (
        <section className="rounded-md border border-border bg-card p-5">
          <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <SectionTitle icon={<Target className="size-4" />} title="Noch keine Strategie fuer dieses Projekt" />
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Lege zuerst eine Strategie an oder bereite sie hier manuell vor. Diese Seite erzeugt keine Strategie automatisch und veraendert keine Daten,
                bevor du das Formular speicherst.
              </p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Danach kannst du Strategiebausteine wie ZOPA, BATNA, Argumente und Konzessionen ergaenzen.
              </p>
            </div>
            <div className="rounded-md border border-dashed border-border bg-muted/40 p-4">
              <p className="text-sm font-medium">Naechster Schritt</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Nutze den bestehenden Strategie-Workflow, um den ersten Strategie-Kopf fuer dieses Projekt anzulegen.
              </p>
            </div>
          </div>
          <form action={createStrategyAction.bind(null, project.id, project.company_id)} className="mt-5 grid gap-3 md:grid-cols-2">
            <Field label="Titel" name="title" defaultValue={`${project.title} - Strategie`} required />
            <Field label="Status" name="status" defaultValue="draft" />
            <TextArea label="Gesamtziel" name="overall_objective" defaultValue={project.objective} />
            <TextArea label="Notizen / offene Fragen" name="notes" placeholder="Hypothese: ... / Offene Frage: ..." />
            <SubmitButton label="Strategie-Kopf anlegen" />
          </form>
        </section>
      ) : (
        <>
          {showCreatedGuidance ? <StrategyCreatedGuidance projectId={project.id} /> : null}
          <StrategyBuildingBlocksGuidance
            zopaItems={zopaItems}
            batnaOptions={batnaOptions}
            argumentationLines={argumentationLines}
            concessionItems={concessionItems}
          />
          <StrategyHeadSection strategy={strategy} projectId={project.id} />
          <ZopaSection strategyId={strategy.id} projectId={project.id} items={zopaItems} />
          <BatnaSection strategyId={strategy.id} projectId={project.id} items={batnaOptions} />
          <ConcessionSection strategyId={strategy.id} projectId={project.id} items={concessionItems} />
          <ArgumentationSection strategyId={strategy.id} projectId={project.id} items={argumentationLines} />
        </>
      )}
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
        <PageHeader eyebrow="Strategie" title="Strategie bauen" description="Waehle ein Projekt, um den Strategie-Builder zu starten." />
        <ErrorState title="Projektliste konnte nicht geladen werden." description={getErrorDescription(error)} />
      </>
    );
  }

  return (
    <>
      <PageHeader
        eyebrow="Strategie"
        title="Strategie bauen"
        description="Waehle ein Projekt, um Ziele, ZOPA, BATNA, Konzessionen und Argumentationslinien projektbezogen zu strukturieren."
      />
      {projects.length === 0 ? (
        <EmptyState title="Noch keine Projekte vorhanden." description="Lege zuerst ein Verhandlungsprojekt an, bevor eine Strategie vorbereitet wird." />
      ) : (
        <section className="grid gap-3">
          {projects.map((project) => (
            <Link key={project.id} href={`/strategy?projectId=${project.id}`} className="rounded-md border border-border bg-card p-5 hover:bg-muted">
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

function StrategyBuildingBlocksGuidance({
  zopaItems,
  batnaOptions,
  argumentationLines,
  concessionItems,
}: {
  zopaItems: ZopaItemRead[];
  batnaOptions: BatnaOptionRead[];
  argumentationLines: ArgumentationLineRead[];
  concessionItems: ConcessionItemRead[];
}) {
  const blocks = [
    { label: "ZOPA", count: zopaItems.length, hint: "Einigungskorridore klaeren." },
    { label: "BATNA", count: batnaOptions.length, hint: "Alternativen beschreiben." },
    { label: "Argumente", count: argumentationLines.length, hint: "Claims und Belege sammeln." },
    { label: "Konzessionen", count: concessionItems.length, hint: "Tauschobjekte vorbereiten." },
  ];

  return (
    <section className="rounded-md border border-border bg-card p-5">
      <SectionTitle icon={<CheckCircle2 className="size-4" />} title="Strategiebausteine vorbereiten" />
      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        Der Strategie-Kopf ist vorhanden. ZOPA, BATNA, Argumente und Konzessionen sind die naechsten Vorbereitungselemente.
      </p>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        Fehlende Bausteine sind normale naechste Arbeitsschritte. Diese Seite erzeugt nichts automatisch.
      </p>
      <dl className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {blocks.map((block) => (
          <div key={block.label} className="rounded-md border border-border p-3">
            <dt className="text-sm font-semibold">{block.label}</dt>
            <dd className="mt-1 text-sm leading-6 text-muted-foreground">
              {block.count > 0 ? `${block.count} vorhanden` : "Noch offen"} - {block.hint}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function StrategyCreatedGuidance({ projectId }: { projectId: string }) {
  return (
    <section className="rounded-md border border-border bg-card p-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0">
          <SectionTitle icon={<CheckCircle2 className="size-4" />} title="Strategie wurde angelegt" />
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Der Strategie-Kopf ist gespeichert. Kehre zum Projekt zurueck, um die Vorbereitung fortzusetzen und die naechsten offenen Schritte im Projektkontext zu
            pruefen.
          </p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            ZOPA, BATNA, Argumente oder Konzessionen sind nachgelagerte naechste Schritte und koennen anschliessend hier gepflegt werden.
          </p>
        </div>
        <ActionLink href={`/projects/${projectId}`} label="Zurueck zum Projekt" icon={<ArrowLeft className="size-4" />} />
      </div>
    </section>
  );
}

function StrategyHeader({ projectId, projectTitle, companyName }: { projectId: string; projectTitle: string; companyName: string }) {
  return (
    <PageHeader
      eyebrow="Strategie"
      title="Strategie bauen"
      description={`Strukturierte Verhandlungsstrategie fuer "${projectTitle}" bei ${companyName}.`}
      actions={
        <>
          <ActionLink href={`/projects/${projectId}`} label="Zum Projekt" icon={<ArrowLeft className="size-4" />} />
          <ActionLink href={`/analysis?projectId=${projectId}`} label="Zur Analyse" icon={<ArrowRight className="size-4" />} />
          <ActionLink href={`/simulation?projectId=${projectId}`} label="Szenario konfigurieren" icon={<ArrowRight className="size-4" />} />
          <ActionLink href={`/trainer-review?projectId=${projectId}`} label="Trainerreview" icon={<ArrowRight className="size-4" />} />
        </>
      }
    />
  );
}

function StrategyHeadSection({ strategy, projectId }: { strategy: StrategyRead; projectId: string }) {
  return (
    <section className="rounded-md border border-border bg-card p-5">
      <SectionTitle icon={<Target className="size-4" />} title="Strategie-Kopf" />
      <form action={updateStrategyAction.bind(null, strategy.id, projectId)} className="mt-4 grid gap-3 md:grid-cols-2">
        <Field label="Titel" name="title" defaultValue={strategy.title} required />
        <Field label="Status" name="status" defaultValue={strategy.status} />
        <TextArea label="Gesamtziel" name="overall_objective" defaultValue={strategy.overall_objective} />
        <TextArea label="Zielergebnis" name="target_outcome" defaultValue={strategy.target_outcome} />
        <TextArea label="Minimum akzeptables Ergebnis" name="minimum_acceptable_outcome" defaultValue={strategy.minimum_acceptable_outcome} />
        <TextArea label="Walk-away Point" name="walk_away_point" defaultValue={strategy.walk_away_point} />
        <TextArea label="ZOPA-Zusammenfassung" name="zopa_summary" defaultValue={strategy.zopa_summary} />
        <TextArea label="BATNA-Zusammenfassung" name="batna_summary" defaultValue={strategy.batna_summary} />
        <TextArea label="Konzessionsstrategie" name="concession_strategy" defaultValue={strategy.concession_strategy} />
        <TextArea label="Argumentationssummary" name="argumentation_summary" defaultValue={strategy.argumentation_summary} />
        <TextArea label="Risikoannahmen / Hypothesen" name="risk_assessment" defaultValue={strategy.risk_assessment} />
        <TextArea label="Notizen / offene Fragen" name="notes" defaultValue={strategy.notes} />
        <SubmitButton label="Strategie-Kopf speichern" />
      </form>
    </section>
  );
}

function ZopaSection({ strategyId, projectId, items }: { strategyId: string; projectId: string; items: ZopaItemRead[] }) {
  return (
    <section className="rounded-md border border-border bg-card p-5">
      <SectionTitle icon={<Scale className="size-4" />} title="ZOPA-Dimensionen" />
      <p className="mt-2 text-sm leading-6 text-muted-foreground">Manuell gepflegte Einigungskorridore. Es findet keine automatische ZOPA-Berechnung statt.</p>
      <div className="mt-4 grid gap-4">
        {items.length === 0 ? <InlineEmpty text="Noch keine ZOPA-Dimensionen gepflegt." /> : null}
        {items.map((item) => (
          <ItemCard key={item.id} title={item.dimension || "ZOPA-Dimension"} meta={[item.priority, item.confidence_level, item.information_kind]}>
            <FieldGrid>
              <Read label="Beschreibung" value={item.description} />
              <Read label="Buyer Target" value={item.buyer_target_value} />
              <Read label="Buyer Walk-away" value={item.buyer_walk_away_value} />
              <Read label="Supplier Target erwartet" value={item.supplier_expected_target_value} />
              <Read label="Supplier Walk-away geschaetzt" value={item.supplier_estimated_walk_away_value} />
              <Read label="Moeglicher Einigungsbereich" value={item.possible_agreement_range} />
            </FieldGrid>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-primary">Bearbeiten</summary>
              <ZopaForm action={updateZopaItemAction.bind(null, item.id, projectId)} item={item} />
            </details>
          </ItemCard>
        ))}
      </div>
      <CreateBox title="Neue ZOPA-Dimension">
        <ZopaForm action={createZopaItemAction.bind(null, strategyId, projectId)} />
      </CreateBox>
    </section>
  );
}

function BatnaSection({ strategyId, projectId, items }: { strategyId: string; projectId: string; items: BatnaOptionRead[] }) {
  return (
    <section className="rounded-md border border-border bg-card p-5">
      <SectionTitle icon={<ShieldCheck className="size-4" />} title="BATNA-Optionen" />
      <p className="mt-2 text-sm leading-6 text-muted-foreground">Alternativen werden manuell beschrieben. Es gibt keine automatische BATNA-Bewertung.</p>
      <div className="mt-4 grid gap-4">
        {items.length === 0 ? <InlineEmpty text="Noch keine BATNA-Optionen gepflegt." /> : null}
        {items.map((item) => (
          <ItemCard key={item.id} title={item.title} meta={[item.batna_type, item.feasibility_level, item.risk_level, item.is_preferred ? "bevorzugt" : null]}>
            <FieldGrid>
              <Read label="Beschreibung" value={item.description} />
              <Read label="Geschaetzte Kosten" value={formatMoney(item.estimated_cost, item.currency)} />
              <Read label="Lead Time" value={item.estimated_lead_time} />
              <Read label="Impact" value={item.impact_assessment} />
              <Read label="Noetige Aktionen" value={item.required_actions} />
              <Read label="Ranking / Confidence" value={[item.ranking, item.confidence_level].filter(Boolean).join(" - ")} />
            </FieldGrid>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-primary">Bearbeiten</summary>
              <BatnaForm action={updateBatnaOptionAction.bind(null, item.id, projectId)} item={item} />
            </details>
          </ItemCard>
        ))}
      </div>
      <CreateBox title="Neue BATNA-Option">
        <BatnaForm action={createBatnaOptionAction.bind(null, strategyId, projectId)} />
      </CreateBox>
    </section>
  );
}

function ConcessionSection({ strategyId, projectId, items }: { strategyId: string; projectId: string; items: ConcessionItemRead[] }) {
  return (
    <section className="rounded-md border border-border bg-card p-5">
      <SectionTitle icon={<Handshake className="size-4" />} title="Konzessionen als Tauschobjekte" />
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        Konzessionen werden als konditioniertes Geben gegen Erhalten gepflegt, nicht als reines Nachgeben.
      </p>
      <div className="mt-4 grid gap-4">
        {items.length === 0 ? <InlineEmpty text="Noch keine Konzessionen gepflegt." /> : null}
        {items.map((item) => (
          <ItemCard key={item.id} title={item.title} meta={[item.concession_type, item.risk_level, item.is_final_offer_item ? "Final Offer Item" : null]}>
            <div className="grid gap-3 md:grid-cols-2">
              <TradeBox title="Wir geben / ermoeglichen" value={item.give_condition || item.description || "Nicht gesetzt"} />
              <TradeBox title="Nur wenn die Gegenseite liefert" value={item.required_counterpart || "Nicht gesetzt"} />
            </div>
            <FieldGrid>
              <Read label="Wert fuer uns" value={item.value_to_us} />
              <Read label="Wert fuer Gegenseite" value={item.value_to_counterparty} />
              <Read label="Geschaetzte Kosten" value={formatMoney(item.estimated_cost, item.currency)} />
              <Read label="Sequenz" value={item.sequence_order} />
            </FieldGrid>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-primary">Bearbeiten</summary>
              <ConcessionForm action={updateConcessionItemAction.bind(null, item.id, projectId)} item={item} />
            </details>
          </ItemCard>
        ))}
      </div>
      <CreateBox title="Neue Konzession als Tauschobjekt">
        <ConcessionForm action={createConcessionItemAction.bind(null, strategyId, projectId)} />
      </CreateBox>
    </section>
  );
}

function ArgumentationSection({ strategyId, projectId, items }: { strategyId: string; projectId: string; items: ArgumentationLineRead[] }) {
  return (
    <section className="rounded-md border border-border bg-card p-5">
      <SectionTitle icon={<FileText className="size-4" />} title="Argumentationslinien" />
      <div className="mt-4 grid gap-4">
        {items.length === 0 ? <InlineEmpty text="Noch keine Argumentationslinien gepflegt." /> : null}
        {items.map((item) => (
          <ItemCard key={item.id} title={item.title} meta={[item.argument_type, item.priority, item.confidence_level, item.information_kind]}>
            <FieldGrid>
              <Read label="Claim" value={item.claim} />
              <Read label="Evidence" value={item.evidence} />
              <Read label="Quelle" value={item.source_reference} />
              <Read label="Erwartetes Gegenargument" value={item.expected_counterargument} />
              <Read label="Reaktionsstrategie" value={item.response_strategy} />
            </FieldGrid>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-primary">Bearbeiten</summary>
              <ArgumentationForm action={updateArgumentationLineAction.bind(null, item.id, projectId)} item={item} />
            </details>
          </ItemCard>
        ))}
      </div>
      <CreateBox title="Neue Argumentationslinie">
        <ArgumentationForm action={createArgumentationLineAction.bind(null, strategyId, projectId)} />
      </CreateBox>
    </section>
  );
}

function ZopaForm({ action, item }: { action: (formData: FormData) => Promise<void>; item?: ZopaItemRead }) {
  return (
    <form action={action} className="mt-3 grid gap-3 md:grid-cols-2">
      <Field label="Dimension" name="dimension" defaultValue={item?.dimension} />
      <Field label="Prioritaet" name="priority" defaultValue={item?.priority} />
      <TextArea label="Beschreibung" name="description" defaultValue={item?.description} />
      <Field label="Buyer Target Value" name="buyer_target_value" defaultValue={item?.buyer_target_value} />
      <Field label="Buyer Walk-away Value" name="buyer_walk_away_value" defaultValue={item?.buyer_walk_away_value} />
      <Field label="Supplier Expected Target" name="supplier_expected_target_value" defaultValue={item?.supplier_expected_target_value} />
      <Field label="Supplier Estimated Walk-away" name="supplier_estimated_walk_away_value" defaultValue={item?.supplier_estimated_walk_away_value} />
      <Field label="Possible Agreement Range" name="possible_agreement_range" defaultValue={item?.possible_agreement_range} />
      <Field label="Waehrung" name="currency" defaultValue={item?.currency} />
      <Field label="Einheit" name="unit" defaultValue={item?.unit} />
      <Field label="Confidence" name="confidence_level" defaultValue={item?.confidence_level} />
      <Field label="Information Kind" name="information_kind" defaultValue={item?.information_kind} />
      <Field label="Quelle" name="source_reference" defaultValue={item?.source_reference} />
      <SubmitButton label={item ? "ZOPA speichern" : "ZOPA anlegen"} />
    </form>
  );
}

function BatnaForm({ action, item }: { action: (formData: FormData) => Promise<void>; item?: BatnaOptionRead }) {
  return (
    <form action={action} className="mt-3 grid gap-3 md:grid-cols-2">
      <Field label="Titel" name="title" defaultValue={item?.title} required />
      <Field label="BATNA-Typ" name="batna_type" defaultValue={item?.batna_type} />
      <TextArea label="Beschreibung" name="description" defaultValue={item?.description} />
      <Field label="Machbarkeit" name="feasibility_level" defaultValue={item?.feasibility_level} />
      <Field label="Geschaetzte Kosten" name="estimated_cost" defaultValue={item?.estimated_cost} />
      <Field label="Waehrung" name="currency" defaultValue={item?.currency} />
      <Field label="Lead Time" name="estimated_lead_time" defaultValue={item?.estimated_lead_time} />
      <Field label="Risiko" name="risk_level" defaultValue={item?.risk_level} />
      <TextArea label="Impact Assessment" name="impact_assessment" defaultValue={item?.impact_assessment} />
      <TextArea label="Required Actions" name="required_actions" defaultValue={item?.required_actions} />
      <Field label="Ranking" name="ranking" defaultValue={item?.ranking?.toString()} />
      <Field label="Confidence" name="confidence_level" defaultValue={item?.confidence_level} />
      <Checkbox label="Bevorzugte Option" name="is_preferred" defaultChecked={item?.is_preferred} />
      <SubmitButton label={item ? "BATNA speichern" : "BATNA anlegen"} />
    </form>
  );
}

function ConcessionForm({ action, item }: { action: (formData: FormData) => Promise<void>; item?: ConcessionItemRead }) {
  return (
    <form action={action} className="mt-3 grid gap-3 md:grid-cols-2">
      <Field label="Titel" name="title" defaultValue={item?.title} required />
      <Field label="Typ" name="concession_type" defaultValue={item?.concession_type} />
      <TextArea label="Beschreibung" name="description" defaultValue={item?.description} />
      <TextArea label="Wir geben / ermoeglichen" name="give_condition" defaultValue={item?.give_condition} />
      <TextArea label="Nur wenn die Gegenseite liefert" name="required_counterpart" defaultValue={item?.required_counterpart} />
      <Field label="Wert fuer uns" name="value_to_us" defaultValue={item?.value_to_us} />
      <Field label="Wert fuer Gegenseite" name="value_to_counterparty" defaultValue={item?.value_to_counterparty} />
      <Field label="Geschaetzte Kosten" name="estimated_cost" defaultValue={item?.estimated_cost} />
      <Field label="Waehrung" name="currency" defaultValue={item?.currency} />
      <Field label="Sequenz" name="sequence_order" defaultValue={item?.sequence_order?.toString()} />
      <Field label="Risiko" name="risk_level" defaultValue={item?.risk_level} />
      <Checkbox label="Final Offer Item" name="is_final_offer_item" defaultChecked={item?.is_final_offer_item} />
      <SubmitButton label={item ? "Konzession speichern" : "Konzession anlegen"} />
    </form>
  );
}

function ArgumentationForm({ action, item }: { action: (formData: FormData) => Promise<void>; item?: ArgumentationLineRead }) {
  return (
    <form action={action} className="mt-3 grid gap-3 md:grid-cols-2">
      <Field label="Titel" name="title" defaultValue={item?.title} required />
      <Field label="Argumenttyp" name="argument_type" defaultValue={item?.argument_type} />
      <TextArea label="Claim" name="claim" defaultValue={item?.claim} />
      <TextArea label="Evidence" name="evidence" defaultValue={item?.evidence} />
      <Field label="Quelle" name="source_reference" defaultValue={item?.source_reference} />
      <TextArea label="Erwartetes Gegenargument" name="expected_counterargument" defaultValue={item?.expected_counterargument} />
      <TextArea label="Reaktionsstrategie" name="response_strategy" defaultValue={item?.response_strategy} />
      <Field label="Prioritaet" name="priority" defaultValue={item?.priority} />
      <Field label="Confidence" name="confidence_level" defaultValue={item?.confidence_level} />
      <Field label="Information Kind" name="information_kind" defaultValue={item?.information_kind} />
      <SubmitButton label={item ? "Argument speichern" : "Argument anlegen"} />
    </form>
  );
}

async function createStrategyAction(projectId: string, companyId: string, formData: FormData) {
  "use server";
  await createStrategy({
    company_id: companyId,
    negotiation_project_id: projectId,
    title: requiredFormString(formData, "title", "Titel"),
    status: optionalFormString(formData, "status") ?? "draft",
    overall_objective: optionalFormString(formData, "overall_objective"),
    notes: optionalFormString(formData, "notes"),
  });
  refreshStrategy(projectId, { created: true });
}

async function updateStrategyAction(id: string, projectId: string, formData: FormData) {
  "use server";
  await updateStrategy(id, {
    title: requiredFormString(formData, "title", "Titel"),
    status: optionalFormString(formData, "status") ?? "draft",
    overall_objective: optionalFormString(formData, "overall_objective"),
    target_outcome: optionalFormString(formData, "target_outcome"),
    minimum_acceptable_outcome: optionalFormString(formData, "minimum_acceptable_outcome"),
    walk_away_point: optionalFormString(formData, "walk_away_point"),
    zopa_summary: optionalFormString(formData, "zopa_summary"),
    batna_summary: optionalFormString(formData, "batna_summary"),
    concession_strategy: optionalFormString(formData, "concession_strategy"),
    argumentation_summary: optionalFormString(formData, "argumentation_summary"),
    risk_assessment: optionalFormString(formData, "risk_assessment"),
    notes: optionalFormString(formData, "notes"),
  });
  refreshStrategy(projectId);
}

async function createZopaItemAction(strategyId: string, projectId: string, formData: FormData) {
  "use server";
  await createZopaItem({ strategy_id: strategyId, ...zopaPayload(formData) });
  refreshStrategy(projectId);
}

async function updateZopaItemAction(id: string, projectId: string, formData: FormData) {
  "use server";
  await updateZopaItem(id, zopaPayload(formData));
  refreshStrategy(projectId);
}

async function createBatnaOptionAction(strategyId: string, projectId: string, formData: FormData) {
  "use server";
  await createBatnaOption({ strategy_id: strategyId, ...batnaPayload(formData) });
  refreshStrategy(projectId);
}

async function updateBatnaOptionAction(id: string, projectId: string, formData: FormData) {
  "use server";
  await updateBatnaOption(id, batnaPayload(formData));
  refreshStrategy(projectId);
}

async function createConcessionItemAction(strategyId: string, projectId: string, formData: FormData) {
  "use server";
  await createConcessionItem({ strategy_id: strategyId, ...concessionPayload(formData) });
  refreshStrategy(projectId);
}

async function updateConcessionItemAction(id: string, projectId: string, formData: FormData) {
  "use server";
  await updateConcessionItem(id, concessionPayload(formData));
  refreshStrategy(projectId);
}

async function createArgumentationLineAction(strategyId: string, projectId: string, formData: FormData) {
  "use server";
  await createArgumentationLine({ strategy_id: strategyId, ...argumentationPayload(formData) });
  refreshStrategy(projectId);
}

async function updateArgumentationLineAction(id: string, projectId: string, formData: FormData) {
  "use server";
  await updateArgumentationLine(id, argumentationPayload(formData));
  refreshStrategy(projectId);
}

function refreshStrategy(projectId: string, options?: { created?: boolean }): never {
  revalidatePath("/strategy");
  revalidatePath(`/projects/${projectId}`);
  redirect(`/strategy?projectId=${projectId}${options?.created ? "&created=1" : ""}`);
}

function zopaPayload(formData: FormData) {
  return {
    dimension: optionalFormString(formData, "dimension"),
    description: optionalFormString(formData, "description"),
    buyer_target_value: optionalFormString(formData, "buyer_target_value"),
    buyer_walk_away_value: optionalFormString(formData, "buyer_walk_away_value"),
    supplier_expected_target_value: optionalFormString(formData, "supplier_expected_target_value"),
    supplier_estimated_walk_away_value: optionalFormString(formData, "supplier_estimated_walk_away_value"),
    possible_agreement_range: optionalFormString(formData, "possible_agreement_range"),
    currency: optionalFormString(formData, "currency"),
    unit: optionalFormString(formData, "unit"),
    priority: optionalFormString(formData, "priority"),
    confidence_level: optionalFormString(formData, "confidence_level"),
    information_kind: optionalFormString(formData, "information_kind"),
    source_reference: optionalFormString(formData, "source_reference"),
  };
}

function batnaPayload(formData: FormData) {
  return {
    title: requiredFormString(formData, "title", "Titel"),
    batna_type: optionalFormString(formData, "batna_type"),
    description: optionalFormString(formData, "description"),
    feasibility_level: optionalFormString(formData, "feasibility_level"),
    estimated_cost: optionalFormString(formData, "estimated_cost"),
    currency: optionalFormString(formData, "currency"),
    estimated_lead_time: optionalFormString(formData, "estimated_lead_time"),
    risk_level: optionalFormString(formData, "risk_level"),
    impact_assessment: optionalFormString(formData, "impact_assessment"),
    required_actions: optionalFormString(formData, "required_actions"),
    is_preferred: booleanValue(formData, "is_preferred"),
    ranking: optionalNumber(formData, "ranking"),
    confidence_level: optionalFormString(formData, "confidence_level"),
  };
}

function concessionPayload(formData: FormData) {
  return {
    title: requiredFormString(formData, "title", "Titel"),
    concession_type: optionalFormString(formData, "concession_type"),
    description: optionalFormString(formData, "description"),
    value_to_us: optionalFormString(formData, "value_to_us"),
    value_to_counterparty: optionalFormString(formData, "value_to_counterparty"),
    estimated_cost: optionalFormString(formData, "estimated_cost"),
    currency: optionalFormString(formData, "currency"),
    give_condition: optionalFormString(formData, "give_condition"),
    required_counterpart: optionalFormString(formData, "required_counterpart"),
    sequence_order: optionalNumber(formData, "sequence_order"),
    is_final_offer_item: booleanValue(formData, "is_final_offer_item"),
    risk_level: optionalFormString(formData, "risk_level"),
  };
}

function argumentationPayload(formData: FormData) {
  return {
    title: requiredFormString(formData, "title", "Titel"),
    argument_type: optionalFormString(formData, "argument_type"),
    claim: optionalFormString(formData, "claim"),
    evidence: optionalFormString(formData, "evidence"),
    source_reference: optionalFormString(formData, "source_reference"),
    expected_counterargument: optionalFormString(formData, "expected_counterargument"),
    response_strategy: optionalFormString(formData, "response_strategy"),
    priority: optionalFormString(formData, "priority"),
    confidence_level: optionalFormString(formData, "confidence_level"),
    information_kind: optionalFormString(formData, "information_kind"),
  };
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

function ItemCard({ title, meta, children }: { title: string; meta: Array<ReactNode | null | undefined>; children: ReactNode }) {
  const visibleMeta = meta.filter(Boolean);
  return (
    <article className="rounded-md border border-border p-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <h3 className="font-semibold">{title}</h3>
        {visibleMeta.length ? <p className="text-xs leading-5 text-muted-foreground">{visibleMeta.join(" - ")}</p> : null}
      </div>
      <div className="mt-3">{children}</div>
    </article>
  );
}

function CreateBox({ title, children }: { title: string; children: ReactNode }) {
  return (
    <details className="mt-5 rounded-md border border-dashed border-border p-4">
      <summary className="cursor-pointer text-sm font-semibold text-primary">{title}</summary>
      {children}
    </details>
  );
}

function FieldGrid({ children }: { children: ReactNode }) {
  return <dl className="mt-3 grid gap-3 text-sm md:grid-cols-2">{children}</dl>;
}

function Read({ label, value }: { label: string; value?: ReactNode | null }) {
  return (
    <div>
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="mt-1 leading-6">{value || "Nicht gesetzt"}</dd>
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

function Note({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-md bg-muted p-3">
      <p className="font-medium">{title}</p>
      <p className="mt-1 leading-6 text-muted-foreground">{value}</p>
    </div>
  );
}

function TradeBox({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-md border border-border bg-muted p-3">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{title}</p>
      <p className="mt-2 text-sm leading-6">{value}</p>
    </div>
  );
}

function InlineEmpty({ text }: { text: string }) {
  return <p className="rounded-md border border-dashed border-border p-4 text-sm leading-6 text-muted-foreground">{text}</p>;
}

function Field({ label, name, defaultValue, required = false }: { label: string; name: string; defaultValue?: string | null; required?: boolean }) {
  return (
    <label>
      <span className="text-sm font-medium">{label}</span>
      <input
        name={name}
        required={required}
        defaultValue={defaultValue ?? ""}
        className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
      />
    </label>
  );
}

function TextArea({ label, name, defaultValue, placeholder }: { label: string; name: string; defaultValue?: string | null; placeholder?: string }) {
  return (
    <label className="md:col-span-2">
      <span className="text-sm font-medium">{label}</span>
      <textarea
        name={name}
        rows={3}
        defaultValue={defaultValue ?? ""}
        placeholder={placeholder}
        className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
      />
    </label>
  );
}

function Checkbox({ label, name, defaultChecked = false }: { label: string; name: string; defaultChecked?: boolean }) {
  return (
    <label className="flex items-center gap-2 text-sm font-medium">
      <input type="checkbox" name={name} defaultChecked={defaultChecked} className="size-4 rounded border-border" />
      {label}
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

function optionalNumber(formData: FormData, key: string) {
  const value = optionalFormString(formData, key);
  return value ? Number(value) : null;
}

function booleanValue(formData: FormData, key: string) {
  return formData.get(key) === "on";
}

function formatMoney(value?: string | null, currency?: string | null) {
  return [value, currency].filter(Boolean).join(" ") || null;
}

function getErrorDescription(error: unknown) {
  return error instanceof Error ? error.message : "Bitte pruefe, ob das Backend erreichbar ist.";
}
