import { Board as BoardType } from "@/entities/board";
import { Session } from "@/entities/session";
import { useTasks } from "@/entities/task";
import {
  boardDepsContext,
  boardStoreContext,
  useBoardStoreFactory,
} from "@/features/dnd-board";
import {
  updateTaskModalDeps,
  useUpdateTaskModal,
} from "@/features/update-task-modal";

export function TaskEditorProvider({
  children,
  board,
}: {
  children?: React.ReactNode;
  board: BoardType;
}) {
  return (
    <updateTaskModalDeps.Provider
      value={{
        canAssigneUserToTask: (user) =>
          board.ownerId === user.id || board.editorsIds.includes(user.id),
      }}
    >
      {children}
    </updateTaskModalDeps.Provider>
  );
}

export function BoardDepsProvider({
  children,
  sesson,
}: {
  children?: React.ReactNode;
  sesson: Session;
}) {
  const removeTask = useTasks((s) => s.removeTask);
  const createTask = useTasks((s) => s.createTask);
  const { modal, updateTask } = useUpdateTaskModal();

  return (
    <boardDepsContext.Provider
      value={{
        createBoardCard: async (title: string) => {
          return await createTask({ authorId: sesson.userId, title });
        },
        onBeforeRemoveBoardCard: async (id: string) => {
          await removeTask(id);
        },
        updateBoardCard: async (board) => {
          return await updateTask(board.id);
        },
      }}
    >
      {children}
      {modal}
    </boardDepsContext.Provider>
  );
}

export function BoardStoreProvider({
  children,
  board,
}: {
  children?: React.ReactNode;
  board: BoardType;
}) {
  const { boardStore } = useBoardStoreFactory(board);
  return (
    <boardStoreContext.Provider value={boardStore}>
      {children}
    </boardStoreContext.Provider>
  );
}
