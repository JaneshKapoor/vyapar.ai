import { searchGoogle } from "../serper";
import { scrapeUrl } from "../firecrawl";

export async function scrapeWebIntel(
    productCategory: string,
    targetMarket: string
): Promise<string> {
    const queries = [
        `${productCategory} market size ${targetMarket} 2024`,
        `best ${productCategory} brands ${targetMarket}`,
        `${productCategory} target audience ${targetMarket}`,
        `${productCategory} components cost manufacturing`,
    ];

    const allResults: string[] = [];

    for (const q of queries) {
        const results = await searchGoogle(q, 5);

        // Get snippets from search results
        const snippets = results.map(r => `${r.title}: ${r.snippet}`).join("\n");
        allResults.push(`Query: ${q}\n${snippets}`);

        // Scrape top 2 URLs for more detail
        for (const result of results.slice(0, 2)) {
            try {
                const content = await scrapeUrl(result.link);
                if (content && content.length > 100) {
                    allResults.push(content.slice(0, 2000));
                }
            } catch {
                // Skip failed scrapes
            }
        }
    }

    return allResults.join("\n\n---\n\n");
}
