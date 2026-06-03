# Proxy Marketplace Frontend Transformation Prompt

You already audited this repository and confirmed that this is currently a social media growth storefront, not a proxy marketplace.

Now implement **ONLY the full visual/frontend transformation** of the website into a modern light proxy marketplace.

---

## 1. Core Goal

Transform the entire visible website from the old social media growth product into a premium light SaaS proxy service website.

This phase is **frontend/visual-focused only**.

The existing backend may remain partially incompatible with the new proxy product. That is okay for this phase.

For any purchase/proxy management flows that require missing backend functionality, create clean frontend UI states like:

- `Provisioning pending`
- `Backend provisioning not connected yet`
- `Coming soon`
- `Contact support`
- `Demo data`

Do **NOT** fake real proxy credentials as if they are production-ready.

---

## 2. Very Important Backend Boundaries

Do **NOT** implement complex backend proxy provisioning.

Do **NOT** rewrite the backend.

Do **NOT** break existing backend APIs.

Do **NOT** change database schemas destructively.

Do **NOT** remove existing:

- auth logic
- balance logic
- top-up logic
- orders logic
- email logic
- MongoDB logic
- Resend logic
- environment variable logic

Do **NOT** implement in this phase:

- real proxy delivery
- proxy credentials generation
- proxy provider integration
- payment webhooks
- admin fulfillment
- real proxy provisioning
- real payment provider integration
- destructive DB migrations
- full auth rewrite

Allowed backend-adjacent changes only if absolutely needed:

- safe redirects
- frontend mapping helpers
- non-destructive type additions
- placeholder states when backend data is missing
- minimal fixes required to prevent frontend crashes

---

## 3. Reference Websites

### Product / Content / Scope Reference

Use this website as the reference for product offer structure, service categories, pricing style, locations, use cases, FAQ/legal coverage and proxy marketplace breadth:

```txt
https://litport.net/
```

Do **NOT** copy its design 1:1.

### Design / UX Inspiration

Use this website only as general inspiration for modern SaaS structure, clean proxy-service UX, dashboard preview and page composition:

```txt
https://proxium.vercel.app/
```

Do **NOT** copy it 1:1.

### If You Cannot Access References

If you cannot access the reference websites directly, do not guess from the URLs.

Use the detailed product and design requirements written in this file as the source of truth.

---

## 4. Main Design Direction

The final website must be **LIGHT**, not dark.

Use a premium B2B SaaS visual style:

- white / off-white background
- very light blue/cyan/indigo gradients
- clean white cards
- soft borders
- subtle shadows
- large rounded corners
- modern typography
- clear hierarchy
- lots of spacing
- polished buttons
- clean dashboard previews
- network/map-inspired visuals
- proxy infrastructure feel
- professional business/developer audience
- responsive layouts for mobile, tablet and desktop

Avoid:

- dark cyberpunk UI
- shady proxy/VPN visual language
- scammy marketing
- crypto-only look
- aggressive “bypass bans” language
- illegal or suspicious use-case wording
- copying Litport or Proxium layout exactly

---

## 5. Product Positioning

Build a professional proxy provider website for:

- developers
- SaaS teams
- marketers
- SEO teams
- ecommerce teams
- data teams
- agencies
- businesses that need reliable access to public web data and geo-specific testing

Safe use-case wording:

- public web data collection
- SEO monitoring
- ecommerce price monitoring
- ad verification
- market research
- social media management
- automation workflows
- geo-specific testing
- QA and localization testing
- brand protection
- data-driven research

Avoid unsafe wording.

Do **NOT** position the product as a tool for:

- spam
- phishing
- brute force
- credential stuffing
- carding
- malware
- illegal scraping
- attacking third-party systems
- bypassing platform bans
- evading law enforcement
- account abuse
- mass fake accounts

---

## 6. Branding

If the current old brand name is related to social media growth, replace visible branding with a new neutral proxy-service brand.

Use this placeholder brand name if no final name exists:

```txt
ProxyMarket
```

Keep branding consistent across:

- header
- footer
- metadata
- dashboard
- auth pages
- visible frontend templates

Do not touch backend email logic unless needed for visible text cleanup.

---

## 7. Currency And Pricing

Use **EUR** as the main visible currency across the new frontend.

Use a Litport-like pricing structure but increase visible prices by **+1 EUR**.

Use this baseline:

