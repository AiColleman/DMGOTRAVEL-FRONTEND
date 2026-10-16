/**
 * Single HTTP entry point for the future ASP.NET Core REST API (/api/v1/*).
 * While VITE_API_BASE_URL is empty, services use the mock adapters.
 */
export const API_BASE_URL: string = import.meta.env["VITE_API_BASE_URL"] ?? "";
export const USE_MOCKS = API_BASE_URL === "";

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

let accessToken: string | null = null;
export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

export async function apiClient<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers);
  headers.set("Accept", "application/json");
  if (init.body) headers.set("Content-Type", "application/json");
  if (accessToken) headers.set("Authorization", `Bearer ${accessToken}`);
  const res = await fetch(`${API_BASE_URL}/api/v1${path}`, { ...init, headers });
  if (!res.ok) throw new ApiError(res.status, `Error ${res.status} al llamar ${path}`);
  return (await res.json()) as T;
}