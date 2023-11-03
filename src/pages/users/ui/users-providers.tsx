import { useBoards } from "@/entities/board";
import { useSession } from "@/entities/session";
import {
  SignInUserButton,
  SignOutButton,
  subject,
  useAbility,
} from "@/features/auth";
import { usersListDespContext } from "@/features/users-list";

export const UsersPageProviers = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const ability = useAbility();
  const removeSession = useSession((s) => s.removeSession);

  const removeAuthorFromBoards = useBoards(
    (board) => board.removeAuthorFromBoards,
  );

  return (
    <usersListDespContext.Provider
      value={{
        onBeforeRemoveUser: async (userId) => {
          await removeSession();
          await removeAuthorFromBoards(userId);
        },
        renderUserAuthAction: (user) => {
          const canSignIn = ability.can(
            "sign-in-as",
            subject("User", { id: user.id }),
          );

          const canSignOut = ability.can(
            "sign-out",
            subject("User", { id: user.id }),
          );

          if (canSignIn) return <SignInUserButton user={user} />;
          if (canSignOut) return <SignOutButton />;
        },
      }}
    >
      {children}
    </usersListDespContext.Provider>
  );
};
