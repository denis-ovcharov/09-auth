import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api/clientApi";
import { NoteTag } from "@/types/note";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{
    slug?: string[];
  }>;
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tag = (slug?.[0] ?? "all") as NoteTag;

  return {
    title: `NoteHub | Notes filtered by ${tag}`,
    description: `Browse notes filtered by tag: ${tag}`,
    openGraph: {
      title: `NoteHub | Notes filtered by ${tag}`,
      description: `Browse notes filtered by tag: ${tag}`,
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
}

export default async function Notes({ searchParams, params }: PageProps) {
  const { slug } = await params;
  const tag = (slug?.[0] ?? "all") as NoteTag;

  const resolvedSearch = await searchParams;

  const query = resolvedSearch?.query ?? "";
  const page = Number(resolvedSearch?.page ?? 1);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", query, page, 12, tag],
    queryFn: () => fetchNotes(query, page, 12, tag),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
