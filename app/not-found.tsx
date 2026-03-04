import { Metadata } from "next";
import css from "./page.module.css";

export const metadata: Metadata = {
  title: "NoteHub",
  description: "Sorry, the page you are looking for does not exist.",
  openGraph: {
    title: "NoteHub",
    description: "Created by Denys Ovcharov",
    url: "/",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
};

const NotFound = () => {
  return (
    <>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </>
  );
};

export default NotFound;
