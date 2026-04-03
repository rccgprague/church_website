import type { NextApiRequest, NextApiResponse } from "next";
import { YTVideo } from "@/src/types/live";

const API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;

// Cache for 2 hours — video lists change infrequently
const CACHE_TTL = 2 * 60 * 60 * 1000;

let _cache: { data: YTVideo[]; ts: number } | null = null;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!API_KEY || !CHANNEL_ID) {
    return res.status(503).json({ error: "YouTube API not configured" });
  }

  if (_cache && Date.now() - _cache.ts < CACHE_TTL) {
    res.setHeader("Cache-Control", "s-maxage=7200, stale-while-revalidate=300");
    return res.json(_cache.data);
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? `https://${req.headers.host}`;
  const headers = { Referer: siteUrl };

  try {
    // Step 1: get the channel's uploads playlist ID (1 quota unit)
    const channelUrl = new URL("https://www.googleapis.com/youtube/v3/channels");
    channelUrl.searchParams.set("part", "contentDetails");
    channelUrl.searchParams.set("id", CHANNEL_ID!);
    channelUrl.searchParams.set("key", API_KEY!);

    const channelRes = await fetch(channelUrl.toString(), { headers });
    if (!channelRes.ok) {
      const detail = await channelRes.text();
      return res.status(502).json({ error: "Failed to fetch channel details", status: channelRes.status, detail });
    }
    const channelData = await channelRes.json();
    const uploadsPlaylistId: string =
      channelData.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
    if (!uploadsPlaylistId) {
      return res.status(502).json({ error: "Could not find uploads playlist for channel" });
    }

    // Step 2: fetch the 6 most recent uploads from the playlist (1 quota unit)
    const playlistUrl = new URL("https://www.googleapis.com/youtube/v3/playlistItems");
    playlistUrl.searchParams.set("part", "snippet");
    playlistUrl.searchParams.set("playlistId", uploadsPlaylistId);
    playlistUrl.searchParams.set("maxResults", "6");
    playlistUrl.searchParams.set("key", API_KEY!);

    const playlistRes = await fetch(playlistUrl.toString(), { headers });
    if (!playlistRes.ok) {
      const detail = await playlistRes.text();
      return res.status(502).json({ error: "Failed to fetch playlist items", status: playlistRes.status, detail });
    }
    const playlistData = await playlistRes.json();

    const videos: YTVideo[] = (playlistData.items ?? []).map((item: any) => ({
      videoId: item.snippet.resourceId.videoId,
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
