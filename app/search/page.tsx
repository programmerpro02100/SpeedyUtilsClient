import React from 'react'
import SearchQuery from '../components/SearchQuery/SearchQuery'
import genMetadata from '../components/MetaTags';
import Navigbar from '../components/general/Navigbar/Navigbar';
import Footer from '../components/general/Footer/Footer';
import { getCachedTools } from '@/utils/BuildCache';

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const q = (await searchParams).q?.trim().toLowerCase() || "";
  if(q){

  const title = q
    ? `Search results for "${q}" - Speedy Utils`
    : "Search Tools - Speedy Utils";

  const description = q
    ? `Explore tools related to "${q}" on SpeedyUtils. Find the most relevant utilities to simplify your tasks.`
    : "Browse and search from a wide variety of free online tools available on SpeedyUtils.";

  const keywords = q
    ? `${q}, tool search, speedyutils, find tools, search tools`
    : "search tools, find utilities, tool list, speedy utils";

  return genMetadata({
    title,
    description,
    keywords,
    canonicalUrl: `https://www.speedyutils.com/search?q=${encodeURIComponent(q)}`,
  });
}
else{
  return genMetadata({
    canonicalUrl: "https://www.speedyutils.com/search"
  })
}
}

export default async function SearchPage() {
    const tools = await getCachedTools();
  
  return (
    <>
     <Navigbar />
     <SearchQuery tools={tools}/>
     <Footer />
    </>
  )
}
