import { useRouter } from "next/router";
import { GET_EVENTS_QUERY, GET_EVENT_DETAIL_QUERY } from "../constants/keys";
import { EventsResponse } from "../types/events";
import { useQuery } from "react-query";
import { getEvents, getEventDetail } from "../sanity/requests/event";

export const useGetEvents = (
  initialData?: EventsResponse[],
  serverLocale?: string
) => {
  const { locale } = useRouter();
  return useQuery<EventsResponse[]>(
    [GET_EVENTS_QUERY],
    async () => await getEvents({ language: locale ?? "" }),
    {
      refetchOnWindowFocus: false,
      enabled: Boolean(serverLocale ?? locale),
      initialData,
    }
  );
};

export const useGetEventDetail = (slug?: string) => {
  const { locale } = useRouter();
  return useQuery<EventsResponse[]>(
    [GET_EVENT_DETAIL_QUERY],
    async () =>
      await getEventDetail({
        language: locale ?? "",
        slug: slug ?? "",
      }),
    { refetchOnWindowFocus: false, enabled: Boolean(slug && locale) }
  );
};
