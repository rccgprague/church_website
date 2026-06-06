import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  console.error("[community-db] DATABASE_URL is not set — all database queries will fail");
}

const _sql = neon(process.env.DATABASE_URL!);

// Wrapper that accepts parameterized queries: sql("SELECT ... WHERE id = $1", [id])
// Tagged template protocol requires n+1 string parts for n params, so we split on $1/$2/…
// before calling the neon tagged-template function.
const sql = async (query: string, params: any[] = []): Promise<any[]> => {
  const parts = query.split(/\$\d+/);
  const strings = Object.assign(parts, { raw: parts }) as unknown as TemplateStringsArray;
  try {
    return await (_sql(strings, ...params) as unknown as Promise<any[]>);
  } catch (err) {
    console.error("[community-db] Query failed — possible connection error:", err);
    throw err;
  }
};

export default sql;
