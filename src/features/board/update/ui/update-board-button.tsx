import { UpdateIcon } from "@/shared/ui/ui-icons";
import clsx from "clsx";
import { useState } from "react";
import { UpdateBoardModal } from "./update-board-modal";
import { useCanUpdateBoard } from "../model/use-can-update-board";

export function UpdateBoardButton({
  className,
  boardId,
}: {
  className?: string;
  boardId: string;
}) {
  const canUpdate = useCanUpdateBoard(boardId);
  const [open, setOpen] = useState(false);

  if (!canUpdate) return null;
  return (
    <>
      <button className={clsx(className)} onClick={() => setOpen(true)}>
        <UpdateIcon className="w-8 h-8 text-teal-600" />
      </button>
      {open && (
        <UpdateBoardModal boardId={boardId} onClose={() => setOpen(false)} />
      )}
    </>
  );
}
