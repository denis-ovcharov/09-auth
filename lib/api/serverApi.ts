import { cookies } from "next/headers";
import type { Note, NoteTag } from "../../types/note";
import { nextServer } from "./api";
import { User } from "@/types/user";

interface FetchNotesResponse {
  notes: Record<string, unknown>[];
  totalPages: number;
}

function transformNote(note: Record<string, unknown>): Note {
  const result = { ...note };
  if (result._id) {
    result.id = result._id as string;
    delete result._id;
  }
  return result as unknown as Note;
}

export async function fetchNotes(
  query: string,
  page: number,
  perPage: number,
  tag?: NoteTag,
) {
  const cookieStore = await cookies();
  const params: Record<string, string | number> = {
    search: query,
    page,
    perPage,
  };

  if (tag && tag !== "all") {
    params.tag = tag;
  }

  const options = {
    method: "GET",
    url: "/notes",
    params,
    headers: {
      Cookie: cookieStore.toString(),
    },
  };

  const { data } = await nextServer.request<FetchNotesResponse>(options);

  return {
    notes: data.notes.map(transformNote),
    totalPages: data.totalPages,
  };
}

export async function fetchNoteById(id: string) {
  const cookieStore = await cookies();
  const { data } = await nextServer.get<Record<string, unknown>>(
    `/notes/${id}`,
    {
      headers: {
        Cookie: cookieStore.toString(),
      },
    },
  );
  return transformNote(data);
}

export async function checkSession() {
  const cookieStore = await cookies();
  const res = await nextServer.get("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
}

export async function getMe(): Promise<User> {
  const cookieStore = await cookies();
  const res = await nextServer.get<User>("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res.data;
}
