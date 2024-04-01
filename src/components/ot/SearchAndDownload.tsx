"use client";

import React from "react";
import ytdl from "ytdl-core";
import Link from "next/link";
import Image from "next/image";
import { getData } from "@/http";
import { formSchema } from "@/zod";
import { TUrl } from "@/types/types";
import { scroll } from "@/lib/utils";
import { useForm } from "react-hook-form";
import Table from "@/components/ot/Table";
import { useMutation } from "react-query";
import Spinner from "@/components/Spinner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@hookform/error-message";
import { AudioLines, Clapperboard, Download } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Search() {
  const { toast } = useToast();
  const [videoDetails, setVideoDetails] =
    React.useState<ytdl.MoreVideoDetails>();
  const [videos, setVideos] = React.useState<ytdl.videoFormat[]>([]);
  const [audios, setAudios] = React.useState<ytdl.videoFormat[]>([]);

  const { isLoading, mutate } = useMutation({
    mutationFn: async ({ url }: TUrl) => {
      console.log(url);
      const response = await getData({ url });
      return response;
    },
    onSuccess: (data) => {
      const response = data.data;
      setVideoDetails(response.videoDetails);
      setVideos(response.videos);
      setAudios(response.audios);
      reset();
      scroll("#download-section");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TUrl>({
    resolver: zodResolver(formSchema),
  });
  return (
    <>
      <div className="h-screen w-full gap-3 mx-auto flex flex-col items-center justify-center text-center sm:w-[640px] lg:w-[768px]">
        <div className="relative">
          <Image
            src={"guide-sparkle-left.svg"}
            alt="left-sparkle"
            width={64}
            height={64}
            draggable={false}
            className="absolute -top-8 -left-10 md:-top-12 md:-left-12"
          />
          <Image
            src={"guide-sparkle-right.svg"}
            alt="left-sparkle"
            width={64}
            height={64}
            draggable={false}
            className="absolute -top-8 -right-8 md:-top-12 md:-right-12"
          />
          <h1 className="text-2xl text-clip font-black sm:text-3xl lg:text-5xl xl:text-6xl">
            Online
            <span className="mx-2 text-blue-600 sm:mx-4">free</span>
            and
            <span className="mx-2 text-blue-600 sm:mx-4">instant</span>
            <br />
            video downloader
          </h1>
        </div>
        <p className="mt-3 w-10/12 text-base text-gray-700 sm:mt-4 sm:w-full sm:text-xl lg:text-lg lg:mt-5 xl:text-xl xl:mt-6 dark:text-gray-300">
          Free online video downloader for youtube, shorts and youtube-music
        </p>
        <form
          className="w-11/12 mt-4 md:w-5/6"
          onSubmit={handleSubmit((data: TUrl) => {
            mutate(data);
          })}
        >
          <div className="relative border rounded-3xl border-gray-300 focus-within:border-blue-400 dark:bg-gray-50">
            <Input
              type="url"
              autoComplete="off"
              placeholder="Search"
              disabled={isLoading}
              {...register("url", { required: true })}
              className="block w-full p-6 border-none outline-none bg-transparent focus-visible:outline-none focus-visible:border-none focus-visible:ring-0 focus-visible:ring-offset-0 dark:text-black"
            />
            <Button
              type="submit"
              disabled={isLoading}
              className="text-white absolute right-1 bottom-1 bg-blue-600 hover:bg-blue-700 font-medium rounded-3xl text-sm p-5"
            >
              {isLoading ? <Spinner /> : <Download size={"1.5rem"} />}
            </Button>
          </div>
          <div className="my-4 text-sm font-medium text-red-600 flex items-center justify-center gap-2 md:text-base">
            <ErrorMessage errors={errors} name="url" />
          </div>
        </form>
      </div>
      <div id="#download-section"></div>
      {videoDetails && videos.length > 0 && audios.length > 0 && (
        <section className="w-screen h-screen flex items-center justify-center">
          <div className="w-full p-2 gap-4 mx-auto flex items-center justify-center flex-col text-center sm:p-8 sm:w-[768px] sm:flex-row sm:items-start sm:justify-around lg:w-[896px] rounded-lg shadow-md">
            <div className="w-[300px] sm:flex sm:flex-col sm:items-center sm:justify-center">
              <Link
                href={`${videoDetails.video_url}`}
                className="flex items-center justify-center"
                target={"_blank"}
              >
                <Image
                  width={256}
                  height={256}
                  alt={"thumbnail"}
                  draggable="false"
                  className="rounded-lg cursor-pointer"
                  src={`${
                    videoDetails.thumbnails.sort((a, b) => a.height - b.height)[
                      videoDetails.thumbnails.length - 1
                    ].url
                  }`}
                />
              </Link>
              <h1 className="mb-1 mt-2 text-center font-bold text-[#222] block sm:text-left dark:text-white">
                {videoDetails.title}
              </h1>
            </div>
            <Tabs
              defaultValue="video"
              className="w-full p-1 rounded-lg border sm:w-10/12 sm:p-2"
            >
              <TabsList className="h-14 w-full rounded-full">
                <TabsTrigger
                  className="w-full py-3 rounded-full data-[state=active]:border data-[state=active]:border-blue-500"
                  value="video"
                >
                  <>
                    <Clapperboard className="w-6 h-6" />
                    Video
                  </>
                </TabsTrigger>
                <TabsTrigger
                  className="w-full py-3 rounded-full data-[state=active]:border data-[state=active]:border-blue-500"
                  value="audio"
                >
                  <>
                    <AudioLines className="w-6 h-6" />
                    Audio
                  </>
                </TabsTrigger>
              </TabsList>
              <TabsContent value="video" className="my-4">
                <Table type="video" data={videos} />
              </TabsContent>
              <TabsContent value="audio" className="my-4">
                <Table type="audio" data={audios} />
              </TabsContent>
            </Tabs>
          </div>
        </section>
      )}
    </>
  );
}
