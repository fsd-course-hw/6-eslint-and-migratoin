import { UiCetnerContentLayout } from "@/shared/ui/layouts/ui-center-content-layout";
import { CreateUserForm } from "@/features/user/create";
import { User, UsersList } from "@/entities/user";
import { useCheckSingIn } from "@/features/auth/check-sign-in";
import { SignOutButton } from "@/features/auth/sign-out";
import { SignInUserButton } from "@/features/auth/sing-in-user";
import { RemoveUserButton } from "@/features/user/remove";

export function UsersPage() {
  const { isUserSignIn } = useCheckSingIn();

  const getUserActions = (user: User) => {
    return (
      <>
        {isUserSignIn(user) ? (
          <SignOutButton />
        ) : (
          <SignInUserButton user={user} />
        )}
        <RemoveUserButton userId={user.id} />
      </>
    );
  };

  return (
    <UiCetnerContentLayout className="py-10">
      <h1 className="text-3xl ">Пользователи</h1>
      <CreateUserForm className="mt-10" />
      <UsersList userActions={getUserActions} />
    </UiCetnerContentLayout>
  );
}
