import { scrapeUrl } from "../firecrawl";
import { query } from "../db";
import crypto from "crypto";

function hashUrl(url: string): string {
    return crypto.createHash("sha256").update(url).digest("hex");
}

async function getCachedContent(url: string): Promise<string | null> {
    try {
        const hash = hashUrl(url);
        const rows = await query(
            "SELECT content FROM scrape_cache WHERE url_hash = $1",
            [hash]
        );
        if (rows.length > 0) return rows[0].content as string;
        return null;
    } catch {
        return null;
    }
}

async function setCachedContent(url: string, content: string): Promise<void> {
    try {
        const hash = hashUrl(url);
        await query(
            `INSERT INTO scrape_cache (url_hash, url, content) VALUES ($1, $2, $3)
       ON CONFLICT (url_hash) DO UPDATE SET content = $3, scraped_at = NOW()`,
            [hash, url, content]
        );
    } catch (error) {
        console.error("Cache write error:", error);
    }
}

export async function scrapeAmazon(keywords: string[]): Promise<string> {
    const results: string[] = [];

    for (const keyword of keywords.slice(0, 3)) {
        const searchUrl = `https://www.amazon.in/s?k=${encodeURIComponent(keyword)}`;

        // Check cache first
        const cached = await getCachedContent(searchUrl);
        if (cached) {
            results.push(cached);
            continue;
        }

        const content = await scrapeUrl(searchUrl);
        if (content) {
            results.push(content);
            await setCachedContent(searchUrl, content);
        }
    }

    return results.join("\n\n---\n\n");
}

export async function scrapeProductPages(urls: string[]): Promise<string[]> {
    const contents: string[] = [];

    for (const url of urls.slice(0, 5)) {
        const cached = await getCachedContent(url);
        if (cached) {
            contents.push(cached);
            continue;
        }

        const content = await scrapeUrl(url);
        if (content) {
            contents.push(content);
            await setCachedContent(url, content);
        }
    }

    return contents;
}
