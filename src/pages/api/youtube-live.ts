import type { NextApiRequest, NextApiResponse } from "next";

const API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;

/** Cache TTL: 30 minutes. Balances freshness against the 10,000-unit daily quota.
 *  search.list = 100 units, videos.list = 1 unit — so ~101 units per full lookup.
 *  At 30-min TTL → max ~48 lookups/day → ~4,900 units/day, well within the free tier.
 */
const CACHE_TTL = 30 * 60 * 1000;

// Best-effort in-memory cache. Resets on cold starts in serverless environments;
// the s-maxage HTTP header provides a CDN-level cache as a second layer.
let _cache: { data: YTLiveResult | null; ts: number } | null = null;

export type YTLiveResult = {
  videoId: string;
  /** ISO 8601 scheduled start time — null when the stream is already live */
  scheduledStartTime: string | null;
  isLive: boolean;
};

async function searchBroadcast(
  eventType: "live" | "upcoming"
): Promise<string | null> {
  const url = new URL("https://www.googleapis.com/youtube/v3/search");
  url.searchParams.set("part", "snippet");
  url.searchParams.set("channelId", CHANNEL_ID!);
  url.searchParams.set("eventType", eventType);
  url.searchParams.set("type", "video");
  url.searchParams.set("maxResults", "1");
  url.searchParams.set("key", API_KEY!);

  const res = await fetch(url.toString());
  if (!res.ok) return null;
  const data = await res.json();
  return (data.items?.[0]?.id?.videoId as string) ?? null;
}

async function getScheduledStartTime(videoId: string): Promise<string | null> {
  const url = new URL("https://www.googleapis.com/youtube/v3/videos");
  url.searchParams.set("part", "liveStreamingDetails");
  url.searchParams.set("id", videoId);
  url.searchParams.set("key", API_KEY!);

  const res = await fetch(url.toString());
  if (!res.ok) return null;
  const data = await res.json();
  return (
    (data.items?.[0]?.liveStreamingDetails?.scheduledStartTime as string) ??
    null
  );
}

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  if (!API_KEY || !CHANNEL_ID) {
    return res.status(503).json({ error: "YouTube API not configured" });
  }

  // Serve from in-memory cache if still fresh
  if (_cache && Date.now() - _cache.ts < CACHE_TTL) {
    res.setHeader("Cache-Control", "s-maxage=1800, stale-while-revalidate=60");
    return res.json(_cache.data);
  }

  try {
    // 1. Is there a stream live right now?
    const liveVideoId = await searchBroadcast("live");
    if (liveVideoId) {
      const result: YTLiveResult = {
        videoId: liveVideoId,
        scheduledStartTime: null,
        isLive: true,
      };
      _cache = { data: result, ts: Date.now() };
      res.setHeader("Cache-Control", "s-maxage=1800, stale-while-revalidate=60");
      return res.json(result);
    }

    // 2. Is there an upcoming scheduled stream?
    const upcomingVideoId = await searchBroadcast("upcoming");
    if (upcomingVideoId) {
      const scheduledStartTime = await getScheduledStartTime(upcomingVideoId);
      const result: YTLiveResult = {
        videoId: upcomingVideoId,
        scheduledStartTime,
        isLive: false,
      };
      _cache = { data: result, ts: Date.now() };
      res.setHeader("Cache-Control", "s-maxage=1800, stale-while-revalidate=60");
      return res.json(result);
    }

    // Nothing found — hook will fall back to Sanity
    _cache = { data: null, ts: Date.now() };
    res.setHeader("Cache-Control", "s-maxage=1800, stale-while-revalidate=60");
    return res.json(null);
  } catch {
    return res.status(500).json({ error: "Failed to fetch from YouTube" });
  }
}
