import { PROJECT_ID, PROJECT_ENV } from "@/src/constants/config";
import { createClient } from "next-sanity";

export const client = createClient({
  projectId: PROJECT_ID,
  dataset: PROJECT_ENV,
});