| Product | Visible pricing |
|---|---|
| Datacenter Proxies | from €1.09/day and €1.60/GB |
| Static Residential / ISP Proxies | from €1.39/day and €3.49/GB |
| Residential Proxies | from €2.19/GB |
| Mobile Proxies | from €5.99/day and €6.49/GB |
| SERP Scraping API | Coming Soon |
| eCommerce Scraping API | Coming Soon |

Do not implement real price charging logic in backend unless the current code already supports it safely.

For this phase, frontend pricing display and frontend price preview are enough.

---

## 8. Products To Support Visually

### 8.1 Datacenter Proxies

Description:

Fast, affordable proxies for high-volume workflows, automation, testing and scraping public web data.

Features:

- High speed
- Low latency
- HTTP/SOCKS5 support
- Dedicated or shared options
- Best for volume and performance
- Country selection
- Pay-per-day and pay-per-GB pricing

Pricing:

- from €1.09/day
- from €1.60/GB

---

### 8.2 Static Residential / ISP Proxies

Description:

Stable long-session residential-style IPs for account workflows, monitoring and business tools.

Features:

- Stable IP identity
- Long sessions
- ISP/residential trust profile
- Great for account management
- Country targeting
- Monthly/daily options
- HTTP/SOCKS5 support

Pricing:

- from €1.39/day
- from €3.49/GB

---

### 8.3 Residential Proxies

Description:

Rotating residential proxy pool for public web data, market research and geo-specific access.

Features:

- Rotating IP pool
- Sticky sessions
- Country targeting
- Pay-per-GB
- Good for web scraping and research
- HTTP/SOCKS5 support
- Flexible bandwidth

Pricing:

- from €2.19/GB

---

### 8.4 Mobile Proxies

Description:

High-trust 4G/5G mobile proxies for mobile testing, ad verification and geo-specific mobile workflows.

Features:

- Real mobile network positioning
- Carrier/country targeting if available
- Manual/API rotation UI placeholder
- High trust score
- Daily and GB-based pricing
- HTTP/SOCKS5 support

Pricing:

- from €5.99/day
- from €6.49/GB

---

### 8.5 SERP Scraping API

Status:

```txt
Coming Soon
```

Description:

A future API for collecting search engine result data at scale.

CTA:

- Join waitlist
- Contact sales

Do not show a buy button if not implemented.

---

### 8.6 eCommerce Scraping API

Status:

```txt
Coming Soon
```

Description:

A future API for ecommerce product, pricing and availability monitoring.

CTA:

- Join waitlist
- Contact sales

Do not show a buy button if not implemented.

---

## 9. Public Route Map

Create or redesign these public routes:

```txt
/
 /pricing
 /locations
 /products/datacenter-proxies
 /products/static-residential-proxies
 /products/residential-proxies
 /products/mobile-proxies
 /products/serp-scraping-api
 /products/ecommerce-scraping-api
 /use-cases
 /use-cases/web-scraping
 /use-cases/seo-monitoring
 /use-cases/ecommerce-monitoring
 /use-cases/ad-verification
 /use-cases/market-research
 /faq
 /contact
 /terms
 /privacy
 /acceptable-use-policy
 /refund-policy
```

---

## 10. Auth Routes

Create or preserve these routes:

```txt
/login
/register
```

Create `/forgot-password` only if the existing project already supports it.

If existing routes are:

```txt
/sign-in
/sign-up
```

then either preserve them or add redirects/aliases.

Do not break the current auth flow.

---

## 11. Dashboard Route Map

Create or redesign these dashboard routes visually:

```txt
/dashboard
/dashboard/buy
/dashboard/proxies
/dashboard/proxies/[id]
/dashboard/balance
/dashboard/orders
/dashboard/payments
/dashboard/settings
/dashboard/support
```

If existing `/top-up` exists:

- keep it working, or
- redirect it to `/dashboard/balance`

Do not break current balance/top-up logic.

---

## 12. Homepage Structure

Create a polished, conversion-focused homepage with the following sections.

---

### 12.1 Header

Header should include:

- logo/brand
- navigation
- Products dropdown or product links
- Pricing
- Locations
- Use Cases
- FAQ
- Login
- Get Started CTA
- responsive mobile menu

---

### 12.2 Hero Section

Goal:

Immediately explain that this is a proxy service.

Suggested headline direction:

