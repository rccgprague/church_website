import { QUERIES } from "@/src/constants/queries";
import { EventParams } from "@/src/types/events";
import { client } from ".";

export async function getTeam(params: EventParams) {
  const team = await client.fetch(QUERIES.getTeam(), params);
  return team;
}
