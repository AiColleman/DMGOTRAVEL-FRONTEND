import { Link } from "@tanstack/react-router";
import { UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "@/hooks/use-session";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";
import { NAV_ITEMS } from "./navItems";

export function PublicHeader() {
  const session = useSession();
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85">
      <a href="#contenido" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-50 focus:rounded-md focus:bg-card focus:px-3 focus:py-2">
        Saltar al contenido
      </a>
      <div className="container-page flex h-[72px] items-center justify-between gap-6">
        <Logo />
        <nav aria-label="Principal" className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="inline-flex min-h-11 items-center rounded-md px-3.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground data-[status=active]:text-foreground data-[status=active]:underline data-[status=active]:decoration-accent data-[status=active]:decoration-2 data-[status=active]:underline-offset-8"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" className="hidden h-11 sm:inline-flex">
            <Link to={session ? "/account" : "/login"}>
              <UserRound /> {session ? session.user.firstName : "Iniciar sesión"}
            </Link>
          </Button>
          <Button asChild className="hidden h-11 px-5 md:inline-flex">
            <Link to="/tours">Explorar experiencias</Link>
          </Button>
          <MobileNav signedIn={!!session} />
        </div>
      </div>
    </header>
  );
}