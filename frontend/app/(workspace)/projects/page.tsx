import { PlaceholderPage } from "@/components/placeholder-page";

export default function ProjectsPage() {
  return (
    <PlaceholderPage
      title="Verhandlungsprojekte"
      description="Vorbereitete Projektliste fuer den operativen MVP-Kern: Projektkontext, Status und Sprungmarken in die Folgeflows."
      route="/projects"
      items={["Projektliste", "Projektanlage", "Projektstatus", "Workflow-Sprungmarken"]}
      nextHref="/projects/example"
      nextLabel="Detailroute ansehen"
    />
  );
}
