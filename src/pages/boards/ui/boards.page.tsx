import { UiCetnerContentLayout } from "@/shared/ui/layouts/ui-center-content-layout";
import { BoardListProvider } from "./board-list-providers";
import { BoardsList, CreateBoardButton } from "@/features/boards-list";
import { useAbility } from "@/features/auth";

export function BoardsPage() {
  const ability = useAbility();

  return (
    <BoardListProvider>
      <UiCetnerContentLayout className="py-10">
        <h1 className="text-3xl ">Доски</h1>
        {ability.can("create", "Board") ? (
          <>
            <div className="flex gap-2 mt-10">
              <CreateBoardButton />
            </div>
            <BoardsList className="mt-10" />
          </>
        ) : (
          <div className="mt-5 text-xl">
            У вас нет прав для работы с этой страницей
          </div>
        )}
      </UiCetnerContentLayout>
    </BoardListProvider>
  );
}
