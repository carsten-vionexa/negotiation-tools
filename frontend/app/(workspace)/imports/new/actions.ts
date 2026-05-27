"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { uploadImportJob, type ImportJobUpload } from "@/lib/api/import-jobs";
import { optionalFormString, requiredFormString } from "@/lib/form-data";

export type ImportUploadActionState = {
  error: string;
} | null;

const sourceTypes = new Set<ImportJobUpload["source_type"]>(["csv", "excel"]);
const targetEntities = new Set<ImportJobUpload["target_entity"]>(["procurement_history_item", "request_item"]);

export async function uploadImportJobAction(_previousState: ImportUploadActionState, formData: FormData): Promise<ImportUploadActionState> {
  let importJobId: string;

  try {
    const file = requiredImportFile(formData);
    const sourceType = requiredSourceType(formData);
    const targetEntity = requiredTargetEntity(formData);

    if ((sourceType === "csv" && !file.name.toLowerCase().endsWith(".csv")) || (sourceType === "excel" && !file.name.toLowerCase().endsWith(".xlsx"))) {
      throw new Error("Source Type muss zur Dateiendung passen.");
    }

    const importJob = await uploadImportJob({
      file,
      company_id: requiredFormString(formData, "company_id", "Company"),
      project_id: optionalFormString(formData, "project_id"),
      source_type: sourceType,
      target_entity: targetEntity,
    });
    importJobId = importJob.id;
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Der ImportJob konnte nicht hochgeladen werden.",
    };
  }

  revalidatePath("/imports");
  redirect(`/imports/${importJobId}`);
}

function requiredImportFile(formData: FormData) {
  const file = formData.get("file");

  if (!(file instanceof File) || file.size === 0 || !file.name.trim()) {
    throw new Error("Pflichtfeld fehlt: Datei");
  }

  const filename = file.name.toLowerCase();

  if (!filename.endsWith(".csv") && !filename.endsWith(".xlsx")) {
    throw new Error("Die Datei muss im Format .csv oder .xlsx vorliegen.");
  }

  return file;
}

function requiredSourceType(formData: FormData) {
  const value = requiredFormString(formData, "source_type", "Source Type");

  if (!sourceTypes.has(value as ImportJobUpload["source_type"])) {
    throw new Error("Source Type muss csv oder excel sein.");
  }

  return value as ImportJobUpload["source_type"];
}

function requiredTargetEntity(formData: FormData) {
  const value = requiredFormString(formData, "target_entity", "Target Entity");

  if (!targetEntities.has(value as ImportJobUpload["target_entity"])) {
    throw new Error("Target Entity muss procurement_history_item oder request_item sein.");
  }

  return value as ImportJobUpload["target_entity"];
}
