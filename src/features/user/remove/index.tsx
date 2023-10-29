import { useSesson } from "@/entities/session";
import { useUsers } from "@/entities/user";
import { SVGProps } from "react";

function useRemoveUser() {
  const { currentSesson, removeSession } = useSesson();
  const removeUser = useUsers((s) => s.removeUser);

  return async (userId: string) => {
    if (currentSesson?.userId === userId) {
      await removeSession();
    }

    await removeUser(userId);
  };
}

export function RemoveUserButton({ userId }: { userId: string }) {
  const removeUser = useRemoveUser();
  return (
    <button onClick={() => removeUser(userId)}>
      <RemoveIcon className="w-8 h-8 text-rose-500" />
    </button>
  );
}

export function RemoveIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M7 21q-.825 0-1.413-.588T5 19V6q-.425 0-.713-.288T4 5q0-.425.288-.713T5 4h4q0-.425.288-.713T10 3h4q.425 0 .713.288T15 4h4q.425 0 .713.288T20 5q0 .425-.288.713T19 6v13q0 .825-.588 1.413T17 21H7ZM17 6H7v13h10V6ZM9 17h2V8H9v9Zm4 0h2V8h-2v9ZM7 6v13V6Z"
      ></path>
    </svg>
  );
}
