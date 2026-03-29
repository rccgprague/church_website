import { defineField, defineType } from "sanity";

export default defineType({
  name: "live",
  title: "Live",
  type: "document",
  fields: [
    defineField({
      name: "youtubeId",
      title: "Youtube ID",
      type: "string",
    }),
    defineField({
      name: "startDateTime",
      title: "Start Date and Time",
      type: "datetime",
    }),
  ],
});