```txt
Reliable proxies for data, automation and geo-specific workflows
```

Suggested subheadline direction:

```txt
Buy datacenter, residential, ISP and mobile proxies with flexible EUR pricing, global locations and instant dashboard management.
```

Hero visual ideas:

- clean dashboard mockup
- proxy network map
- location chips
- live stats cards
- light gradient background
- no dark cyberpunk design

CTA buttons:

- Get Started
- View Pricing

---

### 12.3 Trust / Stats Strip

Show metrics like:

- 50+ locations
- HTTP/SOCKS5
- Rotating & sticky sessions
- EUR pricing
- Dashboard management
- 24/7 support

Use safe wording.

Do not claim huge numbers unless marked as illustrative.

---

### 12.4 Product Cards Section

Cards for:

- Datacenter Proxies
- Static Residential / ISP Proxies
- Residential Proxies
- Mobile Proxies
- SERP Scraping API — Coming Soon
- eCommerce Scraping API — Coming Soon

Each card should include:

- icon
- short description
- starting price/status
- 3-5 key features
- CTA

---

### 12.5 Pricing Preview Section

Show clean pricing cards with EUR prices.

Make it easy to compare:

- best for
- starting price
- protocols
- rotation
- bandwidth model
- CTA

---

### 12.6 How It Works Section

Steps:

1. Create account
2. Add balance
3. Choose proxy type and location
4. Configure protocol, rotation and bandwidth
5. Manage proxies from dashboard

If backend provisioning is not ready, keep wording general and avoid promising automatic real credentials unless implemented.

---

### 12.7 Locations Preview

Show:

- global coverage visual
- country cards/chips
- region filters UI
- “View all locations” CTA

Example locations:

- United States
- United Kingdom
- Germany
- France
- Netherlands
- Spain
- Italy
- Poland
- Ukraine
- Canada
- Brazil
- Australia
- Japan
- Singapore

Do not claim exact availability unless it is config-driven and clearly illustrative.

---

### 12.8 Dashboard Preview

Show dashboard mockup with:

- balance card
- active proxies
- traffic usage
- recent orders
- proxy table preview
- buy proxy form preview

---

### 12.9 Features Section

Include:

- HTTP/SOCKS5 support
- username/password auth
- IP whitelist auth
- rotating sessions
- sticky sessions
- country targeting
- city targeting placeholder
- carrier targeting placeholder for mobile
- usage analytics
- clean dashboard
- flexible pricing
- support

---

### 12.10 Use Cases Section

Cards for:

- Web scraping of public data
- SEO monitoring
- Ecommerce monitoring
- Ad verification
- Market research
- Social media management
- Geo-specific testing
- Automation workflows

---

### 12.11 FAQ Section

Include 6-10 common questions:

- What proxy types do you offer?
- What is the difference between datacenter and residential proxies?
- Do you support HTTP and SOCKS5?
- Can I choose a country?
- How does billing work?
- Do you offer rotating sessions?
- What activities are prohibited?
- Are scraping APIs available?

---

### 12.12 Final CTA

Suggested copy:

```txt
Start building with reliable proxies today
```

Buttons:

- Create account
- View pricing

---

### 12.13 Footer

Footer should include:

- Products
- Use cases
- Resources
- Legal
- Contact
- brand copy
- compliance note

---

## 13. Public Page Requirements

---

### 13.1 `/pricing`

Create a full pricing page with:

- hero
- pricing cards
- comparison table
- proxy type tabs or sections
- FAQ
- CTA
- clear EUR pricing
- Coming Soon state for APIs

Pricing sections:

- Datacenter
- Static Residential / ISP
- Residential
- Mobile
- APIs Coming Soon

---

### 13.2 `/locations`

Create a locations page with:

- hero
- region filter UI
- country grid
- explanation of country/city/carrier targeting
- CTA
- clean map/network visual

---

### 13.3 Product Pages

Each product page should have:

- product hero
- what it is
- best for
- features
- pricing cards/table
- locations preview
- use cases
- technical details
- FAQ
- CTA

Use dynamic/reusable components where possible.

Avoid duplicating large chunks of markup.

---

### 13.4 Datacenter Proxies Page

Route:

```txt
/products/datacenter-proxies
```

Focus on:

- speed
- cost efficiency
- high-volume public data workflows

Show pricing:

- from €1.09/day
- from €1.60/GB

---

