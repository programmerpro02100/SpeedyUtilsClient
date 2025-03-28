import { notFound } from "next/navigation";
import Tool from "./Tools"; // Import the client component
import { ApiFetch } from "@/utils/ApiFetch";
import { ToolType } from "@/interfaces";
import genMetadata from "@/app/components/MetaTags";

export async function generateMetadata({
  params,
}: {
  params: Promise<{type: string, toolname: string}>
}) {
  const toolname =( await params).toolname;
  const res = await ApiFetch(`/get-tool/${toolname}`);
  
  if (!res.ok) {
    return {};
  }

  const tool = await res.json();

  return genMetadata(tool.title, tool.metaDescription, tool.metaKeywords);
}

// ✅ Fetch Tool Data in a Server Component
export default async function ToolPage({ params }: {params : Promise<{type: string, toolname: string}>}) {
  const { toolname } = await params;
  const res = await ApiFetch(`/get-tool/${toolname}`);
  if (!res.ok){
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
  const res = await ApiFetch("/get-all-tools");
  if (!res.ok) return [];

  const tools = await res.json();

  return tools;
}
