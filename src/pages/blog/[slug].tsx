import BlogDetail from "@/src/components/blog/BlogDetail";
import { loadCatalog } from "@/src/utils/lingui";
import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { GetServerSideProps } from "next";
import Head from "next/head";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const translation = await loadCatalog(ctx.locale!);
  return {
    props: {
      translation,
    },
  };
};

export default function EventDetailPage() {
  /**
   * This hook is needed to subscribe your
   * component for changes if you use t`` macro
   */
  useLingui();
  return (
    <>
      <Head>
        <title>{t`RCCG Prague - Digital Library`}</title>
        <meta
          name="description"
          content={t`RCCG Prague, our digital library`}
        />
        <meta
          name="keywords"
          content={t`RCCG, Prague, Digital, Library, Church, blog, news`}
        />
      </Head>
      <BlogDetail />;
    </>
  );
}
