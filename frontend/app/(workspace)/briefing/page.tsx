import { PlaceholderPage } from "@/components/placeholder-page";

export default function BriefingPage() {
  return (
    <PlaceholderPage
      title="Briefing"
      description="Vorbereitete Route fuer Kultur- und Rollenbriefing als vorsichtige Arbeitshypothesen."
      route="/briefing"
      items={["Gegenrolle", "Beziehungskontext", "Kulturhypothesen", "Prueffragen"]}
      nextHref="/simulation"
      nextLabel="Zur Simulation"
    />
  );
}
