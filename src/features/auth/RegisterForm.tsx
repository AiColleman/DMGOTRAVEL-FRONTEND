import { Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ApiError } from "@/services/apiClient";
import { authService } from "@/services/authService";
import { Divider, GoogleButton, isEmail, PasswordField, passwordStrength, TextField } from "./fields";

type Errors = Partial<Record<"firstName" | "lastName" | "email" | "password" | "confirm" | "terms" | "form", string>>;

export function RegisterForm() {
  const navigate = useNavigate();
  const [f, setF] = useState({ firstName: "", lastName: "", email: "", password: "", confirm: "" });
  const [terms, setTerms] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);
  const set = (k: keyof typeof f) => (e: { target: { value: string } }) => setF((p) => ({ ...p, [k]: e.target.value }));
  const strength = passwordStrength(f.password);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const n: Errors = {};
    if (f.firstName.trim().length < 2) n.firstName = "Ingresa tus nombres.";
    if (f.lastName.trim().length < 2) n.lastName = "Ingresa tus apellidos.";
    if (!isEmail(f.email)) n.email = "Ingresa un correo electrónico válido.";
    if (strength.score < 2) n.password = "Usa al menos 8 caracteres, mayúsculas, minúsculas y números.";
    if (f.confirm !== f.password || !f.confirm) n.confirm = "Las contraseñas no coinciden.";
    if (!terms) n.terms = "Debes aceptar los términos y la política de privacidad.";
    setErrors(n);
    if (Object.keys(n).length) return;
    setBusy(true);
    try {
      await authService.register({ firstName: f.firstName.trim(), lastName: f.lastName.trim(), email: f.email.trim(), password: f.password });
      toast.success("Cuenta creada (demo). ¡Bienvenida/o a DMGOTRAVEL!");
      navigate({ to: "/account" });
    } catch (err) {
      setErrors({ form: err instanceof ApiError ? err.message : "No pudimos crear la cuenta." });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-6">
      <GoogleButton label="Registrarme con Google" onSuccess={async () => { await authService.google(); toast.success("Acceso con Google (demo)."); navigate({ to: "/account" }); }} />
      <Divider />
      <form onSubmit={submit} noValidate className="space-y-4">
        {errors.form && <p role="alert" className="rounded-md border border-destructive/40 bg-destructive/5 px-3 py-2 text-sm text-destructive">{errors.form}</p>}
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField label="Nombres" autoComplete="given-name" value={f.firstName} onChange={set("firstName")} error={errors.firstName} />
          <TextField label="Apellidos" autoComplete="family-name" value={f.lastName} onChange={set("lastName")} error={errors.lastName} />
        </div>
        <TextField label="Correo electrónico" type="email" autoComplete="email" value={f.email} onChange={set("email")} error={errors.email} />
        <div className="space-y-2">
          <PasswordField label="Contraseña" autoComplete="new-password" value={f.password} onChange={set("password")} error={errors.password} />
          <div aria-live="polite" className="space-y-1">
            <div className="grid grid-cols-4 gap-1" aria-hidden>
              {[1, 2, 3, 4].map((i) => (
                <span key={i} className={cn("h-1.5 rounded-full bg-muted", i <= strength.score && (strength.score <= 1 ? "bg-destructive" : strength.score === 2 ? "bg-warning" : "bg-success"))} />
              ))}
            </div>
            {f.password && <p className="text-xs text-muted-foreground">Fortaleza: {strength.label}</p>}
          </div>
        </div>
        <PasswordField label="Confirmar contraseña" autoComplete="new-password" value={f.confirm} onChange={set("confirm")} error={errors.confirm} />
        <div>
          <label className="flex min-h-11 items-start gap-2 text-sm">
            <input type="checkbox" className="mt-1 size-4 accent-[var(--primary)]" checked={terms} onChange={(e) => setTerms(e.target.checked)} aria-invalid={!!errors.terms} />
            Acepto los términos del servicio y la política de privacidad de DMGOTRAVEL.
          </label>
          {errors.terms && <p className="text-sm text-destructive">{errors.terms}</p>}
        </div>
        <Button type="submit" size="lg" className="h-12 w-full" disabled={busy}>{busy ? "Creando cuenta…" : "Crear cuenta"}</Button>
      </form>
      <p className="text-center text-sm">¿Ya tienes cuenta? <Link to="/login" className="font-medium text-accent hover:underline">Iniciar sesión</Link></p>
    </div>
  );
}