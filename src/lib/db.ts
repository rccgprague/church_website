import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  console.error("[community-db] DATABASE_URL is not set — all database queries will fail");
}

const _sql = neon(process.env.DATABASE_URL!);

// Wrapper that accepts parameterized queries: sql("SELECT ... WHERE id = $1", [id])
// Neon's TS types only expose the tagged template form, so we cast internally.
const sql = async (query: string, params: any[] = []): Promise<any[]> => {
  const strings = Object.assign([query], { raw: [query] }) as unknown as TemplateStringsArray;
  try {
    return await (_sql(strings, ...params) as unknown as Promise<any[]>);
  } catch (err) {
    console.error("[community-db] Query failed — possible connection error:", err);
    throw err;
  }
};

export default sql;
