"use client";

import { useActionState } from "react";
import { Upload } from "lucide-react";

import { ErrorState } from "@/components/state-patterns";
import { uploadImportJobAction, type ImportUploadActionState } from "@/app/(workspace)/imports/new/actions";

type Option = {
  value: string;
  label: string;
};

export function ImportUploadForm({ companies, projects }: { companies: Option[]; projects: Option[] }) {
  const [state, formAction, pending] = useActionState<ImportUploadActionState, FormData>(uploadImportJobAction, null);

  return (
    <section className="rounded-md border border-border bg-card p-5">
      <h2 className="text-base font-semibold">Importdatei hochladen</h2>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        Der Upload legt einen ImportJob an. Parsing, Mapping, Validierung und Zielobjekt-Erzeugung werden hier nicht gestartet.
      </p>

      {state?.error ? (
        <div className="mt-4">
          <ErrorState title="Upload fehlgeschlagen." description={state.error} />
        </div>
      ) : null}

      <form action={formAction} className="mt-5 grid gap-4 md:grid-cols-2">
        <label className="md:col-span-2">
          <span className="text-sm font-medium">Datei</span>
          <input
            name="file"
            type="file"
            accept=".csv,.xlsx"
            required
            className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
          />
          <span className="mt-1 block text-xs text-muted-foreground">Erlaubte Formate: .csv und .xlsx</span>
        </label>

        <Select label="Company" name="company_id" required options={companies} placeholder="Company auswaehlen" />
        <Select label="Project (optional)" name="project_id" options={projects} placeholder="Kein Projekt" />
        <Select
          label="Source Type"
          name="source_type"
          required
          placeholder="Source Type auswaehlen"
          options={[
            { value: "csv", label: "CSV (.csv)" },
            { value: "excel", label: "Excel (.xlsx)" },
          ]}
        />
        <Select
          label="Target Entity"
          name="target_entity"
          required
          placeholder="Target Entity auswaehlen"
          options={[
            { value: "procurement_history_item", label: "Procurement History Item" },
            { value: "request_item", label: "Request Item" },
          ]}
        />

        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={pending}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Upload className="size-4" />
            {pending ? "Upload laeuft..." : "ImportJob hochladen"}
          </button>
        </div>
      </form>
    </section>
  );
}

function Select({
  label,
  name,
  options,
  placeholder,
  required = false,
}: {
  label: string;
  name: string;
  options: Option[];
  placeholder: string;
  required?: boolean;
}) {
  return (
    <label>
      <span className="text-sm font-medium">{label}</span>
      <select name={name} required={required} defaultValue="" className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm">
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
