import { PlaceholderPage } from "@/components/placeholder-page";

export default function ProfilesPage() {
  return (
    <PlaceholderPage
      title="Rollenprofile"
      description="Vorbereitete Route fuer Trainee- und Trainingsrollenprofile ohne Nutzer- oder Rechteverwaltung."
      route="/profiles"
      items={["Profil-Liste", "Rollenname", "Trainingsziele", "Entwicklungsfelder"]}
      nextHref="/projects"
      nextLabel="Zu Projekten"
    />
  );
}
