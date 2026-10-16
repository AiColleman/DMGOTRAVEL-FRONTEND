import { Eye, EyeOff } from "lucide-react";
import { useId, useState, type InputHTMLAttributes } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

type FieldProps = InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string | undefined };

export function TextField({ label, error, ...props }: FieldProps) {
  const id = useId();
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-sm font-medium">{label}</label>
      <input id={id} className="field-input" aria-invalid={!!error} aria-describedby={error ? `${id}-e` : undefined} {...props} />
      {error && <p id={`${id}-e`} className="text-sm text-destructive">{error}</p>}
    </div>
  );
}

export function PasswordField({ label, error, ...props }: FieldProps) {
  const id = useId();
  const [show, setShow] = useState(false);
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-sm font-medium">{label}</label>
      <div className="relative">
        <input id={id} type={show ? "text" : "password"} className="field-input pr-12" aria-invalid={!!error} aria-describedby={error ? `${id}-e` : undefined} {...props} />
        <button type="button" onClick={() => setShow((s) => !s)} aria-label={show ? "Ocultar contraseña" : "Mostrar contraseña"}
          className="absolute right-0 top-0 grid size-11 place-items-center text-muted-foreground hover:text-foreground">
          {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      </div>
      {error && <p id={`${id}-e`} className="text-sm text-destructive">{error}</p>}
    </div>
  );
}

export function GoogleButton({ onSuccess, label = "Continuar con Google" }: { onSuccess: () => Promise<void>; label?: string }) {
  const [busy, setBusy] = useState(false);
  return (
    <Button type="button" variant="outline" className="h-12 w-full" disabled={busy}
      onClick={async () => {
        setBusy(true);
        try { await onSuccess(); } catch { toast.error("No se pudo completar el acceso con Google. Inténtalo nuevamente."); } finally { setBusy(false); }
      }}>
      <svg aria-hidden viewBox="0 0 24 24" className="size-4"><path fill="currentColor" d="M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.4a4.6 4.6 0 0 1-2 3v2.5h3.2c1.9-1.7 3-4.3 3-7.3ZM12 22c2.7 0 5-.9 6.6-2.4l-3.2-2.5c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H3.1v2.6A10 10 0 0 0 12 22Zm-5.6-8a6 6 0 0 1 0-3.9V7.5H3.1a10 10 0 0 0 0 9L6.4 14ZM12 6c1.5 0 2.8.5 3.8 1.5l2.9-2.9A10 10 0 0 0 3.1 7.5L6.4 10C7.2 7.8 9.4 6 12 6Z" /></svg>
      {busy ? "Conectando…" : label}
    </Button>
  );
}

export function Divider() {
  return (
    <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-muted-foreground">
      <span className="h-px flex-1 bg-border" />o<span className="h-px flex-1 bg-border" />
    </div>
  );
}

export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

export function passwordStrength(p: string): { score: number; label: string } {
  let s = 0;
  if (p.length >= 8) s++;
  if (/[A-Z]/.test(p) && /[a-z]/.test(p)) s++;
  if (/\d/.test(p)) s++;
  if (/[^A-Za-z0-9]/.test(p) || p.length >= 12) s++;
  return { score: s, label: ["Muy débil", "Débil", "Aceptable", "Buena", "Fuerte"][s] ?? "Muy débil" };
}