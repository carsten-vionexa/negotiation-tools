import { apiGet, apiPatch, apiPost } from "@/lib/api-client";

export type DecimalInput = string | number;

export type RequestItemSummary = {
  id: string;
  company_id: string;
  title: string;
  article_name?: string | null;
  article_description?: string | null;
  category?: string | null;
  specification?: string | null;
  requested_quantity?: string | null;
  unit?: string | null;
  target_price?: string | null;
  rough_price_expectation?: string | null;
  currency?: string | null;
  required_delivery_date?: string | null;
  target_delivery_time?: string | null;
  target_region?: string | null;
  priority?: string | null;
  status: string;
  comment?: string | null;
  metadata_json?: Record<string, unknown>;
  created_at?: string;
  updated_at?: string;
};

export type RequestItemRead = RequestItemSummary;

export type RequestItemCreate = {
  company_id: string;
  title: string;
  article_name?: string | null;
  article_description?: string | null;
  category?: string | null;
  specification?: string | null;
  requested_quantity?: DecimalInput | null;
  unit?: string | null;
  target_price?: DecimalInput | null;
  rough_price_expectation?: DecimalInput | null;
  currency?: string | null;
  required_delivery_date?: string | null;
  target_delivery_time?: string | null;
  target_region?: string | null;
  priority?: string | null;
  status?: string;
  comment?: string | null;
  metadata_json?: Record<string, unknown>;
};

export type RequestItemUpdate = Partial<RequestItemCreate>;

export type RequestItemListFilters = {
  company_id?: string;
  category?: string;
  status?: string;
  priority?: string;
  skip?: number;
  limit?: number;
};

export function listRequestItems(filters?: RequestItemListFilters) {
  return apiGet<RequestItemSummary[]>("/api/request-items", { query: filters, cache: "no-store" });
}

export function getRequestItem(id: string) {
  return apiGet<RequestItemRead>(`/api/request-items/${id}`, { cache: "no-store" });
}

export function createRequestItem(payload: RequestItemCreate) {
  return apiPost<RequestItemRead, RequestItemCreate>("/api/request-items", payload);
}

export function updateRequestItem(id: string, payload: RequestItemUpdate) {
  return apiPatch<RequestItemRead, RequestItemUpdate>(`/api/request-items/${id}`, payload);
}
