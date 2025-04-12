import { ToolType } from "@/interfaces";
import { getCachedTools } from "./BuildCache";

export async function getRecommendedTools(
  currentTool: ToolType
){
  const num = 6
  const allTools: ToolType[] = await getCachedTools()
  const otherTools = allTools.filter(tool => tool._id !== currentTool._id);

  const sameTypeTools = otherTools.filter(tool => tool.type === currentTool.type);

  if (sameTypeTools.length >= num) {
    return sameTypeTools.slice(0, num);
  }

  const differentTypeTools = otherTools.filter(tool => tool.type !== currentTool.type);
  const remainingSlots = num - sameTypeTools.length;

  return [...sameTypeTools, ...differentTypeTools.slice(0, remainingSlots)];
}
