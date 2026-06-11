import Link from "next/link";
import { ArrowRight, CheckCircle2, CircleDashed, FileText, Info } from "lucide-react";
import type { ReactNode } from "react";

import { PageHeader } from "@/components/page-header";
import { listArgumentationLines } from "@/lib/api/argumentation-lines";
import { listBatnaOptions } from "@/lib/api/batna-options";
import { listConcessionItems } from "@/lib/api/concession-items";
import { getNegotiationProject, type NegotiationProjectRead } from "@/lib/api/negotiation-projects";
import { getRequestItem, type RequestItemRead } from "@/lib/api/request-items";
import { listStrategies, type StrategyRead } from "@/lib/api/strategies";
import { getSupplierProfile, type SupplierProfileRead } from "@/lib/api/supplier-profiles";
import { listZopaItems } from "@/lib/api/zopa-items";

const briefingBuildingBlocks = [
  "Verhandlungsziel und Ausgangslage",
  "Interessen und Druckpunkte",
  "BATNA / WAP / ZOPA",
  "Argumentationslinien",
  "Konzessionslogik",
  "Risiken und offene Fragen",
  "Gespraechsagenda",
  "Persoenliche Hinweise fuer den Trainee",
];

const readinessRequirements = [
  "Strategy Objectives und Zielbild sind ausreichend greifbar.",
  "Einigungskorridor, BATNA und Walk-away-Grenze sind manuell eingeordnet.",
  "Argumente, Konzessionen, Risiken und offene Fragen sind als Arbeitsgrundlage sichtbar.",
];

type BriefingSearchParams = {
  projectId?: string;
};

