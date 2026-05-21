import { PlaceholderPage } from "@/components/placeholder-page";

export default function CompaniesPage() {
  return (
    <PlaceholderPage
      title="Firmen"
      description="Vorbereitete Liste fuer Company- und Mandantenkontext. Vollstaendige Stammdaten-Flows folgen in Phase B7."
      route="/companies"
      items={["Company-Liste", "Company-Detail", "Edit-Flow", "Verknuepfte Projekte"]}
      nextHref="/companies/example"
      nextLabel="Detailroute ansehen"
    />
  );
}
