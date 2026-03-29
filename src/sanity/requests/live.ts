import { QUERIES } from "@/src/constants/queries";
import { client } from ".";

export async function getLiveDetails() {
  const live = await client.fetch(QUERIES.getLive());
  return live;
}
