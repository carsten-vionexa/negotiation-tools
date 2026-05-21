import { PlaceholderPage } from "@/components/placeholder-page";

export default async function CompanyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <PlaceholderPage
      title="Firmendetail"
      description="Platzhalter fuer Company-Kontext, Datenlage und verknuepfte Verhandlungsprojekte."
      route={`/companies/${id}`}
      items={["Stammdaten", "Datenlage", "Projekte", "Fachliche Hinweise"]}
      nextHref="/projects"
      nextLabel="Zu Projekten"
    />
  );
}
