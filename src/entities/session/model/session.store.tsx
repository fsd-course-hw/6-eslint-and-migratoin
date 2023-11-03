import { nanoid } from "nanoid";
import { create } from "zustand";
import { Session } from "./types";
import { sessionRepository } from "./session.repository";

type CreateSessionData = {
  name: string;
  avatarId: string;
  userId: string;
};

type SessionStore = {
  currentSession?: Session;
  loadSession: () => Promise<void>;
  removeSession: () => Promise<void>;
  createSession: (session: CreateSessionData) => Promise<void>;
};

export const useSession = create<SessionStore>((set) => ({
  currentSession: undefined,
  loadSession: async () => {
    const session = await sessionRepository.getSession();
    set({ currentSession: session });
  },
  removeSession: async () => {
    await sessionRepository.clearSession();
    set({ currentSession: undefined });
  },
  createSession: async (data) => {
    const newSession = { ...data, id: nanoid() };
    await sessionRepository.saveSession(newSession);
    set({ currentSession: newSession });
  },
}));
