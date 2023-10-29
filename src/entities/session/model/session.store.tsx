import { nanoid } from "nanoid";
import { create } from "zustand";
import { Session } from "./types";
import { sessionRepository } from "./sesson.repository";

type CreateSessionData = {
  name: string;
  avatarId: string;
  userId: string;
};

type SessonStore = {
  currentSesson?: Session;
  loadSession: () => Promise<void>;
  removeSession: () => Promise<void>;
  createSession: (session: CreateSessionData) => Promise<void>;
};

export const useSesson = create<SessonStore>((set) => ({
  currentSesson: undefined,
  loadSession: async () => {
    const session = await sessionRepository.getSession();
    set({ currentSesson: session });
  },
  removeSession: async () => {
    await sessionRepository.clearSession();
    set({ currentSesson: undefined });
  },
  createSession: async (data) => {
    const newSession = { ...data, id: nanoid() };
    await sessionRepository.saveSession(newSession);
    set({ currentSesson: newSession });
  },
}));
