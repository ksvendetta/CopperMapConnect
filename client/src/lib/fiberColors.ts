import { type PairColor } from "@shared/schema";

// Helper function to get CSS variable name for a pair color
export function getPairColorVariable(tip: string, ring: string): string {
  // For visualization, we primarily use the ring color (more distinctive)
  const colorMap: Record<string, string> = {
    blue: "pair-blue",
    orange: "pair-orange",
    green: "pair-green",
    brown: "pair-brown",
    slate: "pair-slate",
    white: "pair-white",
    red: "pair-red",
    black: "pair-black",
    yellow: "pair-yellow",
    violet: "pair-violet",
  };
  return colorMap[ring] || "pair-blue";
}
