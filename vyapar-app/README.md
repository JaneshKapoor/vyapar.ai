# Vyapar.AI

**AI-Powered Product Intelligence & Brand Building for Amazon India**

Turn any product idea into a launch-ready brand — complete market analysis, competitor intel, pricing strategy, branding assets, and a generated landing page, in minutes.

---

## 🚀 Quick Start

```bash
cd vyapar-app
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Try the Demo Instantly
Visit [http://localhost:3000/demo](http://localhost:3000/demo) — no API keys or database needed!

---

## 🔑 Environment Setup

Create a `.env.local` file in the `vyapar-app` directory:

```env
# Database (Neon PostgreSQL) — Required for user accounts & projects
DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"

# Auth — Required
JWT_SECRET=your_jwt_secret_at_least_32_characters_long

# AI (OpenRouter) — Required for analysis pipeline
OPENROUTER_API_KEY=your_openrouter_api_key

# Web Scraping — Required for market research
FIRECRAWL_API_KEY=your_firecrawl_api_key
SERPER_API_KEY=your_serper_api_key

# Email — Optional
RESEND_API_KEY=your_resend_api_key

# Storage — Optional (falls back to data URLs if not set)
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=ap-south-1
S3_BUCKET_NAME=vyapar-ai-assets

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Where to Get API Keys

