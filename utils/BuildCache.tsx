import { ToolType } from "@/interfaces";
import { ApiFetch } from "./ApiFetch";

let toolsCache: ToolType[] | null = null;
let toolsPromise: Promise<ToolType[]> | null = null;

export async function getCachedTools(): Promise<ToolType[]> {
  if (toolsCache) return toolsCache;
  if (toolsPromise) return toolsPromise;

  toolsPromise = ApiFetch(`/get-all-tools`)
    .then(async (res) => {
      if (!res.ok) return [];
      const data: ToolType[] = await res.json();
      toolsCache = data ?? [];
      return toolsCache;
    })
    .catch((err) => {
      console.error("Failed to fetch tools:", err);
      toolsCache = []; // avoid future refetch attempts after failure
      return [];
    });

  return toolsPromise;
}
