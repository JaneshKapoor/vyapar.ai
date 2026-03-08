const SERPER_API_URL = "https://google.serper.dev/search";

interface SerperResult {
    title: string;
    link: string;
    snippet: string;
}

interface SerperResponse {
    organic: SerperResult[];
}

export async function searchGoogle(query: string, num: number = 5): Promise<SerperResult[]> {
    const apiKey = process.env.SERPER_API_KEY;
    if (!apiKey) {
        console.warn("SERPER_API_KEY not set, returning empty results");
        return [];
    }

    try {
        const response = await fetch(SERPER_API_URL, {
            method: "POST",
            headers: {
                "X-API-KEY": apiKey,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                q: query,
                num,
                gl: "in",
                hl: "en",
            }),
        });

        if (!response.ok) {
            console.error(`Serper search failed: ${response.status}`);
            return [];
        }

        const data: SerperResponse = await response.json();
        return data.organic || [];
    } catch (error) {
        console.error("Serper error:", error);
        return [];
    }
}

export async function searchMultipleQueries(queries: string[]): Promise<Record<string, SerperResult[]>> {
    const results: Record<string, SerperResult[]> = {};
    for (const q of queries) {
        results[q] = await searchGoogle(q);
    }
    return results;
}
