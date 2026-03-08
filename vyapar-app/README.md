# Vyapar.AI

**From idea to launch-ready brand, in minutes.**

Vyapar.AI is an AI-powered product intelligence and brand-building platform for Indian SMEs launching on Amazon. Enter a product idea and get complete market analysis, competitor intel, pricing strategy, brand identity, product mockups, and a generated landing page.

## Quick Start

```bash
cd vyapar-app
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Demo Mode

Visit `/demo` to see a pre-populated smartwatch analysis report — no API keys or database needed!

## Environment Variables

Create a `.env.local` file in the `vyapar-app` directory:

```env
# Database (Neon PostgreSQL)
DATABASE_URL=postgresql://user:password@host/dbname?sslmode=require

# Auth
JWT_SECRET=your_jwt_secret_at_least_32_characters_long

# AI (OpenRouter)
OPENROUTER_API_KEY=your_openrouter_api_key

# Web Scraping
FIRECRAWL_API_KEY=your_firecrawl_api_key
SERPER_API_KEY=your_serper_api_key

# AWS S3
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=ap-south-1
S3_BUCKET_NAME=vyapar-ai-assets

# Email (optional)
RESEND_API_KEY=your_resend_api_key

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Database Setup

1. Create a free PostgreSQL database at [Neon](https://neon.tech)
2. Copy the connection string to `DATABASE_URL`
3. Run the migration: `npx tsx src/lib/db/migrate.ts`

## API Keys

| Service | Purpose | Signup |
|---------|---------|--------|
| [OpenRouter](https://openrouter.ai) | AI analysis & generation | Required |
| [Firecrawl](https://firecrawl.dev) | Web scraping | Required |
| [Serper](https://serper.dev) | Google search | Required |
| [Neon](https://neon.tech) | PostgreSQL database | Required |
| [AWS S3](https://aws.amazon.com/s3/) | File storage | Optional |
| [Resend](https://resend.com) | Email reports | Optional |

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: PostgreSQL via Neon
- **Auth**: JWT (httpOnly cookies)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Charts**: Recharts
- **AI**: OpenRouter API (Claude Opus + Haiku)
- **Scraping**: Firecrawl + Serper

## Project Structure

```
vyapar-app/src/
├── app/
│   ├── (auth)/          # Login, Signup pages
│   ├── (dashboard)/     # Dashboard, New Project, Report pages
│   ├── api/             # Auth, Projects, Pipeline API routes
│   ├── demo/            # Demo page (no auth needed)
│   └── page.tsx         # Landing page
├── components/
│   ├── report/          # Report view with 7 tabs
│   └── shared/          # GlowCard, ScoreRing, StatusBadge, etc.
├── lib/
│   ├── pipeline/        # AI analysis pipeline (7 steps)
│   ├── db.ts            # Database client
│   ├── auth.ts          # JWT helpers
│   ├── openrouter.ts    # AI client
│   └── ...              # Firecrawl, Serper, S3 clients
└── types/               # TypeScript interfaces
```
