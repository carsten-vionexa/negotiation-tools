import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ErrorState } from "@/components/state-patterns";
import { PageHeader } from "@/components/page-header";
import { listCompanies } from "@/lib/api/companies";
import { listNegotiationProjects } from "@/lib/api/negotiation-projects";
import { listUserProfiles } from "@/lib/api/user-profiles";
import { workflowSteps } from "@/lib/navigation";

export default async function DashboardPage() {
  let projects;
  let companies;
  let profiles;

  try {
    [projects, companies, profiles] = await Promise.all([
      listNegotiationProjects(),
      listCompanies(),
      listUserProfiles(),
    ]);
  } catch (error) {
    return (
      <>
        <PageHeader
          eyebrow="Workspace"
          title="Dashboard"
          description="Startpunkt fuer Stammdaten, Rollenprofile und Verhandlungsprojekte."
        />
        <ErrorState title="Dashboard-Daten konnten nicht geladen werden." description={getErrorDescription(error)} />
      </>
    );
  }

  const dashboardCards = [
    { label: "Projekte", value: projects.length, href: "/projects" },
    { label: "Companies", value: companies.length, href: "/companies" },
    { label: "Profile", value: profiles.length, href: "/profiles" },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Workspace"
        title="Dashboard"
        description="Startpunkt fuer Stammdaten, Rollenprofile und Verhandlungsprojekte."
      />

      <section className="grid gap-4 md:grid-cols-3">
        {dashboardCards.map((card) => (
          <Link key={card.label} href={card.href} className="rounded-md border border-border bg-card p-5 hover:bg-muted">
            <p className="text-sm text-muted-foreground">{card.label}</p>
            <div className="mt-3 flex items-center justify-between gap-3">
              <p className="text-2xl font-semibold">{card.value}</p>
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
    </>
  );
}

function getErrorDescription(error: unknown) {
  return error instanceof Error ? error.message : "Bitte pruefe, ob das Backend erreichbar ist.";
}
