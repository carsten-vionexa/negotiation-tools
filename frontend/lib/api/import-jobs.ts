import { apiGet, apiPost, apiPostForm } from "@/lib/api-client";

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

export type ImportJobUpload = {
  file: File;
  company_id: string;
  project_id?: string | null;
  source_type: "csv" | "excel";
  target_entity: "procurement_history_item" | "request_item";
};

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

export function uploadImportJob(payload: ImportJobUpload) {
  const formData = new FormData();
  formData.set("file", payload.file);
  formData.set("company_id", payload.company_id);
  formData.set("source_type", payload.source_type);
  formData.set("target_entity", payload.target_entity);

  if (payload.project_id) {
    formData.set("project_id", payload.project_id);
  }

  return apiPostForm<ImportJobRead>("/api/import-jobs/upload", formData);
}

export function parseImportJob(id: string) {
  return apiPost<ImportJobRead>(`/api/import-jobs/${id}/parse`, undefined);
}
