import { User } from "@/entities/user";
import { UiButton } from "@/shared/ui/ui-button";
import { useSignInUser } from "../model/use-sign-in-user";

export function SignInUserButton({
  className,
  user,
}: {
  className?: string;
  user: User;
}) {
  const singInUser = useSignInUser();
  return (
    <UiButton
      className={className}
      variant="primary"
      onClick={() => singInUser(user)}
    >
      Войти как
    </UiButton>
  );
}
