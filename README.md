# ProxyMarket

A proxy marketplace website built with Next.js 16, React 19, MongoDB, Tailwind CSS 4 and Resend.

Users can browse proxy products, register, configure a proxy setup and submit a request. The team reviews each request and contacts the customer. No automatic provisioning or payment charging is implemented yet.

## Quick Start

```bash
cp .env.example .env   # fill in real values
npm install
npm run dev             # http://localhost:3000
```

## Required Environment Variables

| Variable | Purpose |
|---|---|
| `MONGODB_URI` | MongoDB connection string |
| `RESEND_API` | Resend API key for transactional email |
| `EMAIL_FROM` | Verified sender email in Resend |
| `COMPANY_EMAIL` | Server-side recipient for proxy request notifications (falls back to `EMAIL_FROM`) |
| `APP_URL` | Base URL used in email links |
| `NEXT_PUBLIC_COMPANY_NAME` | Brand name shown in UI and emails |
| `PAYMENT_TEST_MODE` | Set to `true` to enable test-mode balance top-ups |
| `NEXT_PUBLIC_PAYMENT_TEST_MODE` | Same flag exposed to frontend UI |
| `NEXT_PUBLIC_BASE_CURRENCY` | Default display currency (`EUR`) |

See `.env.example` for the full list.

## How to Test

1. Register at `/register`
2. Enable `PAYMENT_TEST_MODE=true` in `.env`
3. Go to `/dashboard/balance` and top up your balance (e.g. €25)
4. Go to `/dashboard/buy`
5. Choose a ready package or switch to "Custom setup"
6. Click "Pay from balance"
7. If balance is sufficient: order is created, balance is deducted, success card shown
8. If balance is insufficient: error shown with link to top up
9. Check `/dashboard/orders` — order shows "Paid · pending setup" status
10. Check email inbox for confirmation
11. Check `COMPANY_EMAIL` inbox for notification with paid amount
12. In MongoDB: check `proxyRequests` array (has `priceGBP`, `paidAt`, `status: "paid"`) and `transactions` array (has purchase record)

## What Works

- User registration and login
- Dashboard with proxy order stats
- Ready packages + custom proxy setup (dual flow)
- Balance-based payment (deducted from internal balance on order)
- Atomic balance deduction (prevents double-spending)
- Transaction records for purchases
- Confirmation email to user + notification email to company
- Balance display and test-mode top-up
- Currency switcher (EUR, USD, UAH — display only)
- Contact form with email delivery
- All marketing pages (homepage, pricing, products, locations, use cases, FAQ, legal)
- Responsive design across mobile/tablet/desktop

## What Is Placeholder / Not Yet Implemented

- **Active proxy credentials** (`/dashboard/proxies`) — shows demo rows only
- **Real payment provider** — balance top-up is test-mode only, no Stripe/etc.
- **Automatic proxy provisioning** — no provider API integration
- **Admin panel** — no admin routes or admin role
- **Server-side auth** — uses localStorage, no JWT cookies or middleware
- **Invoice generation** — payment history shows top-ups but no invoices
- **Settings save** — profile and proxy defaults are read-only

## Project Structure

```
app/                          Next.js App Router pages
  api/                        API routes
    proxy-requests/create/    POST — submit proxy configuration request
    user/login/               POST — authenticate user
    user/register/            POST — create account
    user/top-up/              POST — add balance (test mode)
    user/[userId]/            GET  — fetch user data
    orders/create/            POST — old social media order (unused)
    contact/                  POST — send contact form email
  dashboard/                  Dashboard pages (buy, orders, balance, proxies, settings, support)
  products/                   Product detail pages
  use-cases/                  Use case pages
  pricing/                    Pricing page
  locations/                  Locations page

components/
  dashboard/                  Dashboard components (BuyProxyForm, StatCard, EmptyState, DashboardShell)
  marketing/                  Marketing components (Hero, ProductCards, PricingCards, etc.)
  layout/                     Header, Footer, Container, AppChrome
  ui/                         Primitives (Button, Badge, Card, Input, Select, Table, Accordion, etc.)

config/                       Frontend configuration
  products.ts                 Product definitions (6 products)
  pricing.ts                  Pricing plans with EUR amounts
  currency.ts                 Exchange rates and conversion functions
  locations.ts                Country list with region/targeting data
  site.ts                     Company branding, currency list, test mode flag
  navigation.ts               Header and dashboard nav links
  faq.ts                      FAQ content
  footer.ts                   Footer column links
  legal.ts                    Legal page content
  useCases.ts                 Use case definitions

context/
  AuthContext.tsx              User state, login/logout, localStorage sync
  BalanceContext.tsx           Balance, orders, proxyRequests, transactions, currency

src/
  config/env.ts               Server-side env variable access
  lib/db/models/User.ts       Mongoose User model (orders, transactions, proxyRequests)
  lib/db/mongoose.ts           Cached MongoDB connection
  lib/email/resend.ts          All email functions (welcome, top-up, proxy request, contact)
```

## How to Change Products/Pricing

- **Add/edit products:** `config/products.ts` — add to `products` array
- **Change prices:** `config/pricing.ts` — edit `amountEUR` values; also update `baseGbPrice` in `components/dashboard/BuyProxyForm.tsx`
- **Add countries:** `config/locations.ts` — add to `locations` array
- **Change exchange rates:** `config/currency.ts` — edit `eurRates`
- **Change email templates:** `src/lib/email/resend.ts` — edit HTML strings in each function
- **Add proxy type to buy form:** also update `validProxyTypes` in `app/api/proxy-requests/create/route.ts`

## Next Steps for Production

1. Verify email delivery via Resend dashboard
2. Add real payment provider (Stripe) for balance top-ups
3. Add admin panel for reviewing proxy requests
4. Add server-side auth (JWT cookies) — env vars already exist
5. Add proxy credential model for fulfilled orders
6. Connect proxy provider API for automatic provisioning
7. Add rate limiting and input sanitization

## Database Notes

The User model has three embedded arrays:
- `orders` — old social media orders (Instagram/TikTok/YouTube enums, unused by current frontend)
- `proxyRequests` — new proxy configuration requests (active flow)
- `transactions` — top-ups and purchases

The old `orders` array and `/api/orders/create` route are untouched for backward compatibility. The current frontend never calls them.

Balance is stored internally as GBP (`balanceGBP`). Currency conversion is frontend display only.
