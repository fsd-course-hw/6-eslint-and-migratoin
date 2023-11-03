import { User } from "@/entities/user";
import { createStrictContext, useStrictContext } from "@/shared/lib/react";

type UsersListDeps = {
  onBeforeRemoveUser: (userId: string) => Promise<void>;
  renderUserAuthAction: (user: User) => React.ReactNode;
};

export const usersListDespContext = createStrictContext<UsersListDeps>();

export const useUsersLisetDesp = () => useStrictContext(usersListDespContext);
