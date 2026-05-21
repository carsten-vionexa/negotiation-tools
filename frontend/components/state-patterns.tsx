import { AlertCircle, Inbox, LoaderCircle } from "lucide-react";

type StateProps = {
  title: string;
  description?: string;
};

export function LoadingState({ title, description }: StateProps) {
  return (
    <div className="rounded-md border border-border bg-card p-5">
      <div className="flex items-start gap-3">
        <LoaderCircle className="mt-0.5 size-5 animate-spin text-primary" />
        <div>
          <p className="font-medium">{title}</p>
          {description ? <p className="mt-1 text-sm leading-6 text-muted-foreground">{description}</p> : null}
        </div>
      </div>
    </div>
  );
}

export function ErrorState({ title, description }: StateProps) {
  return (
    <div className="rounded-md border border-border bg-card p-5">
      <div className="flex items-start gap-3">
        <AlertCircle className="mt-0.5 size-5 text-accent" />
        <div>
          <p className="font-medium">{title}</p>
          {description ? <p className="mt-1 text-sm leading-6 text-muted-foreground">{description}</p> : null}
        </div>
      </div>
    </div>
  );
}

export function EmptyState({ title, description }: StateProps) {
  return (
    <div className="rounded-md border border-dashed border-border bg-card p-6 text-center">
      <Inbox className="mx-auto size-8 text-muted-foreground" />
      <p className="mt-3 font-medium">{title}</p>
      {description ? <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-muted-foreground">{description}</p> : null}
    </div>
  );
}
