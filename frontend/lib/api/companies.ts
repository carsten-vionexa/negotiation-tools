import { apiGet } from "@/lib/api-client";

export type CompanySummary = {
  id: string;
  name: string;
  industry?: string | null;
  country?: string | null;
  description?: string | null;
};

export function listCompanies() {
  return apiGet<CompanySummary[]>("/api/companies");
}

export function getCompany(id: string) {
  return apiGet<CompanySummary>(`/api/companies/${id}`);
}
