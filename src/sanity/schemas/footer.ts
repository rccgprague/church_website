import { defineField, defineType } from "sanity";

export default defineType({
  name: "footer",
  title: "Footer",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "about",
      title: "About us",
      type: "string",
    }),
    defineField({
      name: "bankDetails",
      title: "Bank Details",
      type: "string",
    }),
    defineField({
      name: "banker",
      title: "Banker",
      type: "string",
    }),
    defineField({
      name: "language",
      type: "string",
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "image",
    },
  },
});
