import { apiGet } from "@/lib/api-client";

export type KnowledgeClaimSummary = {
  id: string;
  company_id: string;
  project_id?: string | null;
  supplier_profile_id?: string | null;
  knowledge_document_id: string;
  document_chunk_id?: string | null;
  claim_type: string;
  claim_category?: string | null;
  claim_text: string;
  evidence_text?: string | null;
  source_reference?: string | null;
  confidence_level: string;
  information_kind: string;
  is_ai_generated: boolean;
  metadata_json?: Record<string, unknown>;
  created_at?: string;
  updated_at?: string;
};

export type KnowledgeClaimRead = KnowledgeClaimSummary;

export type KnowledgeClaimListFilters = {
  company_id?: string;
  negotiation_project_id?: string;
  supplier_profile_id?: string;
  knowledge_document_id?: string;
  document_chunk_id?: string;
  claim_type?: string;
  information_kind?: string;
  confidence_level?: string;
  is_ai_generated?: boolean;
  skip?: number;
  limit?: number;
};

export function listKnowledgeClaims(filters?: KnowledgeClaimListFilters) {
  return apiGet<KnowledgeClaimSummary[]>("/api/knowledge-claims", { query: filters, cache: "no-store" });
}

export function getKnowledgeClaim(id: string) {
  return apiGet<KnowledgeClaimRead>(`/api/knowledge-claims/${id}`, { cache: "no-store" });
}
