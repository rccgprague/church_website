export const PROJECT_ID = process.env.NEXT_PUBLIC_PROJECT_ID ?? "";
export const PROJECT_ENV = process.env.NEXT_PUBLIC_PROJECT_ENV ?? "";
export const API_BASE_URL =
  PROJECT_ID && PROJECT_ENV
    ? `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${PROJECT_ENV}`
    : "";
