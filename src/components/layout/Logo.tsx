import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function Logo({ inverted = false, className }: { inverted?: boolean; className?: string }) {
  return (
    <Link to="/" aria-label="DMGOTRAVEL, ir al inicio" className={cn("inline-flex min-h-11 items-center gap-2.5", className)}>
      <span aria-hidden className={cn("grid size-9 place-items-center rounded-md font-display text-xl", inverted ? "bg-ink-foreground text-ink" : "bg-primary text-primary-foreground")}>
        D
      </span>
      <span className="flex flex-col leading-none">
        <span className={cn("text-sm font-semibold tracking-[0.2em]", inverted ? "text-ink-foreground" : "text-foreground")}>DMGOTRAVEL</span>
        <span className={cn("mt-1 text-[0.62rem] tracking-[0.14em] uppercase", inverted ? "text-ink-foreground/70" : "text-muted-foreground")}>Agencia y operadora</span>
      </span>
    </Link>
  );
}