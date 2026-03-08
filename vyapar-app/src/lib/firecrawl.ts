const FIRECRAWL_API_URL = "https://api.firecrawl.dev/v1";

export async function scrapeUrl(url: string): Promise<string> {
    const apiKey = process.env.FIRECRAWL_API_KEY;
    if (!apiKey) {
        console.warn("FIRECRAWL_API_KEY not set, returning empty content");
        return "";
    }

    try {
        const response = await fetch(`${FIRECRAWL_API_URL}/scrape`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                url,
                formats: ["markdown"],
            }),
        });

        if (!response.ok) {
            console.error(`Firecrawl scrape failed: ${response.status}`);
            return "";
        }

        const data = await response.json();
        return data?.data?.markdown || data?.data?.content || "";
    } catch (error) {
        console.error("Firecrawl error:", error);
        return "";
    }
}

export async function searchAndScrape(query: string): Promise<string[]> {
    const apiKey = process.env.FIRECRAWL_API_KEY;
    if (!apiKey) return [];

    try {
        const response = await fetch(`${FIRECRAWL_API_URL}/search`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                query,
                limit: 5,
            }),
        });

        if (!response.ok) return [];

        const data = await response.json();
        return (data?.data || []).map((item: { markdown?: string }) => item.markdown || "");
    } catch (error) {
        console.error("Firecrawl search error:", error);
        return [];
    }
}
