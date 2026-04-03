import type { NextApiRequest, NextApiResponse } from "next";
import { YTVideo } from "@/src/types/live";

const API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;

// Cache for 2 hours — video lists change infrequently
const CACHE_TTL = 2 * 60 * 60 * 1000;

let _cache: { data: YTVideo[]; ts: number } | null = null;

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  if (!API_KEY || !CHANNEL_ID) {
    return res.status(503).json({ error: "YouTube API not configured" });
  }

  if (_cache && Date.now() - _cache.ts < CACHE_TTL) {
    res.setHeader("Cache-Control", "s-maxage=7200, stale-while-revalidate=300");
    return res.json(_cache.data);
  }

  try {
    const url = new URL("https://www.googleapis.com/youtube/v3/search");
    url.searchParams.set("part", "snippet");
    url.searchParams.set("channelId", CHANNEL_ID!);
    url.searchParams.set("type", "video");
    url.searchParams.set("order", "date");
    url.searchParams.set("maxResults", "6");
    url.searchParams.set("key", API_KEY!);

    const ytRes = await fetch(url.toString());
    if (!ytRes.ok) {
      const errBody = await ytRes.text();
      return res.status(502).json({
        error: "YouTube request failed",
        status: ytRes.status,
        detail: errBody,
      });
    }
    const data = await ytRes.json();

    const videos: YTVideo[] = (data.items ?? []).map((item: any) => ({
      videoId: item.id.videoId,
      title: item.snippet.title,
      thumbnail:
        item.snippet.thumbnails.medium?.url ??
        item.snippet.thumbnails.default?.url ??
        "",
      publishedAt: item.snippet.publishedAt,
    }));

    _cache = { data: videos, ts: Date.now() };
    res.setHeader("Cache-Control", "s-maxage=7200, stale-while-revalidate=300");
    return res.json(videos);
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch YouTube videos", detail: String(err) });
  }
}
