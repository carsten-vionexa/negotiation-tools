import { LoadingState } from "@/components/state-patterns";

export default function ImportDetailLoading() {
  return <LoadingState title="ImportJob wird geladen." description="Verarbeitungsdetails und ImportRows werden vorbereitet." />;
}
