"use client";

import { BadgeCheck } from "lucide-react";
import { useActionState } from "react";

import { ErrorState } from "@/components/state-patterns";

import { validateImportJobAction, type ImportValidationActionState } from "./actions";

export function ImportValidateForm({ importJobId }: { importJobId: string }) {
  const action = validateImportJobAction.bind(null, importJobId);
  const [state, formAction, pending] = useActionState<ImportValidationActionState, FormData>(action, null);

  return (
    <section className="rounded-md border border-border bg-card p-5">
      <h2 className="text-base font-semibold">Gemappte Daten validieren</h2>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        Die Validierung prueft die gemappten ImportRows regelbasiert und aktualisiert Summary, Row-Status sowie Fehler- und Warnhinweise. Zielobjekte werden nicht erzeugt.
      </p>

      {state?.error ? (
        <div className="mt-4">
          <ErrorState title="Validierung fehlgeschlagen." description={state.error} />
        </div>
      ) : null}

      <form action={formAction} className="mt-4">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:cursor-not-allowed disabled:opacity-60"
        >
          <BadgeCheck className="size-4" />
          {pending ? "Validierung laeuft..." : "ImportJob validieren"}
        </button>
      </form>
    </section>
  );
}
