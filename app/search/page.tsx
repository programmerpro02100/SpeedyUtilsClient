// app/search/page.tsx
import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import genMetadata from "../components/MetaTags";
import Navigbar from "../components/general/Navigbar/Navigbar";
import Footer from "../components/general/Footer/Footer";
import { getCachedTools } from "@/utils/BuildCache";

// Dynamically import SearchQuery to make sure it's treated as a client component
const SearchQuery = dynamic(() => import("../components/SearchQuery/SearchQuery"), {
  ssr: false,
});

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const q = (await searchParams).q?.trim().toLowerCase() || "";

  if (q) {
    const title = `Search results for "${q}" - Speedy Utils`;
    const description = `Explore tools related to "${q}" on SpeedyUtils. Find the most relevant utilities to simplify your tasks.`;
    const keywords = `${q}, tool search, speedyutils, find tools, search tools`;

    return genMetadata({
      title,
      description,
      keywords,
      canonicalUrl: `https://www.speedyutils.com/search?q=${encodeURIComponent(q)}`,
    });
  } else {
    return genMetadata({
      canonicalUrl: "https://www.speedyutils.com/search",
    });
  }
}

export default async function SearchPage() {
  const tools = await getCachedTools();

  return (
    <>
      <Navigbar />
      <Suspense fallback={<div className="text-center py-4">Loading search results...</div>}>
        <SearchQuery tools={tools} />
      </Suspense>
      <Footer />
    </>
  );
}
