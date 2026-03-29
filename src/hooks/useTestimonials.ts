import { useQuery } from "react-query";
import { GET_TESTIMONIALS_QUERY } from "../constants/keys";
import { TestimonialResponse } from "../types/testimonial";
import { getTestimonials } from "../sanity/requests/testimonial";

export const useGetTestimonials = (initialData: TestimonialResponse[]) => {
  return useQuery<TestimonialResponse[]>(
    [GET_TESTIMONIALS_QUERY],
    async () => await getTestimonials(),
    { refetchOnWindowFocus: false, initialData }
  );
};
