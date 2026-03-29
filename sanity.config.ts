import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import { documentInternationalization } from "@sanity/document-internationalization";
import { schemaTypes } from "./src/sanity/schemas";
import { PROJECT_ENV, PROJECT_ID } from "./src/constants/config";
import structure from "./src/sanity/structure";

export default defineConfig({
  name: "default",
  title: "rccg-covenant-admin",

  projectId: PROJECT_ID,
  dataset: PROJECT_ENV,

  plugins: [
    deskTool({ structure }),
    visionTool(),
    documentInternationalization({
      supportedLanguages: [
        { id: "en", title: "English" },
        { id: "cs", title: "Czech" },
      ],
      schemaTypes: ["event", "post", "home", "footer", "team"],
    }),
  ],

  schema: {
    types: schemaTypes,
  },

  basePath: "/admin",
});
