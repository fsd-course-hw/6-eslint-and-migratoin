import { nanoid } from "nanoid";
import { create } from "zustand";
import {
  BoardCol,
  BoardPartial,
  CreateBoardData,
  UpdateBoardData,
} from "./types";
import { boardsRepository } from "./boards.repository";

export type BoardsStore = {
  boards: BoardPartial[];
  getBoardById: (id: string) => BoardPartial | undefined;
  loadBoards: () => Promise<void>;
  createBoard: (data: CreateBoardData) => Promise<void>;
  updateBoard: (id: string, data: UpdateBoardData) => Promise<void>;
  removeBoard: (id: string) => Promise<void>;
  removeAuthorFromBoards: (userId: string) => Promise<void>;
};

export const useBoards = create<BoardsStore>((set, get) => ({
  boards: [],
  getBoardById: (id) => {
    return get().boards.find((board) => board.id === id);
  },
  loadBoards: async () => {
    set({
      boards: await boardsRepository.getBoards(),
    });
  },
  createBoard: async (data) => {
    const newBoard = { id: nanoid(), ...data, cols: [] as BoardCol[] };
    await boardsRepository.saveBoard(newBoard);
    set({
      boards: await boardsRepository.getBoards(),
    });
  },
  updateBoard: async (id, data) => {
    const board = await boardsRepository.getBoard(id);
    if (!board) return;
    const newBoard = { ...board, ...data };

    await boardsRepository.saveBoard(newBoard);
    set({
      boards: await boardsRepository.getBoards(),
    });
  },
  removeBoard: async (boardId: string) => {
    await boardsRepository.removeBoard(boardId);
    set({
      boards: await boardsRepository.getBoards(),
    });
  },
  removeAuthorFromBoards: async (userId: string) => {
    for (const board of get().boards) {
      const newBoard = {
        ...board,
        editorsIds: board.editorsIds.filter((id) => id !== userId),
      };

      if (newBoard.ownerId === userId) {
        await get().removeBoard(newBoard.id);
      } else {
        await get().updateBoard(newBoard.id, newBoard);
      }
    }
  },
}));
