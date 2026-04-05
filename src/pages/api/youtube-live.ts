import type { NextApiRequest, NextApiResponse } from "next";

const API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;

/** Returns the appropriate cache TTL (ms) based on the current time.
 *
 *  Sunday 12:30–13:30 CET/CEST → 2 min  (service window — detect "going live" quickly)
 *  All other Sunday times       → 30 min (still a service day; stay reasonably fresh)
 *  Mon–Sat                      → 60 min (conserve the 10,000-unit daily YouTube API quota)
 *
 *  Uses the "Europe/Berlin" IANA timezone so DST transitions (CET↔CEST) are handled
 *  automatically by the runtime — no manual offset arithmetic needed.
 */
function getCacheTtl(now = new Date()): number {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Berlin",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).formatToParts(now);

  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  const weekday = get("weekday");           // "Sun", "Mon", …
  const totalMinutes = parseInt(get("hour"), 10) * 60 + parseInt(get("minute"), 10);

  if (weekday !== "Sun") return 60 * 60 * 1000; // Mon–Sat: 60 min

  const inServiceWindow =
    totalMinutes >= 12 * 60 + 30 &&   // 12:30
    totalMinutes < 13 * 60 + 30;      // 13:30

  return inServiceWindow ? 2 * 60 * 1000 : 30 * 60 * 1000;
}

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
  eventType: "live" | "upcoming",
  referer: string
): Promise<string | null> {
  const url = new URL("https://www.googleapis.com/youtube/v3/search");
  url.searchParams.set("part", "snippet");
  url.searchParams.set("channelId", CHANNEL_ID!);
  url.searchParams.set("eventType", eventType);
  url.searchParams.set("type", "video");
  url.searchParams.set("maxResults", "1");
  url.searchParams.set("key", API_KEY!);

  const res = await fetch(url.toString(), { headers: { Referer: referer } });
  if (!res.ok) return null;
  const data = await res.json();
  return (data.items?.[0]?.id?.videoId as string) ?? null;
}

async function getScheduledStartTime(videoId: string, referer: string): Promise<string | null> {
  const url = new URL("https://www.googleapis.com/youtube/v3/videos");
  url.searchParams.set("part", "liveStreamingDetails");
  url.searchParams.set("id", videoId);
  url.searchParams.set("key", API_KEY!);

  const res = await fetch(url.toString(), { headers: { Referer: referer } });
  if (!res.ok) return null;
  const data = await res.json();
  return (
    (data.items?.[0]?.liveStreamingDetails?.scheduledStartTime as string) ??
    null
  );
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!API_KEY || !CHANNEL_ID) {
    return res.status(503).json({ error: "YouTube API not configured" });
  }

  // Serve from in-memory cache if still fresh.
  // TTL is evaluated at request time so that entering the service window automatically
  // shortens the effective cache age and triggers a fresh fetch when needed.
  const cacheTtl = getCacheTtl();
  if (_cache && Date.now() - _cache.ts < cacheTtl) {
    const sMaxAge = Math.round((cacheTtl - (Date.now() - _cache.ts)) / 1000);
    res.setHeader("Cache-Control", `s-maxage=${sMaxAge}, stale-while-revalidate=30`);
    return res.json(_cache.data);
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? `https://${req.headers.host}`;

  try {
    // 1. Is there a stream live right now?
    const liveVideoId = await searchBroadcast("live", siteUrl);
    if (liveVideoId) {
      const result: YTLiveResult = {
        videoId: liveVideoId,
        scheduledStartTime: null,
        isLive: true,
      };
      _cache = { data: result, ts: Date.now() };
      res.setHeader("Cache-Control", `s-maxage=${cacheTtl / 1000}, stale-while-revalidate=30`);
      return res.json(result);
    }

    // 2. Is there an upcoming scheduled stream?
    const upcomingVideoId = await searchBroadcast("upcoming", siteUrl);
    if (upcomingVideoId) {
      const scheduledStartTime = await getScheduledStartTime(upcomingVideoId, siteUrl);
      const result: YTLiveResult = {
        videoId: upcomingVideoId,
        scheduledStartTime,
        isLive: false,
      };
      _cache = { data: result, ts: Date.now() };
      res.setHeader("Cache-Control", `s-maxage=${cacheTtl / 1000}, stale-while-revalidate=30`);
      return res.json(result);
    }

    // Nothing found — hook will fall back to Sanity
    _cache = { data: null, ts: Date.now() };
    res.setHeader("Cache-Control", `s-maxage=${cacheTtl / 1000}, stale-while-revalidate=30`);
    return res.json(null);
  } catch {
    return res.status(500).json({ error: "Failed to fetch from YouTube" });
  }
}
