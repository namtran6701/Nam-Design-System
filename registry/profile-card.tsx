"use client";
export interface ProfileCardProps {
  name?: string;
  role?: string;
  initials?: string;
  available?: boolean;
  onContact?: () => void;
}

export function ProfileCard({
  name = "Alex Morgan",
  role = "Product designer & maker",
  initials = "AM",
  available = true,
  onContact,
}: ProfileCardProps) {
  return (
    <article className="w-full max-w-80 rounded-2xl border border-neutral-200 bg-white p-6 text-neutral-900 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div
          className="flex size-14 items-center justify-center rounded-2xl bg-neutral-100 text-xl font-semibold text-neutral-800"
          aria-hidden="true"
        >
          {initials}
        </div>
        <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs text-neutral-600">
          {available ? "Available for work" : "Currently booked"}
        </span>
      </div>
      <h3 className="text-xl font-semibold tracking-tight">{name}</h3>
      <p className="mt-1 text-sm text-neutral-600">{role}</p>
      <button
        type="button"
        onClick={onContact}
        className="mt-6 flex min-h-11 w-full items-center justify-center rounded-xl bg-neutral-900 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-700"
      >
        Get in touch{" "}
        <span className="ml-2" aria-hidden="true">
          ↗
        </span>
      </button>
    </article>
  );
}
