import { useState } from "react";
import { UpdateBoardEditorsModal } from "./update-board-editors-modal.tsx";

export function useUpdateBoardEditorsModal() {
  const [modalProps, setModalProps] = useState<{
    onClose: (updated?: boolean) => void;
  }>();

  const modal = modalProps ? <UpdateBoardEditorsModal {...modalProps} /> : undefined;

  const updateBoardEditors = () => {
    return new Promise<boolean | undefined>((res) => {
      setModalProps({
        onClose: (updated) => {
          res(updated);
          setModalProps(undefined);
        },
      });
    });
  };

  return {
    modal,
    updateBoardEditors,
  };
}
