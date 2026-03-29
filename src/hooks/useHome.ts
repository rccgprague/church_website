import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { GET_HOME_QUERY } from "../constants/keys";
import { HomeResponse } from "../types/home";
import { getHomePage } from "../sanity/requests/home";

export const useGetHomeContent = (
  initialData: HomeResponse[],
  serverLocale: string
) => {
  const { locale } = useRouter();
  return useQuery<HomeResponse[]>(
    [GET_HOME_QUERY],
    async () => await getHomePage({ language: locale ?? "" }),
    {
      refetchOnWindowFocus: false,
      enabled: Boolean(serverLocale ?? locale),
      initialData,
    }
  );
};
