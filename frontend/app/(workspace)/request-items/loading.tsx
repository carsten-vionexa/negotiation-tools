import { LoadingState } from "@/components/state-patterns";

export default function RequestItemsLoading() {
  return <LoadingState title="Anfragepositionen werden geladen." description="Bedarfe und Company-Zuordnungen werden vorbereitet." />;
}
