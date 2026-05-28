"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createNegotiationProject } from "@/lib/api/negotiation-projects";
import { getRequestItem, type RequestItemRead } from "@/lib/api/request-items";

export type CreateProjectFromRequestItemActionState = {
  error: string;
} | null;

export async function createProjectFromRequestItemAction(
  id: string,
  _previousState: CreateProjectFromRequestItemActionState,
  _formData: FormData,
): Promise<CreateProjectFromRequestItemActionState> {
  let projectId: string;

  try {
    const requestItem = await getRequestItem(id);
    const project = await createNegotiationProject(buildProjectPayload(requestItem));
    projectId = project.id;
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Das Verhandlungsprojekt konnte nicht erstellt werden.",
    };
  }

  revalidatePath("/projects");
  revalidatePath(`/request-items/${id}`);
  redirect(`/projects/${projectId}`);
}

function buildProjectPayload(requestItem: RequestItemRead) {
  return {
    company_id: requestItem.company_id,
    request_item_id: requestItem.id,
    title: buildProjectTitle(requestItem),
    status: "draft",
    category: requestItem.category,
    article_or_service: requestItem.article_name ?? requestItem.title,
    quantity: requestItem.requested_quantity,
    target_region: requestItem.target_region,
    desired_delivery_time: requestItem.target_delivery_time ?? requestItem.required_delivery_date,
    internal_price_expectation: requestItem.target_price ?? requestItem.rough_price_expectation,
    currency: requestItem.currency,
    priority: requestItem.priority,
    context: buildProjectContext(requestItem),
    metadata_json: {
      initialized_from: "request_item",
      source_request_item_id: requestItem.id,
    },
  };
}

function buildProjectTitle(requestItem: RequestItemRead) {
  const subject = requestItem.article_name ?? requestItem.title;
  return `Verhandlung: ${subject}`;
}

function buildProjectContext(requestItem: RequestItemRead) {
  const contextLines = [
    requestItem.article_description ? `Beschreibung: ${requestItem.article_description}` : null,
    requestItem.specification ? `Spezifikation: ${requestItem.specification}` : null,
    requestItem.required_delivery_date ? `Benoetigtes Lieferdatum: ${requestItem.required_delivery_date}` : null,
    requestItem.unit ? `Einheit: ${requestItem.unit}` : null,
    requestItem.comment ? `Kommentar: ${requestItem.comment}` : null,
  ].filter(Boolean);

  return contextLines.length > 0 ? contextLines.join("\n") : null;
}
