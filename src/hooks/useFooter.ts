import { useQuery } from "react-query";
import { GET_FOOTER_QUERY } from "../constants/keys";
import { FooterResponse } from "../types/footer";
import { useRouter } from "next/router";
import { getFooterContent } from "../sanity/requests/footer";

export const useGetFooterContent = (
  initialData?: FooterResponse[],
  serverLocale?: string
) => {
  const { locale } = useRouter();
  return useQuery<FooterResponse[]>(
    [GET_FOOTER_QUERY],
    async () => await getFooterContent({ language: locale ?? "" }),
    {
      refetchOnWindowFocus: false,
      enabled: Boolean(serverLocale ?? locale),
      initialData,
    }
  );
};
