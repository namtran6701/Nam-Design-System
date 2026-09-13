"use client";
export interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}
export function EmptyState({
  title = "A little space for your next idea.",
  description = "Create your first project and make something worth keeping.",
  actionLabel = "Create a project",
  onAction,
}: EmptyStateProps) {
  return (
    <section className="w-full max-w-md rounded-2xl border border-dashed border-neutral-300 bg-white p-8 text-center text-neutral-900">
      <div
        aria-hidden="true"
        className="mx-auto mb-5 flex size-12 items-center justify-center rounded-xl bg-neutral-100 text-2xl text-neutral-700"
      >
        +
      </div>
      <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
      <p className="mx-auto mt-2 max-w-64 text-sm leading-relaxed text-neutral-600">
        {description}
      </p>
      <button
        type="button"
        onClick={onAction}
        className="mt-5 min-h-11 rounded-xl bg-neutral-950 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-700"
      >
        {actionLabel}
      </button>
    </section>
  );
}
