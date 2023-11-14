import { useSession } from "@/entities/session";
import { User } from "@/entities/user";

export function useSignInUser() {
  const createSession = useSession((s) => s.createSession);

  return (user: User) => {
    createSession({
      userId: user.id,
      ...user,
    });
  };
}
