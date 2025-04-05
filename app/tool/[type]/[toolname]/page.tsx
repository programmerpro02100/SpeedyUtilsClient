import Tool from "./Tools"; // Import the client component
import genMetadata from "@/app/components/MetaTags";
import { getCachedTools } from "@/utils/BuildCache";

export const revalidate = 86400; // 24 hours in seconds
export async function generateMetadata({
  params,
}: {
  params: Promise<{ type: string, toolname: string }>
}) {
  const toolname = (await params).toolname;
  const tools = await getCachedTools();

  const tool = tools.find(tool => tool.name === toolname)!;

  return genMetadata({
    title: tool.title, 
    description: tool.metaDescription,
    keywords: tool.metaKeywords,
    isToolPage:true,
  });
}

// ✅ Fetch Tool Data in a Server Component
export default async function ToolPage({ params }: { params: Promise<{ type: string, toolname: string }> }) {
  const { toolname } = await params;
  const tools = await getCachedTools();
  const tool = tools.find(tool => tool.name === toolname)!;
  return (
    <>
      <Tool tool={tool} />
    </>
  );
}

// ✅ Generate Static Paths
export async function generateStaticParams() {
  const tools = await getCachedTools();

  return tools;
}
