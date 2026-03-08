"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Navbar } from "@/components/shared/Navbar";
import { motion } from "framer-motion";
import { Code, Download, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { DEMO_WEBSITE_HTML } from "@/lib/demo-data";

export default function WebsitePreviewPage() {
    const params = useParams();
    const id = params.id as string;
    const [html, setHtml] = useState<string>("");
    const [loading, setLoading] = useState(true);
    const isDemo = id === "demo-project-001";

    useEffect(() => {
        if (isDemo) {
            setHtml(DEMO_WEBSITE_HTML);
            setLoading(false);
            return;
        }

        // Fetch from API
        fetch(`/api/projects/${id}/assets`)
            .then(res => res.json())
            .then(data => {
                const websiteAsset = data.assets?.find((a: { asset_type: string }) => a.asset_type === "website_html");
                if (websiteAsset?.s3_url) {
                    if (websiteAsset.s3_url.startsWith("data:")) {
                        // Decode base64 data URL
                        const base64 = websiteAsset.s3_url.split(",")[1];
                        setHtml(atob(base64));
                    } else if (websiteAsset.s3_url.startsWith("http")) {
                        // Fetch from S3 URL
                        fetch(websiteAsset.s3_url)
                            .then(r => r.text())
                            .then(text => setHtml(text))
                            .catch(() => setHtml(generatePlaceholderHtml()));
                    } else {
                        setHtml(generatePlaceholderHtml());
                    }
                } else {
                    setHtml(generatePlaceholderHtml());
                }
                setLoading(false);
            })
            .catch(() => {
                setHtml(generatePlaceholderHtml());
                setLoading(false);
            });
    }, [id, isDemo]);

    const handleCopyHtml = () => {
        navigator.clipboard.writeText(html);
    };

    const handleDownload = () => {
        const blob = new Blob([html], { type: "text/html" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "brand-landing-page.html";
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="min-h-screen bg-[#0a0e1a]">
            <Navbar />
            <div className="border-b border-[#1e2d40] bg-[#111827]">
                <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link
                            href={isDemo ? "/demo" : `/project/${id}`}
                            className="flex items-center gap-1 text-sm text-[#8892a4] hover:text-white transition"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Report
                        </Link>
                        <div className="h-5 w-px bg-[#1e2d40]" />
                        <span className="text-sm text-white font-medium">Generated Brand Website</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleCopyHtml}
                            className="flex items-center gap-2 px-3 py-1.5 text-sm bg-[#1a2235] border border-[#1e2d40] rounded-lg text-[#8892a4] hover:text-white transition"
                        >
                            <Code className="w-4 h-4" />
                            Copy HTML
                        </button>
                        <button
                            onClick={handleDownload}
                            className="flex items-center gap-2 px-3 py-1.5 text-sm bg-gradient-to-r from-[#FF9900] to-[#e68a00] rounded-lg text-white font-medium"
                        >
                            <Download className="w-4 h-4" />
                            Download
                        </button>
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 py-6">
                {loading ? (
                    <div className="flex items-center justify-center h-[600px]">
                        <Loader2 className="w-8 h-8 animate-spin text-[#FF9900]" />
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-xl overflow-hidden border border-[#1e2d40]"
                    >
                        <iframe
                            srcDoc={html}
                            className="w-full h-[700px] bg-white"
                            title="Generated Brand Website"
                            sandbox="allow-scripts"
                        />
                    </motion.div>
                )}
            </main>
        </div>
    );
}

function generatePlaceholderHtml(): string {
    return `<!DOCTYPE html>
<html><head><style>
  body { font-family: system-ui, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; background: #0a0e1a; color: #8892a4; }
  .msg { text-align: center; padding: 2rem; }
  h2 { color: #FF9900; font-size: 1.5rem; margin-bottom: 0.5rem; }
</style></head><body>
  <div class="msg">
    <h2>Website Not Generated Yet</h2>
    <p>The brand website will appear here once the AI pipeline completes.</p>
  </div>
</body></html>`;
}
