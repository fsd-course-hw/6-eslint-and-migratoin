import { create } from "zustand";
import { Board } from "./types";
import { boardsRepository } from "./boards.repository";

export type BoardStore = {
  board: Board | undefined;
  isLoading?: boolean;
  error?: string;
  loadBoard: () => Promise<void>;
  saveBoard: (value: Board) => Promise<void>;
};

export const createBoardStore = ({ boardId }: { boardId: string }) => {
  return create<BoardStore>((set) => ({
    board: undefined,
    error: undefined,
    isLoading: false,
    loadBoard: async () => {
      set({ isLoading: true });
      const board = await boardsRepository.getBoard(boardId).finally(() => {
        set({ isLoading: false });
      });
      set({ board });
    },
    saveBoard: async (value: Board) => {
      await boardsRepository.saveBoard(value);
      set({ board: value });
    },
  }));
};