### 13.5 Static Residential / ISP Proxies Page

Route:

```txt
/products/static-residential-proxies
```

Focus on:

- stable sessions
- long-lived identity
- ISP/residential trust profile

Show pricing:

- from €1.39/day
- from €3.49/GB

---

### 13.6 Residential Proxies Page

Route:

```txt
/products/residential-proxies
```

Focus on:

- rotating residential pool
- public web data workflows
- flexible bandwidth

Show pricing:

- from €2.19/GB

---

### 13.7 Mobile Proxies Page

Route:

```txt
/products/mobile-proxies
```

Focus on:

- 4G/5G mobile workflows
- ad verification
- mobile testing
- geo-specific mobile workflows

Show pricing:

- from €5.99/day
- from €6.49/GB

---

### 13.8 SERP Scraping API Page

Route:

```txt
/products/serp-scraping-api
```

Status:

```txt
Coming Soon
```

CTA should be:

- Join waitlist
- Contact sales

Do not show buy button if not implemented.

---

### 13.9 eCommerce Scraping API Page

Route:

```txt
/products/ecommerce-scraping-api
```

Status:

```txt
Coming Soon
```

CTA should be:

- Join waitlist
- Contact sales

Do not show buy button if not implemented.

---

### 13.10 `/use-cases`

Create overview page with use-case cards.

---

### 13.11 `/use-cases/web-scraping`

Safe wording:

```txt
Collect public web data reliably for research, analytics and monitoring.
```

---

### 13.12 `/use-cases/seo-monitoring`

Focus on:

- rank tracking
- SERP checks
- geo-specific search visibility
- SEO reporting

---

### 13.13 `/use-cases/ecommerce-monitoring`

Focus on:

- prices
- stock availability
- product catalog monitoring
- regional ecommerce insights

---

### 13.14 `/use-cases/ad-verification`

Focus on:

- checking ad placement
- geo-specific campaign visibility
- brand safety
- regional campaign QA

---

### 13.15 `/use-cases/market-research`

Focus on:

- public market data
- trends
- regional insights
- competitive intelligence

---

### 13.16 `/faq`

Create full FAQ page.

---

### 13.17 `/contact`

Contact page should match existing contact backend if available.

Do not break contact API.

Include:

- contact form
- support email placeholder
- response time
- business support copy

---

## 14. Legal Pages

Replace old social-media-growth legal content visually/textually with proxy-service oriented copy.

Create frontend legal pages:

```txt
/terms
/privacy
/acceptable-use-policy
/refund-policy
```

### Acceptable Use Policy Must Clearly Prohibit

- spam
- phishing
- brute force
- credential stuffing
- carding
- malware
- illegal activity
- unauthorized access
- attacks against third-party systems
- violation of third-party rights
- abuse of platforms or services

Do not overcomplicate legal text, but make it professional.

---

## 15. Dashboard Visual Requirements

---

### 15.1 Dashboard Shell

Create a clean light dashboard layout with:

- sidebar
- topbar
- user/account area
- balance display
- responsive mobile navigation
- active route highlight
- clean cards
- clean tables
- clean forms

---

### 15.2 `/dashboard`

Overview page should include:

- balance card
- active proxies card
- traffic usage card
- open orders card
- recent orders
- quick action: Buy proxies
- quick action: Add balance
- status/info panel explaining provisioning if backend is not connected

---

### 15.3 `/dashboard/buy`

Build a complete Buy Proxy UI.

Fields:

- proxy type
- country
- city, if available
- carrier, if mobile
- quantity
- bandwidth / GB
- plan duration: daily / weekly / monthly / pay-per-GB
- rotation type: rotating / sticky
- protocol: HTTP / SOCKS5
- authentication method: username/password or IP whitelist

Show:

- selected product summary
- calculated EUR price
- estimated renewal/expiration
- compliance note
- purchase button

Important:

If real backend proxy order endpoint is not available, the purchase button should not pretend to provision real proxies.

Use one of these safe implementations:

A. disabled button with this message:

```txt
Proxy provisioning backend is not connected yet.
```

B. demo mode button that creates no real order.

C. if current balance/order backend can safely accept a generic order, create a `pending provisioning` order state without credentials.

Choose the safest option based on current code.

Do not break old order API.

---

### 15.4 `/dashboard/proxies`

Active proxies page.

If no real proxy backend exists, show:

