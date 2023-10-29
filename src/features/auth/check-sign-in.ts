import { useSesson } from "@/entities/session";
import { User } from "@/entities/user";

export function useCheckSingIn() {
  const session = useSesson((s) => s.currentSesson);

  return {
    isSignIn: () => !!session,
    isUserSignIn: (user: User) => user.id === session?.userId,
  };
}
