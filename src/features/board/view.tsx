import { BoardPartial, useBoards } from "@/entities/board";
import { Session, useSesson } from "@/entities/session";

function canViewBoard(board?: BoardPartial, session?: Session) {
  if (!board) return false;
  return (
    session &&
    (board?.editorsIds.includes(session.userId) ||
      board.ownerId === session?.userId)
  );
}

export function useCanViewBoardFn() {
  const session = useSesson((s) => s.currentSesson);
  const getBoardById = useBoards((s) => s.getBoardById);
  return (boardId: string) => {
    const board = getBoardById(boardId);
    return canViewBoard(board, session);
  };
}
