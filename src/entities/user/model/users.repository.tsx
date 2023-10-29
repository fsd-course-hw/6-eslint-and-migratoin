import { persistStorage } from "@/shared/lib/persist-storage";
import { User } from "./types";

const USERS_STORAGE_KEY = "users_storsage";
export const usersRepository = {
  getUsers: () => {
    return persistStorage.getItemSafe<User[]>(USERS_STORAGE_KEY, []);
  },
  addUser: async (value: User) => {
    const users = await usersRepository.getUsers();
    await persistStorage.setItemSafe(USERS_STORAGE_KEY, users.concat([value]));
  },
  removeUser: async (userId: string) => {
    const users = await usersRepository.getUsers();
    await persistStorage.setItemSafe(
      USERS_STORAGE_KEY,
      users.filter((user) => user.id !== userId),
    );
  },
};
