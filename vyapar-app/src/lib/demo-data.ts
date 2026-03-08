import type {
    AnalysisResults,
    Project,
    GeneratedAsset,
} from "@/types";

export const DEMO_PROJECT: Project = {
    id: "demo-project-001",
    user_id: "demo-user",
    name: "Premium Smartwatch Brand",
    product_query:
        "I want to launch a premium smartwatch brand targeting health-conscious millennials in India, competing with brands like Noise and Fire-Boltt",
    website_url: null,
    status: "complete",
    created_at: "2024-12-01T10:00:00Z",
    updated_at: "2024-12-01T10:15:00Z",
};

export const DEMO_ANALYSIS: AnalysisResults = {
    id: "demo-analysis-001",
    project_id: "demo-project-001",
    launch_readiness_score: 82,
    created_at: "2024-12-01T10:15:00Z",

    market_overview: {
        should_launch: true,
        confidence_score: 82,
        market_size_india: "₹8,500 Cr",
        market_size_global: "$96.3 Bn",
        competition_level: "High",
        summary:
            "The Indian smartwatch market is growing at 45% CAGR, driven by health awareness and affordable options. While competition is high, there's a clear gap in the ₹3,000-₹6,000 premium segment for brands offering genuine health features beyond basic tracking. The market favors brands with strong design language and reliable health sensors.",
        trends: [
            "Health monitoring features (SpO2, ECG) becoming standard",
            "AMOLED displays replacing LCD in mid-range",
            "Integration with UPI payments gaining traction",
            "Women's health tracking as emerging differentiator",
            "Solar/extended battery life as premium differentiator",
        ],
        market_trend_data: [
            { month: "Jan", value: 180 },
            { month: "Feb", value: 195 },
            { month: "Mar", value: 210 },
            { month: "Apr", value: 225 },
            { month: "May", value: 260 },
            { month: "Jun", value: 290 },
            { month: "Jul", value: 310 },
            { month: "Aug", value: 340 },
            { month: "Sep", value: 380 },
            { month: "Oct", value: 420 },
            { month: "Nov", value: 480 },
            { month: "Dec", value: 520 },
        ],
    },

    competitor_analysis: {
        summary:
            "The Indian smartwatch market is dominated by Noise and Fire-Boltt controlling 50%+ market share. The budget segment (₹1,000-₹2,500) is saturated, but the premium health-focused segment (₹3,000-₹6,000) has room for differentiation with genuine medical-grade sensors and premium build quality.",
        competitors: [
            {
                brand_name: "Noise ColorFit Pro 5",
                price_range: "₹2,999 - ₹4,499",
                avg_rating: 4.1,
                review_count: 28500,
                key_features: [
                    "1.85\" AMOLED",
                    "Bluetooth Calling",
                    "SpO2",
                    "100+ Sports Modes",
                    "Metallic Build",
                ],
            },
            {
                brand_name: "Fire-Boltt Phoenix Ultra",
                price_range: "₹1,799 - ₹3,299",
                avg_rating: 3.9,
                review_count: 42000,
                key_features: [
                    "1.39\" Display",
                    "BT Calling",
                    "AI Voice Assistant",
                    "120+ Sports",
                    "Rotating Crown",
                ],
            },
            {
                brand_name: "boAt Wave Elevate",
                price_range: "₹1,499 - ₹2,999",
                avg_rating: 3.8,
                review_count: 35000,
                key_features: [
                    "1.96\" HD Display",
                    "BT Calling",
                    "Heart Rate",
                    "SpO2",
                    "IP68",
                ],
            },
            {
                brand_name: "Amazfit GTS 4 Mini",
                price_range: "₹5,999 - ₹8,999",
                avg_rating: 4.3,
                review_count: 12000,
                key_features: [
                    "GPS Built-in",
                    "Zepp OS",
                    "24/7 Health Monitor",
                    "15-day Battery",
                    "Alexa",
                ],
            },
            {
                brand_name: "Samsung Galaxy Watch FE",
                price_range: "₹14,999 - ₹19,999",
                avg_rating: 4.4,
                review_count: 8500,
                key_features: [
                    "Wear OS",
                    "BIA Sensor",
                    "ECG",
                    "Sleep Coaching",
                    "Google Apps",
                ],
            },
            {
                brand_name: "Titan Smart Pro",
                price_range: "₹4,995 - ₹7,995",
                avg_rating: 4.0,
                review_count: 6200,
                key_features: [
                    "Premium Metal",
                    "AMOLED",
                    "BT Calling",
                    "5ATM",
                    "Tita\"n Brand Trust",
                ],
            },
            {
                brand_name: "Crossbeats Ignite Blaze",
                price_range: "₹2,499 - ₹3,999",
                avg_rating: 3.7,
                review_count: 9800,
                key_features: [
                    "1.91\" Display",
                    "BT Calling",
                    "Gaming Mode",
                    "100+ Watch Faces",
                    "IP67",
                ],
            },
        ],
    },

    pricing_strategy: {
        ideal_range: { min: 3499, max: 5999 },
        budget_tier: { min: 1999, max: 3499 },
        mid_tier: { min: 3499, max: 5999 },
        premium_tier: { min: 5999, max: 9999 },
        positioning_statement:
            "The health-first smartwatch that doesn't compromise on style — medical-grade sensors meet premium Indian design.",
        usp_suggestions: [
            "First Indian brand with FDA-class II health sensors at mid-range pricing",
            "7-day battery with always-on AMOLED display",
            "Made-for-India features: UPI payments, regional language support, cricket scores",
            "Premium stainless steel build with interchangeable straps ecosystem",
            "Dedicated women's health suite with cycle & stress tracking",
        ],
    },

    feature_recommendations: {
        recommended: [
            {
                feature: "Medical-grade SpO2 & Heart Rate sensors",
                reason: "Key differentiator — competitors use cheaper sensors with ±5% accuracy",
            },
            {
                feature: "Built-in GPS with Indian map support",
                reason: "Only Amazfit offers this under ₹6K — massive gap",
            },
            {
                feature: "UPI Quick Pay from wrist",
                reason: "Rapidly growing demand, very few watches support it",
            },
            {
                feature: "1.43\" AMOLED Always-On Display",
                reason: "Sweet spot between readability and battery life",
            },
            {
                feature: "Women's health tracking suite",
                reason: "Under-served segment with high willingness to pay premium",
            },
            {
                feature: "AI-powered sleep coaching (not just tracking)",
                reason: "Post-COVID health awareness driving demand for actionable insights",
            },
            {
                feature: "5 ATM water resistance + swim tracking",
                reason: "Budget watches only offer IP67/68 — real water resistance is a premium signal",
            },
            {
                feature: "Hindi & regional language support",
                reason: "Tier 2/3 city expansion opportunity — competitors mostly English-only",
            },
        ],
        avoid: [
            {
                feature: "Camera or video calling",
                reason: "Gimmick feature with poor execution — damages brand credibility",
            },
            {
                feature: "Built-in SIM/eSIM (4G)",
                reason: "Drives cost up significantly, low demand in India, drains battery",
            },
            {
                feature: "Gaming features",
                reason: "Niche appeal, doesn't align with health-first positioning",
            },
            {
                feature: "100+ sports modes",
                reason: "Vanity metric — focus on 20 well-tracked sports instead",
            },
        ],
    },

    target_segments: {
        primary_age: "25-35",
        secondary_age: "35-45",
        psychographic_profile:
            "Health-conscious urban professionals who track their fitness but find current budget smartwatches unreliable. They're willing to pay ₹4-6K for a watch that looks premium enough for office wear and provides genuinely accurate health data. They follow fitness influencers on Instagram and are brand-aware but not brand-loyal.",
        platform_breakdown: [
            { platform: "Instagram", percentage: 35 },
            { platform: "YouTube", percentage: 28 },
            { platform: "Amazon Reviews", percentage: 18 },
            { platform: "Twitter/X", percentage: 10 },
            { platform: "Facebook", percentage: 9 },
        ],
        personas: [
            {
                name: "Arjun Mehta",
                age: 28,
                bio: "Software engineer in Bangalore who runs 5K every morning. Frustrated with his Noise watch showing inaccurate heart rate during workouts. Wants GPS for outdoor runs without carrying phone.",
                buying_motivation:
                    "Accurate health tracking during intense workouts + not having to carry phone while running",
                lifestyle:
                    "Tech-savvy, fitness enthusiast, spends on quality gadgets, reads tech reviews on YouTube",
            },
            {
                name: "Priya Sharma",
                age: 32,
                bio: "Marketing manager in Mumbai who wants a watch that works in boardrooms and yoga studios. Looking for stress tracking and period tracking in one premium device.",
                buying_motivation:
                    "A watch that's professional enough for work + has comprehensive women's health features",
                lifestyle:
                    "Urban professional, yoga practitioner, follows wellness influencers, shops on Amazon Prime",
            },
            {
                name: "Rahul Verma",
                age: 40,
                bio: "Small business owner in Jaipur with pre-diabetic condition. Doctor recommended continuous heart monitoring. Current budget watch data is not reliable enough.",
                buying_motivation:
                    "Medical-grade heart & SpO2 monitoring at an affordable price point — doctor recommended getting a smartwatch",
                lifestyle:
                    "Health-conscious due to medical condition, price-sensitive but willing to pay for reliability, prefers Hindi interface",
            },
        ],
    },

    inventory_planning: {
        recommended_first_batch: 1000,
        break_even_units: 400,
        break_even_months: 3,
        minimum_budget: "₹18,00,000",
    },

    revenue_projections: {
        month_1: 180000,
        month_3: 720000,
        month_6: 2400000,
        month_12: 8400000,
        chart_data: [
            { month: "Month 1", revenue: 180000, profit: 36000 },
            { month: "Month 2", revenue: 350000, profit: 87500 },
            { month: "Month 3", revenue: 720000, profit: 216000 },
            { month: "Month 4", revenue: 950000, profit: 302500 },
            { month: "Month 5", revenue: 1400000, profit: 462000 },
            { month: "Month 6", revenue: 2400000, profit: 840000 },
            { month: "Month 9", revenue: 4800000, profit: 1680000 },
            { month: "Month 12", revenue: 8400000, profit: 2940000 },
        ],
    },

    brand_strategy: {
        brand_names: [
            {
                name: "PulseVita",
                rationale:
                    'Combines "Pulse" (health/heartbeat) with "Vita" (life) — conveys health-first positioning with a premium international feel',
            },
            {
                name: "Kaya Watch",
                rationale:
                    '"Kaya" means body/wellness in Sanskrit — rooted in Indian heritage, modern sound, easy to pronounce globally',
            },
            {
                name: "Zentra",
                rationale:
                    'Blend of "Zen" (calm/wellness) and "tra" (track) — suggests mindful health tracking',
            },
            {
                name: "VitalEdge",
                rationale:
                    "Communicates health monitoring (Vital) with cutting-edge technology (Edge)",
            },
        ],
        color_palette: [
            {
                hex: "#1A1A2E",
                name: "Midnight Navy",
                usage: "Primary background, packaging",
            },
            {
                hex: "#E94560",
                name: "Pulse Red",
                usage: "Primary accent, health indicators, CTA buttons",
            },
            {
                hex: "#0F3460",
                name: "Deep Ocean",
                usage: "Secondary background, card surfaces",
            },
            {
                hex: "#16C79A",
                name: "Vitality Green",
                usage: "Success states, health metrics, positive indicators",
            },
            {
                hex: "#F5F5F5",
                name: "Clean White",
                usage: "Text on dark, watch face elements",
            },
        ],
        typography:
            "Primary: 'Outfit' (modern geometric sans-serif for headings and brand name)\nSecondary: 'Inter' (clean, legible for UI and body text)\nWatch Face: 'Space Grotesk' (techy, futuristic for digital displays)",
        brand_voice:
            "Confident but not arrogant. Health-first, backed by science. Speaks in clear, jargon-free language. Uses 'you/your' to be personal. Avoids hyperbole ('best ever') — instead uses specific claims ('±1% accuracy'). Tone: Expert friend who happens to know a lot about health tech.",
        taglines: [
            "Health Intelligence, On Your Wrist.",
            "Precision Health. Premium Design. Indian Heart.",
            "Your Health Deserves Better Than Budget Sensors.",
        ],
        logo_concept:
            "A minimalist heartbeat/pulse line that forms the letter 'P' (for PulseVita), rendered in Pulse Red on Midnight Navy. The pulse line transitions from an ECG wave to a smooth curve, suggesting the bridge between medical accuracy and elegant design. Works as a standalone icon and with wordmark.",
    },

    campaign_ideas: {
        campaigns: [
            {
                name: "The Accuracy Challenge",
                platform: "YouTube + Instagram",
                format: "Video series / Reels",
                hook: "We tested our SpO2 sensor against a hospital-grade pulse oximeter. Here's what happened...",
                estimated_reach: "2M-5M views",
            },
            {
                name: "#MyPulseStory",
                platform: "Instagram",
                format: "UGC Campaign",
                hook: "Real users share how their PulseVita caught a health anomaly early — authentic testimonials",
                estimated_reach: "500K-1M reach",
            },
            {
                name: "Boardroom to Gym",
                platform: "LinkedIn + Instagram",
                format: "Photo/Video series",
                hook: "One watch, two worlds. See how professionals transition from meetings to workouts without changing their wrist game",
                estimated_reach: "1M-3M reach",
            },
            {
                name: "Hindi Health Dashboard",
                platform: "Facebook + YouTube",
                format: "Tutorial videos",
                hook: "First smartwatch with full Hindi health dashboard — because health insights should speak your language",
                estimated_reach: "3M-8M reach (Tier 2/3 cities)",
            },
            {
                name: "Doctor's Pick",
                platform: "All platforms",
                format: "Influencer collaboration",
                hook: "Partnering with 10 verified doctors/health influencers who review and recommend the health tracking features",
                estimated_reach: "5M-10M reach",
            },
        ],
        influencer_tier: "micro (10K-100K followers) + select macro health/fitness influencers",
        ppc_keywords: [
            "best health smartwatch India",
            "accurate SpO2 watch",
            "smartwatch with GPS under 5000",
            "health monitoring watch",
            "fitness watch for women India",
            "smartwatch UPI payment",
            "medical grade smartwatch affordable",
            "smartwatch Hindi support",
        ],
        seasonal_timing:
            "Launch in January (New Year fitness resolutions) or September (pre-Diwali gifting season). Avoid June-August (monsoon dampens outdoor fitness purchases).",
    },

    component_costs: {
        items: [
            { component: "1.43\" AMOLED Display Panel", cost_inr: 380, supplier_type: "Shenzhen OEM" },
            { component: "Nordic nRF5340 BLE SoC", cost_inr: 220, supplier_type: "Authorized Distributor" },
            { component: "PixArt SpO2 + HR Sensor Module", cost_inr: 185, supplier_type: "Direct from PixArt" },
            { component: "GPS Module (Sony CXD5605)", cost_inr: 150, supplier_type: "Alibaba Verified" },
            { component: "300mAh Li-Po Battery", cost_inr: 65, supplier_type: "Domestic (Gujarat)" },
            { component: "Stainless Steel Case", cost_inr: 180, supplier_type: "Rajkot Manufacturing" },
            { component: "Silicone Strap (2 included)", cost_inr: 70, supplier_type: "Domestic" },
            { component: "PCB + Assembly", cost_inr: 120, supplier_type: "Noida EMS Partner" },
            { component: "Packaging (Premium Box)", cost_inr: 85, supplier_type: "Mumbai Packaging" },
            { component: "QC + Testing", cost_inr: 45, supplier_type: "In-house" },
            { component: "Firmware License + OTA", cost_inr: 30, supplier_type: "Software Partner" },
        ],
        total_per_unit: 1530,
        margin_at_recommended_price: 66,
    },
};

