import genMetadata from "@/app/components/MetaTags";
import { getCachedTools } from "@/utils/BuildCache";
import Tool from "./Tools";
import JsonLd from "@/app/components/jsonLd";

export const revalidate = 86400;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ type: string; toolname: string }>;
}) {
  const toolname = (await params).toolname;
  const tools = await getCachedTools();
  const tool = tools.find((tool) => tool.name === toolname)!;

  return genMetadata({
    title: tool.title,
    description: tool.metaDescription,
    keywords: tool.metaKeywords,
  });
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ type: string; toolname: string }>;
}) {
  const { toolname } = await params;
  const tools = await getCachedTools();
  const tool = tools.find((tool) => tool.name === toolname)!;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.title,
    operatingSystem: "All",
    applicationCategory: "Utility",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
    },
  };

  return(
   <>
    <JsonLd jsonLd={jsonLd} />
    <Tool tool={tool} />;
  </>
  )
}

export async function generateStaticParams() {
  const tools = await getCachedTools();
  return tools.map((tool) => ({ type: tool.type, toolname: tool.name }));
}
