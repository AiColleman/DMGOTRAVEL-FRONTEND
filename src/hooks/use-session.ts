import { useSyncExternalStore } from "react";
import { authService } from "@/services/authService";

export const useSession = () =>
  useSyncExternalStore(authService.subscribe, authService.getSession, () => null);