import { UpdateBoardData, useBoards } from "@/entities/board";
import { useCanUpdateBoardFn } from "./use-can-update-board";
import { useGetConfirmation } from "@/shared/lib/confirmation";
import { useSesson } from "@/entities/session";

export function useUpdateBoard(boardId: string) {
  const session = useSesson((s) => s.currentSesson);
  const getConfirmation = useGetConfirmation();
  const canUpdateFn = useCanUpdateBoardFn();

  const updateModalRaw = useBoards((s) => s.updateBoard);

  const updateBoard = async (data: UpdateBoardData, onUpdate: () => void) => {
    if (!canUpdateFn(boardId)) return;

    if (session?.userId !== data.ownerId) {
      const confirmation = await getConfirmation({
        description:
          "Вы действительно хотите передать доску другому пользователю?",
      });

      if (!confirmation) return;
    }

    await updateModalRaw(boardId, data);
    onUpdate();
  };

  return { updateBoard };
}
