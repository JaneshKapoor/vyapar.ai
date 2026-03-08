export interface User {
  id: string;
  email: string;
  name: string | null;
  created_at: string;
}

export interface Project {
  id: string;
  user_id: string;
  name: string;
  product_query: string;
  website_url: string | null;
  status: 'pending' | 'scraping' | 'analyzing' | 'generating' | 'complete' | 'error';
  error_message?: string;
  created_at: string;
  updated_at: string;
}

export interface AnalysisResults {
  id: string;
  project_id: string;
  market_overview: MarketOverview | null;
  competitor_analysis: CompetitorAnalysis | null;
  pricing_strategy: PricingStrategy | null;
  feature_recommendations: FeatureRecommendations | null;
  target_segments: TargetSegments | null;
  inventory_planning: InventoryPlanning | null;
  revenue_projections: RevenueProjections | null;
  brand_strategy: BrandStrategy | null;
  campaign_ideas: CampaignIdeas | null;
  component_costs: ComponentCosts | null;
  launch_readiness_score: number | null;
  created_at: string;
}

export interface MarketOverview {
  should_launch: boolean;
  confidence_score: number;
  market_size_india: string;
  market_size_global: string;
  competition_level: 'Low' | 'Medium' | 'High' | 'Saturated';
  summary: string;
  trends: string[];
  market_trend_data: { month: string; value: number }[];
}

export interface Competitor {
  brand_name: string;
  price_range: string;
  avg_rating: number;
  review_count: number;
  key_features: string[];
  amazon_url?: string;
}

export interface CompetitorAnalysis {
  competitors: Competitor[];
  summary: string;
}

export interface PricingStrategy {
  ideal_range: { min: number; max: number };
  budget_tier: { min: number; max: number };
  mid_tier: { min: number; max: number };
  premium_tier: { min: number; max: number };
  positioning_statement: string;
  usp_suggestions: string[];
}

export interface FeatureRecommendations {
  recommended: { feature: string; reason: string }[];
  avoid: { feature: string; reason: string }[];
}

export interface BuyerPersona {
  name: string;
  age: number;
  bio: string;
  buying_motivation: string;
  lifestyle: string;
}

export interface TargetSegments {
  primary_age: string;
  secondary_age: string;
  psychographic_profile: string;
  platform_breakdown: { platform: string; percentage: number }[];
  personas: BuyerPersona[];
}

export interface InventoryPlanning {
  recommended_first_batch: number;
  break_even_units: number;
  break_even_months: number;
  minimum_budget: string;
}

export interface RevenueProjections {
  month_1: number;
  month_3: number;
  month_6: number;
  month_12: number;
  chart_data: { month: string; revenue: number; profit: number }[];
}

export interface BrandStrategy {
  brand_names: { name: string; rationale: string }[];
  color_palette: { hex: string; name: string; usage: string }[];
  typography: string;
  brand_voice: string;
  taglines: string[];
  logo_concept: string;
}

export interface Campaign {
  name: string;
  platform: string;
  format: string;
  hook: string;
  estimated_reach: string;
}

export interface CampaignIdeas {
  campaigns: Campaign[];
  influencer_tier: string;
  ppc_keywords: string[];
  seasonal_timing: string;
}

export interface ComponentCost {
  component: string;
  cost_inr: number;
  supplier_type: string;
}

export interface ComponentCosts {
  items: ComponentCost[];
  total_per_unit: number;
  margin_at_recommended_price: number;
}

export interface GeneratedAsset {
  id: string;
  project_id: string;
  asset_type: 'pdf_report' | 'website_html' | 'product_mockup' | 'pitch_deck';
  s3_url: string;
  created_at: string;
}

export interface ProjectWithAnalysis extends Project {
  analysis: AnalysisResults | null;
  assets: GeneratedAsset[];
}

export interface ParsedIntent {
  product_category: string;
  target_market: string;
  price_sensitivity: string;
  keywords: string[];
  product_name: string;
}

export interface PipelineStep {
  id: number;
  label: string;
  icon: string;
  status: 'pending' | 'active' | 'complete' | 'error';
}
