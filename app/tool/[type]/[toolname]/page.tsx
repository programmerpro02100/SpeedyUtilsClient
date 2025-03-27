import { notFound } from "next/navigation";
import Tool from "./Tools"; // Import the client component
import { ApiFetch } from "@/utils/ApiFetch";
import MetaTags from "@/app/components/MetaTags";
import { ToolType } from "@/interfaces";


// ✅ Fetch Tool Data in a Server Component
export default async function ToolPage({ params }: {params : Promise<{type: string, toolname: string}>}) {
  const { toolname } = await params;
  console.log(params)
  const res = await ApiFetch(`/get-tool/${toolname}`);
  if (!res.ok){
    return notFound(); // Show 404 error page
  }

  const tool: ToolType = await res.json();

  return (
    <>
      <MetaTags title={tool.title} description={tool.metaDescription} keywords={tool.metaKeywords} />
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
