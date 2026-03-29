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
        <title>Sermons - Covenant parish prague</title>
        <meta name="description" content="Covenant parish prague sermons." />
      </Head>
      <SermonHero />
      <SermonInfo />
    </>
  );
}
