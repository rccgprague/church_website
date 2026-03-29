import { useQuery } from "react-query";
import { GET_LIVE_QUERY } from "../constants/keys";
import { getLiveDetails } from "../sanity/requests/live";
import { LiveResponse } from "../types/live";

export const useGetLiveDetails = () => {
  return useQuery<LiveResponse>(
    [GET_LIVE_QUERY],
    async () => await getLiveDetails(),
    { refetchOnWindowFocus: false }
  );
};
