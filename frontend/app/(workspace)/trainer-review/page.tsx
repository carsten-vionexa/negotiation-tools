import { PlaceholderPage } from "@/components/placeholder-page";

export default function TrainerReviewPage() {
  return (
    <PlaceholderPage
      title="Trainerreview"
      description="Vorbereitete Route fuer Trainerkommentare, Sichtbarkeit und einfache Lernpunkte ohne automatische Bewertung."
      route="/trainer-review"
      items={["Kommentare", "Sichtbarkeit", "Lernpunkte", "Projekt-/Szenario-Bezug"]}
      nextHref="/dashboard"
      nextLabel="Zum Dashboard"
    />
  );
}
