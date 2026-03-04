import NoteForm from "@/components/NoteForm/NoteForm";
import css from "../../../../app/page.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create New Note",
  description: "Create your note in NoteHub",
  openGraph: {
    title: "Create New Note",
    description: "Create your note in NoteHub",
    url: "https://08-zustand-a6039qs4i-denys-projects-ef9bd61b.vercel.app/notes/action/create",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