export default async function BriefingPage({ searchParams }: { searchParams: Promise<BriefingSearchParams> }) {
  const { projectId } = await searchParams;
  const hasProjectContext = Boolean(projectId);
  const scopeData = projectId ? await loadBriefingScopeData(projectId) : null;

  return (
    <>
      <PageHeader
        eyebrow="Briefing Preparation"
        title="Briefing vorbereiten"
        description="Ruhiger Einstieg fuer den naechsten vorbereitenden Schritt nach einer ausreichend ausgearbeiteten Strategie."
      />

      <section className="rounded-md border border-border bg-card p-5">
        <SectionTitle icon={<Info className="size-4" />} title={hasProjectContext ? "Projektkontext erkannt" : "Noch kein Projektkontext"} />
        {scopeData ? (
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Diese Briefing Preparation ist mit dem Projekt <span className="font-medium text-foreground">{scopeData.project.title}</span> verknuepft. Die
            vorhandenen Projekt-, Strategie- und Kontextdaten werden unten nur eingeordnet; es wird kein Briefing automatisch erzeugt.
          </p>
        ) : hasProjectContext ? (
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Diese Briefing Preparation ist ueber die URL einem Projektkontext zugeordnet, der gerade nicht geladen werden konnte. Es werden keine
            Ersatzdaten erzeugt und kein Briefing automatisch gestartet.
          </p>
        ) : (
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Fuer eine konkrete Briefing Preparation braucht es zuerst ein Verhandlungsprojekt und eine vorbereitete Strategy. Ohne `projectId` bleibt diese
            Seite eine ruhige Workflow-Einordnung und kein startbereites projektbezogenes Briefing.
          </p>
        )}
      </section>

      {scopeData ? <BriefingPreparationScopeCard data={scopeData} /> : null}

      <section className="grid gap-4 lg:grid-cols-[1fr_0.82fr]">
        <div className="rounded-md border border-border bg-card p-5">
          <SectionTitle icon={<FileText className="size-4" />} title="Wozu dieser Schritt dient" />
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Briefing Preparation ordnet vorhandene Strategieanker so, dass daraus spaeter ein kompaktes Verhandlungsbriefing fuer Vorbereitung,
            Gespraechsfuehrung und Training entstehen kann. Der Einstieg folgt fachlich auf Strategy Readiness und ist noch keine automatische
            Briefing-Erzeugung.
          </p>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Wenn noch kein stabiler projektbezogener Briefing-Kontext vorhanden ist, bleibt diese Seite bewusst ein Coming-next-Hinweis. Sie erzeugt keine
            Strategie, keine Simulation und kein Trainerreview.
          </p>
        </div>

        <aside className="rounded-md border border-border bg-card p-5">
          <SectionTitle icon={<CheckCircle2 className="size-4" />} title="Voraussetzungen aus Strategy" />
          <ul className="mt-4 grid gap-3">
            {readinessRequirements.map((item) => (
              <li key={item} className="rounded-md border border-border p-3 text-sm leading-6 text-muted-foreground">
                {item}
              </li>
            ))}
          </ul>
        </aside>
      </section>

      <section className="rounded-md border border-border bg-card p-5">
        <SectionTitle icon={<FileText className="size-4" />} title="Spaetere Briefing-Bausteine" />
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Diese Bausteine koennen spaeter aus Strategie- und Projektinformationen vorbereitet werden. Aktuell dienen sie als fachliche Orientierung fuer den
          naechsten Produktausbau.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {briefingBuildingBlocks.map((item) => (
            <div key={item} className="rounded-md bg-muted px-3 py-2 text-sm font-medium">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-md border border-dashed border-border bg-muted/40 p-5">
        <SectionTitle icon={<Info className="size-4" />} title="Noch nicht implementiert" />
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Automatische KI-Briefing-Generierung ist noch nicht Bestandteil dieses Schritts. Die Seite fuehrt auch keine produktive Simulation aus und startet
          kein automatisches Trainerreview. Diese Grenzen bleiben bewusst sichtbar, damit der Workflow keine fertige Folgefunktion suggeriert.
        </p>
      </section>
    </>
  );
}

type BriefingScopeData = {
  project: NegotiationProjectRead;
  requestItem?: RequestItemRead | null;
  supplier?: SupplierProfileRead | null;
  strategy?: StrategyRead;
  counts: {
    zopa: number;
    batna: number;
    concessions: number;
    arguments: number;
  };
};

type ScopeStatus = "present" | "open";

type ScopeItem = {
  label: string;
  status: ScopeStatus;
  text: string;
};

async function loadBriefingScopeData(projectId: string): Promise<BriefingScopeData | null> {
  try {
    const project = await getNegotiationProject(projectId);
    const [requestItem, supplier, strategies] = await Promise.all([
      project.request_item_id ? loadOptional(() => getRequestItem(project.request_item_id as string)) : Promise.resolve(null),
      project.supplier_profile_id ? loadOptional(() => getSupplierProfile(project.supplier_profile_id as string)) : Promise.resolve(null),
      listStrategies({ negotiation_project_id: project.id }),
    ]);
    const strategy = strategies.find((item) => item.is_active) ?? strategies[0];
    const [zopaItems, batnaOptions, concessionItems, argumentationLines] = strategy
      ? await Promise.all([
          listZopaItems({ strategy_id: strategy.id }),
          listBatnaOptions({ strategy_id: strategy.id }),
          listConcessionItems({ strategy_id: strategy.id }),
          listArgumentationLines({ strategy_id: strategy.id }),
        ])
      : [[], [], [], []];

    return {
      project,
      requestItem,
      supplier,
      strategy,
      counts: {
        zopa: zopaItems.length,
        batna: batnaOptions.length,
        concessions: concessionItems.length,
        arguments: argumentationLines.length,
      },
    };
  } catch {
    return null;
  }
}

async function loadOptional<T>(loader: () => Promise<T>) {
  try {
    return await loader();
  } catch {
    return null;
  }
}

function BriefingPreparationScopeCard({ data }: { data: BriefingScopeData }) {
  const strategyItems = buildStrategyScopeItems(data);
  const briefingItems = buildBriefingBuildingBlockItems(data, strategyItems);
  const openStrategyItems = strategyItems.filter((item) => item.status === "open");
  const nextAction = buildNextAction(data, openStrategyItems);

  return (
    <section className="rounded-md border border-border bg-card p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <SectionTitle icon={<FileText className="size-4" />} title="Briefing Preparation Scope" />
          <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
            Einordnung nach Strategy Readiness: vorhandene Grundlagen werden fuer ein spaeteres Briefing sichtbar gemacht. Diese Card erzeugt kein
            KI-Briefing, startet keine Simulation und speichert keine neuen Daten.
          </p>
        </div>
        <Link href={`/strategy?projectId=${data.project.id}`} className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-primary hover:underline">
          Strategy Preparation
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>

      <div className="mt-5 grid gap-4 xl:grid-cols-[0.85fr_1.15fr]">
        <div className="rounded-md border border-border bg-background p-4">
          <h3 className="text-sm font-semibold">Projektkontext</h3>
          <dl className="mt-3 grid gap-3 text-sm">
            <Meta label="Projekt" value={data.project.title} />
            <Meta label="Verhandlungsart / Kategorie" value={displayValue(data.project.negotiation_type ?? data.project.project_type ?? data.project.category)} />
            <Meta label="Bedarfskontext" value={displayValue(data.requestItem?.title ?? data.project.article_or_service)} />
            <Meta label="Supplier Context" value={displayValue(data.supplier?.name ?? data.project.current_supplier)} />
          </dl>
          <p className="mt-3 text-xs leading-5 text-muted-foreground">
            Bedarf und Lieferant werden nur aus verknuepftem RequestItem, SupplierProfile oder vorhandenen Projektfeldern eingeordnet.
          </p>
        </div>

        <div className="rounded-md border border-border bg-background p-4">
          <h3 className="text-sm font-semibold">Strategiegrundlage</h3>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {strategyItems.map((item) => (
              <ScopeStatusRow key={item.label} item={item} />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-md border border-border bg-background p-4">
        <h3 className="text-sm font-semibold">Briefing-Bausteine</h3>
        <div className="mt-3 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
          {briefingItems.map((item) => (
            <ScopeStatusRow key={item.label} item={item} />
          ))}
        </div>
      </div>

      <div className="mt-4 rounded-md border border-dashed border-border bg-muted/30 p-4">
        <p className="text-sm font-semibold">Naechste Aktion</p>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{nextAction.text}</p>
        <Link href={nextAction.href} className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
          {nextAction.label}
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}

function buildStrategyScopeItems({ strategy, counts }: BriefingScopeData): ScopeItem[] {
  const hasObjectives = hasText(strategy?.overall_objective) || hasText(strategy?.target_outcome);
  const hasZopa = hasText(strategy?.zopa_summary) || counts.zopa > 0;
  const hasBatna = hasText(strategy?.batna_summary) || counts.batna > 0;
  const hasWap = hasText(strategy?.walk_away_point) || hasText(strategy?.minimum_acceptable_outcome);
  const hasConcessions = hasText(strategy?.concession_strategy) || counts.concessions > 0;
  const hasArguments = hasText(strategy?.argumentation_summary) || counts.arguments > 0;

  return [
    {
      label: "Strategy",
      status: strategy ? "present" : "open",
      text: strategy ? "Strategie-Kopf ist vorhanden." : "Zuerst Strategy Preparation starten.",
    },
    {
      label: "Objectives",
      status: hasObjectives ? "present" : "open",
      text: hasObjectives ? "Zielbild oder Zielergebnis ist dokumentiert." : "Zielbild fuer das Briefing noch nachpflegen.",
    },
    { label: "ZOPA", status: hasZopa ? "present" : "open", text: hasZopa ? "Einigungskorridor ist sichtbar." : "Einigungskorridor noch einordnen." },
    { label: "BATNA", status: hasBatna ? "present" : "open", text: hasBatna ? "Alternative ist sichtbar." : "Alternative ausserhalb der Verhandlung noch klaeren." },
    { label: "WAP", status: hasWap ? "present" : "open", text: hasWap ? "Walk-away-Grenze ist dokumentiert." : "Minimale Grenze noch festlegen." },
    {
      label: "Konzessionen",
      status: hasConcessions ? "present" : "open",
      text: hasConcessions ? "Tauschlogik ist vorbereitet." : "Konzessionslogik noch schaerfen.",
    },
    {
      label: "Argumentationslinien",
      status: hasArguments ? "present" : "open",
      text: hasArguments ? "Argumentationsanker sind sichtbar." : "Kernargumente noch sammeln.",
    },
  ];
}

function buildBriefingBuildingBlockItems(data: BriefingScopeData, strategyItems: ScopeItem[]): ScopeItem[] {
  const hasProjectContext = hasAnyText(data.project.title, data.project.context, data.project.objective, data.project.business_pressure);
  const hasTargetPicture = strategyItems.find((item) => item.label === "Objectives")?.status === "present";
  const hasSupplierContext = Boolean(data.supplier) || hasText(data.project.current_supplier);
  const hasArguments = strategyItems.find((item) => item.label === "Argumentationslinien")?.status === "present";
  const hasConcessionLogic = strategyItems.find((item) => item.label === "Konzessionen")?.status === "present";
  const openItems = strategyItems.filter((item) => item.status === "open");

  return [
    {
      label: "Ausgangslage",
      status: hasProjectContext ? "present" : "open",
      text: hasProjectContext ? "Projekt- oder Bedarfskontext ist vorhanden." : "Ausgangslage noch aus Projekt oder Bedarf schaerfen.",
    },
    {
      label: "Zielbild",
      status: hasTargetPicture ? "present" : "open",
      text: hasTargetPicture ? "Strategisches Zielbild kann uebernommen werden." : "Objectives fehlen noch als Briefing-Anker.",
    },
    {
      label: "Gegenseitenkontext",
      status: hasSupplierContext ? "present" : "open",
      text: hasSupplierContext ? "Supplier Context ist als Grundlage sichtbar." : "Lieferanten-/Gegenseitenkontext noch offen.",
    },
    {
      label: "Kernargumente",
      status: hasArguments ? "present" : "open",
      text: hasArguments ? "Argumente koennen ins Briefing eingeordnet werden." : "Argumentationslinien noch vorbereiten.",
    },
    {
      label: "Konzessionslogik",
      status: hasConcessionLogic ? "present" : "open",
      text: hasConcessionLogic ? "Tauschlogik kann ins Briefing uebernommen werden." : "Konzessionen noch nachpflegen.",
    },
    {
      label: "Offene Fragen",
      status: openItems.length === 0 ? "present" : "open",
      text: openItems.length === 0 ? "Keine offenen Kernbausteine in dieser Sicht." : `${openItems.length} Strategiegrundlagen offen.`,
    },
    {
      label: "Grenze zur Simulation",
      status: "present",
      text: "Briefing ordnet nur Vorbereitung; Simulation bleibt getrennt.",
    },
  ];
}

function buildNextAction(data: BriefingScopeData, openStrategyItems: ScopeItem[]) {
  if (!data.strategy) {
    return {
      href: `/strategy?projectId=${data.project.id}`,
      label: "Zur Strategievorbereitung",
      text: "Es ist noch keine Strategy vorhanden. Lege zuerst den Strategie-Kopf an; Briefing Preparation erzeugt keine Strategie automatisch.",
    };
  }

  if (openStrategyItems.length > 0) {
    return {
      href: `/strategy?projectId=${data.project.id}`,
      label: "Strategy-Bausteine nachpflegen",
      text: "Eine Strategy ist vorhanden, aber zentrale Briefing-Grundlagen sind noch offen. Pflege die fehlenden Strategy-Bausteine nach, bevor daraus ein belastbares Briefing entsteht.",
    };
  }

  return {
    href: `/strategy?projectId=${data.project.id}`,
    label: "Briefing-Struktur pruefen",
    text: "Die zentralen Strategy-Bausteine sind sichtbar. Die Briefing-Struktur kann geprueft werden; ein spaeterer Ausbau kann darauf aufsetzen.",
  };
}

function ScopeStatusRow({ item }: { item: ScopeItem }) {
  return (
    <div className="flex gap-2 rounded-md border border-border p-3">
      {item.status === "present" ? (
        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-600" aria-hidden="true" />
      ) : (
        <CircleDashed className="mt-0.5 size-4 shrink-0 text-amber-600" aria-hidden="true" />
      )}
      <div className="min-w-0">
        <p className="text-sm font-medium">{item.label}</p>
        <p className="mt-1 text-xs leading-5 text-muted-foreground">{item.text}</p>
      </div>
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">{label}</dt>
      <dd className="mt-1 break-words font-medium">{value}</dd>
    </div>
  );
}

function SectionTitle({ icon, title }: { icon: ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="rounded-md bg-muted p-2 text-primary">{icon}</span>
      <h2 className="text-base font-semibold">{title}</h2>
    </div>
  );
}

function displayValue(value?: string | null) {
  return value?.trim() || "Nicht gesetzt";
}

function hasText(value?: string | null) {
  return Boolean(value?.trim());
}

function hasAnyText(...values: Array<string | null | undefined>) {
  return values.some((value) => hasText(value));
}
