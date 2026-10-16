import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { Logo } from "./Logo";
import { NAV_ITEMS } from "./navItems";

const socials = [
  { label: "Instagram (demo)", Icon: Instagram },
  { label: "Facebook (demo)", Icon: Facebook },
  { label: "YouTube (demo)", Icon: Youtube },
];

export function PublicFooter() {
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="container-page grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="space-y-5">
          <Logo inverted />
          <p className="max-w-xs text-sm text-ink-foreground/75">
            Experiencias inspiradas en Ayacucho, con rutas claras, alojamiento opcional y una experiencia digital pensada para viajar con tranquilidad.
          </p>
          <ul className="flex gap-2" aria-label="Redes sociales (demostrativas)">
            {socials.map(({ label, Icon }) => (
              <li key={label}>
                <span role="img" aria-label={label} title={label} className="grid size-11 place-items-center rounded-md border border-ink-foreground/20 text-ink-foreground/80">
                  <Icon className="size-4" />
                </span>
              </li>
            ))}
          </ul>
        </div>
        <nav aria-label="Navegación del pie">
          <h2 className="eyebrow mb-4 text-amber">Explorar</h2>
          <ul className="space-y-1 text-sm">
            {NAV_ITEMS.map((i) => (
              <li key={i.to}>
                <Link to={i.to} className="inline-flex min-h-10 items-center text-ink-foreground/80 hover:text-ink-foreground">{i.label}</Link>
              </li>
            ))}
            <li><Link to="/login" className="inline-flex min-h-10 items-center text-ink-foreground/80 hover:text-ink-foreground">Iniciar sesión</Link></li>
          </ul>
        </nav>
        <div>
          <h2 className="eyebrow mb-4 text-amber">Ayacucho · demo</h2>
          <ul className="space-y-3 text-sm text-ink-foreground/80">
            <li className="flex gap-2"><MapPin className="mt-0.5 size-4 shrink-0" /> Huamanga, Ayacucho · ubicación referencial</li>
            <li className="flex gap-2"><Phone className="mt-0.5 size-4 shrink-0" /> +51 900 000 000 (ficticio)</li>
            <li className="flex gap-2"><Mail className="mt-0.5 size-4 shrink-0" /> hola@example.com</li>
          </ul>
        </div>
        <div>
          <h2 className="eyebrow mb-4 text-amber">Políticas</h2>
          <ul className="space-y-2 text-sm text-ink-foreground/80">
            <li>Pagos procesados por Culqi; no guardamos datos de tarjeta.</li>
            <li>El total final lo valida el servidor antes de confirmar.</li>
            <li>Solo las reservas pendientes pueden cancelarse directamente.</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ink-foreground/15">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-ink-foreground/65 md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} DMGOTRAVEL. Agencia y operadora turística.</p>
          <p>Sitio demostrativo: precios, valoraciones, disponibilidad y contactos son ficticios.</p>
        </div>
      </div>
    </footer>
  );
}