import { apiGet, apiPatch, apiPost } from "@/lib/api-client";
import type { DecimalInput } from "@/lib/api/request-items";

export type NegotiationProjectSummary = {
  id: string;
  company_id: string;
  owner_id?: string | null;
  request_item_id?: string | null;
  supplier_profile_id?: string | null;
  title: string;
  status: string;
  negotiation_type?: string | null;
  project_type?: string | null;
  category?: string | null;
  article_or_service?: string | null;
  quantity?: string | null;
  target_region?: string | null;
  desired_delivery_time?: string | null;
  internal_price_expectation?: string | null;
  currency?: string | null;
  current_supplier?: string | null;
  priority?: string | null;
  business_pressure?: string | null;
  technical_dependency_level?: string | null;
  supplier_power_level?: string | null;
  risk_level?: string | null;
  objective?: string | null;
  context?: string | null;
  strategy_data?: Record<string, unknown>;
  simulation_data?: Record<string, unknown>;
  metadata_json?: Record<string, unknown>;
  created_at?: string;
  updated_at?: string;
};

export type NegotiationProjectRead = NegotiationProjectSummary;

export type NegotiationProjectCreate = {
  company_id: string;
  owner_id?: string | null;
  request_item_id?: string | null;
  supplier_profile_id?: string | null;
  title: string;
  status?: string;
  negotiation_type?: string | null;
  project_type?: string | null;
  category?: string | null;
  article_or_service?: string | null;
  quantity?: DecimalInput | null;
  target_region?: string | null;
  desired_delivery_time?: string | null;
  internal_price_expectation?: DecimalInput | null;
  currency?: string | null;
  current_supplier?: string | null;
  priority?: string | null;
  business_pressure?: string | null;
  technical_dependency_level?: string | null;
  supplier_power_level?: string | null;
  risk_level?: string | null;
  objective?: string | null;
  context?: string | null;
  strategy_data?: Record<string, unknown>;
  simulation_data?: Record<string, unknown>;
  metadata_json?: Record<string, unknown>;
};

export type NegotiationProjectUpdate = Partial<NegotiationProjectCreate>;

export type NegotiationProjectListFilters = {
  company_id?: string;
  owner_id?: string;
  supplier_profile_id?: string;
  request_item_id?: string;
  status?: string;
  category?: string;
  priority?: string;
  skip?: number;
  limit?: number;
};

export function listNegotiationProjects(filters?: NegotiationProjectListFilters) {
  return apiGet<NegotiationProjectSummary[]>("/api/negotiation-projects", { query: filters, cache: "no-store" });
}

export function getNegotiationProject(id: string) {
  return apiGet<NegotiationProjectRead>(`/api/negotiation-projects/${id}`, { cache: "no-store" });
}

export function createNegotiationProject(payload: NegotiationProjectCreate) {
  return apiPost<NegotiationProjectRead, NegotiationProjectCreate>("/api/negotiation-projects", payload);
}

export function updateNegotiationProject(id: string, payload: NegotiationProjectUpdate) {
  return apiPatch<NegotiationProjectRead, NegotiationProjectUpdate>(`/api/negotiation-projects/${id}`, payload);
}
