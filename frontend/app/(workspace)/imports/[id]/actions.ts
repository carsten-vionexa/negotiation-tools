"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { mapImportJob, parseImportJob, validateImportJob } from "@/lib/api/import-jobs";

export type ImportParseActionState = {
  error: string;
} | null;

export type ImportMappingActionState = {
  error: string;
} | null;

export type ImportValidationActionState = {
  error: string;
} | null;

export async function parseImportJobAction(
  id: string,
  _previousState: ImportParseActionState,
  _formData: FormData,
): Promise<ImportParseActionState> {
  try {
    await parseImportJob(id);
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Der ImportJob konnte nicht geparst werden.",
    };
  }

  revalidatePath("/imports");
  revalidatePath(`/imports/${id}`);
  redirect(`/imports/${id}`);
}

export async function mapImportJobAction(
  id: string,
  _previousState: ImportMappingActionState,
  formData: FormData,
): Promise<ImportMappingActionState> {
  const fieldMapping: Record<string, string> = {};

  for (const [key, value] of formData.entries()) {
    if (key.startsWith("field_mapping.") && typeof value === "string" && value) {
      fieldMapping[key.slice("field_mapping.".length)] = value;
    }
  }

  if (Object.keys(fieldMapping).length === 0) {
    return { error: "Bitte mindestens ein Zielfeld einer Quellspalte zuordnen." };
  }

  try {
    await mapImportJob(id, { field_mapping: fieldMapping });
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Der ImportJob konnte nicht gemappt werden.",
    };
  }

  revalidatePath("/imports");
  revalidatePath(`/imports/${id}`);
  redirect(`/imports/${id}`);
}

export async function validateImportJobAction(
  id: string,
  _previousState: ImportValidationActionState,
  _formData: FormData,
): Promise<ImportValidationActionState> {
  try {
    await validateImportJob(id);
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Der ImportJob konnte nicht validiert werden.",
    };
  }

  revalidatePath("/imports");
  revalidatePath(`/imports/${id}`);
  redirect(`/imports/${id}`);
}
