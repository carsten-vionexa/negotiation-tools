import { apiGet, apiPatch, apiPost } from "@/lib/api-client";

export type SimulationScenarioRead = {
  id: string;
  company_id: string;
  negotiation_project_id: string;
  strategy_id?: string | null;
  supplier_profile_id?: string | null;
  user_profile_id?: string | null;
  title: string;
  status: string;
  scenario_type?: string | null;
  ai_role?: string | null;
  counterparty_name?: string | null;
  counterparty_role?: string | null;
  country_or_region?: string | null;
  cultural_context?: string | null;
  difficulty_level?: string | null;
  communication_style?: string | null;
  negotiation_phase?: string | null;
  training_goal?: string | null;
  scenario_brief?: string | null;
  success_criteria?: string | null;
  time_limit_minutes?: number | null;
  language?: string | null;
  started_at?: string | null;
  completed_at?: string | null;
  metadata_json?: Record<string, unknown>;
  created_at?: string;
  updated_at?: string;
};

export type SimulationScenarioCreate = {
  company_id: string;
  negotiation_project_id: string;
  strategy_id?: string | null;
  supplier_profile_id?: string | null;
  user_profile_id?: string | null;
  title: string;
  status?: string;
  scenario_type?: string | null;
  ai_role?: string | null;
  counterparty_name?: string | null;
  counterparty_role?: string | null;
  country_or_region?: string | null;
  cultural_context?: string | null;
  difficulty_level?: string | null;
  communication_style?: string | null;
  negotiation_phase?: string | null;
  training_goal?: string | null;
  scenario_brief?: string | null;
  success_criteria?: string | null;
  time_limit_minutes?: number | null;
  language?: string | null;
  started_at?: string | null;
  completed_at?: string | null;
  metadata_json?: Record<string, unknown>;
};

export type SimulationScenarioUpdate = Partial<SimulationScenarioCreate>;

export type SimulationScenarioListFilters = {
  company_id?: string;
  negotiation_project_id?: string;
  strategy_id?: string;
  supplier_profile_id?: string;
  user_profile_id?: string;
  status?: string;
  scenario_type?: string;
  difficulty_level?: string;
  language?: string;
  skip?: number;
  limit?: number;
};

export function listSimulationScenarios(filters?: SimulationScenarioListFilters) {
  return apiGet<SimulationScenarioRead[]>("/api/simulation-scenarios", { query: filters, cache: "no-store" });
}

export function getSimulationScenario(id: string) {
  return apiGet<SimulationScenarioRead>(`/api/simulation-scenarios/${id}`, { cache: "no-store" });
}

export function createSimulationScenario(payload: SimulationScenarioCreate) {
  return apiPost<SimulationScenarioRead, SimulationScenarioCreate>("/api/simulation-scenarios", payload);
}

export function updateSimulationScenario(id: string, payload: SimulationScenarioUpdate) {
  return apiPatch<SimulationScenarioRead, SimulationScenarioUpdate>(`/api/simulation-scenarios/${id}`, payload);
}
