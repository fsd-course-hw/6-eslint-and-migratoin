import { UiModal } from "@/shared/ui/ui-modal";
import { UiButton } from "@/shared/ui/ui-button";
import { UpdateBoardEditorsForm } from "./update-board-editors-form.tsx";

export function UpdateBoardEditorsModal({
  onClose,
}: {
  onClose: (updated?: boolean) => void;
}) {
  return (
    <UiModal isOpen onClose={onClose} width="md">
      <UpdateBoardEditorsForm onSuccess={() => onClose(true)}>
        <UiModal.Header>
          <h1>Редактирование списка редакторов</h1>
        </UiModal.Header>
        <UiModal.Body className="flex flex-col gap-4">
          <UpdateBoardEditorsForm.Fields />
        </UiModal.Body>
        <UiModal.Footer>
          <UiButton type="button" variant="outlined" onClick={() => onClose()}>
            Отмена
          </UiButton>
          <UpdateBoardEditorsForm.SubmitButton />
        </UiModal.Footer>
      </UpdateBoardEditorsForm>
    </UiModal>
  );
}
