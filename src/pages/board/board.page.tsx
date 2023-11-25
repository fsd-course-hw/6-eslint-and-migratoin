import { useSession } from "@/entities/session";
import { Board, BoardActions, UserList, useFetchBoard } from "@/features/dnd-board";
import { ComposeChildren } from "@/shared/lib/react";
import { UiPageSpinner } from "@/shared/ui/ui-page-spinner";
import { useParams } from "react-router-dom";
import {
  BoardDepsProvider,
  BoardStoreProvider,
  TaskEditorProvider,
} from "./providers";
import { useCanViewBoard } from "./lib/can-view-board";
import { getAvatarUrl } from "@/entities/user";
import { useState } from "react";

export function BoardPage() {
  const params = useParams<"boardId">();
  const boardId = params.boardId;
  const sesson = useSession((s) => s.currentSession);
  const { board } = useFetchBoard(boardId);
  const [searchText, setSearchText] = useState('');
  
  const canViewBoard = useCanViewBoard(sesson, board);


  if (!sesson) {
    return <div>Не авторизован</div>;
  }

  if (!board) {
    return <UiPageSpinner />;
  }


  if(!canViewBoard) {
    return <div>У ВАС НЕТ ПРАВ ДОСТУПА!</div>
  }

  return  <ComposeChildren>
      <TaskEditorProvider board={board} />
      <BoardDepsProvider sesson={sesson} />
      <BoardStoreProvider board={board} />
      <div className="flex flex-col py-3 px-4 grow">
        <h1 className="text-3xl mb-4 shrink-0 ">{board?.title}</h1>
        <div>
          Владелец доски: {<div className="flex gap-5 items-center">
          <p className="text-lg">{sesson.name}</p>
          <img className='w-7 h-7' src={getAvatarUrl(sesson.avatarId)} />
        </div>}
        </div>
        <div>
          Редакторы: {<UserList board={board} />}
        </div>
        <input className="border-2 my-4 rounded-lg p-2 text-cyan-700" type='text' value={searchText} onChange={(e) => setSearchText(e.target.value)}></input>
        <BoardActions className="shrink-0 mb-2" />
        <Board searchText={searchText} className="basis-0 grow" />
      </div>
    </ComposeChildren>
}
