import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api/serverApi";
import NoteDetailsClient from "./NoteDetails.client";
import { Metadata } from "next";

type NoteDetailsProps = {
  params: Promise<{ id: string }>;
};
export async function generateMetadata({
  params,
}: NoteDetailsProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const note = await fetchNoteById(id);
    return {
      title: `Note: ${note.title}`,
      description: note.content.slice(0, 160),
      openGraph: {
        title: `Note: ${note.title}`,
        description: note.content.slice(0, 100),
        url: `https://notehub.com/notes/${id}`,
        siteName: "NoteHub",
        images: [
          {
            url: "https://ac.goit.global/fullstack/react/og-meta.jpg",
            width: 1200,
            height: 630,
            alt: note.title,
          },
        ],
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: note.title,
        description: note.content.slice(0, 160),
        images: ["https://ac.goit.global/fullstack/react/og-meta.jpg"],
      },
    };
  } catch {
    return {
      title: "Note not found",
      description: "This note does not exist.",
    };
  }
}
const NoteDetails = async ({ params }: NoteDetailsProps) => {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
};

export default NoteDetails;
