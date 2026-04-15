import Head from "next/head";
import AboutHero from "../components/about/AboutHero";
import AboutStory from "../components/about/AboutStory";
import { t } from "@lingui/macro";
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

export default function About() {
  /**
   * This hook is needed to subscribe your
   * component for changes if you use t`` macro
   */
  useLingui();
  return (
    <>
      <Head>
        <title>{t`RCCG Prague - About us`}</title>
        <meta
          name="description"
          content="RCCG Prague, more information about us"
        />
        <meta
          name="keywords"
          content="RCCG, Prague, About, Church, information"
        />
        <meta property="og:title" content={t`RCCG Prague - About us`} />
        <meta property="og:description" content="Learn more about RCCG Prague Covenant Parish, our mission, and our community." />
        <meta property="og:image" content="https://rccgprague.com/images/logo-img.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://rccgprague.com/about" />
        <meta property="og:site_name" content="RCCG Prague - Covenant Parish" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t`RCCG Prague - About us`} />
        <meta name="twitter:description" content="Learn more about RCCG Prague Covenant Parish, our mission, and our community." />
        <meta name="twitter:image" content="https://rccgprague.com/images/logo-img.png" />
      </Head>
      <AboutHero />
      {/* <AboutVideo /> */}
      <AboutStory />
    </>
  );
}
