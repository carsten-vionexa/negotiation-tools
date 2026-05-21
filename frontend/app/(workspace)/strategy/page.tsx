import { PlaceholderPage } from "@/components/placeholder-page";

export default function StrategyPage() {
  return (
    <PlaceholderPage
      title="Strategie"
      description="Vorbereitete Route fuer Strategie-Kopf, ZOPA, BATNA, Konzessionen und Argumentationslinien."
      route="/strategy"
      items={["Strategie-Kopf", "ZOPA", "BATNA", "Konzessionen", "Argumente"]}
      nextHref="/briefing"
      nextLabel="Zum Briefing"
    />
  );
}