- empty state
- explanation
- CTA to buy or contact support
- optionally demo/sample rows clearly marked as demo

Table columns:

- type
- country
- protocol
- rotation
- status
- expires
- traffic used
- actions

Actions should be disabled or demo if backend is missing:

- View
- Copy credentials
- Renew
- Rotate
- Manage whitelist

---

### 15.5 `/dashboard/proxies/[id]`

Proxy details page.

Show layout for:

- proxy metadata
- credentials card
- connection string examples
- usage chart placeholder
- whitelist management UI
- renewal panel
- status history

If backend missing:

Clearly show:

```txt
This is a UI placeholder until provisioning is connected.
```

---

### 15.6 `/dashboard/balance`

Use existing balance/top-up logic visually if available.

Redesign page:

- current balance
- top-up amount form
- transaction history
- payment status
- note if payments are currently test mode

Do not implement real payments unless already present.

---

### 15.7 `/dashboard/orders`

Show order history.

Adapt old orders visually into new proxy-style cards/table if possible.

If old data is social-growth-specific, map safely or show empty/new state.

---

### 15.8 `/dashboard/payments`

Payment/invoice visual page.

Include:

- payment history
- invoices placeholder
- status
- amount
- method

If backend lacks invoices, show clear placeholder.

---

### 15.9 `/dashboard/settings`

Settings page.

Include:

- profile
- account details
- default authentication method UI
- IP whitelist default UI placeholder
- security section placeholder

Do not implement unsupported security features.

---

### 15.10 `/dashboard/support`

Support page.

Include:

- support form or contact CTA
- ticket-style UI placeholder
- FAQ shortcuts

---

## 16. Auth Pages

Redesign login/register to match the new light proxy SaaS brand.

Keep existing auth logic.

Do not break:

- form validation
- redirects
- localStorage/session behavior
- current auth provider/context behavior

---

### 16.1 `/login`

Create a clean split layout with:

- benefit cards
- proxy dashboard preview
- email/password form
- link to register

---

### 16.2 `/register`

Create a clean onboarding layout with:

- account creation form
- trust/compliance notes
- CTA to login
- proxy-service value proposition

---

## 17. Content / Config Structure

Create reusable config files where possible:

```txt
config/site.ts
config/navigation.ts
config/footer.ts
config/products.ts
config/pricing.ts
config/locations.ts
config/useCases.ts
config/faq.ts
config/legal.ts
```

The goal is to avoid hardcoding repeated product names, prices, locations and FAQ across many components.

---

### 17.1 `products.ts`

Each product should include:

- id
- slug
- name
- shortName
- category
- status: `available` or `coming-soon`
- description
- longDescription
- startingPriceLabel
- pricing
- features
- protocols
- rotationSupport
- authMethods
- bestFor
- useCases
- ctaLabel

---

### 17.2 `pricing.ts`

Include pricing plans for:

- datacenter
- static residential / ISP
- residential
- mobile
- APIs coming soon

---

### 17.3 `locations.ts`

Include countries grouped by region:

- North America
- Europe
- Asia Pacific
- Latin America
- Middle East & Africa

---

### 17.4 `useCases.ts`

Include:

- web scraping
- SEO monitoring
- ecommerce monitoring
- ad verification
- market research
- social media management
- geo testing
- automation

---

### 17.5 `faq.ts`

Include:

- homepage FAQ
- full FAQ categories
- product FAQ
- billing FAQ
- compliance FAQ

---

### 17.6 `navigation.ts`

Include:

- header navigation
- product navigation
- use-case navigation
- dashboard navigation
- auth links

---

### 17.7 `footer.ts`

Include:

- footer columns
- product links
- resource links
- legal links
- contact links
- compliance note

---

## 18. Component Structure

Create/refactor reusable components.

Suggested structure:

