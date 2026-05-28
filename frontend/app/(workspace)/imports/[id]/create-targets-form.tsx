"use client";

import { PackageCheck } from "lucide-react";
import { useActionState } from "react";

import { ErrorState } from "@/components/state-patterns";

import { createImportJobTargetsAction, type ImportCreateTargetsActionState } from "./actions";

export function ImportCreateTargetsForm({ importJobId }: { importJobId: string }) {
  const action = createImportJobTargetsAction.bind(null, importJobId);
  const [state, formAction, pending] = useActionState<ImportCreateTargetsActionState, FormData>(action, null);

  return (
    <section className="rounded-md border border-border bg-card p-5">
      <h2 className="text-base font-semibold">Zielobjekte erzeugen</h2>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        Aus den validierten ImportRows werden jetzt die fachlichen Zielobjekte erzeugt. Erfolgreiche Rows erhalten danach ihre Zielreferenz und erscheinen als importiert.
      </p>

      {state?.error ? (
        <div className="mt-4">
          <ErrorState title="Zielobjekte konnten nicht erzeugt werden." description={state.error} />
        </div>
      ) : null}

      <form action={formAction} className="mt-4">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:cursor-not-allowed disabled:opacity-60"
        >
          <PackageCheck className="size-4" />
          {pending ? "Zielobjekte werden erzeugt..." : "Zielobjekte erzeugen"}
        </button>
      </form>
    </section>
  );
}
