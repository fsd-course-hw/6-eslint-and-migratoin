import { UiButton } from "@/shared/ui/ui-button";
import { useSignOut } from "../model/use-sign-out";
// Error
import { UsersList } from '@/features/group-2/users-list'

<UsersList/>

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
