import { z } from "zod";
import { formSchema } from "@/zod/index";

export type TUrl = z.infer<typeof formSchema>;

export type TStep = {
  icon?: string;
  title: string;
  description: string;
};

export type TUrl = {
  url: string;
};

export type TVideoDetails = {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
  channel_url: string;
  duration: number;
  channel: string;
  timestamp: number;
  availability: string;
  original_url: string;
};

export type TAudio = {
  filesize: number;
  url: string;
  vcodec: string;
  acodec: string;
  audio_ext: string;
  video_ext: string;
};

export type TInfo = {
  videoDetails: TVideoDetails;
  audios: Array<TAudio>;
};
