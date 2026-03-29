import { QUERIES } from "@/src/constants/queries";
import { client } from ".";

export async function getGalleryImages() {
  const images = await client.fetch(QUERIES.getGalleryImages());
  return images;
}
