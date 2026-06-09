import Link from "next/link";
import { ArrowRight, CheckCircle2, CircleDashed, Compass, Route, ShieldAlert } from "lucide-react";
import type { ReactNode } from "react";

import { PageHeader } from "@/components/page-header";

const workflowSteps = [
  { label: "Company", href: "/companies" },
  { label: "Profile", href: "/profiles" },
  { label: "Project", href: "/projects" },
  { label: "Knowledge Base", href: "/knowledge-base" },
  { label: "Imports", href: "/imports" },
  { label: "Analysis", href: "/analysis" },
  { label: "Strategy", href: "/strategy" },
  { label: "Briefing Preparation", href: "/briefing" },
  { label: "Simulation Preparation", href: "/simulation" },
  { label: "Trainerreview", href: "/trainer-review" },
];

const currentMvpCapabilities = [
  "Stammdaten, Rollenprofile, Lieferanten, Anfragepositionen und Projekte strukturiert anlegen.",
  "Knowledge Base und Imports als nachvollziehbare Datenbasis fuer den Workflow nutzen.",
  "Analyse- und Strategiearbeit mit ZOPA, BATNA, WAP, Konzessionen und Argumenten vorbereiten.",
  "Briefing Preparation, Simulation Preparation und Trainerreview als sichtbare Folgeschritte einordnen.",
];

const currentMvpLimits = [
  "Keine automatische KI-Briefing-Erzeugung.",
  "Keine produktive Simulation, kein Chat- oder Voice-Modus.",
  "Keine automatische Auswertung, Score Engine oder User-Progress-Persistenz.",
  "Keine neue Rechteverwaltung und keine automatische Aenderung bestehender Workflow-Daten.",
];

const demoPath = [
  {
    title: "Demo-Kontext ansehen",
    description: "Starte im Dashboard und pruefe, welche Projekte, Companies und Profile vorhanden sind.",
    href: "/dashboard",
  },
  {
    title: "Projekt vorbereiten",
    description: "Oeffne Projects und waehle einen konkreten Verhandlungsfall, zum Beispiel Rheinwerk Robotics / Aurum Motion Systems.",
    href: "/projects",
  },
  {
    title: "Datenbasis verstehen",
    description: "Pruefe Knowledge Base und Imports, bevor du fachliche Schluesse aus Analyse oder Strategie ziehst.",
    href: "/knowledge-base",
  },
  {
    title: "Strategie schaerfen",
    description: "Nutze Strategy fuer Ziele, Einigungskorridor, Alternativen, Argumente, Konzessionen und offene Fragen.",
    href: "/strategy",
  },
  {
    title: "Folgeschritte einordnen",
    description: "Sieh dir Briefing, Simulation Preparation und Trainerreview an, ohne dort produktive Automatisierung zu erwarten.",
    href: "/briefing",
  },
];

export default function GettingStartedPage() {
  return (
    <>
      <PageHeader
        eyebrow="Guided Introduction"
        title="Getting Started"
        description="Ein ruhiger Einstieg fuer Demo-Teilnehmer und Tester: Was das Verhandlungs-Cockpit leisten soll, wie der MVP-Workflow gedacht ist und wo die aktuellen Grenzen liegen."
      />

      <section className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-md border border-border bg-card p-5">
          <SectionTitle icon={<Compass className="size-4" />} title="Worum es geht" />
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Negotiation Tools ist ein workflowbasiertes Verhandlungs-Cockpit fuer Vorbereitung, Strategieentwicklung,
            Trainingsvorbereitung und menschliches Review. Der MVP fuehrt Nutzer durch strukturierte fachliche Schritte und ist
            bewusst kein freier Chatbot.
          </p>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Die Seiten helfen dabei, Unternehmenskontext, Rollen, Datenbasis, Projektlage und Strategieentscheidungen so zu ordnen,
            dass ein Demo- oder Testdurchlauf nachvollziehbar bleibt.
          </p>
        </div>

        <aside className="rounded-md border border-border bg-card p-5">
          <SectionTitle icon={<Route className="size-4" />} title="Workflow-Roter-Faden" />
          <div className="mt-4 grid gap-2">
            {workflowSteps.map((step, index) => (
              <Link
                key={step.label}
                href={step.href}
                className="flex items-center gap-3 rounded-md border border-border px-3 py-2 text-sm hover:bg-muted"
              >
                <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-muted text-xs font-semibold">
                  {index + 1}
                </span>
                <span className="min-w-0 flex-1 font-medium">{step.label}</span>
                <ArrowRight className="size-4 shrink-0 text-muted-foreground" />
              </Link>
            ))}
          </div>
        </aside>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <InfoList icon={<CheckCircle2 className="size-4" />} title="Was der aktuelle MVP kann" items={currentMvpCapabilities} />
        <InfoList icon={<ShieldAlert className="size-4" />} title="Was der MVP noch nicht kann" items={currentMvpLimits} muted />
      </section>

      <section className="rounded-md border border-border bg-card p-5">
        <SectionTitle icon={<CircleDashed className="size-4" />} title="Empfohlener Demo- und Testpfad" />
        <div className="mt-4 grid gap-3">
          {demoPath.map((step, index) => (
            <Link key={step.title} href={step.href} className="rounded-md border border-border p-4 hover:bg-muted">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md bg-primary text-xs font-semibold text-primary-foreground">
                  {index + 1}
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold">{step.title}</span>
                  <span className="mt-1 block text-sm leading-6 text-muted-foreground">{step.description}</span>
                </span>
                <ArrowRight className="mt-1 size-4 shrink-0 text-muted-foreground" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

function InfoList({ icon, title, items, muted = false }: { icon: ReactNode; title: string; items: string[]; muted?: boolean }) {
  return (
    <section className="rounded-md border border-border bg-card p-5">
      <SectionTitle icon={icon} title={title} />
      <ul className="mt-4 grid gap-3">
        {items.map((item) => (
          <li
            key={item}
            className={muted ? "rounded-md border border-dashed border-border bg-muted/40 p-3 text-sm leading-6 text-muted-foreground" : "rounded-md border border-border p-3 text-sm leading-6 text-muted-foreground"}
          >
            {item}
          </li>
        ))}
      </ul>
    </section>
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
