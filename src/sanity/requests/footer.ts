import { QUERIES } from "@/src/constants/queries";
import { EventParams } from "@/src/types/events";
import { client } from ".";

export async function getFooterContent(params: EventParams) {
  const footer = await client.fetch(QUERIES.getFooter(), params);
  return footer;
}
