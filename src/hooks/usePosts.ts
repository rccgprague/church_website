import { GET_POSTS_QUERY, GET_POST_DETAIL_QUERY } from "../constants/keys";
import { useQuery } from "react-query";
import { PostResponse } from "../types/post";
import { useRouter } from "next/router";
import { getPostDetail, getPosts } from "../sanity/requests/post";

export const useGetPosts = (
  initialData?: PostResponse[],
  serverLocale?: string
) => {
  const { locale } = useRouter();
  return useQuery<PostResponse[]>(
    [GET_POSTS_QUERY],
    async () => await getPosts({ language: locale ?? "" }),
    {
      refetchOnWindowFocus: false,
      enabled: Boolean(serverLocale ?? locale),
      initialData,
    }
  );
};

export const useGetPostDetail = (slug?: string) => {
  const { locale } = useRouter();
  return useQuery<PostResponse[]>(
    [GET_POST_DETAIL_QUERY],
    async () =>
      await getPostDetail({
        language: locale ?? "",
        slug: slug ?? "",
      }),
    { refetchOnWindowFocus: false, enabled: Boolean(slug && locale) }
  );
};
