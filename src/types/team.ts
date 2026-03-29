export type TeamResponse = {
  _id: string;
  name: null;
  slug: Slug;
  position: string;
  biography: string;
  publishedDate: Date;
  imageUrl: string;
  facebook: string;
  linkedin: string;
  language: string;
};

export type Slug = {
  current: string;
  _type: string;
};
