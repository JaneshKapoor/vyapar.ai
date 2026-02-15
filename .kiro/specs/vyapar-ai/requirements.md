# Requirements Document

## Introduction

Vyapar.AI is an Agentic AI Co-Founder system designed for Indian SMBs and traders who want to transition from wholesaling to building their own Private Label D2C Brands on Amazon. The system acts as a "Business-in-a-Box," taking a raw category idea or product photo and autonomously generating a full Brand Launch Strategy, Product Blueprint, and Go-to-Market Plan through a 4-stage agentic workflow.

## Glossary

- **System**: Vyapar.AI platform
- **User**: Indian SME/Trader seeking to launch a private label brand
- **Visual Search Agent**: Component that processes product images using multimodal embeddings
- **Market Intelligence Agent**: Component that analyzes market saturation and competition
- **Product Architect Agent**: Component that defines product specifications and calculates costs
- **Business Strategist Agent**: Component that generates pricing and financial forecasts
- **Brand Marketer Agent**: Component that creates marketing strategies and brand assets
- **BOM**: Bill of Materials - itemized list of components and their costs
- **Market Saturation Score**: Numerical metric (0-100) indicating category competitiveness
- **Multimodal Embeddings**: Vector representations of images for similarity search
- **A+ Content**: Enhanced product descriptions on Amazon with rich media
- **D2C**: Direct-to-Consumer business model
- **Private Label**: Products manufactured by one company but sold under another brand

## Requirements

### Requirement 1: Input Capture

**User Story:** As a trader, I want to initiate a brand launch by providing either a text description or a product photo, so that the system can analyze my business opportunity.

#### Acceptance Criteria

1. WHEN a user provides a text input describing a product category, THE System SHALL accept and validate the input for processing
2. WHEN a user uploads a product photo, THE System SHALL accept image formats (JPEG, PNG, WebP) up to 10MB in size
3. WHEN invalid input is provided, THE System SHALL display a clear error message and request valid input
4. WHEN valid input is received, THE System SHALL initiate the 4-stage agentic workflow automatically

### Requirement 2: Visual Search and Image Analysis

**User Story:** As a trader with a reference product photo, I want the system to identify if similar designs exist on Amazon.in, so that I can understand visual competition.

#### Acceptance Criteria

1. WHEN a product image is uploaded, THE Visual Search Agent SHALL generate multimodal embeddings using Amazon Titan Multimodal Embeddings
2. WHEN embeddings are generated, THE Visual Search Agent SHALL query Amazon OpenSearch Service to find visually similar products
3. WHEN similar products are found, THE System SHALL return a list of matching products with similarity scores above 0.75
4. WHEN no similar products are found, THE System SHALL indicate a unique visual opportunity exists
5. WHEN visual search completes, THE System SHALL pass results to the Market Intelligence Agent

### Requirement 3: Market Saturation Analysis

**User Story:** As a trader, I want to know if my target category is overcrowded, so that I can assess market viability before investing.

#### Acceptance Criteria

1. WHEN the Market Intelligence Agent receives category information, THE System SHALL analyze the number of active sellers in the category
2. WHEN analyzing competition, THE System SHALL calculate a Market Saturation Score between 0 and 100
3. WHEN the Market Saturation Score exceeds 75, THE System SHALL flag the category as highly competitive
4. WHEN the Market Saturation Score is below 50, THE System SHALL indicate favorable market conditions
5. WHEN saturation analysis completes, THE System SHALL generate a visual chart showing saturation trends

### Requirement 4: Competitor Intelligence

**User Story:** As a trader, I want to identify top brands and their market share, so that I can understand who I'm competing against.

#### Acceptance Criteria

1. WHEN analyzing a category, THE Market Intelligence Agent SHALL identify the top 10 brands by sales volume
2. WHEN competitors are identified, THE System SHALL calculate estimated market share percentages for each brand
3. WHEN competitor data is gathered, THE System SHALL display brand names, price ranges, and average ratings
4. WHEN market leaders are identified, THE System SHALL highlight their key differentiators
5. WHEN competitor analysis completes, THE System SHALL generate a competitor matrix visualization

### Requirement 5: Gap Analysis from Reviews

**User Story:** As a trader, I want to discover unmet customer needs from negative reviews, so that I can build a product that solves real problems.

#### Acceptance Criteria

1. WHEN analyzing competitors, THE Market Intelligence Agent SHALL extract negative reviews (1-3 star ratings) from top products
2. WHEN reviews are extracted, THE System SHALL analyze at least 500 reviews per major competitor
3. WHEN analyzing review text, THE System SHALL identify recurring complaint themes using sentiment analysis
4. WHEN complaint themes are identified, THE System SHALL rank them by frequency and severity
5. WHEN gap analysis completes, THE System SHALL propose a "Winning Feature" that addresses the most common complaint

### Requirement 6: Product Specification Definition

**User Story:** As a trader, I want the system to define technical specifications superior to competitors, so that my product has a competitive advantage.

#### Acceptance Criteria

