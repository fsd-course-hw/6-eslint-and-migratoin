import { useSession } from "@/entities/session";
import { useBoardStore } from "../model/use-board-store";

export const hasBoardAccess = (userId: string, {ownerId, editorsIds}: {ownerId: string, editorsIds: string[]}): boolean => {
  const isOwner = ownerId === userId;

  if (isOwner) {
    return true;
  }

  const isEditor = editorsIds.some((editorId) => editorId === userId);

  return isEditor;
}

export const useHasBoardAccess = (): boolean => {
  const boardStore = useBoardStore();
  const board = boardStore.useSelector((s) => s.board);
  const currentSession = useSession((s) => s.currentSession);

  if (!currentSession) {
    return false;
  }

  return hasBoardAccess(currentSession.userId, board);
}