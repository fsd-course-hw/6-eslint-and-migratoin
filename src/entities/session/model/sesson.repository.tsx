import { persistStorage } from "@/shared/lib/persist-storage";
import { Session } from "./types";

const SESSION_STORAGE_KEY = "session_storage";
export const sessionRepository = {
  getSession: () => {
    return persistStorage.getItemSafe<Session | undefined>(
      SESSION_STORAGE_KEY,
      undefined,
    );
  },
  saveSession: (value: Session) => {
    return persistStorage.setItemSafe(SESSION_STORAGE_KEY, value);
  },
  clearSession: () => {
    return persistStorage.setItemSafe(SESSION_STORAGE_KEY, undefined);
  },
};
