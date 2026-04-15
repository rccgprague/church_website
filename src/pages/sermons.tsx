import Head from "next/head";
import SermonHero from "../components/sermons/SermonHero";
import SermonInfo from "../components/sermons/SermonInfo";
import { useLingui } from "@lingui/react";
import { GetServerSideProps } from "next";
import { loadCatalog } from "../utils/lingui";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const translation = await loadCatalog(ctx.locale!);
  return {
    props: {
      translation,
    },
  };
};

export default function SermonsPage() {
  /**
   * This hook is needed to subscribe your
   * component for changes if you use t`` macro
   */
  useLingui();
  return (
    <>
      <Head>
        <title>Sermons - RCCG Prague Covenant Parish</title>
        <meta name="description" content="Watch and listen to sermons from RCCG Prague Covenant Parish." />
        <meta name="keywords" content="RCCG, Prague, Sermons, Church, Covenant, Parish" />
        <meta property="og:title" content="Sermons - RCCG Prague Covenant Parish" />
        <meta property="og:description" content="Watch and listen to sermons from RCCG Prague Covenant Parish." />
        <meta property="og:image" content="https://rccgprague.com/images/logo-img.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://rccgprague.com/sermons" />
        <meta property="og:site_name" content="RCCG Prague - Covenant Parish" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sermons - RCCG Prague Covenant Parish" />
        <meta name="twitter:description" content="Watch and listen to sermons from RCCG Prague Covenant Parish." />
        <meta name="twitter:image" content="https://rccgprague.com/images/logo-img.png" />
      </Head>
      <SermonHero />
      <SermonInfo />
    </>
  );
}
