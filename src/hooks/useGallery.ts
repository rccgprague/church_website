import { GET_GALLERY_IMAGES_QUERY } from "../constants/keys";
import { useQuery } from "react-query";
import { GalleryImageResponse } from "../types/gallery";
import { getGalleryImages } from "../sanity/requests/gallery";

export const useGetGalleryImages = () => {
  return useQuery<GalleryImageResponse[]>(
    [GET_GALLERY_IMAGES_QUERY],
    async () => await getGalleryImages(),
    { refetchOnWindowFocus: false }
  );
};
