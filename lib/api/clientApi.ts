import type { Note, NoteTag } from "../../types/note";
import { nextClient } from "./api";
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
  };

  const { data } = await nextClient.request<FetchNotesResponse>(options);

  return {
    notes: data.notes.map(transformNote),
    totalPages: data.totalPages,
  };
}
export async function deleteNote(id: string) {
  const { data } = await nextClient.delete<Record<string, unknown>>(
    `/notes/${id}`,
  );
  return transformNote(data);
}

export type NoteData = Pick<Note, "title" | "content" | "tag">;

export async function createNote(noteData: NoteData) {
  const { data } = await nextClient.post<Record<string, unknown>>(
    "/notes",
    noteData,
  );
  return transformNote(data);
}

export async function fetchNoteById(id: string) {
  const { data } = await nextClient.get<Record<string, unknown>>(
    `/notes/${id}`,
  );
  return transformNote(data);
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export const register = async (data: RegisterRequest) => {
  const res = await nextClient.post<User>("/auth/register", data);
  return res.data;
};

export interface LoginRequest {
  email: string;
  password: string;
}

export async function login(data: LoginRequest): Promise<User> {
  const res = await nextClient.post<User>("/auth/login", data);
  return res.data;
}

export async function logout() {
  const res = await nextClient.post("/auth/logout");
  return res.data;
}

interface checkSessionRequest {
  success: boolean;
}
export async function checkSession() {
  const res = await nextClient.get<checkSessionRequest>("/auth/session");
  return res.data;
}

export async function getMe(): Promise<User> {
  const res = await nextClient.get<User>("/users/me");
  return res.data;
}

export async function updateMe(data: Pick<User, "username">): Promise<User> {
  const res = await nextClient.patch<User>("/users/me", data);
  return res.data;
}
