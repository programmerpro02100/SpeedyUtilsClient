import Navigbar from "./components/general/Navigbar/Navigbar";
import Banner from "./components/home/Banner/Banner";
import Toolbox from "./components/home/Toolbox/Toolbox";
import Features from "./components/home/Features/Features";
import Footer from "./components/general/Footer/Footer";
import genMetadata from "./components/MetaTags";
import { ToolType } from "@/interfaces";
import { getCachedTools } from "@/utils/BuildCache";
import JsonLd from "./components/JsonLd";

export function generateMetadata() {
  return genMetadata({});
}

// ✅ Fetch Data in a Server Component
export default async function Homepage() {
  const toolsData: ToolType[] = await getCachedTools();

  const jsonld = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": "https://www.speedyutils.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.speedyutils.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }

  return (
    <>
      <Navigbar />
      <Banner />
      <Toolbox toolsData={toolsData} />
      <Features />
      <Footer />
      <JsonLd jsonLd={jsonld}  />
    </>
  );
}