| Service | Purpose | Free Tier | Signup |
|---------|---------|-----------|--------|
| [Neon](https://neon.tech) | PostgreSQL database | Yes (free plan) | Required |
| [OpenRouter](https://openrouter.ai) | AI analysis (Claude Opus + Haiku) | Pay-per-use | Required |
| [Firecrawl](https://firecrawl.dev) | Web scraping & Amazon data | 500 credits free | Required |
| [Serper](https://serper.dev) | Google search results | 2,500 free queries | Required |
| [AWS S3](https://aws.amazon.com/s3/) | File storage | 5GB free | Optional |
| [Resend](https://resend.com) | Email notifications | 100 emails/day free | Optional |

### Database Migration

After setting up your `.env.local`:

```bash
npx tsx src/lib/db/migrate.ts
```

This creates 5 tables: `users`, `projects`, `analysis_results`, `generated_assets`, `scrape_cache`.

---

## 🧱 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Database | PostgreSQL via Neon serverless |
| Auth | JWT (jsonwebtoken + jose) in httpOnly cookies |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Charts | Recharts |
| AI | OpenRouter API (Claude Opus for deep analysis, Claude Haiku for fast tasks) |
| Web Scraping | Firecrawl API (Amazon + web scraping) |
| Search | Serper API (Google search results) |
| Storage | AWS S3 (optional, falls back to data URLs) |

---

## 📊 Data Sources — Where Every Metric Comes From

### Pipeline Flow

```
User Input → Parse Intent → Scrape Data → AI Analysis → Generate Assets
```

### Step-by-Step Data Flow

| Step | Tool | What it does |
|------|------|-------------|
| 1. Parse Intent | **OpenRouter (Claude Haiku)** | Extracts product category, target market, keywords from user's natural language query |
| 2. Scrape Amazon | **Firecrawl API** | Scrapes Amazon.in search results for competitor products, prices, ratings, reviews |
| 3. Scrape Web Intel | **Serper API** + **Firecrawl** | Google search for market reports, trends, industry data, then scrapes top results |
| 4. Scrape User Website | **Firecrawl API** | Optional — scrapes user's existing website for brand context |
| 5. Deep Analysis | **OpenRouter (Claude Opus)** | Synthesizes all scraped data into structured analysis (see below) |
| 6. Generate Website | **OpenRouter (Claude Opus)** | Creates a complete HTML landing page based on brand strategy |
| 7. Generate Mockup | **OpenRouter (Claude Haiku)** | Creates an SVG product mockup with brand colors |
| 8. Generate Report | Server-side | Compiles all analysis into a downloadable text report |

### Detailed Metric Sources

#### Market Overview Tab

| Metric | Source | How it's Generated |
|--------|--------|-------------------|
| **Should You Launch? (YES/NO)** | 🤖 **Claude Opus AI** | AI synthesizes Amazon competition data + market trends from Serper + Firecrawl web data to make a launch recommendation |
| **Confidence Score (%)** | 🤖 **Claude Opus AI** | AI's confidence level based on data quality and market clarity |
| **Market Size (India)** | 🤖 **Claude Opus AI** + 🔍 **Serper** | AI estimates based on web-scraped market reports from Google search results (via Serper → Firecrawl) |
| **Market Size (Global)** | 🤖 **Claude Opus AI** + 🔍 **Serper** | Same as above, global scope |
| **Competition Level** | 🤖 **Claude Opus AI** + 🛒 **Amazon (Firecrawl)** | Based on number of competitors, review counts, market saturation from Amazon scraping |
| **Market Trend (Search Interest Chart)** | 🤖 **Claude Opus AI** | AI-generated estimated search interest trend based on web intel and market reports |
| **Market Trends (text)** | 🤖 **Claude Opus AI** + 🔍 **Serper** | AI identifies trends from scraped web articles and market reports |

#### Competitor Analysis (in Market Overview)

| Metric | Source | How it's Generated |
|--------|--------|-------------------|
| **Brand Names** | 🛒 **Amazon India (Firecrawl)** | Scraped from Amazon search results for the product category |
| **Price Ranges** | 🛒 **Amazon India (Firecrawl)** | Actual prices scraped from Amazon product listings |
| **Avg Rating** | 🛒 **Amazon India (Firecrawl)** | Star ratings scraped from Amazon listings |
| **Review Count** | 🛒 **Amazon India (Firecrawl)** | Review counts scraped from Amazon listings |
| **Key Features** | 🛒 **Amazon (Firecrawl)** + 🤖 **Claude** | Scraped from product descriptions, summarized by AI |
| **Summary** | 🤖 **Claude Opus AI** | AI-generated competitive landscape summary |

#### Product Strategy Tab

| Metric | Source | How it's Generated |
|--------|--------|-------------------|
| **Positioning Statement** | 🤖 **Claude Opus AI** | AI creates positioning based on competitor gaps and market analysis |
| **Pricing Tiers (Budget/Mid/Premium)** | 🤖 **Claude Opus AI** + 🛒 **Amazon data** | AI recommends prices based on competitor pricing from Amazon scraping |
| **Unique Selling Propositions (USPs)** | 🤖 **Claude Opus AI** | AI identifies differentiation opportunities from competitor analysis + market gaps |
| **Recommended Features** | 🤖 **Claude Opus AI** + 🛒 **Amazon reviews** | AI analyzes common features from competitors and positive reviews to suggest wins |
| **Features to Avoid** | 🤖 **Claude Opus AI** + 🛒 **Amazon reviews** | AI identifies features with negative reviews or low impact |

#### Target Audience Tab

| Metric | Source | How it's Generated |
|--------|--------|-------------------|
| **Primary/Secondary Age Groups** | 🤖 **Claude Opus AI** + 🔍 **Web data** | AI estimates from market reports and product category demographics |
| **Psychographic Profile** | 🤖 **Claude Opus AI** | AI creates buyer psychology profile based on product type and market |
| **Platform Breakdown** | 🤖 **Claude Opus AI** | AI estimates social media platform usage for target audience |
| **Buyer Personas** | 🤖 **Claude Opus AI** | AI creates fictional buyer profiles representing key audience segments |

#### Business Plan Tab

| Metric | Source | How it's Generated |
|--------|--------|-------------------|
| **Bill of Materials (BOM)** | 🤖 **Claude Opus AI** + 🔍 **Serper** | AI estimates component costs based on product category and web-scraped supplier data |
| **Total per Unit Cost** | 🤖 **Claude Opus AI** | Sum of BOM components |
| **Margin %** | 🤖 **Claude Opus AI** | Calculated from BOM cost vs recommended price |
| **First Batch Size** | 🤖 **Claude Opus AI** | AI recommendation based on market size and risk |
| **Break-even Units/Months** | 🤖 **Claude Opus AI** | Calculated from costs, price, and projected sales |
| **Revenue Projections** | 🤖 **Claude Opus AI** | AI projects revenue for months 1, 3, 6, 12 based on market size and competition |

#### Marketing Tab

| Metric | Source | How it's Generated |
|--------|--------|-------------------|
| **Campaign Ideas** | 🤖 **Claude Opus AI** | AI creates platform-specific campaign concepts |
| **Influencer Strategy** | 🤖 **Claude Opus AI** | AI recommends influencer tier based on budget and audience |
| **Seasonal Timing** | 🤖 **Claude Opus AI** + 🔍 **Trends data** | AI suggests optimal launch timing from trend analysis |
| **PPC Keywords** | 🤖 **Claude Opus AI** + 🛒 **Amazon** | AI generates Amazon PPC keywords from competitor listings |

#### Brand Identity Tab

| Metric | Source | How it's Generated |
|--------|--------|-------------------|
| **Brand Name Suggestions** | 🤖 **Claude Opus AI** | AI generates brand names with rationales based on product and audience |
| **Color Palette** | 🤖 **Claude Opus AI** | AI creates brand colors with hex codes and usage guidelines |
| **Taglines** | 🤖 **Claude Opus AI** | AI generates multiple tagline options |
| **Typography Recommendations** | 🤖 **Claude Opus AI** | AI suggests font pairings for the brand |
| **Brand Voice** | 🤖 **Claude Opus AI** | AI defines the brand's communication tone |
| **Logo Concept** | 🤖 **Claude Opus AI** | AI describes a logo concept |

#### Assets Tab

| Asset | Source | How it's Generated |
|-------|--------|-------------------|
| **Brand Website (HTML)** | 🤖 **Claude Opus AI** | AI generates a complete single-page HTML landing page |
| **Analysis Report** | 📊 **Server-side** | Compiled from all analysis results into downloadable text |
| **Product Mockup (SVG)** | 🤖 **Claude Haiku AI** | AI generates an SVG product visualization with brand colors |

### Source Legend

| Icon | Source |
|------|--------|
| 🤖 | **AI-Generated** — Claude Opus or Haiku via OpenRouter |
| 🛒 | **Amazon India** — Scraped via Firecrawl API |
| 🔍 | **Google Search** — Retrieved via Serper API → Firecrawl |
| 📊 | **Server-side** — Computed on the server from analysis data |

---

## 📁 Project Structure

```
vyapar-app/src/
├── app/
│   ├── (auth)/              # Login, Signup pages
│   ├── (dashboard)/         # Dashboard, New Project, Report, Website Preview
│   ├── api/
│   │   ├── auth/            # signup, login, logout, me
│   │   ├── projects/        # CRUD + status + assets + download-report
│   │   └── pipeline/run/    # Pipeline orchestrator
│   ├── demo/                # Demo page (no auth)
│   └── page.tsx             # Landing page
├── components/
│   ├── report/ReportView.tsx # 7-tab report with charts
│   └── shared/              # GlowCard, ScoreRing, StatusBadge, etc.
├── lib/
│   ├── pipeline/            # 7-step analysis pipeline
│   │   ├── parse-intent.ts  # Step 1: Parse user query
│   │   ├── scrape-amazon.ts # Step 2: Scrape Amazon competitors
│   │   ├── scrape-web.ts    # Step 3: Scrape market intel
│   │   ├── analyze.ts       # Step 5: Deep AI analysis
│   │   ├── generate-website.ts  # Step 6: Brand website
│   │   ├── generate-mockup.ts   # Step 7: Product mockup SVG
│   │   └── generate-pdf.ts     # Step 8: Report generation
│   ├── db.ts                # Neon PostgreSQL client
│   ├── auth.ts              # JWT helpers
│   ├── openrouter.ts        # AI client (Claude Opus + Haiku)
│   ├── firecrawl.ts         # Web scraping client
│   ├── serper.ts            # Google search client
│   ├── s3.ts                # S3 storage (optional)
│   └── demo-data.ts         # Pre-populated demo data
├── types/index.ts           # TypeScript interfaces
└── middleware.ts            # Route protection (jose JWT)
```

---

## 🔐 Authentication

- JWT-based auth with httpOnly cookies
- Passwords hashed with bcryptjs (12 rounds)
- Middleware verifies tokens using `jose` (Edge-compatible)
- Protected routes: `/dashboard`, `/new`, `/project/*`
- Public routes: `/`, `/login`, `/signup`, `/demo`

---

## 🎨 Design System

- **Theme**: Dark AWS-inspired (navy/black)
- **Primary**: `#FF9900` (Amazon orange)
- **Accent**: `#00d4ff` (cyan), `#00c853` (green)
- **Font**: Inter
- **Animations**: Framer Motion throughout (page transitions, hover effects, loading states)
- **Charts**: Recharts (area charts, bar charts)

---

## 📋 API Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/auth/signup` | POST | Create account |
| `/api/auth/login` | POST | Login, returns JWT cookie |
| `/api/auth/logout` | POST | Clear auth cookie |
| `/api/auth/me` | GET | Get current user |
| `/api/projects` | GET | List user's projects |
| `/api/projects/create` | POST | Create project + start pipeline |
| `/api/projects/[id]` | GET | Get project + analysis + assets |
| `/api/projects/[id]/status` | GET | Poll project status |
| `/api/projects/[id]/assets` | GET | List generated assets |
| `/api/projects/[id]/download-report` | GET | Download analysis report |
| `/api/pipeline/run` | POST | Trigger analysis pipeline |

---

## 🧪 Testing

```bash
# Build check
npm run build

# Dev server
npm run dev

# Test demo (no API keys needed)
open http://localhost:3000/demo

# Test auth flow
open http://localhost:3000/signup

# Run database migration
npx tsx src/lib/db/migrate.ts
```

---

## 🏗️ Built With

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Database**: [Neon](https://neon.tech/) (Serverless PostgreSQL)
- **AI**: [OpenRouter](https://openrouter.ai/) (Claude Opus + Claude Haiku)
- **Scraping**: [Firecrawl](https://firecrawl.dev/) + [Serper](https://serper.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Charts**: [Recharts](https://recharts.org/)

---

*Powered by AWS • Built for Indian SMEs*
