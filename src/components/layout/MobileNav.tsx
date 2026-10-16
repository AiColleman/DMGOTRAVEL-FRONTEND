import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "./Logo";
import { NAV_ITEMS } from "./navItems";

export function MobileNav({ signedIn }: { signedIn: boolean }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="size-11 lg:hidden" aria-label="Abrir menú">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[86vw] max-w-sm bg-background">
        <SheetHeader>
          <SheetTitle className="sr-only">Menú principal</SheetTitle>
          <Logo />
        </SheetHeader>
        <nav aria-label="Menú móvil" className="mt-6 flex flex-col px-4">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={close}
              activeOptions={{ exact: item.to === "/" }}
              className="flex min-h-12 items-center border-b font-display text-2xl data-[status=active]:text-accent"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto flex flex-col gap-3 p-4">
          <Button asChild variant="outline" size="lg" className="h-12">
            <Link to={signedIn ? "/account" : "/login"} onClick={close}>{signedIn ? "Mi cuenta" : "Iniciar sesión"}</Link>
          </Button>
          <Button asChild size="lg" className="h-12">
            <Link to="/tours" onClick={close}>Explorar experiencias</Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}