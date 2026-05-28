"use client";

import { FolderPlus } from "lucide-react";
import { useActionState } from "react";

import { ErrorState } from "@/components/state-patterns";

import { createProjectFromRequestItemAction, type CreateProjectFromRequestItemActionState } from "./actions";

export function CreateProjectFromRequestItemForm({ requestItemId }: { requestItemId: string }) {
  const action = createProjectFromRequestItemAction.bind(null, requestItemId);
  const [state, formAction, pending] = useActionState<CreateProjectFromRequestItemActionState, FormData>(action, null);

  return (
    <div className="mt-4">
      {state?.error ? (
        <div className="mb-4">
          <ErrorState title="Verhandlungsprojekt konnte nicht erstellt werden." description={state.error} />
        </div>
      ) : null}

      <form action={formAction}>
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:cursor-not-allowed disabled:opacity-60"
        >
          <FolderPlus className="size-4" />
          {pending ? "Projekt wird erstellt..." : "Verhandlungsprojekt erstellen"}
        </button>
      </form>
    </div>
  );
}
