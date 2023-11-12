import clsx from 'clsx';
import { UpdateIcon } from '@/shared/ui/ui-icons.tsx';
import { useCanUpdateBoardEditors } from "../../lib/use-can-update-board-editors";
import {
  useUpdateBoardEditorsModal
} from "../update-board-editors/use-update-board-editors-modal";

export function UpdateBoardEditorsButton({ className }: { className?: string}) {
  const canUpdateBoardEditors = useCanUpdateBoardEditors();
  const { modal, updateBoardEditors } = useUpdateBoardEditorsModal();

  if (!canUpdateBoardEditors) {
    return null;
  }

  return <>
    <button
      className={clsx(className, "text-teal-600 p-1 rounded-full hover:bg-teal-100 transition-all action")}
      onClick={updateBoardEditors}
    >
      <UpdateIcon className="w-5 h-5" />
    </button>
    {modal}
  </>
}