import { ArrowRight, Brain, FileText, ShieldCheck, Target } from "lucide-react";

const projectPhases = [
  { label: "Vorbereitung", value: "Quellen sammeln", icon: FileText },
  { label: "Strategie", value: "ZOPA, WAP, BATNA", icon: Target },
  { label: "Simulation", value: "Gegenseite trainieren", icon: Brain },
  { label: "Auswertung", value: "Lernen mit Nachweis", icon: ShieldCheck },
];

const sourceTypes = ["Branchenreport", "Firmenprofil", "DISC-Profil", "Einkaufshistorie", "Anfragenkatalog"];

export default function Home() {
  return (
    <main className="min-h-screen">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-8 lg:px-8">
        <header className="flex items-center justify-between border-b border-border pb-5">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Negotiation Tools
            </p>
            <h1 className="mt-2 text-2xl font-semibold">Verhandlungs-Cockpit</h1>
          </div>
          <a
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
            href={`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000"}/docs`}
          >
            API Docs
            <ArrowRight data-icon="inline-end" />
          </a>
        </header>

        <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="flex flex-col gap-6">
            <h2 className="max-w-3xl text-5xl font-semibold leading-tight">
              Aus Quellen werden klare Verhandlungsstrategien.
            </h2>
            <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
              Lokaler MVP fuer Rheinwerk Robotics: Dokumente, Einkaufshistorie und Profile werden zu
              Strategie, Simulation und nachvollziehbarem Feedback verbunden.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {projectPhases.map((phase) => {
                const Icon = phase.icon;
                return (
                  <div key={phase.label} className="rounded-lg border border-border bg-card p-4">
                    <Icon className="mb-4 text-primary" />
                    <h3 className="font-semibold">{phase.label}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{phase.value}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <aside className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <h3 className="text-lg font-semibold">MVP-Projekt</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Rheinwerk Robotics Einkauf als erster strukturierter Trainingsfall.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              {sourceTypes.map((source) => (
                <div key={source} className="flex items-center justify-between rounded-md bg-muted px-3 py-2">
                  <span className="text-sm font-medium">{source}</span>
                  <span className="text-xs text-muted-foreground">bereit</span>
                </div>
              ))}
            </div>
          </aside>
        </section>
      </section>
    </main>
  );
}
