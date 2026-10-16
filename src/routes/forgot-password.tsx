import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { AuthShell } from "@/features/auth/AuthShell";
import { ForgotForm } from "@/features/auth/ForgotForm";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({ meta: [{ title: "Recuperar contraseña — DMGOTRAVEL" }, { name: "description", content: "Te enviaremos instrucciones para restablecer tu contraseña." }, { property: "og:title", content: "Recuperar contraseña — DMGOTRAVEL" }, { property: "og:description", content: "Te enviaremos instrucciones para restablecer tu contraseña." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: () => <PublicLayout><AuthShell title="Recuperar contraseña" subtitle="Te enviaremos instrucciones para restablecer tu contraseña."><ForgotForm /></AuthShell></PublicLayout>,
});