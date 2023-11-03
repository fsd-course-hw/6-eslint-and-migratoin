import { useUsers } from "@/entities/user";
import { useGetConfirmation } from "@/shared/lib/confirmation";
import { useUsersLisetDesp } from "../deps";

export function useRemoveUser() {
  const { onBeforeRemoveUser } = useUsersLisetDesp();
  const getConfirmation = useGetConfirmation();
  const removeUser = useUsers((s) => s.removeUser);

  return async (userId: string) => {
    const confirmation = await getConfirmation({
      description: "Вы действительно хотите удалить пользователя?",
    });

    if (!confirmation) return;

    onBeforeRemoveUser(userId);

    await removeUser(userId);
  };
}
