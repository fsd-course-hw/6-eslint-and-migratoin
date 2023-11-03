import { useSession } from "@/entities/session";

export function useSignOut() {
  return useSession((s) => s.removeSession);
}
