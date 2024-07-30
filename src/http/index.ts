import { TUrl } from "@/types/types";
import axios, { AxiosRequestConfig } from "axios";

const baseURL: string = process.env.NEXT_PUBLIC_FAST_API_URL!;
const axiosRequestConfig: AxiosRequestConfig = {
  baseURL: baseURL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

export async function getData({ url }: TUrl) {
  const response = await axios.post(
    "/api/v1/download-music",
    {
      url: url,
    },
    axiosRequestConfig
  );
  return response;
}
