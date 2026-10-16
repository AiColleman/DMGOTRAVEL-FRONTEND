/**
 * Auth service — future endpoints: POST {VITE_API_BASE_URL}/api/v1/auth/{login,register,forgot-password,google}.
 * Credentials are managed by the DMGOTRAVEL backend (JWT). This mock never
 * stores passwords and never sends real emails.
 */
import { ApiError, apiClient, setAccessToken, USE_MOCKS } from "./apiClient";
import { db, delay } from "@/mocks/db";
import type { User } from "@/types";

export interface Session {
  user: User;
  token: string;
}
export interface RegisterInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

let current: Session | null = null;
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

const open = (user: User): Session => {
  current = { user, token: `demo-${user.id}` };
  setAccessToken(current.token);
  emit();
  return current;
};

export const authService = {
  getSession: () => current,
  subscribe(fn: () => void) {
    listeners.add(fn);
    return () => {
      listeners.delete(fn);
    };
  },

  async login(email: string, password: string): Promise<Session> {
    if (!USE_MOCKS) return open((await apiClient<Session>("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) })).user);
    await delay(500);
    const user = db.users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
    if (!user || password.length < 8) throw new ApiError(401, "Correo o contraseña incorrectos.");
    if (user.deleted) throw new ApiError(403, "Esta cuenta fue dada de baja.");
    return open(user);
  },

  async register(input: RegisterInput): Promise<Session> {
    if (!USE_MOCKS) return open((await apiClient<Session>("/auth/register", { method: "POST", body: JSON.stringify(input) })).user);
    await delay(600);
    if (db.users.some((u) => u.email.toLowerCase() === input.email.toLowerCase()))
      throw new ApiError(409, "Ya existe una cuenta con este correo.");
    const user: User = {
      id: `u-${Date.now()}`,
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      role: "customer",
      deleted: false,
      createdAt: new Date().toISOString(),
    };
    db.users = [...db.users, user];
    return open(user);
  },

  async forgotPassword(email: string): Promise<void> {
    if (!USE_MOCKS) {
      await apiClient("/auth/forgot-password", { method: "POST", body: JSON.stringify({ email }) });
      return;
    }
    await delay(500); // Demo: no email is sent.
  },

  /** Visual Google OAuth 2.0 / OIDC demo. Real flow redirects via the backend. */
  async google(): Promise<Session> {
    await delay(500);
    const user = db.users.find((u) => u.id === "u-valeria");
    if (!user) throw new ApiError(500, "No se pudo completar el acceso con Google.");
    return open(user);
  },

  logout() {
    current = null;
    setAccessToken(null);
    emit();
  },
};