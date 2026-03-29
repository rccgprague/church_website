export type TestimonialResponse = {
  _id: string;
  name: string;
  slug: Slug;
  message: string;
  publishedDate: string;
  imageUrl: string;
};

export type Slug = {
  current: string;
  _type: string;
};
