import { User, useUsers } from '@/entities/user';

type Board = {
  ownerId: string;
  editorsIds: string[]
}

type UseBoardUsersReturn = {
  owner: User | null;
  editors: User[]
}

export const useBoardUsers = ({ ownerId, editorsIds }: Board): UseBoardUsersReturn => {
  const getUserById = useUsers((s) => s.getUserById);

  const owner = getUserById(ownerId) ?? null;

  const editors: User[] = []

  editorsIds.forEach((id) => {
    const editor = getUserById(id);

    if (editor) {
      editors.push(editor)
    }
  })

  return {
    owner,
    editors
  }
}