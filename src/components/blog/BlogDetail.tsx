import PageHero from "../common/PageHero";
import BlogDetailContent from "./BlogDetailContent";
import { t } from "@lingui/macro";
import { useGetPostDetail } from "@/src/hooks/usePosts";
import { useRouter } from "next/router";
import { useMemo, useEffect } from "react";
import Loader from "../common/loader/Loader";

export default function BlogDetail() {
  const { query } = useRouter();
  const querySlug = query?.slug?.toString() ?? "";
  const {
    data,
    isLoading: isLoadingPost,
    refetch,
  } = useGetPostDetail(querySlug);

  const postData = useMemo(() => {
    return (data ? [...data] : [])?.find(
      (data) => data.slug.current === querySlug
    );
  }, [data, querySlug]);

  const isLoading = !postData || isLoadingPost;

  useEffect(() => {
    refetch();
  }, [querySlug, refetch]);
  return (
    <Loader isLoading={isLoading}>
      <PageHero
        title={t`Digital Library`}
        paragraph1={postData?.title ?? ""}
        variant="post"
      />
      <BlogDetailContent content={postData?.body ?? []} />
    </Loader>
  );
}
