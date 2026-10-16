import { Link } from "@tanstack/react-router";
import { MailCheck } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { authService } from "@/services/authService";
import { isEmail, TextField } from "./fields";

export function ForgotForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string>();
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isEmail(email)) return setError("Ingresa un correo electrónico válido.");
    setError(undefined);
    setBusy(true);
    await authService.forgotPassword(email);
    setBusy(false);
    setSent(true);
  };

  if (sent) return (
    <div role="status" className="surface space-y-4 p-6">
      <MailCheck className="size-8 text-success" aria-hidden />
      <h2 className="font-display text-2xl">Revisa tu correo</h2>
      <p className="text-sm text-muted-foreground">Si <strong>{email}</strong> tiene una cuenta, recibirás instrucciones para restablecer tu contraseña. En esta demo no se envía ningún correo real.</p>
      <Button asChild variant="outline" className="h-11"><Link to="/login">Volver a iniciar sesión</Link></Button>
    </div>
  );

  return (
    <form onSubmit={submit} noValidate className="space-y-4">
      <TextField label="Correo electrónico" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} error={error} />
      <Button type="submit" size="lg" className="h-12 w-full" disabled={busy}>{busy ? "Enviando…" : "Enviar instrucciones"}</Button>
      <p className="text-center text-sm"><Link to="/login" className="font-medium text-accent hover:underline">Volver a iniciar sesión</Link></p>
    </form>
  );
}