import Head from "next/head";
import BlogInfo from "../../components/blog/BlogInfo";
import PageHero from "../../components/common/PageHero";
import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { loadCatalog } from "@/src/utils/lingui";
import { GetServerSideProps } from "next";

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
        <title>{t`RCCG Prague - Digital Library`}</title>
        <meta
          name="description"
          content={t`RCCG Prague, our digital library`}
        />
        <meta
          name="keywords"
          content={t`RCCG, Prague, Digital, Library, Church, blog, news`}
        />
        <meta property="og:title" content={t`RCCG Prague - Digital Library`} />
        <meta property="og:description" content={t`Inspiring articles and blog posts from RCCG Prague Covenant Parish.`} />
        <meta property="og:image" content="https://rccgprague.com/images/logo-img.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://rccgprague.com/blog" />
        <meta property="og:site_name" content="RCCG Prague - Covenant Parish" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t`RCCG Prague - Digital Library`} />
        <meta name="twitter:description" content={t`Inspiring articles and blog posts from RCCG Prague Covenant Parish.`} />
        <meta name="twitter:image" content="https://rccgprague.com/images/logo-img.png" />
      </Head>
      <PageHero
        title={t`Inspiring Thoughts: A Collection of Our Church's Blog Posts`}
        paragraph1={t`Here at our church, we understand that you may have questions about who we are, what we believe, and how we operate.`}
        paragraph2={t`Our FAQ page is designed to provide you with comprehensive answers to the most commonly asked questions about our church. Whether you're a first-time visitor or a long-time member, we hope this resource will give you a better`}
        paragraph3={t`understanding of what makes our church unique and why we're passionate about spreading God's love. Browse through the FAQs to discover more about our church and how you can get involved.`}
      />
      <BlogInfo />
    </>
  );
}
