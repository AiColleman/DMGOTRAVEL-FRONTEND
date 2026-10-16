import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { AuthShell } from "@/features/auth/AuthShell";
import { RegisterForm } from "@/features/auth/RegisterForm";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Crear cuenta — DMGOTRAVEL" }, { name: "description", content: "Crea tu cuenta DMGOTRAVEL en menos de un minuto." }, { property: "og:title", content: "Crear cuenta — DMGOTRAVEL" }, { property: "og:description", content: "Crea tu cuenta DMGOTRAVEL en menos de un minuto." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: () => <PublicLayout><AuthShell title="Crear cuenta" subtitle="Crea tu cuenta DMGOTRAVEL en menos de un minuto."><RegisterForm /></AuthShell></PublicLayout>,
});