import { nanoid } from "nanoid";
import { create } from "zustand";
import { User } from "./types";
import { usersRepository } from "./users.repository";

type UsersStore = {
  users: User[];
  loadUsers: () => Promise<void>;
  createUser: (data: { name: string; avatarId: string }) => Promise<void>;
  removeUser: (userId: string) => Promise<void>;
};

export const useUsers = create<UsersStore>((set) => ({
  users: [],
  loadUsers: async () => {
    set({
      users: await usersRepository.getUsers(),
    });
  },
  createUser: async (data) => {
    const newUser = { id: nanoid(), ...data };
    await usersRepository.addUser(newUser);
    set({
      users: await usersRepository.getUsers(),
    });
  },
  removeUser: async (userId: string) => {
    await usersRepository.removeUser(userId);
    set({
      users: await usersRepository.getUsers(),
    });
  },
}));
