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

export async function query(sqlStr: string, params?: unknown[]) {
    const db = getDb();
    // Use the tagged template function properly via .query() method
    return db.query(sqlStr, params);
}