export const DEMO_ASSETS: GeneratedAsset[] = [
    {
        id: "demo-asset-001",
        project_id: "demo-project-001",
        asset_type: "pdf_report",
        s3_url: "#",
        created_at: "2024-12-01T10:15:00Z",
    },
    {
        id: "demo-asset-002",
        project_id: "demo-project-001",
        asset_type: "website_html",
        s3_url: "#",
        created_at: "2024-12-01T10:15:00Z",
    },
    {
        id: "demo-asset-003",
        project_id: "demo-project-001",
        asset_type: "product_mockup",
        s3_url: "#",
        created_at: "2024-12-01T10:15:00Z",
    },
];

export const DEMO_WEBSITE_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PulseVita — Health Intelligence On Your Wrist</title>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Inter', sans-serif; background: #1A1A2E; color: #F5F5F5; }
    .container { max-width: 1200px; margin: 0 auto; padding: 0 2rem; }
    
    nav { padding: 1.5rem 0; position: fixed; top: 0; left: 0; right: 0; z-index: 100; background: rgba(26, 26, 46, 0.9); backdrop-filter: blur(10px); border-bottom: 1px solid rgba(233, 69, 96, 0.1); }
    nav .container { display: flex; justify-content: space-between; align-items: center; }
    .logo { font-family: 'Outfit', sans-serif; font-size: 1.5rem; font-weight: 800; color: #E94560; }
    .nav-links { display: flex; gap: 2rem; list-style: none; }
    .nav-links a { color: #999; text-decoration: none; transition: color 0.3s; font-size: 0.9rem; }
    .nav-links a:hover { color: #E94560; }
    .nav-cta { background: #E94560; color: white; padding: 0.6rem 1.5rem; border: none; border-radius: 2rem; font-weight: 600; cursor: pointer; font-size: 0.9rem; }
    
    .hero { min-height: 100vh; display: flex; align-items: center; position: relative; overflow: hidden; padding-top: 5rem; }
    .hero::before { content: ''; position: absolute; top: -50%; right: -20%; width: 600px; height: 600px; background: radial-gradient(circle, rgba(233, 69, 96, 0.15), transparent 70%); border-radius: 50%; }
    .hero-content { position: relative; z-index: 1; max-width: 600px; }
    .hero-badge { display: inline-block; padding: 0.4rem 1rem; border: 1px solid rgba(233, 69, 96, 0.3); border-radius: 2rem; font-size: 0.8rem; color: #E94560; margin-bottom: 1.5rem; }
    .hero h1 { font-family: 'Outfit', sans-serif; font-size: 3.5rem; font-weight: 800; line-height: 1.1; margin-bottom: 1.5rem; }
    .hero h1 span { color: #E94560; }
    .hero p { color: #999; font-size: 1.1rem; line-height: 1.6; margin-bottom: 2rem; }
    .hero-cta { background: linear-gradient(135deg, #E94560, #c73851); color: white; padding: 1rem 2.5rem; border: none; border-radius: 0.5rem; font-size: 1.1rem; font-weight: 600; cursor: pointer; box-shadow: 0 10px 30px rgba(233, 69, 96, 0.3); transition: transform 0.3s; }
    .hero-cta:hover { transform: translateY(-2px); }
    
    .stats { padding: 4rem 0; border-top: 1px solid rgba(255,255,255,0.05); border-bottom: 1px solid rgba(255,255,255,0.05); }
    .stats .container { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem; text-align: center; }
    .stat-number { font-family: 'Outfit', sans-serif; font-size: 2.5rem; font-weight: 700; color: #E94560; }
    .stat-label { color: #888; font-size: 0.9rem; margin-top: 0.3rem; }
    
    .features { padding: 6rem 0; }
    .section-title { font-family: 'Outfit', sans-serif; font-size: 2.5rem; font-weight: 700; text-align: center; margin-bottom: 1rem; }
    .section-subtitle { text-align: center; color: #888; margin-bottom: 4rem; font-size: 1.1rem; }
    .features-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
    .feature-card { background: #0F3460; border: 1px solid rgba(233, 69, 96, 0.1); border-radius: 1rem; padding: 2rem; transition: all 0.3s; }
    .feature-card:hover { border-color: rgba(233, 69, 96, 0.4); transform: translateY(-4px); box-shadow: 0 10px 30px rgba(0,0,0,0.3); }
    .feature-icon { font-size: 2rem; margin-bottom: 1rem; }
    .feature-card h3 { font-family: 'Outfit', sans-serif; font-size: 1.2rem; margin-bottom: 0.8rem; }
    .feature-card p { color: #999; font-size: 0.9rem; line-height: 1.6; }
    
    .cta-section { padding: 6rem 0; text-align: center; background: linear-gradient(180deg, transparent, rgba(233, 69, 96, 0.05)); }
    .cta-section h2 { font-family: 'Outfit', sans-serif; font-size: 2.5rem; margin-bottom: 1rem; }
    .cta-section p { color: #888; margin-bottom: 2rem; font-size: 1.1rem; }
    
    footer { padding: 3rem 0; border-top: 1px solid rgba(255,255,255,0.05); text-align: center; color: #666; font-size: 0.85rem; }
    
    @media (max-width: 768px) {
      .hero h1 { font-size: 2.5rem; }
      .features-grid { grid-template-columns: 1fr; }
      .stats .container { grid-template-columns: repeat(2, 1fr); }
      .nav-links { display: none; }
    }
  </style>
</head>
<body>
  <nav>
    <div class="container">
      <div class="logo">PulseVita</div>
      <ul class="nav-links">
        <li><a href="#features">Features</a></li>
        <li><a href="#stats">Why Us</a></li>
        <li><a href="#cta">Pre-order</a></li>
      </ul>
      <button class="nav-cta">Buy Now — ₹4,999</button>
    </div>
  </nav>

  <section class="hero">
    <div class="container">
      <div class="hero-content">
        <span class="hero-badge">🇮🇳 Designed for India</span>
        <h1>Health Intelligence, <span>On Your Wrist.</span></h1>
        <p>Medical-grade SpO2 & heart rate sensors. Built-in GPS. UPI payments. 7-day battery. The smartwatch that takes your health as seriously as you do.</p>
        <button class="hero-cta">Pre-order Now — ₹4,999</button>
      </div>
    </div>
  </section>

  <section class="stats" id="stats">
    <div class="container">
      <div><div class="stat-number">±1%</div><div class="stat-label">SpO2 Accuracy</div></div>
      <div><div class="stat-number">7 Days</div><div class="stat-label">Battery Life</div></div>
      <div><div class="stat-number">5 ATM</div><div class="stat-label">Water Resistant</div></div>
      <div><div class="stat-number">GPS</div><div class="stat-label">Built-in Navigation</div></div>
    </div>
  </section>

  <section class="features" id="features">
    <div class="container">
      <h2 class="section-title">Why Choose PulseVita?</h2>
      <p class="section-subtitle">Precision health tracking meets premium Indian design.</p>
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon">❤️</div>
          <h3>Medical-Grade Sensors</h3>
          <p>PixArt sensors with ±1% accuracy for SpO2, continuous heart rate, and stress monitoring. Data you can actually trust.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">📍</div>
          <h3>Built-in GPS</h3>
          <p>Track your runs, cycles, and hikes without your phone. Sony CXD5605 module for precision outdoor tracking.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">💳</div>
          <h3>UPI Quick Pay</h3>
          <p>Pay from your wrist at any UPI merchant. Tap, authenticate, done. The future of payments in India.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">🌙</div>
          <h3>AI Sleep Coaching</h3>
          <p>Not just sleep tracking — personalized recommendations based on your patterns, stress levels, and lifestyle.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">💪</div>
          <h3>Premium Build</h3>
          <p>Stainless steel case, sapphire crystal glass, and interchangeable straps. Boardroom to gym, one watch.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">🗣️</div>
          <h3>Hindi & Regional</h3>
          <p>Full Hindi interface with notifications, health insights, and voice commands in your language.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="cta-section" id="cta">
    <div class="container">
      <h2>Your Health Deserves Better<br>Than Budget Sensors.</h2>
      <p>Join 5,000+ early adopters who chose precision health.</p>
      <button class="hero-cta">Pre-order Now — ₹4,999</button>
    </div>
  </section>

  <footer>
    <div class="container">
      <p>© 2024 PulseVita. All rights reserved. Made with ❤️ in India.</p>
    </div>
  </footer>
</body>
</html>`;
