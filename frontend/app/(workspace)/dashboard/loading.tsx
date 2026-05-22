import { LoadingState } from "@/components/state-patterns";

export default function DashboardLoading() {
  return <LoadingState title="Dashboard wird geladen." description="Workspace-Zaehler werden aus den Listenendpunkten zusammengesetzt." />;
}