```txt
components/marketing/
  SiteHeader.tsx
  SiteFooter.tsx
  Hero.tsx
  StatsStrip.tsx
  ProductCards.tsx
  PricingPreview.tsx
  HowItWorks.tsx
  LocationsPreview.tsx
  DashboardPreview.tsx
  FeatureGrid.tsx
  UseCasesGrid.tsx
  FAQBlock.tsx
  FinalCTA.tsx

components/products/
  ProductHero.tsx
  ProductFeatureGrid.tsx
  ProductPricingTable.tsx
  ProductUseCases.tsx
  ProductFAQ.tsx
  ProductCTA.tsx

components/dashboard/
  DashboardShell.tsx
  DashboardSidebar.tsx
  DashboardTopbar.tsx
  StatCard.tsx
  BuyProxyForm.tsx
  ActiveProxiesTable.tsx
  ProxyDetailsPanel.tsx
  OrdersTable.tsx
  PaymentsTable.tsx
  BalanceTopUpCard.tsx
  EmptyState.tsx

components/ui/
  Button.tsx
  Card.tsx
  Badge.tsx
  Input.tsx
  Select.tsx
  Tabs.tsx
  Table.tsx
  Accordion.tsx
```

Use existing UI components if they already exist.

If not, create simple reusable components.

---

## 19. Visual Polish Requirements

All pages should look finished, not like wireframes.

Requirements:

- consistent spacing
- consistent button styles
- consistent card styles
- consistent typography
- nice hover states
- responsive mobile menu
- responsive dashboard sidebar
- clean empty states
- no broken routes
- no old social media wording
- no Instagram/TikTok/YouTube growth content visible unless it is old backend data in a safe internal placeholder

---

## 20. Old Content Cleanup

Search the frontend for old product wording and replace visible text related to:

- followers
- likes
- views
- subscribers
- Instagram growth
- TikTok growth
- YouTube growth
- GrowPulse or old brand references, if this is the old brand
- social media boosting
- fake engagement

Replace with proxy-service content.

Do not remove backend enums or old API validation in this phase unless necessary for TypeScript/build.

This is frontend transformation first.

---

## 21. Metadata / SEO

Update page metadata where applicable:

- title
- description
- Open Graph text if present
- favicon only if project already supports it and easy

Use professional SEO copy.

Example title:

```txt
ProxyMarket — Reliable datacenter, residential and mobile proxies
```

Example description:

```txt
Buy flexible EUR-priced proxies for public web data, SEO monitoring, ecommerce monitoring and geo-specific testing.
```

---

## 22. Technical Constraints

Keep:

- TypeScript strict
- Next.js App Router conventions
- existing providers
- existing auth context
- existing balance context
- existing backend API contracts
- existing environment variable usage

Do not introduce unnecessary large dependencies.

Use Tailwind if the project already uses Tailwind.

Use Framer Motion only if already installed and appropriate.

Use Lucide icons if already installed.

Keep client/server component boundaries correct.

Do not use browser-only APIs in server components.

Do not create hydration errors.

Do not break existing build.

Do not remove `.env` usage.

---

## 23. Quality Checks

After implementing:

1. run lint
2. run build
3. fix errors caused by your changes
4. if old lint errors remain that were not caused by this task, list them clearly
5. ensure all new pages compile
6. ensure navigation links work
7. ensure responsive layout

---

## 24. Implementation Strategy

Work incrementally:

1. Inspect existing structure and identify current routes/components.
2. Create config files.
3. Create shared marketing layout components.
4. Replace homepage.
5. Add product pages.
6. Add pricing and locations pages.
7. Add use-case pages.
8. Add FAQ/contact/legal pages.
9. Redesign auth pages without breaking logic.
10. Create dashboard shell and visual dashboard pages.
11. Add frontend-only buy proxy UI with safe backend limitations.
12. Remove/replace old visible social-growth copy.
13. Run lint/build and fix issues.
14. Provide final summary.

---

## 25. Allowed Changes

Allowed:

- frontend redesign
- new pages
- new reusable components
- new config files
- visual dashboard pages
- safe route aliases
- safe redirects
- frontend mapping helpers
- placeholder/demo states clearly marked as placeholders
- minor non-breaking type additions if needed
- fixing lint/build errors caused by frontend work

---

## 26. Forbidden Changes In This Phase

Do not implement:

- real proxy provider API integration
- fake production proxy credentials
- destructive DB migrations
- full auth rewrite
- real payment provider integration
- payment webhooks
- admin provisioning system
- deleting old APIs
- breaking existing API contracts
- removing backend environment variables
- changing existing backend behavior without reason

---

## 27. Final Response Required

After implementation, respond with:

1. Summary of visual/frontend changes
2. New public routes created
3. New dashboard routes created
4. Config files created
5. Components created/refactored
6. Backend changes, if any
7. What is still mocked/pending
8. Lint/build result
9. Any important files I should review manually