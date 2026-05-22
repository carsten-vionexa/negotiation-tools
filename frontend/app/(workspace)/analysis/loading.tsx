import { LoadingState } from "@/components/state-patterns";

export default function AnalysisLoading() {
  return <LoadingState title="Analyseansicht wird geladen." description="Projektkontext, Anfrageposition und Wissensaussagen werden gelesen." />;
}
