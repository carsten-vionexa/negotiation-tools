import { apiGet } from "@/lib/api-client";

export type ProcurementHistoryItemSummary = {
  id: string;
  company_id: string;
  supplier_name?: string | null;
  supplier_country?: string | null;
  item_name: string;
  category?: string | null;
  sku?: string | null;
  quantity?: string | null;
  unit?: string | null;
  unit_price?: string | null;
  currency?: string | null;
  lead_time_weeks?: string | null;
  quality_rating?: string | null;
  price_assessment?: string | null;
  improvement_potential?: string | null;
  purchased_at?: string | null;
  source_document?: string | null;
  notes?: string | null;
  metadata_json?: Record<string, unknown>;
  created_at?: string;
  updated_at?: string;
};

export type ProcurementHistoryItemRead = ProcurementHistoryItemSummary;

export type ProcurementHistoryItemListFilters = {
  company_id?: string;
  category?: string;
  item_name?: string;
  country?: string;
  supplier_name?: string;
  purchased_from?: string;
  purchased_to?: string;
  skip?: number;
  limit?: number;
};

export function listProcurementHistoryItems(filters?: ProcurementHistoryItemListFilters) {
  return apiGet<ProcurementHistoryItemSummary[]>("/api/procurement-history-items", { query: filters, cache: "no-store" });
}

export function getProcurementHistoryItem(id: string) {
  return apiGet<ProcurementHistoryItemRead>(`/api/procurement-history-items/${id}`, { cache: "no-store" });
}
