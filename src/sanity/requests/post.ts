import { QUERIES } from "@/src/constants/queries";
import { EventParams, EventDetailParams } from "@/src/types/events";
import { client } from ".";

export async function getPosts(params: EventParams) {
  const posts = await client.fetch(QUERIES.getPosts(), params);
  return posts;
}

export async function getPostDetail(params: EventDetailParams) {
  const post = await client.fetch(QUERIES.getPostBySlug(), params);
  return post;
}
