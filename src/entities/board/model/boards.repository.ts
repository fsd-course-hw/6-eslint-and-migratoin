import { persistStorage } from "@/shared/lib/persist-storage";
import { Board, BoardPartial } from "./types";

const BOARDS_STORAGE_KEY = "boards_storsage";
export const boardsRepository = {
  getBoards: async (): Promise<BoardPartial[]> => {
    return persistStorage
      .getItemSafe<Board[]>(BOARDS_STORAGE_KEY, [])
      .then((boards) =>
        boards.map((board) => ({
          id: board.id,
          name: board.name,
          editorsIds: board.editorsIds,
          ownerId: board.ownerId,
        })),
      );
  },
  getBoard: async (id: string): Promise<Board | undefined> => {
    return persistStorage
      .getItemSafe<Board[]>(BOARDS_STORAGE_KEY, [])
      .then((boards) => boards.find((board) => board.id === id));
  },
  saveBoard: async (value: Board) => {
    const boards = await boardsRepository.getBoards();
    const boardIndex = boards.findIndex((board) => board.id === value.id);

    if (boardIndex === -1) {
      boards.push(value);
    } else {
      boards[boardIndex] = value;
    }

    await persistStorage.setItemSafe(BOARDS_STORAGE_KEY, boards);
  },
  removeBoard: async (boardId: string) => {
    const boards = await boardsRepository.getBoards();
    await persistStorage.setItemSafe(
      BOARDS_STORAGE_KEY,
      boards.filter((board) => board.id !== boardId),
    );
  },
};
