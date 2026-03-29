import PageHero from "../common/PageHero";
import EventDetailContent from "./EventDetailContent";
import MoreEvents from "./MoreEvents";
import EventVideo from "./EventVideo";
import { useGetEventDetail } from "@/src/hooks/useEvents";
import { useRouter } from "next/router";
import Loader from "../common/loader/Loader";
import { useEffect, useMemo } from "react";

export default function EventsDetail() {
  const { query } = useRouter();
  const querySlug = query?.slug?.toString() ?? "";
  const {
    data,
    isLoading: isLoadingEvent,
    refetch,
  } = useGetEventDetail(querySlug);

  const eventData = useMemo(() => {
    return (data ? [...data] : [])?.find(
      (data) => data.slug.current === querySlug
    );
  }, [data, querySlug]);

  const isLoading = !eventData || isLoadingEvent;

  useEffect(() => {
    refetch();
  }, [querySlug, refetch]);

  return (
    <Loader isLoading={isLoading}>
      <PageHero
        title={eventData?.title ?? ""}
        paragraph1={eventData?.venue ?? ""}
      />
      <EventVideo
        imageUrl={eventData?.imageUrl ?? ""}
        youtubeId={eventData?.youtubeId ?? ""}
      />
      <EventDetailContent content={eventData?.body ?? []} />
      <MoreEvents />
    </Loader>
  );
}
