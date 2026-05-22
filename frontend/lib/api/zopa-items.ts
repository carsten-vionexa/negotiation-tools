import { apiGet, apiPatch, apiPost } from "@/lib/api-client";

export type ZopaItemRead = {
  id: string;
  strategy_id: string;
  dimension?: string | null;
  description?: string | null;
  buyer_target_value?: string | null;
  buyer_walk_away_value?: string | null;
  supplier_expected_target_value?: string | null;
  supplier_estimated_walk_away_value?: string | null;
  possible_agreement_range?: string | null;
  currency?: string | null;
  unit?: string | null;
  priority?: string | null;
  confidence_level?: string | null;
  information_kind?: string | null;
  source_reference?: string | null;
  metadata_json?: Record<string, unknown>;
  created_at?: string;
  updated_at?: string;
};

export type ZopaItemCreate = {
  strategy_id: string;
  dimension?: string | null;
  description?: string | null;
  buyer_target_value?: string | null;
  buyer_walk_away_value?: string | null;
  supplier_expected_target_value?: string | null;
  supplier_estimated_walk_away_value?: string | null;
  possible_agreement_range?: string | null;
  currency?: string | null;
  unit?: string | null;
  priority?: string | null;
  confidence_level?: string | null;
  information_kind?: string | null;
  source_reference?: string | null;
  metadata_json?: Record<string, unknown>;
};

export type ZopaItemUpdate = Partial<ZopaItemCreate>;

export type ZopaItemListFilters = {
  strategy_id?: string;
  skip?: number;
  limit?: number;
};

export function listZopaItems(filters?: ZopaItemListFilters) {
  return apiGet<ZopaItemRead[]>("/api/zopa-items", { query: filters, cache: "no-store" });
}

export function createZopaItem(payload: ZopaItemCreate) {
  return apiPost<ZopaItemRead, ZopaItemCreate>("/api/zopa-items", payload);
}

export function updateZopaItem(id: string, payload: ZopaItemUpdate) {
  return apiPatch<ZopaItemRead, ZopaItemUpdate>(`/api/zopa-items/${id}`, payload);
}
