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
      </Head>
      <EventsHero />
      <EventsInfo />
    </>
  );
}
