import { CreateBoardButton, useCanCreateBoard } from "@/features/board/create";
import { UiCetnerContentLayout } from "@/shared/ui/layouts/ui-center-content-layout";
import { BoardsList } from "./boards-list";

export function BoardsPage() {
  const canCreate = useCanCreateBoard();

  const body = (
    <>
      <div className="flex gap-2 mt-10">
        <CreateBoardButton />
      </div>
      <BoardsList className="mt-10" />
    </>
  );

  return (
    <UiCetnerContentLayout className="py-10">
      <h1 className="text-3xl ">Доски</h1>
      {canCreate ? (
        body
      ) : (
        <div className="mt-5 text-xl">
          У вас нет прав для работы с этой страницей
        </div>
      )}
    </UiCetnerContentLayout>
  );
}
