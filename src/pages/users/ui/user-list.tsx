import { User, UserPreview, useUsers } from "@/entities/user";
import { ReactNode } from "react";

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
            <UserPreview size="md" name={user.name} avatarId={user.avatarId} />
            <div className="ml-auto flex gap-2 shrink-0">
              {userActions?.(user)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
