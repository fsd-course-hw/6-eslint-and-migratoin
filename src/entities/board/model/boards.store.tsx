import { nanoid } from "nanoid";
import { create } from "zustand";
import { BoardPartial, CreateBoardData, UpdateBoardData } from "./types";
import { boardsRepository } from "./boards.repository";

export type BoardsStore = {
  boards: BoardPartial[];
  getBoardById: (id: string) => BoardPartial | undefined;
  loadBoards: () => Promise<void>;
  createBoard: (data: CreateBoardData) => Promise<void>;
  updateBoard: (id: string, data: UpdateBoardData) => Promise<void>;
  removeBoard: (userId: string) => Promise<void>;
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
    const newBoard = { id: nanoid(), ...data, cols: [] };
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
  removeBoard: async (userId: string) => {
    await boardsRepository.removeBoard(userId);
    set({
      boards: await boardsRepository.getBoards(),
    });
  },
}));
