import { LoadingState } from "@/components/state-patterns";

export default function CompaniesLoading() {
  return <LoadingState title="Firmen werden geladen." description="Company-Stammdaten und Projektverknuepfungen werden vorbereitet." />;
}
