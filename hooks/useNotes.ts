import { fetchNotes } from "@/lib/api/clientApi";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { NoteTag } from "@/types/note";

export function useNotes(
  query: string,
  page: number,
  perPage: number,
  tag: NoteTag,
) {
  return useQuery({
    queryKey: ["notes", query, page, perPage, tag],
    queryFn: () => fetchNotes(query, page, perPage, tag),
    placeholderData: keepPreviousData,
  });
}
