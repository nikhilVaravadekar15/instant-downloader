import { z } from "zod";

export const formSchema = z.object({
  url: z
    .string()
    .url("Invalid url, Please try again.")
    .includes("youtube.com", {
      message: "Invalid youtube URL, Please try again.",
    }),
});
