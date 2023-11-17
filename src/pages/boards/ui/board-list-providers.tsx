import { subject, useAbility } from "@/features/group-1/auth";
import { boardsListDepsContext } from "@/features/group-1/boards-list";

export function BoardListProvider({ children }: { children: React.ReactNode }) {
  const ability = useAbility();
  return (
    <boardsListDepsContext.Provider
      value={{
        canCreateBoard: () => ability.can("create", "Board"),
        canViewBoard: (board) => ability.can("read", subject("Board", board)),
        canUpdateBoard: (board) =>
          ability.can("update", subject("Board", board)),
        canRemoveBoard: (board) =>
          ability.can("delete", subject("Board", board)),
      }}
    >
      {children}
    </boardsListDepsContext.Provider>
  );
}
