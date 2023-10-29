import { ReactNode } from "react";
import { useUsers } from "../model/users.store";
import { User } from "../model/types";
import { getAvatarUrl } from "./get-avatar-url";

export function UsersList({
  userActions,
}: {
  userActions?: (user: User) => ReactNode;
}) {
  const { users } = useUsers();
  return (
    <div className="mt-10">
      <h2 className="text-lg mb-2 font-semibold">Все пользователи</h2>
      <div>
        {users.map((user) => (
          <div
            key={user.id}
            className="px-5 py-2 border-b border-b-slate-3 flex gap-2 items-center "
          >
            <div>
              <img className="w-12 h-12" src={getAvatarUrl(user.avatarId)} />
            </div>
            <div className="text-lg">{user.name}</div>
            <div className="ml-auto flex gap-2">{userActions?.(user)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