1. WHEN the Product Architect Agent receives market data, THE System SHALL define technical specifications for each product component
2. WHEN defining specifications, THE System SHALL ensure at least one specification exceeds the category average
3. WHEN specifications are defined, THE System SHALL include measurable parameters (screen size in inches, battery in mAh, weight in grams)
4. WHEN comparing to competitors, THE System SHALL highlight which specifications are superior
5. WHEN specifications are finalized, THE System SHALL generate a product specification sheet

### Requirement 7: Bill of Materials Cost Calculation

**User Story:** As a trader, I want to know the exact component costs in Indian Rupees, so that I can understand my manufacturing investment and profit margins.

#### Acceptance Criteria

1. WHEN product specifications are defined, THE Product Architect Agent SHALL calculate the cost for each component in Indian Rupees (₹)
2. WHEN calculating costs, THE System SHALL use Indian and Chinese sourcing price standards
3. WHEN generating the BOM, THE System SHALL itemize costs for display, chipset, battery, casing, strap, packaging, and assembly
4. WHEN all component costs are calculated, THE System SHALL sum them to produce a total BOM cost
5. WHEN BOM calculation completes, THE System SHALL display a detailed cost breakdown table with per-unit costs

### Requirement 8: Product Differentiation Recommendations

**User Story:** As a trader, I want suggestions for unique features to add, so that my product stands out in the marketplace.

#### Acceptance Criteria

1. WHEN analyzing competitor products, THE Product Architect Agent SHALL identify missing features in the category
2. WHEN gap analysis reveals opportunities, THE System SHALL suggest 3-5 differentiation features
3. WHEN suggesting features, THE System SHALL estimate the incremental cost impact in Rupees
4. WHEN features are recommended, THE System SHALL prioritize based on customer demand and cost-effectiveness
5. WHEN differentiation analysis completes, THE System SHALL explain the competitive advantage of each suggested feature

### Requirement 9: Pricing Strategy Optimization

**User Story:** As a trader, I want optimal launch and sustained pricing recommendations, so that I can maximize profitability while remaining competitive.

#### Acceptance Criteria

1. WHEN the Business Strategist Agent receives BOM costs, THE System SHALL calculate a recommended Launch Price
2. WHEN calculating Launch Price, THE System SHALL consider competitor pricing, BOM cost, and target margin
3. WHEN Launch Price is determined, THE System SHALL recommend a Sustained Price for long-term sales
4. WHEN pricing strategy is generated, THE System SHALL explain the rationale for price positioning
5. WHEN pricing recommendations are complete, THE System SHALL display Launch Price, Sustained Price, and competitor price comparison

### Requirement 10: Financial Forecasting

**User Story:** As a trader, I want to know my break-even point and profit margins, so that I can make informed investment decisions.

#### Acceptance Criteria

1. WHEN pricing is determined, THE Business Strategist Agent SHALL calculate the break-even volume in units
2. WHEN calculating break-even, THE System SHALL include fixed costs (tooling, certification, initial inventory) and variable costs (per-unit BOM)
3. WHEN break-even is calculated, THE System SHALL compute Net Profit Margin percentage at different sales volumes
4. WHEN financial projections are generated, THE System SHALL display profit scenarios for 500, 1000, 2000, and 5000 units sold
5. WHEN forecasting completes, THE System SHALL present a financial summary with ROI timeline

### Requirement 11: Inventory Planning

**User Story:** As a trader, I want to know how much initial stock to order, so that I can avoid over-investment or stockouts.

#### Acceptance Criteria

1. WHEN financial forecasting completes, THE Business Strategist Agent SHALL recommend an initial order quantity
2. WHEN calculating initial inventory, THE System SHALL consider break-even volume, storage costs, and cash flow constraints
3. WHEN initial quantity is determined, THE System SHALL calculate re-order levels based on projected sales velocity
4. WHEN inventory planning is complete, THE System SHALL provide a 6-month inventory forecast
5. WHEN recommendations are finalized, THE System SHALL display minimum order quantity (MOQ) requirements from manufacturers

### Requirement 12: Customer Persona Definition

**User Story:** As a trader, I want to know exactly who my target customer is, so that I can tailor my marketing effectively.

#### Acceptance Criteria

1. WHEN the Brand Marketer Agent receives product and pricing data, THE System SHALL define a detailed customer persona
2. WHEN creating the persona, THE System SHALL specify age range, income level, geographic location (tier classification), and lifestyle attributes
3. WHEN persona is defined, THE System SHALL identify primary pain points and purchase motivations
4. WHEN customer segmentation is complete, THE System SHALL estimate the total addressable market size in India
5. WHEN persona analysis completes, THE System SHALL generate a visual persona card with demographic and psychographic details

### Requirement 13: Marketing Campaign Strategy

**User Story:** As a trader, I want specific marketing recommendations, so that I can launch my brand with the right messaging and channels.

#### Acceptance Criteria

1. WHEN customer persona is defined, THE Brand Marketer Agent SHALL recommend 3-5 marketing angles
2. WHEN suggesting marketing angles, THE System SHALL align messaging with customer pain points and product differentiators
3. WHEN campaign strategy is developed, THE System SHALL recommend specific channels (Instagram Reels, Amazon Ads, YouTube, WhatsApp)
4. WHEN channels are recommended, THE System SHALL estimate budget allocation percentages for each channel
5. WHEN campaign strategy completes, THE System SHALL provide sample messaging for each recommended angle

