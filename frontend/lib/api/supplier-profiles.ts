import { apiGet, apiPatch, apiPost } from "@/lib/api-client";

export type SupplierProfileSummary = {
  id: string;
  company_id: string;
  name: string;
  country?: string | null;
  region?: string | null;
  industry?: string | null;
  supplier_type?: string | null;
  power_level?: string | null;
  risk_level?: string | null;
  website?: string | null;
  contact_name?: string | null;
  contact_email?: string | null;
  relationship_status?: string | null;
  cultural_context?: string | null;
  notes?: string | null;
  assumptions?: Record<string, unknown>;
  interests_json?: Record<string, unknown>;
  likely_tactics_json?: Record<string, unknown>;
  constraints_json?: Record<string, unknown>;
  is_ai_generated?: boolean;
  confidence_level?: string;
  metadata_json?: Record<string, unknown>;
  created_at?: string;
  updated_at?: string;
};

export type SupplierProfileRead = SupplierProfileSummary;

export type SupplierProfileCreate = {
  company_id: string;
  name: string;
  country?: string | null;
  region?: string | null;
  industry?: string | null;
  supplier_type?: string | null;
  power_level?: string | null;
  risk_level?: string | null;
  website?: string | null;
  contact_name?: string | null;
  contact_email?: string | null;
  relationship_status?: string | null;
  cultural_context?: string | null;
  notes?: string | null;
  assumptions?: Record<string, unknown>;
  interests_json?: Record<string, unknown>;
  likely_tactics_json?: Record<string, unknown>;
  constraints_json?: Record<string, unknown>;
  is_ai_generated?: boolean;
  confidence_level?: string;
  metadata_json?: Record<string, unknown>;
};

export type SupplierProfileUpdate = Partial<SupplierProfileCreate>;

export type SupplierProfileListFilters = {
  company_id?: string;
  country?: string;
  region?: string;
  supplier_type?: string;
  power_level?: string;
  risk_level?: string;
  skip?: number;
  limit?: number;
};

export function listSupplierProfiles(filters?: SupplierProfileListFilters) {
  return apiGet<SupplierProfileSummary[]>("/api/supplier-profiles", { query: filters, cache: "no-store" });
}

export function getSupplierProfile(id: string) {
  return apiGet<SupplierProfileRead>(`/api/supplier-profiles/${id}`, { cache: "no-store" });
}

export function createSupplierProfile(payload: SupplierProfileCreate) {
  return apiPost<SupplierProfileRead, SupplierProfileCreate>("/api/supplier-profiles", payload);
}

export function updateSupplierProfile(id: string, payload: SupplierProfileUpdate) {
  return apiPatch<SupplierProfileRead, SupplierProfileUpdate>(`/api/supplier-profiles/${id}`, payload);
}
