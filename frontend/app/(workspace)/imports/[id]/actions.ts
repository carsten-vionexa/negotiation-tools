"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { parseImportJob } from "@/lib/api/import-jobs";

export type ImportParseActionState = {
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
