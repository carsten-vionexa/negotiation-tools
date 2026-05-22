import { apiGet, apiPost } from "@/lib/api-client";

export type KnowledgeDocumentSummary = {
  id: string;
  company_id: string;
  project_id?: string | null;
  filename: string;
  original_filename?: string | null;
  title?: string | null;
  document_type?: string | null;
  mime_type?: string | null;
  storage_path: string;
  storage_key?: string | null;
  file_size_bytes?: number | null;
  checksum?: string | null;
  uploaded_at?: string | null;
  source?: string | null;
  source_name?: string | null;
  author?: string | null;
  source_author?: string | null;
  source_date?: string | null;
  reliability_level: string;
  confidentiality_level: string;
  description?: string | null;
  parsing_status: string;
  content_text?: string | null;
  chunk_count: number;
  metadata_json?: Record<string, unknown>;
  created_at?: string;
  updated_at?: string;
};

export type KnowledgeDocumentRead = KnowledgeDocumentSummary;

export type KnowledgeDocumentCreate = {
  company_id: string;
  project_id?: string | null;
  filename: string;
  original_filename?: string | null;
  title?: string | null;
  document_type?: string | null;
  mime_type?: string | null;
  storage_path: string;
  storage_key?: string | null;
  file_size_bytes?: number | null;
  checksum?: string | null;
  uploaded_at?: string | null;
  source?: string | null;
  source_name?: string | null;
  author?: string | null;
  source_author?: string | null;
  source_date?: string | null;
  reliability_level?: string;
  confidentiality_level?: string;
  description?: string | null;
  parsing_status?: string;
  content_text?: string | null;
  chunk_count?: number;
  metadata_json?: Record<string, unknown>;
};

export type KnowledgeDocumentListFilters = {
  company_id?: string;
  negotiation_project_id?: string;
  document_type?: string;
  status?: string;
  source_type?: string;
  skip?: number;
  limit?: number;
};

export function listKnowledgeDocuments(filters?: KnowledgeDocumentListFilters) {
  return apiGet<KnowledgeDocumentSummary[]>("/api/knowledge-documents", { query: filters, cache: "no-store" });
}

export function getKnowledgeDocument(id: string) {
  return apiGet<KnowledgeDocumentRead>(`/api/knowledge-documents/${id}`, { cache: "no-store" });
}

export function createKnowledgeDocument(payload: KnowledgeDocumentCreate) {
  return apiPost<KnowledgeDocumentRead, KnowledgeDocumentCreate>("/api/knowledge-documents", payload);
}
