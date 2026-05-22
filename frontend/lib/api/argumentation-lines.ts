import { apiGet, apiPatch, apiPost } from "@/lib/api-client";

export type ArgumentationLineRead = {
  id: string;
  strategy_id: string;
  title: string;
  argument_type?: string | null;
  claim?: string | null;
  evidence?: string | null;
  source_reference?: string | null;
  expected_counterargument?: string | null;
  response_strategy?: string | null;
  priority?: string | null;
  confidence_level?: string | null;
  information_kind?: string | null;
  metadata_json?: Record<string, unknown>;
  created_at?: string;
  updated_at?: string;
};

export type ArgumentationLineCreate = {
  strategy_id: string;
  title: string;
  argument_type?: string | null;
  claim?: string | null;
  evidence?: string | null;
  source_reference?: string | null;
  expected_counterargument?: string | null;
  response_strategy?: string | null;
  priority?: string | null;
  confidence_level?: string | null;
  information_kind?: string | null;
  metadata_json?: Record<string, unknown>;
};

export type ArgumentationLineUpdate = Partial<ArgumentationLineCreate>;

export type ArgumentationLineListFilters = {
  strategy_id?: string;
  skip?: number;
  limit?: number;
};

export function listArgumentationLines(filters?: ArgumentationLineListFilters) {
  return apiGet<ArgumentationLineRead[]>("/api/argumentation-lines", { query: filters, cache: "no-store" });
}

export function createArgumentationLine(payload: ArgumentationLineCreate) {
  return apiPost<ArgumentationLineRead, ArgumentationLineCreate>("/api/argumentation-lines", payload);
}

export function updateArgumentationLine(id: string, payload: ArgumentationLineUpdate) {
  return apiPatch<ArgumentationLineRead, ArgumentationLineUpdate>(`/api/argumentation-lines/${id}`, payload);
}
