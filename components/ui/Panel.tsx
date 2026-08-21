import { cn } from "@/utils/format";

export function Panel({
  children,
  className,
  drip,
  glow,
}: {
  children: React.ReactNode;
  className?: string;
  drip?: boolean;
  glow?: string;
}) {
  return (
    <div
      className={cn("grit-panel relative overflow-hidden rounded-2xl p-5 sm:p-7", drip && "drip-edge", className)}
      style={glow ? ({ "--glow": glow } as React.CSSProperties) : undefined}
    >
      {children}
    </div>
  );
}

export function GoldFrame({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("gold-frame rounded-2xl bg-asphalt/90 p-5 sm:p-8", className)}>{children}</div>;
}
