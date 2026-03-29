import { useQuery } from "react-query";
import { GET_GALLERY_IMAGES_QUERY } from "../constants/keys";
import { TeamResponse } from "../types/team";
import { useRouter } from "next/router";
import { getTeam } from "../sanity/requests/team";

export const useGetTeam = (
  initialData: TeamResponse[],
  serverLocale: string
) => {
  const { locale } = useRouter();
  return useQuery<TeamResponse[]>(
    [GET_GALLERY_IMAGES_QUERY],
    async () => await getTeam({ language: locale ?? "" }),
    {
      refetchOnWindowFocus: false,
      enabled: Boolean(serverLocale ?? locale),
      initialData,
    }
  );
};
