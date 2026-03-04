"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import css from "./NoteForm.module.css";
import { createNote } from "../../lib/api";

import { useRouter } from "next/navigation";
import { NoteData } from "@/lib/api";
import { useNoteDraftStore } from "@/lib/store/noteStore";

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const { mutate, isPending } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      clearDraft();
      router.push("/notes/filter/all");
    },
  });

  const handleChange = (event: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);

    setDraft({
      title: String(formData.get("title") ?? ""),
      content: String(formData.get("content") ?? ""),
      tag: String(formData.get("tag") ?? "Todo") as NoteData["tag"],
    });
  };

  const handleSubmit = (formData: FormData) => {
    const values = Object.fromEntries(formData) as NoteData;
    mutate(values);
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <form className={css.form} action={handleSubmit} onChange={handleChange}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          className={css.input}
          minLength={3}
          maxLength={50}
          defaultValue={draft.title}
          required
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          maxLength={500}
          className={css.textarea}
          defaultValue={draft.content}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          defaultValue={draft.tag}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button type="submit" className={css.submitButton} disabled={isPending}>
          {isPending ? "Creating..." : "Create note"}
        </button>
        <button
          type="button"
          className={css.cancelButton}
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
