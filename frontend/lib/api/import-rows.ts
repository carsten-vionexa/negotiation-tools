import { apiGet } from "@/lib/api-client";

export type ImportRowSummary = {
  id: string;
  import_job_id: string;
  company_id: string;
  project_id?: string | null;
  row_number: number;
  sheet_name?: string | null;
  raw_data_json?: Record<string, unknown>;
  mapped_data_json?: Record<string, unknown>;
  validation_status: string;
  error_message?: string | null;
  warning_message?: string | null;
  target_entity?: string | null;
  target_record_id?: string | null;
  metadata_json?: Record<string, unknown>;
  created_at?: string;
  updated_at?: string;
};

export type ImportRowRead = ImportRowSummary;

export type ImportRowListFilters = {
  import_job_id?: string;
  company_id?: string;
  negotiation_project_id?: string;
  status?: string;
  target_entity?: string;
  row_number?: number;
  skip?: number;
  limit?: number;
};

export function listImportRows(filters?: ImportRowListFilters) {
  return apiGet<ImportRowSummary[]>("/api/import-rows", { query: filters, cache: "no-store" });
}

export function getImportRow(id: string) {
  return apiGet<ImportRowRead>(`/api/import-rows/${id}`, { cache: "no-store" });
}
