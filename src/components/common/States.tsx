import { AlertTriangle, Compass } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export function LoadingState({ count = 3, label = "Cargando" }: { count?: number; label?: string }) {
  return (
    <div role="status" aria-label={label} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="aspect-[4/3] w-full" />
          <Skeleton className="h-5 w-2/3" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
      <span className="sr-only">{label}…</span>
    </div>
  );
}

export function EmptyState({ title, description, action }: { title: string; description: string; action?: ReactNode }) {
  return (
    <div className="surface flex flex-col items-center gap-3 px-6 py-14 text-center">
      <Compass aria-hidden className="size-8 text-accent" />
      <h3 className="font-display text-2xl">{title}</h3>
      <p className="max-w-md text-muted-foreground">{description}</p>
      {action}
    </div>
  );
}

export function ErrorState({ title = "No pudimos cargar la información", description = "Revisa tu conexión e inténtalo nuevamente.", onRetry }: { title?: string; description?: string; onRetry?: () => void }) {
  return (
    <div role="alert" className="surface flex flex-col items-center gap-3 px-6 py-14 text-center">
      <AlertTriangle aria-hidden className="size-8 text-destructive" />
      <h3 className="font-display text-2xl">{title}</h3>
      <p className="max-w-md text-muted-foreground">{description}</p>
      {onRetry && <Button variant="outline" className="h-11" onClick={onRetry}>Intentar de nuevo</Button>}
    </div>
  );
}

export function DemoNote({ children }: { children: ReactNode }) {
  return <p className="rounded-md border border-dashed bg-muted/60 px-3 py-2 text-xs text-muted-foreground">{children}</p>;
}