import { CheckCircle2, FileText, Info } from "lucide-react";
import type { ReactNode } from "react";

import { PageHeader } from "@/components/page-header";

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

export default function BriefingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Briefing Preparation"
        title="Briefing vorbereiten"
        description="Ruhiger Einstieg fuer den naechsten vorbereitenden Schritt nach einer ausreichend ausgearbeiteten Strategie."
      />

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

function SectionTitle({ icon, title }: { icon: ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="rounded-md bg-muted p-2 text-primary">{icon}</span>
      <h2 className="text-base font-semibold">{title}</h2>
    </div>
  );
}
