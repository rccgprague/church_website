import { QUERIES } from "@/src/constants/queries";
import { EventParams } from "@/src/types/events";
import { client } from ".";

export async function getHomePage(params: EventParams) {
  const home = await client.fetch(QUERIES.getHomePage(), params);
  return home;
}
