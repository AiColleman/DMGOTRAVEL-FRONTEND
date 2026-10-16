/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** URL base del futuro backend ASP.NET Core REST API. Vacía = usar mocks. */
  readonly VITE_API_BASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}