import Head from "next/head";
import GalleryInfo from "../components/gallery/GalleryInfo";
import PageHero from "../components/common/PageHero";
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

export default function GalleryPage() {
  /**
   * This hook is needed to subscribe your
   * component for changes if you use t`` macro
   */
  useLingui();
  return (
    <>
      <Head>
        <title>{t`RCCG Prague - Gallery`}</title>
        <meta name="description" content={t`RCCG Prague, the church gallery`} />
        <meta
          name="keywords"
          content={t`RCCG, Prague, Covenant, Parish, Church, Gallery`}
        />
        <meta property="og:title" content={t`RCCG Prague - Gallery`} />
        <meta property="og:description" content={t`Photos from our RCCG Prague Covenant Parish community — worship, events, and fellowship.`} />
        <meta property="og:image" content="https://rccgprague.com/images/logo-img.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://rccgprague.com/gallery" />
        <meta property="og:site_name" content="RCCG Prague - Covenant Parish" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t`RCCG Prague - Gallery`} />
        <meta name="twitter:description" content={t`Photos from our RCCG Prague Covenant Parish community — worship, events, and fellowship.`} />
        <meta name="twitter:image" content="https://rccgprague.com/images/logo-img.png" />
      </Head>
      <PageHero
        title={t`A Photo Gallery of Our Church Community`}
        paragraph1={t`Welcome to our church's photo gallery, where we showcase the beauty and joy of our faith community in action. From vibrant worship services to heartwarming fellowship events, this gallery serves as a visual testimony to the love, hope, and unity that we experience as part of our church family.`}
        paragraph2={t`Join us on this journey as we celebrate the blessings of our shared faith and relive cherished memories. May these photos inspire you and deepen your connection to our church community.`}
      />
      <GalleryInfo />
    </>
  );
}
