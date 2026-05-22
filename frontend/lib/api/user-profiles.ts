import { apiGet, apiPatch, apiPost } from "@/lib/api-client";

export type UserProfileSummary = {
  id: string;
  company_id: string;
  display_name: string;
  email?: string | null;
  role?: string | null;
  department?: string | null;
  notes?: string | null;
  profile_data?: Record<string, unknown>;
  created_at?: string;
  updated_at?: string;
};

export type UserProfileRead = UserProfileSummary;

export type UserProfileCreate = {
  company_id: string;
  display_name: string;
  email?: string | null;
  role?: string | null;
  department?: string | null;
  notes?: string | null;
  profile_data?: Record<string, unknown>;
};

export type UserProfileUpdate = Partial<UserProfileCreate>;

export type UserProfileListFilters = {
  company_id?: string;
  role?: string;
  department?: string;
  skip?: number;
  limit?: number;
};

export function listUserProfiles(filters?: UserProfileListFilters) {
  return apiGet<UserProfileSummary[]>("/api/user-profiles", { query: filters, cache: "no-store" });
}

export function getUserProfile(id: string) {
  return apiGet<UserProfileRead>(`/api/user-profiles/${id}`, { cache: "no-store" });
}

export function createUserProfile(payload: UserProfileCreate) {
  return apiPost<UserProfileRead, UserProfileCreate>("/api/user-profiles", payload);
}

export function updateUserProfile(id: string, payload: UserProfileUpdate) {
  return apiPatch<UserProfileRead, UserProfileUpdate>(`/api/user-profiles/${id}`, payload);
}
