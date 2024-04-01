import { z } from "zod";
import { formSchema } from "@/zod/index";

// export type TUrl = {
//   url: string;
// };
export type TUrl = z.infer<typeof formSchema>;

export type TStep = {
  icon?: string;
  title: string;
  description: string;
};
