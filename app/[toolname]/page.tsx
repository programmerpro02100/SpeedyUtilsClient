import genMetadata from "@/app/components/MetaTags";
import { getCachedTools } from "@/utils/BuildCache";
import Tool from "./Tools";

export const revalidate = 86400;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ toolname: string }>;
}) {
  const toolname = (await params).toolname;
  const tools = await getCachedTools();
  const tool = tools.find((tool) => tool.name === toolname)!;

  return genMetadata({
    title: tool.title,
    description: tool.metaDescription,
    keywords: tool.metaKeywords,
    canonicalUrl: `https://www.speedyutils.com/${tool.name}`
  });
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ toolname: string }>;
}) {
  const { toolname } = await params;
  const tools = await getCachedTools();
  const tool = tools.find((tool) => tool.name === toolname)!;

  return(
   <>
    <Tool tool={tool} />
  </>
  )
}

export async function generateStaticParams() {
  const tools = await getCachedTools();
  return tools.map((tool) => ({toolname: tool.name }));
}
