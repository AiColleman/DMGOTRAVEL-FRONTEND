import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

export interface Crumb {
  label: string;
  to?: "/" | "/tours" | "/hotels" | "/about";
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Ruta de navegación" className="text-sm text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((c, i) => (
          <li key={c.label} className="flex items-center gap-1">
            {c.to ? (
              <Link to={c.to} className="inline-flex min-h-9 items-center hover:text-foreground">{c.label}</Link>
            ) : (
              <span aria-current="page" className="text-foreground">{c.label}</span>
            )}
            {i < items.length - 1 && <ChevronRight aria-hidden className="size-3.5" />}
          </li>
        ))}
      </ol>
    </nav>
  );
}