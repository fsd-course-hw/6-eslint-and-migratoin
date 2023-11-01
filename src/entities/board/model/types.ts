export type BoardPartial = {
  id: string;
  name: string;
  ownerId: string;
  editorsIds: string[];
};

export type Board = {
  id: string;
  name: string;
  cols: BoardCol[];
  ownerId: string;
  editorsIds: string[];
};

export type BoardCol = {
  id: string;
  name: string;
  items: BoardItem[];
};

export type BoardItem = {
  id: string;
  name: string;
  description: string;
  author: BoardAuthor;
};

export type BoardAuthor = {
  id: string;
  name: string;
  avatarId: string;
};

export type CreateBoardData = {
  name: string;
  ownerId: string;
  editorsIds: string[];
};

export type UpdateBoardData = {
  name?: string;
  ownerId?: string;
  editorsIds?: string[];
};
