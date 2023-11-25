import { BoardCol } from "@/entities/board";


export const useFilterCards = ({searchText, columns}: {searchText: string; columns: BoardCol[]}) => {
    return columns.map((column) => ({...column, items: column.items.filter((item) => item.title.indexOf(searchText) !== -1)}))
}
