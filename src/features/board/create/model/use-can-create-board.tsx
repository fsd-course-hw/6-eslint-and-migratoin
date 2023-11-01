import { useSesson } from "@/entities/session";

export function useCanCreateBoard() {
  const session = useSesson((s) => s.currentSesson);
  return !!session;
}
