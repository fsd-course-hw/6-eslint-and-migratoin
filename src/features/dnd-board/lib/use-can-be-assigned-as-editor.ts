import { useBoardStore } from "../model/use-board-store.tsx";

export const useCanBeAssignedAsEditor = ({ editorsIds }: { editorsIds: string[]}) => {
  const boardStore = useBoardStore();
  const board = boardStore.useSelector((s) => s.board);

  return ({id}: {id: string}): boolean => {
    const isOwner = id === board.ownerId;

    if (isOwner) {
      return false
    }

    const isEditor = editorsIds.some((editorId) => editorId === id);

    return !isEditor;
  }
}