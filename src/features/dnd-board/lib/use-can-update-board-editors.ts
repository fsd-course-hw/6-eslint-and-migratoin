import { useSession } from "@/entities/session";
import { useBoardStore } from "../model/use-board-store";

export const useCanUpdateBoardEditors = (): boolean => {
  const boardStore = useBoardStore();
  const { ownerId} = boardStore.useSelector((s) => s.board);
  const currentSession = useSession((s) => s.currentSession);

  if (!currentSession) {
    return false;
  }

  const { userId} = currentSession;

  const isOwner = ownerId === userId;

  console.log(isOwner);

  return isOwner;
}