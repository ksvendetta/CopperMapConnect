import { type FiberColor } from "@shared/schema";

export const fiberColorMap: Record<FiberColor, string> = {
  blue: "fiber-blue",
  orange: "fiber-orange",
  green: "fiber-green",
  brown: "fiber-brown",
  slate: "fiber-slate",
  white: "fiber-white",
  red: "fiber-red",
  black: "fiber-black",
  yellow: "fiber-yellow",
  violet: "fiber-violet",
  pink: "fiber-pink",
  aqua: "fiber-aqua",
};

export function getFiberColorClass(color: FiberColor): string {
  return fiberColorMap[color];
}
