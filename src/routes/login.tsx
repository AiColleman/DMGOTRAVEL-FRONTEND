import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { AuthShell } from "@/features/auth/AuthShell";
import { LoginForm } from "@/features/auth/LoginForm";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Iniciar sesión — DMGOTRAVEL" }, { name: "description", content: "Ingresa para ver tus reservas y comprobantes." }, { property: "og:title", content: "Iniciar sesión — DMGOTRAVEL" }, { property: "og:description", content: "Ingresa para ver tus reservas y comprobantes." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: () => <PublicLayout><AuthShell title="Iniciar sesión" subtitle="Ingresa para ver tus reservas y comprobantes."><LoginForm /></AuthShell></PublicLayout>,
});