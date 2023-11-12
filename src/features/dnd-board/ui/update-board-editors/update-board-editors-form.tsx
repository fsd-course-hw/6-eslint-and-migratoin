import {
  useFormContext,
  FormProvider,
  useForm,
} from "react-hook-form";
import { UiButton } from "@/shared/ui/ui-button";
import { RemoveIcon } from "@/shared/ui/ui-icons";
import { UserPreview, UserSelect, useUsers } from "@/entities/user";
import { useBoardUsers } from "../../lib/use-board-users";
import { useCanBeAssignedAsEditor } from "../../lib/use-can-be-assigned-as-editor.ts";
import { useBoardStore } from "../../model/use-board-store";
import { usePossibleEditors } from "../../lib/use-possible-editors.ts";

type UpdateBoardEditorsData = {
  editorsIds: string[]
}

export function UpdateBoardEditorsForm({
  children,
  onSuccess,
}: {
  children?: React.ReactNode;
  onSuccess: () => void;
}) {
  const boardStore = useBoardStore();
  const updateBoardEditors = boardStore.useSelector((s) => s.updateBoardEditors);
  const { editors} = useBoardUsers();

  const form = useForm<UpdateBoardEditorsData>({
    defaultValues: {
      editorsIds: editors.map(({ id }) => id)
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    await updateBoardEditors(data.editorsIds);
    onSuccess();
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit}>{children}</form>;
    </FormProvider>
  );
}

function EditorCard({ editorId }: { editorId: string }) {
  const { setValue, getValues } = useFormContext<UpdateBoardEditorsData>();
  const getUserById = useUsers((s) => s.getUserById)
  const editor = getUserById(editorId);

  if (!editor) {
    return null;
  }

  const onRemoveEditor = () => {
    const currentEditorsIds = getValues('editorsIds');
    const newEditorsIds = currentEditorsIds.filter((currentEditorId) => currentEditorId !==  editorId);
    setValue('editorsIds', newEditorsIds);
  }

  return <div key={editorId} className="flex justify-between items-center">
    <UserPreview name={editor.name} avatarId={editor.avatarId} size="md" />
    <button
      type="button"
      className="text-rose-600 p-1 rounded-full hover:bg-rose-100 transition-all action w-8 h-8 shrink-0 flex items-center justify-center"
      onClick={onRemoveEditor}
    >
      <RemoveIcon className="w-4 h-4" />
    </button>
  </div>
}

UpdateBoardEditorsForm.Fields = function Fields() {
  const { watch, setValue, getValues } = useFormContext<UpdateBoardEditorsData>();
  const editorsIds = watch('editorsIds');
  const canBeAssignedAsEditor = useCanBeAssignedAsEditor({ editorsIds });
  const possibleEditors = usePossibleEditors({ editorsIds });

  const onAddEditor = (newEditorId?: string) => {
    if (newEditorId) {
      const currentEditorsIds = getValues('editorsIds');
      const newEditorsIds = [...currentEditorsIds, newEditorId];
      setValue('editorsIds', newEditorsIds);
    }
  }

  const editorsCards = editorsIds.map((editorId) => <EditorCard key={editorId} editorId={editorId} />);
  const editorSelect = <UserSelect
    label="Исполнитель"
    onChangeUserId={onAddEditor}
    className="w-full"
    filterOptions={canBeAssignedAsEditor}
  />;

  return (
    <>
      {editorsIds.length ? editorsCards : <div>Нет назначенных редакторов</div>}
      {possibleEditors.length ? editorSelect : <div>Все возможные редакторы назначены</div>}
    </>
  );
};

UpdateBoardEditorsForm.SubmitButton = function SubmitButton() {
  return (
    <UiButton type="submit" variant="primary">
      Обновить
    </UiButton>
  );
};
