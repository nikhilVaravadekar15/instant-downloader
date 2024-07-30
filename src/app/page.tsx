"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getData } from "@/http";
import { formSchema } from "@/zod";
import { scroll } from "@/lib/utils";
import { Download } from "lucide-react";
import { useForm } from "react-hook-form";
import Table from "@/components/Table";
import { useMutation } from "react-query";
import Spinner from "@/components/Spinner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@hookform/error-message";
import { TAudio, TInfo, TUrl, TVideoDetails } from "@/types/types";

export default function Search() {
  const { toast } = useToast();
  const [audios, setAudios] = React.useState<Array<TAudio>>([]);
  const [videoDetails, setVideoDetails] = React.useState<TVideoDetails | null>(
    null
  );

  const { isLoading, mutate } = useMutation({
    mutationFn: async ({ url }: TUrl) => {
      const response = await getData({ url });
      return response;
    },
    onSuccess: (data) => {
      const response: TInfo = data.data;
      setVideoDetails(response.videoDetails);
      setAudios(response.audios);
      reset();
      scroll("#download-section");
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: `${error?.response?.data?.message}`,
        description:
          "We are extremely sorry for the inconvenience, Please try again later.",
      });
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
      <main className="h-[96%] w-full">
        <div className="h-full w-full gap-3 mx-auto flex flex-col items-center justify-center text-center sm:w-[640px] lg:w-[768px]">
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
              <span className="mx-2 text-red-600 sm:mx-4">youtube</span>
              audio downloader
            </h1>
          </div>
          <p className="mt-3 w-10/12 text-base text-gray-700 sm:mt-4 sm:w-full sm:text-xl lg:text-lg lg:mt-5 xl:text-xl xl:mt-6 dark:text-gray-300">
            Free online youtube to audio downloader for youtube, shorts and
            youtube-music
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
                {isLoading ? (
                  <Spinner color={"text-white"} />
                ) : (
                  <Download size={"1.5rem"} />
                )}
              </Button>
            </div>
            <div className="my-4 text-sm font-medium text-red-600 flex items-center justify-center gap-2 md:text-base">
              <ErrorMessage errors={errors} name="url" />
            </div>
          </form>
        </div>
        <div id="#download-section"></div>
        {videoDetails && audios.length > 0 && (
          <section className="w-screen h-screen flex items-center justify-center">
            <div className="w-full p-2 gap-4 mx-auto flex items-center justify-center flex-col text-center sm:p-8 sm:w-[768px] sm:flex-row sm:items-start sm:justify-around lg:w-[896px] rounded-lg shadow-md">
              <div className="w-[300px] flex flex-col items-center justify-center md:items-start">
                <Link href={videoDetails?.original_url!} target={"_blank"}>
                  <Image
                    width={256}
                    height={256}
                    alt={"thumbnail"}
                    draggable="false"
                    className="rounded-lg cursor-pointer"
                    src={videoDetails.thumbnail}
                  />
                </Link>
                <h1 className="mb-1 mt-2 text-center font-bold text-[#222] block sm:text-left dark:text-white">
                  {videoDetails.title}
                </h1>
              </div>
              <Table data={audios} />
            </div>
          </section>
        )}
      </main>
      <footer className="h-[4%] flex gap-4 items-center justify-center">
        <Link href={"key-features"} className="hover:text-blue-600">
          Key Features
        </Link>
        <Link href={"faq"} className="hover:text-blue-600">
          FAQ
        </Link>
        <Link href={"terms-and-conditions"} className="hover:text-blue-600">
          Terms and Conditions
        </Link>
      </footer>
    </>
  );
}
