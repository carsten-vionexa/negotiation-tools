import { PlaceholderPage } from "@/components/placeholder-page";

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <PlaceholderPage
      title="Projektdetail"
      description="Platzhalter fuer Projektbriefing, Beziehungen zu Company/Profile/Supplier und Links in Analyse, Strategie, Simulation und Review."
      route={`/projects/${id}`}
      items={["Projektbriefing", "Kontextnotizen", "Status", "MVP-Flow-Links"]}
      nextHref="/analysis"
      nextLabel="Zur Analyse"
    />
  );
}
