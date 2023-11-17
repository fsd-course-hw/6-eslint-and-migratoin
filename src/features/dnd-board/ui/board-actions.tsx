import clsx from "clsx";
import { useState } from "react";
import { UiButton } from "@/shared/ui/ui-button";
import { AddColumnModal } from "./modals/add-column-modal";
import { useHasBoardAccess } from "../lib/use-has-board-access";

export function BoardActions({ className }: { className?: string }) {
  const [addColumnModalOpen, setAddColumnModalOpen] = useState(false);
  const hasBoardAccess = useHasBoardAccess();

  if (!hasBoardAccess) {
    return (
      <div className={clsx("flex gap-2", className)}>
        <UiButton variant="primary" disabled>
          Добавить колонку
        </UiButton>
      </div>
    );
  }

  return (
    <div className={clsx("flex gap-2", className)}>
      <UiButton variant="primary" onClick={() => setAddColumnModalOpen(true)}>
        Добавить колонку
      </UiButton>
      {addColumnModalOpen && (
        <AddColumnModal onClose={() => setAddColumnModalOpen(false)} />
      )}
    </div>
  );
}
