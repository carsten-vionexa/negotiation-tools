"use client";

import { Play } from "lucide-react";
import { useActionState } from "react";

import { ErrorState } from "@/components/state-patterns";

import { parseImportJobAction, type ImportParseActionState } from "./actions";

export function ImportParseForm({ importJobId }: { importJobId: string }) {
  const action = parseImportJobAction.bind(null, importJobId);
  const [state, formAction, pending] = useActionState<ImportParseActionState, FormData>(action, null);

  return (
    <section className="rounded-md border border-border bg-card p-5">
      <h2 className="text-base font-semibold">Parsing starten</h2>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        Das Parsing liest die CSV- oder XLSX-Datei technisch ein und erzeugt reviewbare Rohzeilen. Mapping, Validierung und Zielobjekte werden nicht gestartet.
      </p>

      {state?.error ? (
        <div className="mt-4">
          <ErrorState title="Parsing fehlgeschlagen." description={state.error} />
        </div>
      ) : null}

      <form action={formAction} className="mt-4">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Play className="size-4" />
          {pending ? "Parsing laeuft..." : "ImportJob parsen"}
        </button>
      </form>
    </section>
  );
}
