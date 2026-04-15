import Head from "next/head";
import EventsHero from "../../components/events/EventsHero";
import EventsInfo from "../../components/events/EventsInfo";
import { useLingui } from "@lingui/react";
import { loadCatalog } from "@/src/utils/lingui";
import { GetServerSideProps } from "next";
import { t } from "@lingui/macro";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const translation = await loadCatalog(ctx.locale!);
  return {
    props: {
      translation,
    },
  };
};

export default function EventsPage() {
  /**
   * This hook is needed to subscribe your
   * component for changes if you use t`` macro
   */
  useLingui();
  return (
    <>
      <Head>
        <title>{t`RCCG Prague - Our Events`}</title>
        <meta name="description" content={t`RCCG Prague, our church events`} />
        <meta name="keywords" content={t`RCCG, Prague, Events, Church`} />
        <meta property="og:title" content={t`RCCG Prague - Our Events`} />
        <meta property="og:description" content={t`Upcoming events at RCCG Prague Covenant Parish. Join us for worship, fellowship, and community.`} />
        <meta property="og:image" content="https://rccgprague.com/images/logo-img.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://rccgprague.com/events" />
        <meta property="og:site_name" content="RCCG Prague - Covenant Parish" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t`RCCG Prague - Our Events`} />
        <meta name="twitter:description" content={t`Upcoming events at RCCG Prague Covenant Parish. Join us for worship, fellowship, and community.`} />
        <meta name="twitter:image" content="https://rccgprague.com/images/logo-img.png" />
      </Head>
      <EventsHero />
      <EventsInfo />
    </>
  );
}
