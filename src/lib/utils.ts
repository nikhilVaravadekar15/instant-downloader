import ytdl from "ytdl-core";
import { TUrl } from "@/types/types";
import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getVideoInfo({ url }: TUrl) {
  return await ytdl.getInfo(url);
}

export function scroll(id: string) {
  const section = document.getElementById(id);
  section?.scrollIntoView({ behavior: "smooth", block: "start" });
}
