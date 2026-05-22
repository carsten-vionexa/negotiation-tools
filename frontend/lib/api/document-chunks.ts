import { apiGet } from "@/lib/api-client";

export type DocumentChunkSummary = {
  id: string;
  knowledge_document_id: string;
  company_id: string;
  project_id?: string | null;
  chunk_index: number;
  content: string;
  content_hash?: string | null;
  page_number?: number | null;
  sheet_name?: string | null;
  row_number?: number | null;
  section_title?: string | null;
  source_reference?: string | null;
  language?: string | null;
  metadata_json?: Record<string, unknown>;
  created_at?: string;
  updated_at?: string;
};

export type DocumentChunkRead = DocumentChunkSummary;

export type DocumentChunkListFilters = {
  knowledge_document_id?: string;
  company_id?: string;
  negotiation_project_id?: string;
  skip?: number;
  limit?: number;
};

export function listDocumentChunks(filters?: DocumentChunkListFilters) {
  return apiGet<DocumentChunkSummary[]>("/api/document-chunks", { query: filters, cache: "no-store" });
}

export function getDocumentChunk(id: string) {
  return apiGet<DocumentChunkRead>(`/api/document-chunks/${id}`, { cache: "no-store" });
}
