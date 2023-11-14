import { useUsers } from "@/entities/user";

export type CreateUserFormData = {
  name: string;
  avatarId: string;
};

export function useCreateUser() {
  const { createUser } = useUsers();
  return (data: CreateUserFormData) => {
    createUser?.(data);
  };
}
