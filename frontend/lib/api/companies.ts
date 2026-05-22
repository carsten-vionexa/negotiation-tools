import { apiGet, apiPatch, apiPost } from "@/lib/api-client";

export type CompanySummary = {
  id: string;
  name: string;
  legal_name?: string | null;
  industry?: string | null;
  website?: string | null;
  country?: string | null;
  description?: string | null;
  profile_data?: Record<string, unknown>;
  created_at?: string;
  updated_at?: string;
};

export type CompanyRead = CompanySummary;

export type CompanyCreate = {
  name: string;
  legal_name?: string | null;
  industry?: string | null;
  website?: string | null;
  country?: string | null;
  description?: string | null;
  profile_data?: Record<string, unknown>;
};

export type CompanyUpdate = Partial<CompanyCreate>;

export type CompanyListFilters = {
  name?: string;
  industry?: string;
  country?: string;
  skip?: number;
  limit?: number;
};

export function listCompanies(filters?: CompanyListFilters) {
  return apiGet<CompanySummary[]>("/api/companies", { query: filters, cache: "no-store" });
}

export function getCompany(id: string) {
  return apiGet<CompanyRead>(`/api/companies/${id}`, { cache: "no-store" });
}

export function createCompany(payload: CompanyCreate) {
  return apiPost<CompanyRead, CompanyCreate>("/api/companies", payload);
}

export function updateCompany(id: string, payload: CompanyUpdate) {
  return apiPatch<CompanyRead, CompanyUpdate>(`/api/companies/${id}`, payload);
}
