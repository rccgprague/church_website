export type EventsResponse = {
  slug: Slug;
  featured: boolean;
  youtubeId: string;
  startDateTime: Date;
  venue: string;
  body: Body[];
  language: string;
  _id: string;
  title: string;
  recurring: boolean;
  imageUrl: string;
};

export type Body = {
  children: Child[];
  _type: string;
  style: string;
  _key: string;
  markDefs: any[];
};

export type Child = {
  _type: string;
  marks: any[];
  text: string;
  _key: string;
};

export type Slug = {
  current: string;
  _type: string;
};

export type EventParams = {
  language: string;
};

export type EventDetailParams = {
  language: string;
  slug: string;
};
