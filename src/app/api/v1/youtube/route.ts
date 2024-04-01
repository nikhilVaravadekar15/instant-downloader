import { TUrl } from "@/types/types";
import { NextRequest, NextResponse } from "next/server";
import { getVideoInfo } from "@/lib/utils";
import ytdl from "ytdl-core";

export async function POST(
  nextRequest: NextRequest,
  nextResponse: NextResponse
) {
  try {
    let { url }: TUrl = await nextRequest.json();

    const data = await getVideoInfo({ url });

    const formats: ytdl.videoFormat[] = data.formats;
    const videos: ytdl.videoFormat[] = await Promise.all(
      formats.filter((format, index) => {
        return format.hasVideo && format.hasAudio;
      })
    );
    const audios: ytdl.videoFormat[] = await Promise.all(
      formats.filter((format, index) => {
        return format.hasAudio && !format.hasVideo;
      })
    );

    return new Response(
      JSON.stringify({
        videoDetails: data.videoDetails as ytdl.MoreVideoDetails,
        videos: videos,
        audios: audios,
      }),
      {
        status: 200,
      }
    );
  } catch (error: any) {
    console.error(error);
    return new Response(
      JSON.stringify({
        message: error.message
          ? error.message
          : "Something went wrong, please try again.",
      }),
      {
        status: error.cause ? parseInt(error.cause) : 500,
      }
    );
  }
}
