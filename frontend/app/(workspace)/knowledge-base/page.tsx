import { PlaceholderPage } from "@/components/placeholder-page";

export default function KnowledgeBasePage() {
  return (
    <PlaceholderPage
      title="Datenbasis"
      description="Vorbereitete Route fuer Knowledge Documents, Claims, Einkaufshistorie und Importstatus. Upload- und Import-UI bleibt Folgearbeit."
      route="/knowledge-base"
      items={["Quellen", "Claims", "Einkaufshistorie", "Importstatus"]}
      nextHref="/analysis"
      nextLabel="Zur Analyse"
    />
  );
}
