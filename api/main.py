import time
import yt_dlp
from typing import Union
from typing import List
from logger import logger
from urllib.parse import urlparse
from pydantic import BaseModel, HttpUrl
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
logger.info("Starting fast api server...")

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class TVideoDetails(BaseModel):
    id: str
    title: str
    thumbnail: str
    description: str
    channel_url: str
    duration: int
    channel: str
    timestamp: int
    availability: str
    original_url: str


class TInfo(BaseModel):
    videoDetails: TVideoDetails
    audios: List[dict]


class TBaseURL(BaseModel):
    url: HttpUrl


@app.get("/api/v1/healh-check")
def read_item():
    return {"status": "healthy", "epoch_time": int(time.time())}


@app.post("/api/v1/download-music")
async def read_item(item: TBaseURL):
    required_info: TInfo = {}
    url: str = str(item.url)

    if urlparse(url=url).hostname != "www.youtube.com":
        logger.error("Invalid Url")
        raise HTTPException(
            status_code=400,
            detail="Invalid Url",
        )
    elif "list" in url:
        logger.info(f"Playlist not supported: {url}")
        url = url.split("&list")[0]
    try:
        ydl = yt_dlp.YoutubeDL({})
        complete_info = ydl.extract_info(url=url, download=False)
        logger.info(f"Extracted the complete information from url: {url}")

        required_format: List[dict] = []
        for format in complete_info["formats"]:
            if (
                "acodec" in format
                and "vcodec" in format
                and format["acodec"] != "none"
                and format["vcodec"] == "none"
            ):
                required_format.append(format)
        logger.info(f"Filtered the audio format from the complete list of formats")

        required_info = {
            "videoDetails": {
                "id": complete_info["id"],
                "title": complete_info["title"],
                "thumbnail": complete_info["thumbnail"],
                "description": complete_info["description"],
                "channel_url": complete_info["channel_url"],
                "duration": complete_info["duration"],
                "channel": complete_info["channel"],
                "timestamp": complete_info["timestamp"],
                "availability": complete_info["availability"],
                "original_url": complete_info["original_url"],
            },
            "audios": required_format,
        }
    except Exception as e:
        logger.error(e)
        raise HTTPException(
            status_code=503,
            detail=str(e),
        )

    return required_info
