import { QUERIES } from "@/src/constants/queries";
import { EventParams, EventDetailParams } from "@/src/types/events";
import { client } from ".";

export async function getEvents(params: EventParams) {
  const events = await client.fetch(QUERIES.getEvents(), params);
  return events;
}

export async function getEventDetail(params: EventDetailParams) {
  const event = await client.fetch(QUERIES.getEventBySlug(), params);
  return event;
}
