import Navigbar from "./components/general/Navigbar/Navigbar";
import Banner from "./components/home/Banner/Banner";
import Toolbox from "./components/home/Toolbox/Toolbox";
import Features from "./components/home/Features/Features";
import Footer from "./components/general/Footer/Footer";
import genMetadata from "./components/MetaTags";
import { ToolType } from "@/interfaces";
import { getCachedTools } from "@/utils/BuildCache";

export function generateMetadata(){
  return genMetadata({
    searchUrlTemplate: "https://www.speedyutils.com/site/search?q=",
  });
}

// ✅ Fetch Data in a Server Component
export default async function Homepage() {
  const toolsData: ToolType[] = await getCachedTools();

  return (
    <>
      <Navigbar />
      <Banner />
      <Toolbox toolsData={toolsData} />
      <Features />
      <Footer />
    </>
  );
}
