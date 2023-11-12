import clsx from "clsx";
import { UserPreview } from "@/entities/user";
import { useBoardStore } from '../../model/use-board-store.tsx';
import { useBoardUsers } from '../../lib/use-board-users.ts';

export function BoardUsers({ className }: { className?: string }) {
  const boardStore = useBoardStore();
  const board = boardStore.useSelector((s) => s.board);
  const { owner, editors} = useBoardUsers(board);

  return (
    <div className={clsx("flex flex-col gap-2", className)}>
      <h2 className="text-2xl">Пользователи доски</h2>

      <div className="flex gap-2 items-center">
        <h3 className="text-xl">Владелец:</h3>
        {!owner ?
          <p className="text-base mt-0.5">Не назначен</p> :
          <div className="p-1 border rounded-xl">
            <UserPreview name={owner.name} avatarId={owner.avatarId} size="md" />
          </div>}
      </div>

      <div className="flex gap-2 items-center">
        <h3 className="text-xl">Редакторы:</h3>
        <div className="flex flex-wrap gap-2 items-center">
          {!editors.length ?
            <p className="text-base mt-0.5">Не назначены</p> :
            editors.map((editor) =>
              <div key={editor.id} className="p-1 border rounded-xl">
                <UserPreview name={editor.name} avatarId={editor.avatarId} size="md" />
              </div>)}
        </div>
      </div>
    </div>
  );
}
