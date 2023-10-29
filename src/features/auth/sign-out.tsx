import { useSesson } from "@/entities/session";
import { UiButton } from "@/shared/ui/ui-button";

function useSignOut() {
  return useSesson((s) => s.removeSession);
}

export function SignOutButton({ className }: { className?: string }) {
  const signOut = useSignOut();
  return (
    <UiButton
      className={className}
      variant="secondary"
      onClick={() => signOut()}
    >
      Выйти
    </UiButton>
  );
}
