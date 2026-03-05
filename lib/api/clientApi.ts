import type { Note, NoteTag } from "../../types/note";
import { nextServer } from "./api";
import { User } from "@/types/user";

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
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

  const { data } = await nextServer.request<FetchNotesResponse>(options);

  return {
    notes: data.notes,
    totalPages: data.totalPages,
  };
}
export async function deleteNote(id: string) {
  const { data } = await nextServer.delete<Note>(`/notes/${id}`);
  return data;
}

export type NoteData = Pick<Note, "title" | "content" | "tag">;

export async function createNote(noteData: NoteData) {
  const { data } = await nextServer.post<Note>("/notes", noteData);
  return data;
}

export async function fetchNoteById(id: string) {
  const { data } = await nextServer.get<Note>(`/notes/${id}`);
  return data;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>("/auth/register", data);
  return res.data;
};

export interface LoginRequest {
  email: string;
  password: string;
}

export async function login(data: LoginRequest): Promise<User> {
  const res = await nextServer.post<User>("/auth/login", data);
  return res.data;
}

export async function logout() {
  const res = await nextServer.post("/auth/logout");
  return res.data;
}

interface checkSessionRequest {
  success: boolean;
}
export async function checkSession() {
  const res = await nextServer.get<checkSessionRequest>("/auth/session");
  return res.data;
}

export async function getMe(): Promise<User> {
  const res = await nextServer.get<User>("/users/me");
  return res.data;
}

export async function updateMe(data: Pick<User, "username">): Promise<User> {
  const res = await nextServer.patch<User>("/users/me", data);
  return res.data;
}
