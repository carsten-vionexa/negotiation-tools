import { LoadingState } from "@/components/state-patterns";

export default function KnowledgeBaseLoading() {
  return <LoadingState title="Datenbasis wird geladen." description="Quellen, Claims und Einkaufsdaten werden aus den Listenendpunkten zusammengesetzt." />;
}
