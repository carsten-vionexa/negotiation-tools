import { apiGet, apiPatch, apiPost } from "@/lib/api-client";
import type { DecimalInput } from "@/lib/api/request-items";

export type ConcessionItemRead = {
  id: string;
  strategy_id: string;
  title: string;
  concession_type?: string | null;
  description?: string | null;
  value_to_us?: string | null;
  value_to_counterparty?: string | null;
  estimated_cost?: string | null;
  currency?: string | null;
  give_condition?: string | null;
  required_counterpart?: string | null;
  sequence_order?: number | null;
  is_final_offer_item: boolean;
  risk_level?: string | null;
  metadata_json?: Record<string, unknown>;
  created_at?: string;
  updated_at?: string;
};

export type ConcessionItemCreate = {
  strategy_id: string;
  title: string;
  concession_type?: string | null;
  description?: string | null;
  value_to_us?: string | null;
  value_to_counterparty?: string | null;
  estimated_cost?: DecimalInput | null;
  currency?: string | null;
  give_condition?: string | null;
  required_counterpart?: string | null;
  sequence_order?: number | null;
  is_final_offer_item?: boolean;
  risk_level?: string | null;
  metadata_json?: Record<string, unknown>;
};

export type ConcessionItemUpdate = Partial<ConcessionItemCreate>;

export type ConcessionItemListFilters = {
  strategy_id?: string;
  skip?: number;
  limit?: number;
};

export function listConcessionItems(filters?: ConcessionItemListFilters) {
  return apiGet<ConcessionItemRead[]>("/api/concession-items", { query: filters, cache: "no-store" });
}

export function createConcessionItem(payload: ConcessionItemCreate) {
  return apiPost<ConcessionItemRead, ConcessionItemCreate>("/api/concession-items", payload);
}

export function updateConcessionItem(id: string, payload: ConcessionItemUpdate) {
  return apiPatch<ConcessionItemRead, ConcessionItemUpdate>(`/api/concession-items/${id}`, payload);
}
