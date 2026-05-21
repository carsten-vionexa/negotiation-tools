import { PlaceholderPage } from "@/components/placeholder-page";

export default function SimulationPage() {
  return (
    <PlaceholderPage
      title="Simulation"
      description="Vorbereitete Route fuer Szenario-Konfiguration. Chat, Voice und produktive Simulation sind bewusst nicht enthalten."
      route="/simulation"
      items={["Szenario-Liste", "Konfiguration", "Briefing", "Erfolgskriterien"]}
      nextHref="/trainer-review"
      nextLabel="Zum Review"
    />
  );
}
