import { neon } from "@neondatabase/serverless";

const _sql = neon(process.env.DATABASE_URL!);

// Wrapper that accepts parameterized queries: sql("SELECT ... WHERE id = $1", [id])
// Neon's TS types only expose the tagged template form, so we cast internally.
const sql = (query: string, params: any[] = []): Promise<any[]> => {
  const strings = Object.assign([query], { raw: [query] }) as unknown as TemplateStringsArray;
  return _sql(strings, ...params) as unknown as Promise<any[]>;
};

export default sql;
