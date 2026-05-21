import { PlaceholderPage } from "@/components/placeholder-page";

export default function AnalysisPage() {
  return (
    <PlaceholderPage
      title="Analyse"
      description="Vorbereitete Screen-Gruppe fuer Fakten, Annahmen, Hypothesen, Risiken, Chancen und Datenluecken."
      route="/analysis"
      items={["Fakten", "Annahmen", "Hypothesen", "Risiken und Chancen"]}
      nextHref="/strategy"
      nextLabel="Zur Strategie"
    />
  );
}
