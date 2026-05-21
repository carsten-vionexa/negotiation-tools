import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { EmptyState, ErrorState, LoadingState } from "@/components/state-patterns";
import { PageHeader } from "@/components/page-header";
import { workflowSteps } from "@/lib/navigation";

const dashboardCards = [
  { label: "Aktive Projekte", value: "Projektliste folgt", href: "/projects" },
  { label: "Offene Reviews", value: "Trainerreview folgt", href: "/trainer-review" },
  { label: "Datenbasis", value: "Quellenuebersicht folgt", href: "/knowledge-base" },
];

export default function DashboardPage() {
  return (
    <>
      <PageHeader
        eyebrow="Grundlage vorbereitet"
        title="Dashboard"
        description="Startpunkt fuer die spaeteren MVP-Flows: aktive Projekte, naechste Arbeitsschritte und offene Trainerreviews."
      />

      <section className="grid gap-4 md:grid-cols-3">
        {dashboardCards.map((card) => (
          <Link key={card.label} href={card.href} className="rounded-md border border-border bg-card p-5 hover:bg-muted">
            <p className="text-sm text-muted-foreground">{card.label}</p>
            <div className="mt-3 flex items-center justify-between gap-3">
              <p className="font-semibold">{card.value}</p>
              <ArrowRight className="size-4 shrink-0" />
            </div>
          </Link>
        ))}
      </section>

      <section className="rounded-md border border-border bg-card p-5">
        <h2 className="text-base font-semibold">MVP-Screen-Gruppen</h2>
        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
          {workflowSteps.map((step) => (
            <div key={step} className="rounded-md bg-muted px-3 py-2 text-sm font-medium">
              {step}
            </div>
          ))}
        </div>
      </section>

      <div className="grid gap-4 lg:grid-cols-3">
        <LoadingState title="LoadingState" description="Wiederverwendbares Muster fuer spaetere Datenladezustaende." />
        <ErrorState title="ErrorState" description="Wiederverwendbares Muster fuer API- und Runtime-Fehler." />
        <EmptyState title="EmptyState" description="Wiederverwendbares Muster fuer leere Listen oder fehlende Daten." />
      </div>
    </>
  );
}
