import { BoardPartial } from "@/entities/board";
import { createStrictContext, useStrictContext } from "@/shared/lib/react";

type BoardsListDeps = {
  canCreateBoard: () => boolean;
  canViewBoard: (board: BoardPartial) => boolean;
  canRemoveBoard: (board: BoardPartial) => boolean;
  canUpdateBoard: (board: BoardPartial) => boolean;
};

export const boardsListDepsContext = createStrictContext<BoardsListDeps>();

export const useBoardsListDeps = () => useStrictContext(boardsListDepsContext);
