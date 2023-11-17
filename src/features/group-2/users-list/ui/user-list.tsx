import { UserPreview, useUsers } from "@/entities/user";
import { useUsersLisetDesp } from "../deps";
import { useRemoveUser } from "../model/use-remove-user";
import { RemoveIcon } from "@/shared/ui/ui-icons";

export function UsersList({ className }: { className?: string }) {
  const { users } = useUsers();
  const removeUser = useRemoveUser();
  const { renderUserAuthAction } = useUsersLisetDesp();

  return (
    <div className={className}>
      {users.map((user) => (
        <div
          key={user.id}
          className="px-5 py-2 border-b border-b-slate-3 flex gap-2 items-center "
        >
          <UserPreview size="md" name={user.name} avatarId={user.avatarId} />
          <div className="ml-auto flex gap-2 shrink-0">
            {renderUserAuthAction(user)}
            <button onClick={() => removeUser(user.id)}>
              <RemoveIcon className="w-8 h-8 text-rose-500" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
