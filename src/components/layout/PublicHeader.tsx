import { Link } from "@tanstack/react-router";
import { ArrowUpRight, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "@/hooks/use-session";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";
import { NAV_ITEMS } from "./navItems";

export function PublicHeader() {
  const session = useSession();

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-background/95 shadow-[0_1px_0_rgba(20,40,45,.04)] backdrop-blur-xl">
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-50 focus:rounded-md focus:bg-card focus:px-3 focus:py-2"
      >
        Saltar al contenido
      </a>

      <div className="container-page flex h-[76px] items-center justify-between gap-6">
        <Logo />

        <nav aria-label="Principal" className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="inline-flex min-h-11 items-center rounded-full px-4 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/70 hover:text-foreground data-[status=active]:bg-white data-[status=active]:text-foreground data-[status=active]:shadow-sm"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" className="hidden h-11 rounded-full px-4 sm:inline-flex">
            <Link to={session ? "/account" : "/login"}>
              <UserRound className="size-4" />
              {session ? session.user.firstName : "Iniciar sesión"}
            </Link>
          </Button>

          <Button asChild className="hidden h-11 rounded-full px-5 md:inline-flex">
            <Link to="/tours">
              Explorar <ArrowUpRight className="size-4" />
            </Link>
          </Button>

          <MobileNav signedIn={!!session} />
        </div>
      </div>
    </header>
  );
}
