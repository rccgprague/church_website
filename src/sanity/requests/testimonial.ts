import { QUERIES } from "@/src/constants/queries";
import { client } from ".";

export async function getTestimonials() {
  const testimonials = await client.fetch(QUERIES.getTestimonials());
  return testimonials;
}
