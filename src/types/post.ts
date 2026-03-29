export type PostResponse = {
  _id: string;
  title: string;
  slug: Slug;
  body: Body[];
  language: string;
  imageUrl: string;
  publishedDate: string;
};

export type Body = {
  style: string;
  _key: string;
  markDefs: MarkDef[];
  children: Child[];
  _type: string;
};

export type Child = {
  _type: string;
  marks: any[];
  text: string;
  _key: string;
};

export type MarkDef = {
  _type: string;
  _key: string;
};

export type Slug = {
  _type: string;
  current: string;
};
