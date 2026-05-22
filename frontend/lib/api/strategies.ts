import { apiGet, apiPatch, apiPost } from "@/lib/api-client";

export type StrategyRead = {
  id: string;
  company_id: string;
  negotiation_project_id: string;
  title: string;
  status: string;
  version: number;
  is_active: boolean;
  overall_objective?: string | null;
  target_outcome?: string | null;
  minimum_acceptable_outcome?: string | null;
  walk_away_point?: string | null;
  zopa_summary?: string | null;
  batna_summary?: string | null;
  concession_strategy?: string | null;
  argumentation_summary?: string | null;
  risk_assessment?: string | null;
  notes?: string | null;
  metadata_json?: Record<string, unknown>;
  created_at?: string;
  updated_at?: string;
};

export type StrategyCreate = {
  company_id: string;
  negotiation_project_id: string;
  title: string;
  status?: string;
  version?: number;
  is_active?: boolean;
  overall_objective?: string | null;
  target_outcome?: string | null;
  minimum_acceptable_outcome?: string | null;
  walk_away_point?: string | null;
  zopa_summary?: string | null;
  batna_summary?: string | null;
  concession_strategy?: string | null;
  argumentation_summary?: string | null;
  risk_assessment?: string | null;
  notes?: string | null;
  metadata_json?: Record<string, unknown>;
};

export type StrategyUpdate = Partial<StrategyCreate>;

export type StrategyListFilters = {
  negotiation_project_id?: string;
  company_id?: string;
  status?: string;
  is_active?: boolean;
  skip?: number;
  limit?: number;
};

export function listStrategies(filters?: StrategyListFilters) {
  return apiGet<StrategyRead[]>("/api/strategies", { query: filters, cache: "no-store" });
}

export function getStrategy(id: string) {
  return apiGet<StrategyRead>(`/api/strategies/${id}`, { cache: "no-store" });
}

export function createStrategy(payload: StrategyCreate) {
  return apiPost<StrategyRead, StrategyCreate>("/api/strategies", payload);
}

export function updateStrategy(id: string, payload: StrategyUpdate) {
  return apiPatch<StrategyRead, StrategyUpdate>(`/api/strategies/${id}`, payload);
}
