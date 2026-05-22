import { apiGet } from "@/lib/api-client";

export type ImportJobSummary = {
  id: string;
  company_id: string;
  project_id?: string | null;
  knowledge_document_id?: string | null;
  filename: string;
  original_filename?: string | null;
  storage_key?: string | null;
  mime_type?: string | null;
  file_size_bytes?: number | null;
  checksum?: string | null;
  source_type: string;
  target_entity: string;
  status: string;
  total_rows: number;
  processed_rows: number;
  valid_rows: number;
  error_rows: number;
  mapping_json?: Record<string, unknown>;
  validation_summary_json?: Record<string, unknown>;
  error_summary?: string | null;
  started_at?: string | null;
  completed_at?: string | null;
  created_at?: string;
  updated_at?: string;
};

export type ImportJobRead = ImportJobSummary;

export type ImportJobListFilters = {
  company_id?: string;
  negotiation_project_id?: string;
  status?: string;
  source_type?: string;
  target_entity?: string;
  skip?: number;
  limit?: number;
};

export function listImportJobs(filters?: ImportJobListFilters) {
  return apiGet<ImportJobSummary[]>("/api/import-jobs", { query: filters, cache: "no-store" });
}

export function getImportJob(id: string) {
  return apiGet<ImportJobRead>(`/api/import-jobs/${id}`, { cache: "no-store" });
}
