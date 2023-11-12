import { User, useUsers } from "@/entities/user";
import { useBoardStore } from "../model/use-board-store";


type UseBoardUsersReturn = {
  owner: User | null;
  editors: User[]
}

export const useBoardUsers = (): UseBoardUsersReturn => {
  const boardStore = useBoardStore();
  const { ownerId, editorsIds} = boardStore.useSelector((s) => s.board);

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