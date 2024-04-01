import { TUrl } from "@/types/types";
import axios, { AxiosRequestConfig } from "axios";

const axiosRequestConfig: AxiosRequestConfig = {
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL!,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

export async function getData({ url }: TUrl) {
  const response = await axios.post(
    "/api/v1/youtube",
    {
      url: url,
    },
    axiosRequestConfig
  );
  return response;
}
