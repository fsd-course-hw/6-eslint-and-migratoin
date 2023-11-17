import { User, useUsers } from '@/entities/user';
import { useCanBeAssignedAsEditor } from "./use-can-be-assigned-as-editor.ts";

export const usePossibleEditors = ({ editorsIds }: { editorsIds: string[]}): User[] => {
  const users = useUsers((s) => s.users);
  const canBeAssignedAsEditor = useCanBeAssignedAsEditor({ editorsIds })

  return users.filter((user) => canBeAssignedAsEditor(user))
}
