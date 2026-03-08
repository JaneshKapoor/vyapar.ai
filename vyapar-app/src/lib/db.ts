import { neon } from "@neondatabase/serverless";

let sql: ReturnType<typeof neon>;

export function getDb() {
    if (!process.env.DATABASE_URL) {
        throw new Error("DATABASE_URL is not set");
    }
    if (!sql) {
        sql = neon(process.env.DATABASE_URL);
    }
    return sql;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function query(sqlStr: string, params?: unknown[]): Promise<Record<string, any>[]> {
    const db = getDb();
    // Use sql.query() for conventional string-based queries and cast to array
    const result = await db.query(sqlStr, params);
    // Neon query returns rows as array-like, ensure it's a proper array
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return Array.isArray(result) ? result : (result as unknown as Record<string, any>[]);
}
