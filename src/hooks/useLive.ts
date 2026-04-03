import { useQuery } from "react-query";
import { GET_LIVE_QUERY } from "../constants/keys";
import { getLiveDetails } from "../sanity/requests/live";
import { LiveResponse, YTVideo } from "../types/live";

async function fetchLiveData(): Promise<LiveResponse> {
  try {
    const res = await fetch("/api/youtube-live");
    if (res.ok) {
      const yt = await res.json();
      if (yt?.videoId) {
        return {
          youtubeId: yt.videoId,
          isLive: yt.isLive,
          startDateTime: yt.isLive
            ? new Date(Date.now() - 60_000)
            : yt.scheduledStartTime
            ? new Date(yt.scheduledStartTime)
            : new Date(),
        };
      }
    }
  } catch {
    // Fall through to Sanity
  }

  // Sanity fallback — treat as not live since it's manually managed
  const sanity = await getLiveDetails();
  return { ...sanity, isLive: false };
}

async function fetchRecentVideos(): Promise<YTVideo[]> {
  try {
    const res = await fetch("/api/youtube-videos");
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export const useGetLiveDetails = () => {
  return useQuery<LiveResponse>([GET_LIVE_QUERY], fetchLiveData, {
    refetchOnWindowFocus: false,
    refetchInterval: 5 * 60 * 1000,
  });
};

export const useGetRecentVideos = () => {
  return useQuery<YTVideo[]>(["youtube-videos"], fetchRecentVideos, {
    refetchOnWindowFocus: false,
    staleTime: 2 * 60 * 60 * 1000, // treat as fresh for 2 hours
  });
};
