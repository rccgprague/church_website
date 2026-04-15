import EventsDetail from "@/src/components/events/EventsDetail";
import { loadCatalog } from "@/src/utils/lingui";
import { getEventDetail } from "@/src/sanity/requests/event";
import { EventsResponse } from "@/src/types/events";
import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { GetServerSideProps } from "next";
import Head from "next/head";

const SITE_URL = "https://rccgprague.com";
const DEFAULT_OG_IMAGE = `${SITE_URL}/images/hero-bg.jpeg`;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const translation = await loadCatalog(ctx.locale!);
  const slug = ctx.params?.slug?.toString() ?? "";
  let initialEvent: EventsResponse | null = null;
  if (slug) {
    const events = await getEventDetail({ language: ctx.locale!, slug });
    initialEvent =
      (events ?? []).find((e: EventsResponse) => e.slug.current === slug) ??
      events?.[0] ??
      null;
  }
  return {
    props: {
      translation,
      initialEvent,
    },
  };
};

export default function EventDetailPage({
  initialEvent,
}: {
  initialEvent: EventsResponse | null;
}) {
  useLingui();

  const title = initialEvent?.title
    ? `${initialEvent.title} - RCCG Prague`
    : t`RCCG Prague - Event`;
  const description = initialEvent?.venue
    ? `${initialEvent.title} at ${initialEvent.venue}. Join us at RCCG Prague Covenant Parish.`
    : t`RCCG Prague, our church event`;
  const ogImage = initialEvent?.imageUrl ?? DEFAULT_OG_IMAGE;
  const ogUrl = `${SITE_URL}/events/${initialEvent?.slug?.current ?? ""}`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={t`RCCG, Prague, Event, Church`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={ogUrl} />
        <meta property="og:site_name" content="RCCG Prague - Covenant Parish" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
      </Head>
      <EventsDetail />
    </>
  );
}
