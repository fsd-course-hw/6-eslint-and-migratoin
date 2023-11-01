import { BoardPartial, useBoards } from "@/entities/board";
import { Session, useSesson } from "@/entities/session";

export function canUpdateBoard(board?: BoardPartial, session?: Session) {
  if (!board) return false;
  return session?.userId === board?.ownerId;
}

export function useCanUpdateBoardFn() {
  const session = useSesson((s) => s.currentSesson);
  const getBoardById = useBoards((s) => s.getBoardById);
  return (boardId: string) => {
    const board = getBoardById(boardId);
    return canUpdateBoard(board, session);
  };
}

export function useCanUpdateBoard(boardId: string) {
  const board = useBoards((s) => s.getBoardById(boardId));
  const session = useSesson((s) => s.currentSesson);
  return canUpdateBoard(board, session);
}
