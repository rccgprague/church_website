import { useQuery } from "react-query";
import { GET_LIVE_QUERY } from "../constants/keys";
import { getLiveDetails } from "../sanity/requests/live";
import { LiveResponse } from "../types/live";

async function fetchLiveData(): Promise<LiveResponse> {
  // Try YouTube API first
  try {
    const res = await fetch("/api/youtube-live");
    if (res.ok) {
      const yt = await res.json();
      if (yt?.videoId) {
        return {
          youtubeId: yt.videoId,
          // Already live → set startDateTime in the past so isClosed = true immediately
          // Upcoming → use the scheduled start time for the countdown
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

  // Fall back to the manually configured Sanity entry
  return getLiveDetails();
}

export const useGetLiveDetails = () => {
  return useQuery<LiveResponse>([GET_LIVE_QUERY], fetchLiveData, {
    refetchOnWindowFocus: false,
    // Re-check every 5 minutes so the button appears quickly once a stream goes live
    refetchInterval: 5 * 60 * 1000,
  });
};
