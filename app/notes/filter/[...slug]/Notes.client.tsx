"use client";
import NoteList from "../../../../components/NoteList/NoteList";
import Pagination from "../../../../components/Pagination/Pagination";
import css from "./page.module.css";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import SearchBox from "../../../../components/SearchBox/SearchBox";
import { useNotes } from "@/hooks/useNotes";

import { NoteTag } from "@/types/note";
import Link from "next/link";

type Props = {
  tag: NoteTag;
};

function NotesClient({ tag }: Props) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const perPage = 12;

  const { data, isSuccess } = useNotes(query, page, perPage, tag);

  const updateQuery = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
      setPage(1);
    },
    1000,
  );

  const notes = data?.notes || [];
  const totalPages = data?.totalPages ?? 1;

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox onSearch={updateQuery} />
          {totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              page={page}
              onPageChange={setPage}
            />
          )}
          <Link href={"/notes/action/create"} className={css.button}>
            Create note +
          </Link>
        </header>
        {notes.length > 0 && isSuccess && <NoteList notes={notes} />}
      </div>
    </>
  );
}

export default NotesClient;
