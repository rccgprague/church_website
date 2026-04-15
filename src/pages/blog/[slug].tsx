import BlogDetail from "@/src/components/blog/BlogDetail";
import { loadCatalog } from "@/src/utils/lingui";
import { getPostDetail } from "@/src/sanity/requests/post";
import { PostResponse } from "@/src/types/post";
import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { GetServerSideProps } from "next";
import Head from "next/head";

const SITE_URL = "https://rccgprague.com";
const DEFAULT_OG_IMAGE = `${SITE_URL}/images/hero-bg.jpeg`;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const translation = await loadCatalog(ctx.locale!);
  const slug = ctx.params?.slug?.toString() ?? "";
  let initialPost: PostResponse | null = null;
  if (slug) {
    const posts = await getPostDetail({ language: ctx.locale!, slug });
    initialPost =
      (posts ?? []).find((p: PostResponse) => p.slug.current === slug) ??
      posts?.[0] ??
      null;
  }
  return {
    props: {
      translation,
      initialPost,
    },
  };
};

export default function BlogDetailPage({
  initialPost,
}: {
  initialPost: PostResponse | null;
}) {
  useLingui();

  const title = initialPost?.title
    ? `${initialPost.title} - RCCG Prague`
    : t`RCCG Prague - Digital Library`;
  const description = initialPost?.title
    ? `Read "${initialPost.title}" on the RCCG Prague Digital Library.`
    : t`RCCG Prague, our digital library`;
  const ogImage = initialPost?.imageUrl ?? DEFAULT_OG_IMAGE;
  const ogUrl = `${SITE_URL}/blog/${initialPost?.slug?.current ?? ""}`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta
          name="keywords"
          content={t`RCCG, Prague, Digital, Library, Church, blog, news`}
        />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={ogUrl} />
        <meta property="og:site_name" content="RCCG Prague - Covenant Parish" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
      </Head>
      <BlogDetail />
    </>
  );
}
