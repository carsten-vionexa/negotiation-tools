import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { EmptyState } from "@/components/state-patterns";
import { PageHeader } from "@/components/page-header";
import { readinessLabel } from "@/lib/navigation";

type PlaceholderPageProps = {
  title: string;
  description: string;
  route: string;
  items: string[];
  nextHref?: string;
  nextLabel?: string;
};

export function PlaceholderPage({
  title,
  description,
  route,
  items,
  nextHref,
  nextLabel,
}: PlaceholderPageProps) {
  return (
    <>
      <PageHeader eyebrow={readinessLabel} title={title} description={description} />

      <section className="grid gap-4 lg:grid-cols-[1fr_0.75fr]">
        <div className="rounded-md border border-border bg-card p-5">
          <h2 className="text-base font-semibold">Vorbereitete Struktur</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Diese Route ist als Aufnahmeflaeche fuer Listen-, Detail- und Bearbeitungsseiten vorbereitet.
            Fachliche Datenlade- und Formularlogik folgt in den naechsten Issues.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {items.map((item) => (
              <div key={item} className="rounded-md bg-muted px-3 py-2 text-sm font-medium">
                {item}
              </div>
            ))}
          </div>
        </div>

        <aside className="rounded-md border border-border bg-card p-5">
          <h2 className="text-base font-semibold">Route</h2>
          <code className="mt-3 block rounded-md bg-muted px-3 py-2 text-sm">{route}</code>
          {nextHref && nextLabel ? (
            <Link
              href={nextHref}
              className="mt-5 inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground"
            >
              {nextLabel}
              <ArrowRight className="size-4" />
            </Link>
          ) : null}
        </aside>
      </section>

      <EmptyState
        title="Noch keine Fachansicht umgesetzt"
        description="Die Seite ist bewusst ein Platzhalter. Es gibt hier noch keine vollstaendige Liste, Detailansicht, Edit-Form, Upload-Funktion, Analyse-Logik, Simulation oder Review-Fachlogik."
      />
    </>
  );
}
