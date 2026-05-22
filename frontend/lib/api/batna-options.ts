import { apiGet, apiPatch, apiPost } from "@/lib/api-client";
import type { DecimalInput } from "@/lib/api/request-items";

export type BatnaOptionRead = {
  id: string;
  strategy_id: string;
  title: string;
  batna_type?: string | null;
  description?: string | null;
  feasibility_level?: string | null;
  estimated_cost?: string | null;
  currency?: string | null;
  estimated_lead_time?: string | null;
  risk_level?: string | null;
  impact_assessment?: string | null;
  required_actions?: string | null;
  is_preferred: boolean;
  ranking?: number | null;
  confidence_level?: string | null;
  metadata_json?: Record<string, unknown>;
  created_at?: string;
  updated_at?: string;
};

export type BatnaOptionCreate = {
  strategy_id: string;
  title: string;
  batna_type?: string | null;
  description?: string | null;
  feasibility_level?: string | null;
  estimated_cost?: DecimalInput | null;
  currency?: string | null;
  estimated_lead_time?: string | null;
  risk_level?: string | null;
  impact_assessment?: string | null;
  required_actions?: string | null;
  is_preferred?: boolean;
  ranking?: number | null;
  confidence_level?: string | null;
  metadata_json?: Record<string, unknown>;
};

export type BatnaOptionUpdate = Partial<BatnaOptionCreate>;

export type BatnaOptionListFilters = {
  strategy_id?: string;
  skip?: number;
  limit?: number;
};

export function listBatnaOptions(filters?: BatnaOptionListFilters) {
  return apiGet<BatnaOptionRead[]>("/api/batna-options", { query: filters, cache: "no-store" });
}

export function createBatnaOption(payload: BatnaOptionCreate) {
  return apiPost<BatnaOptionRead, BatnaOptionCreate>("/api/batna-options", payload);
}

export function updateBatnaOption(id: string, payload: BatnaOptionUpdate) {
  return apiPatch<BatnaOptionRead, BatnaOptionUpdate>(`/api/batna-options/${id}`, payload);
}
