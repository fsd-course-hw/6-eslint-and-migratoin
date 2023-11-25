import { Board } from "@/entities/board";
import { Session } from "@/entities/session";

export const useCanViewBoard = (sesson?: Session, board?: Board, ) => {
    return sesson && (board?.editorsIds.includes(sesson.userId) || board?.ownerId === sesson.userId)
}