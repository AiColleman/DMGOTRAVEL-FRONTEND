import { Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ApiError } from "@/services/apiClient";
import { authService } from "@/services/authService";
import { Divider, GoogleButton, isEmail, PasswordField, TextField } from "./fields";

export function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [errors, setErrors] = useState<{ email?: string; password?: string; form?: string }>({});
  const [busy, setBusy] = useState(false);

  const done = (name: string) => {
    toast.success(`Bienvenida/o, ${name}.`);
    navigate({ to: "/account" });
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!isEmail(email)) next.email = "Ingresa un correo electrónico válido.";
    if (password.length < 8) next.password = "La contraseña debe tener al menos 8 caracteres.";
    setErrors(next);
    if (Object.keys(next).length) return;
    setBusy(true);
    try {
      const s = await authService.login(email, password);
      done(s.user.firstName);
    } catch (err) {
      setErrors({ form: err instanceof ApiError ? err.message : "No pudimos iniciar sesión. Inténtalo nuevamente." });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-6">
      <GoogleButton onSuccess={async () => done((await authService.google()).user.firstName)} />
      <p className="text-center text-xs text-muted-foreground">Google OAuth 2.0 / OpenID Connect (visual en esta demo)</p>
      <Divider />
      <form onSubmit={submit} noValidate className="space-y-4">
        {errors.form && <p role="alert" className="rounded-md border border-destructive/40 bg-destructive/5 px-3 py-2 text-sm text-destructive">{errors.form}</p>}
        <TextField label="Correo electrónico" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} />
        <PasswordField label="Contraseña" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} error={errors.password} />
        <div className="flex items-center justify-between text-sm">
          <label className="inline-flex min-h-11 items-center gap-2">
            <input type="checkbox" className="size-4 accent-[var(--primary)]" checked={remember} onChange={(e) => setRemember(e.target.checked)} /> Recordarme
          </label>
          <Link to="/forgot-password" className="inline-flex min-h-11 items-center font-medium text-accent hover:underline">¿Olvidaste tu contraseña?</Link>
        </div>
        <Button type="submit" size="lg" className="h-12 w-full" disabled={busy}>{busy ? "Ingresando…" : "Iniciar sesión"}</Button>
        <p className="text-xs text-muted-foreground">Correo electrónico y contraseña administrados por DMGOTRAVEL. Demo: valeria@example.com con cualquier contraseña de 8+ caracteres.</p>
      </form>
      <p className="text-center text-sm">¿Aún no tienes cuenta? <Link to="/register" className="font-medium text-accent hover:underline">Crear cuenta</Link></p>
    </div>
  );
}