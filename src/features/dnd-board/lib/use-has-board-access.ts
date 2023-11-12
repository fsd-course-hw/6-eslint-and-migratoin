import { useSession } from "@/entities/session";
import { useBoardStore } from "../model/use-board-store";

export const useHasBoardAccess = (): boolean => {
  const boardStore = useBoardStore();
  const { ownerId, editorsIds} = boardStore.useSelector((s) => s.board);
  const currentSession = useSession((s) => s.currentSession);

  if (!currentSession) {
    return false;
  }

  const { userId} = currentSession;

  const isOwner = ownerId === userId;

  if (isOwner) {
    return true;
  }

  const isEditor = editorsIds.some((editorId) => editorId === userId);

  return isEditor;
}