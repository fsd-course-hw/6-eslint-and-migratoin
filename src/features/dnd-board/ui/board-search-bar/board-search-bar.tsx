import clsx from 'clsx';
import { FormEventHandler, useState } from 'react';
import { UiButton } from "@/shared/ui/ui-button";
import { UiTextField } from "@/shared/ui/ui-text-field";
import { useBoardStore } from "../../model/use-board-store.tsx";

export function BoardSearchBar({ className }: { className?: string }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [submittedSearchQuery, setSubmittedSearchQuery] = useState('');
  const boardStore = useBoardStore();
  const filterBoardCards = boardStore.useSelector((s) => s.filterBoardCards);
  const reloadBoard = boardStore.useSelector((s) => s.reloadBoard);

  const onSearch: FormEventHandler<HTMLFormElement> = (evt) => {
    evt?.preventDefault();
    setSubmittedSearchQuery(searchQuery);
    filterBoardCards(searchQuery);
  };

  const onReset: FormEventHandler<HTMLFormElement> = (evt) => {
    evt?.preventDefault();
    setSearchQuery('');
    setSubmittedSearchQuery('');
    reloadBoard();
  };

  const isSearchDisabled = searchQuery === submittedSearchQuery;

  return <form className={clsx(className, "flex justify-end gap-2")} onSubmit={onSearch} onReset={onReset}>
    <UiTextField inputProps={{
        placeholder: 'Искать задачу',
        value: searchQuery,
        onInput: (event) => setSearchQuery(event.currentTarget.value)
      }} />
    <UiButton type="submit" variant="primary" disabled={isSearchDisabled}>Поиск</UiButton>
    <UiButton type="reset" variant="secondary">Сбросить</UiButton>
  </form>
}