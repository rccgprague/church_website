import { defineField, defineType } from "sanity";

export default defineType({
  name: "home",
  title: "Home",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "bannerTitle",
      title: "Banner Title",
      type: "string",
    }),
    defineField({
      name: "bannerSubTitle",
      title: "Banner Sub-Title",
      type: "string",
    }),
    defineField({
      name: "bannerImage",
      title: "Banner Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "bannerSlides",
      title: "Banner Slides",
      description:
        "Add multiple images for a slideshow banner. The Banner Title and Sub-Title above apply to all slides. Set the hotspot on each image so it stays in frame on mobile.",
      type: "array",
      of: [
        {
          type: "object",
          name: "slide",
          title: "Slide",
          fields: [
            {
              name: "label",
              title: "Label",
              type: "string",
              description: "A short name to identify this slide in Studio (not shown on the website).",
            },
            {
              name: "image",
              title: "Slide Image",
              type: "image",
              options: { hotspot: true },
            },
          ],
          preview: {
            select: { title: "label", media: "image" },
          },
        },
      ],
    }),
    defineField({
      name: "themeTitle",
      title: "Theme Title",
      type: "string",
    }),
    defineField({
      name: "themeMessage",
      title: "Theme Message",
      type: "string",
    }),
    defineField({
      name: "themeVerse",
      title: "Theme Verse",
      type: "string",
    }),
    defineField({
      name: "themeImage",
      title: "Theme Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "themeLogo",
      title: "Theme Logo",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "whoWeAreTitle",
      title: "Who We are Title",
      type: "string",
    }),
    defineField({
      name: "whoWeAreMessage",
      title: "Who We are Message",
      type: "string",
    }),
    defineField({
      name: "whoWeAreImage",
      title: "Who We are Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "whoWeAreYoutubeUrl",
      title: "Who We are Youtube URL",
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
