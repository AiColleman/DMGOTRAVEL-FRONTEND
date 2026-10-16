import type { ReactNode } from "react";
import { images } from "@/mocks/data";

export function AuthShell({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  return (
    <div className="grid min-h-[calc(100vh-72px)] lg:grid-cols-2">
      <div className="relative hidden overflow-hidden lg:block">
        <img src={images.andes} alt="Calles andinas de Cusco" width={1000} height={1200} className="absolute inset-0 h-full w-full" />
        <div className="hero-shade absolute inset-0" />
        <div className="absolute inset-x-12 bottom-12 max-w-md space-y-3 text-ink-foreground">
          <p className="eyebrow text-amber">DMGOTRAVEL</p>
          <p className="font-display text-4xl leading-tight">Tus reservas, tus comprobantes y tus próximos viajes en un solo lugar.</p>
        </div>
      </div>
      <div className="flex items-center justify-center px-5 py-12">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-2">
            <h1 className="font-display text-4xl md:text-5xl">{title}</h1>
            <p className="text-muted-foreground">{subtitle}</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}