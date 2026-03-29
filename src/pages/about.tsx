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
      </Head>
      <AboutHero />
      {/* <AboutVideo /> */}
      <AboutStory />
    </>
  );
}
