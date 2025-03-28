import Navigbar from "./components/general/Navigbar/Navigbar";
import Banner from "./components/home/Banner/Banner";
import Toolbox from "./components/home/Toolbox/Toolbox";
import Features from "./components/home/Features/Features";
import Footer from "./components/general/Footer/Footer";
import { ApiFetch } from "@/utils/ApiFetch";
import { Tool_T} from "@/interfaces";
import genMetadata from "./components/MetaTags";

export function generateMetadata(){
  return genMetadata();
}

// ✅ Fetch Data in a Server Component
export default async function Homepage() {
  const response = await ApiFetch("/get-all-tools");
  const toolsData: Tool_T[] = await response.json();

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
