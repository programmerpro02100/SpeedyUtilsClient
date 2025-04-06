import Tool from "./Tools"; // Client component
import toolComponentMap from "@/app/components/tools/toolComponentMap";
import genMetadata from "@/app/components/MetaTags";
import { getCachedTools } from "@/utils/BuildCache";
import { notFound } from "next/navigation";
import { toPascalCase } from "@/utils/Format";

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
    isToolPage: true,
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

  const ToolComponent = toolComponentMap[toPascalCase(tool.name)];
  if (!ToolComponent) return notFound()

  return <Tool tool={tool} ToolComponent={ToolComponent} />;
}

export async function generateStaticParams() {
  const tools = await getCachedTools();
  return tools.map((tool) => ({ type: tool.type, toolname: tool.name }));
}
