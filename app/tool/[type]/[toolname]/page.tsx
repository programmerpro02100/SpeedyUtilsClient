import { notFound } from "next/navigation";
import Tool from "./Tools"; // Import the client component
import { ApiFetch } from "@/utils/ApiFetch";
import { ToolType } from "@/interfaces";
import genMetadata from "@/app/components/MetaTags";
import { getCachedTools } from "@/utils/BuildCache";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ type: string, toolname: string }>
}) {
  const toolname = (await params).toolname;
  const tools = await getCachedTools();

  const tool = tools.find(tool => tool.name === toolname)!;

  return genMetadata(tool.title, tool.metaDescription, tool.metaKeywords);
}

// ✅ Fetch Tool Data in a Server Component
export default async function ToolPage({ params }: { params: Promise<{ type: string, toolname: string }> }) {
  const { toolname } = await params;
  const res = await ApiFetch(`/get-tool/${toolname}`);
  if (!res.ok) {
    return notFound(); // Show 404 error page
  }

  const tool: ToolType = await res.json();

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