### Requirement 14: Brand Identity Generation

**User Story:** As a trader, I want a professional brand name and logo concept, so that I can establish a memorable brand identity.

#### Acceptance Criteria

1. WHEN the Brand Marketer Agent develops campaign strategy, THE System SHALL generate 5 brand name options
2. WHEN brand names are generated, THE System SHALL ensure names are pronounceable in Hindi and English
3. WHEN a brand name is selected, THE System SHALL generate a logo concept description
4. WHEN logo concept is defined, THE System SHALL check domain name and trademark availability for the brand
5. WHEN brand identity is complete, THE System SHALL provide brand positioning statement and tagline options

### Requirement 15: Product Visual Generation

**User Story:** As a trader, I want photorealistic product mockups and packaging designs, so that I can visualize my brand before manufacturing.

#### Acceptance Criteria

1. WHEN brand identity is established, THE Brand Marketer Agent SHALL generate photorealistic product mockups using Amazon Titan Image Generator G1
2. WHEN generating mockups, THE System SHALL create at least 3 product angle views (front, side, lifestyle)
3. WHEN product visuals are created, THE System SHALL generate packaging design mockups with brand elements
4. WHEN packaging is designed, THE System SHALL ensure compliance with Amazon packaging requirements
5. WHEN visual generation completes, THE System SHALL provide downloadable high-resolution images (minimum 2000x2000 pixels)

### Requirement 16: Amazon Listing Content Creation

**User Story:** As a trader, I want ready-to-use Amazon A+ Content, so that I can launch my product listing immediately.

#### Acceptance Criteria

1. WHEN product visuals are generated, THE Brand Marketer Agent SHALL draft an Amazon product title following Amazon SEO best practices
2. WHEN title is created, THE System SHALL generate 5 bullet points highlighting key features and benefits
3. WHEN bullet points are written, THE System SHALL create a detailed product description with emotional appeal
4. WHEN listing content is drafted, THE System SHALL suggest 10-15 backend search keywords for Amazon SEO
5. WHEN A+ Content is complete, THE System SHALL format content according to Amazon character limits and guidelines

### Requirement 17: Workflow Orchestration

**User Story:** As a trader, I want the system to automatically progress through all stages, so that I receive a complete business plan without manual intervention.

#### Acceptance Criteria

1. WHEN input is received, THE System SHALL execute Stage 1 (Market Intelligence) before proceeding to Stage 2
2. WHEN Stage 1 completes, THE System SHALL automatically pass relevant data to Stage 2 (Product Architect)
3. WHEN Stage 2 completes, THE System SHALL automatically pass relevant data to Stage 3 (Business Strategist)
4. WHEN Stage 3 completes, THE System SHALL automatically pass relevant data to Stage 4 (Brand Marketer)
5. WHEN all stages complete, THE System SHALL generate a comprehensive PDF report with all outputs

### Requirement 18: Progress Transparency

**User Story:** As a trader, I want to see what the AI agents are thinking and doing, so that I can trust the recommendations and understand the process.

#### Acceptance Criteria

1. WHEN any agent is processing, THE System SHALL display real-time status updates in the user interface
2. WHEN agents make decisions, THE System SHALL show reasoning steps (e.g., "Scanning 500 reviews...", "Calculating Import Duty...")
3. WHEN calculations are performed, THE System SHALL display intermediate results and formulas used
4. WHEN agents transition between stages, THE System SHALL show a progress indicator with completed and remaining stages
5. WHEN errors occur, THE System SHALL display clear error messages with suggested corrective actions

### Requirement 19: Data Persistence and Export

**User Story:** As a trader, I want to save and export my brand launch plan, so that I can share it with partners and manufacturers.

#### Acceptance Criteria

1. WHEN the workflow completes, THE System SHALL save all generated data to the user's account
2. WHEN data is saved, THE System SHALL allow users to export the complete report as a PDF
3. WHEN exporting, THE System SHALL include all visualizations, tables, and generated images
4. WHEN export is requested, THE System SHALL generate the file within 30 seconds
5. WHEN multiple projects exist, THE System SHALL allow users to view and compare previous brand analyses

### Requirement 20: AWS Bedrock Integration

**User Story:** As a system architect, I want the platform to leverage AWS Bedrock Agents for orchestration, so that the agentic workflow is scalable and maintainable.

#### Acceptance Criteria

1. WHEN the System initializes, THE System SHALL use AWS Bedrock Agents as the orchestration layer
2. WHEN reasoning is required, THE System SHALL invoke Anthropic Claude 3.5 Sonnet via AWS Bedrock
3. WHEN visual processing is needed, THE System SHALL use Amazon Titan Multimodal Embeddings for image vectorization
4. WHEN visual search is performed, THE System SHALL query Amazon OpenSearch Service with vector embeddings
5. WHEN generative visuals are required, THE System SHALL use Amazon Titan Image Generator G1 or Stable Diffusion XL via Bedrock
