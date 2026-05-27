import { LoadingState } from "@/components/state-patterns";

export default function SuppliersLoading() {
  return <LoadingState title="Lieferanten werden geladen." description="Lieferantenprofile und Company-Zuordnungen werden vorbereitet." />;
}
