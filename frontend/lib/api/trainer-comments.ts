import { apiGet, apiPatch, apiPost } from "@/lib/api-client";

export type TrainerCommentRead = {
  id: string;
  simulation_scenario_id: string;
  simulation_result_id?: string | null;
  simulation_message_id?: string | null;
  trainer_user_profile_id?: string | null;
  comment_type?: string | null;
  comment_text: string;
  related_competency?: string | null;
  severity?: string | null;
  is_visible_to_trainee: boolean;
  metadata_json?: Record<string, unknown>;
  created_at?: string;
  updated_at?: string;
};

export type TrainerCommentCreate = {
  simulation_scenario_id: string;
  simulation_result_id?: string | null;
  simulation_message_id?: string | null;
  trainer_user_profile_id?: string | null;
  comment_type?: string | null;
  comment_text: string;
  related_competency?: string | null;
  severity?: string | null;
  is_visible_to_trainee?: boolean;
  metadata_json?: Record<string, unknown>;
};

export type TrainerCommentUpdate = Partial<TrainerCommentCreate>;

export type TrainerCommentListFilters = {
  simulation_scenario_id?: string;
  simulation_result_id?: string;
  simulation_message_id?: string;
  trainer_user_profile_id?: string;
  comment_type?: string;
  severity?: string;
  is_visible_to_trainee?: boolean;
  skip?: number;
  limit?: number;
};

export function listTrainerComments(filters?: TrainerCommentListFilters) {
  return apiGet<TrainerCommentRead[]>("/api/trainer-comments", { query: filters, cache: "no-store" });
}

export function getTrainerComment(id: string) {
  return apiGet<TrainerCommentRead>(`/api/trainer-comments/${id}`, { cache: "no-store" });
}

export function createTrainerComment(payload: TrainerCommentCreate) {
  return apiPost<TrainerCommentRead, TrainerCommentCreate>("/api/trainer-comments", payload);
}

export function updateTrainerComment(id: string, payload: TrainerCommentUpdate) {
  return apiPatch<TrainerCommentRead, TrainerCommentUpdate>(`/api/trainer-comments/${id}`, payload);
}
