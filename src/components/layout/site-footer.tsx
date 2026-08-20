import { StatusIndicator } from "@/components/ui/indicators";

export function SiteFooter() {
  return (
    <footer className="border-t-2 border-line bg-ink">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>DCBD ecosystem foundation.</p>
        <StatusIndicator label="Foundation preview" status="pending" />
      </div>
    </footer>
  );
}
