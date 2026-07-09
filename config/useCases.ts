import {
  BarChart3,
  Bot,
  Globe2,
  LineChart,
  Megaphone,
  Search,
  ShieldCheck,
  ShoppingBag,
  type LucideIcon,
} from "lucide-react";

export interface UseCasePoint {
  title: string;
  description: string;
}

export interface UseCaseStep {
  title: string;
  description: string;
}

export interface UseCaseFaq {
  question: string;
  answer: string;
}

export interface UseCase {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  bestProduct: string;
  icon: LucideIcon;
  /** Lead paragraphs shown under the hero. */
  overview: string[];
  /** The four capability cards. */
  points: UseCasePoint[];
  /** Why the recommended product fits this workflow. */
  productRationale: string;
  /** Numbered setup walkthrough. */
  workflow: UseCaseStep[];
  /** Use-case specific boundary drawn from the Acceptable Use Policy. */
  compliance: string;
  faqs: UseCaseFaq[];
}

export const useCases: UseCase[] = [
  {
    id: "web-scraping",
    slug: "web-scraping",
    title: "Web Scraping",
    shortTitle: "Public Web Data",
    description: "Collect public web data reliably for research, analytics and monitoring.",
    bestProduct: "Residential Proxies",
    icon: Bot,
    overview: [
      "Large-scale collection of public web data fails for one predictable reason: every request leaves from the same address. Rate limits, CAPTCHAs and IP bans follow, and a crawl that ran cleanly at a hundred pages stalls at ten thousand.",
      "Routing a crawler through a proxy pool spreads requests across many addresses and regions, so each target sees normal traffic volumes rather than a burst from a single host. You control the exit country, the session behaviour and the request rate.",
      "Virenza Proxy supports HTTP, HTTPS and SOCKS5, username/password or IP whitelist authentication, and both rotating and sticky sessions — the building blocks most scraping frameworks expect.",
    ],
    points: [
      {
        title: "Public data collection",
        description:
          "Route crawlers, headless browsers and HTTP clients through residential or datacenter exits without rewriting your pipeline.",
      },
      {
        title: "Rotating sessions",
        description:
          "Get a fresh IP per request for wide crawls, or hold a sticky session when a target requires continuity across several pages.",
      },
      {
        title: "Country targeting",
        description:
          "Select the exit country so that region-specific content, pricing and availability resolve the way a local visitor would see them.",
      },
      {
        title: "Usage visibility",
        description:
          "Track bandwidth, request volume and active sessions from the dashboard so a runaway job is visible before it becomes an invoice.",
      },
    ],
    productRationale:
      "Residential proxies use IP addresses associated with real consumer internet connections, which is the profile most public websites treat as ordinary traffic. For high-throughput crawls of targets that do not scrutinise network origin, datacenter proxies are faster and cheaper.",
    workflow: [
      {
        title: "Pick a proxy type",
        description:
          "Start with residential for sensitive targets, or datacenter when throughput and cost matter more than network origin.",
      },
      {
        title: "Configure targeting and rotation",
        description:
          "Choose the exit country, then decide between rotating exits for breadth or sticky sessions for multi-step flows.",
      },
      {
        title: "Point your crawler at the endpoint",
        description:
          "Set the proxy in your HTTP client, Scrapy, Playwright or Puppeteer configuration and authenticate with credentials or a whitelisted IP.",
      },
      {
        title: "Throttle and monitor",
        description:
          "Set a request rate your target can absorb, then watch bandwidth and error rates in the dashboard and adjust concurrency.",
      },
    ],
    compliance:
      "Scraping must be limited to publicly accessible data. You remain responsible for complying with applicable law, platform terms, intellectual property rights and data protection rules. Do not use the Service to bypass authentication, paywalls or access controls, or to collect personal data without a lawful basis.",
    faqs: [
      {
        question: "Rotating or sticky sessions for scraping?",
        answer:
          "Rotating exits suit stateless crawls where each URL is independent. Sticky sessions suit multi-step flows — pagination, search-then-detail, or anything that depends on server-side session state.",
      },
      {
        question: "Will a proxy stop me from being blocked?",
        answer:
          "No. Proxies distribute your traffic, but websites may still block, rate-limit or challenge requests based on headers, fingerprints, behaviour or request volume. We do not guarantee access to any specific third-party platform.",
      },
      {
        question: "How much bandwidth does a crawl use?",
        answer:
          "It depends on page weight and whether you render JavaScript. HTML-only crawls are typically a few hundred kilobytes per page; full browser rendering with images can be ten times that. Block unnecessary asset types to cut usage.",
      },
    ],
  },
  {
    id: "seo-monitoring",
    slug: "seo-monitoring",
    title: "SEO Monitoring",
    shortTitle: "SEO Monitoring",
    description: "Run rank tracking, SERP checks and geo-specific search visibility workflows.",
    bestProduct: "Residential Proxies",
    icon: Search,
    overview: [
      "Search results are personalised by location, and often by network. A ranking check run from your office tells you how your office sees the results — not how a customer in Berlin, São Paulo or Toronto sees them.",
      "Proxies let you issue each ranking query from the region you actually care about, so your rank tracker records the results a local searcher would receive. Repeated queries spread across a pool also avoid the rate limits that a single address hits within minutes.",
      "Combine country targeting with rotating exits to build a rank-tracking pipeline that runs on a schedule without tripping search engine protections.",
    ],
    points: [
      {
        title: "Regional SERP checks",
        description:
          "Query search engines from the country you are ranking in and capture results as a local user would see them.",
      },
      {
        title: "Rank reporting",
        description:
          "Run scheduled position checks across keyword sets and regions without every request originating from one address.",
      },
      {
        title: "Search visibility QA",
        description:
          "Verify that indexed titles, descriptions, rich results and sitelinks render correctly across the markets you target.",
      },
      {
        title: "Competitive tracking",
        description:
          "Watch how competitor listings move across regions and spot where their visibility differs from yours.",
      },
    ],
    productRationale:
      "Search engines apply the closest scrutiny to automated queries, and residential IPs carry the network profile they treat as ordinary. Static ISP proxies are a reasonable middle ground when you want a stable address per market.",
    workflow: [
      {
        title: "Map keywords to markets",
        description: "Decide which keyword sets need which exit countries before you provision anything.",
      },
      {
        title: "Provision one exit per market",
        description:
          "Select residential proxies with country targeting, adding city targeting where local-pack results matter.",
      },
      {
        title: "Wire up your rank tracker",
        description:
          "Configure the proxy endpoint in your tracker or custom script, using HTTP or SOCKS5 with your credentials.",
      },
      {
        title: "Pace the schedule",
        description:
          "Spread checks across the day rather than firing an entire keyword set at once. Slower schedules produce cleaner data.",
      },
    ],
    compliance:
      "SEO monitoring must respect search engine terms and applicable law. Query volumes should stay within reasonable limits, and results must not be used to manipulate rankings, generate fake engagement or misrepresent search behaviour.",
    faqs: [
      {
        question: "Do I need city-level targeting?",
        answer:
          "Only if you track local-pack or map results, where the searcher's city materially changes the output. Country targeting is sufficient for most organic rank tracking.",
      },
      {
        question: "How accurate is geolocation?",
        answer:
          "Geolocation is derived from third-party databases and may occasionally be imprecise or out of date. Country-level accuracy is generally reliable; city and carrier data is best-effort.",
      },
      {
        question: "Is there a SERP API?",
        answer:
          "A SERP scraping API is on our roadmap. Until it ships, run your own tracker through our residential proxies — the results are equivalent, you just manage the parsing.",
      },
    ],
  },
  {
    id: "ecommerce-monitoring",
    slug: "ecommerce-monitoring",
    title: "Ecommerce Monitoring",
    shortTitle: "Ecommerce",
    description: "Monitor prices, availability and product catalogs across regions.",
    bestProduct: "Datacenter Proxies",
    icon: ShoppingBag,
    overview: [
      "Retail sites show different prices, currencies, shipping options and stock levels depending on where the visitor appears to be. A pricing team checking from one location is reading one slice of a much larger picture.",
      "Routing catalogue checks through proxies in each target market gives you the prices your customers actually see. Run it on a schedule and you get a time series instead of a snapshot.",
      "Most retail catalogue pages are served without aggressive network-origin checks, which makes datacenter proxies the efficient default: high throughput, low cost per gigabyte.",
    ],
    points: [
      {
        title: "Price monitoring",
        description:
          "Track competitor pricing per market and detect changes within hours rather than at the end of a quarter.",
      },
      {
        title: "Stock checks",
        description:
          "Poll availability and delivery estimates across regions to see where products go out of stock first.",
      },
      {
        title: "Catalog research",
        description:
          "Collect public product attributes, variants and category structures to benchmark assortment against competitors.",
      },
      {
        title: "Regional insights",
        description:
          "Compare currency, tax display, promotions and shipping terms as they render for a visitor in each country.",
      },
    ],
    productRationale:
      "Datacenter proxies deliver the throughput and per-gigabyte economics that scheduled catalogue crawls need. Switch specific targets to residential proxies if you find them applying stricter checks on network origin.",
    workflow: [
      {
        title: "List targets and markets",
        description: "Define the retailers, category pages and countries you need coverage for.",
      },
      {
        title: "Provision datacenter exits",
        description: "Select country targeting per market and pick pay-per-GB or a fixed monthly plan based on volume.",
      },
      {
        title: "Schedule the crawl",
        description:
          "Run catalogue passes on a fixed cadence and store results with timestamps so price movements stay comparable.",
      },
      {
        title: "Escalate blocked targets",
        description:
          "If a retailer starts challenging datacenter traffic, move just that target to residential exits rather than migrating the whole job.",
      },
    ],
    compliance:
      "Collect only publicly available product data. Do not attempt to access accounts, checkout flows, internal APIs behind authentication, or personal data of customers or sellers. Respect each site's terms and applicable law.",
    faqs: [
      {
        question: "Datacenter or residential for retail sites?",
        answer:
          "Start with datacenter. It is faster and cheaper, and most catalogue pages are public. Move to residential only for the specific targets that block you.",
      },
      {
        question: "How often should I poll prices?",
        answer:
          "Match the cadence to how often the retailer actually changes prices. Hourly polling of a site that updates weekly generates cost and load with no additional signal.",
      },
      {
        question: "Can I monitor marketplace listings?",
        answer:
          "Public marketplace listing pages, yes, subject to the marketplace's terms. Seller dashboards, buyer accounts and anything behind a login are out of scope.",
      },
    ],
  },
  {
    id: "ad-verification",
    slug: "ad-verification",
    title: "Ad Verification",
    shortTitle: "Ad Verification",
    description: "Check ad placement, regional campaign visibility and brand safety.",
    bestProduct: "Mobile Proxies",
    icon: Megaphone,
    overview: [
      "You buy an impression in one country and it renders on a device in another, next to content you never approved, or it does not render at all. Ad verification is the practice of checking, independently, what actually appeared.",
      "Proxies let you load the placement as a real visitor in the target market — on a mobile carrier network when the campaign is mobile-targeted — and capture the creative, the surrounding content and the landing page it points to.",
      "This is also how ad fraud surfaces: placements that serve to a verification tool from one region but not another, or landing pages that redirect only for certain networks.",
    ],
    points: [
      {
        title: "Geo-specific campaign QA",
        description:
          "Load placements from each targeted country and confirm the creative, language and offer match what you bought.",
      },
      {
        title: "Placement checks",
        description:
          "Verify that ads appear on the inventory you approved and in the position the publisher reported.",
      },
      {
        title: "Mobile network context",
        description:
          "Check mobile-targeted campaigns from mobile carrier IPs, where creative and bidding often behave differently than on fixed lines.",
      },
      {
        title: "Brand safety",
        description:
          "Capture the content surrounding your placement so you can act on adjacencies that breach your brand guidelines.",
      },
    ],
    productRationale:
      "Ad platforms and verification targets differentiate sharply between mobile carrier networks and fixed-line connections. Mobile proxies reproduce the network context of the device your campaign was bought for; residential proxies cover desktop placements.",
    workflow: [
      {
        title: "Define the matrix",
        description: "List the campaigns, target countries and device contexts you need to verify.",
      },
      {
        title: "Select mobile or residential exits",
        description:
          "Use mobile proxies for mobile inventory and residential for desktop, with country targeting for each market.",
      },
      {
        title: "Automate the capture",
        description:
          "Drive a headless browser through the proxy, load the placement and record the creative, page context and landing URL.",
      },
      {
        title: "Review discrepancies",
        description:
          "Compare captured placements against your media plan and raise anything that does not match with the publisher or network.",
      },
    ],
    compliance:
      "Ad verification must not involve click fraud, impression fraud, artificial engagement or interference with ad delivery. Load placements to observe them, not to manipulate campaign metrics or a competitor's spend.",
    faqs: [
      {
        question: "Why mobile proxies specifically?",
        answer:
          "Mobile inventory is bought against carrier networks. A placement loaded from a datacenter IP may serve different creative, or nothing at all, so the check would not reflect what a real user saw.",
      },
      {
        question: "Can I verify competitor campaigns?",
        answer:
          "You can observe publicly served advertising. You may not click through with intent to consume competitor budget, or otherwise interfere with their delivery.",
      },
      {
        question: "How stable are mobile sessions?",
        answer:
          "Mobile networks rotate addresses on their own schedule and session duration varies by carrier and region. Design captures so that a mid-session IP change does not invalidate the result.",
      },
    ],
  },
  {
    id: "market-research",
    slug: "market-research",
    title: "Market Research",
    shortTitle: "Market Research",
    description: "Gather public market signals, trends and regional competitive intelligence.",
    bestProduct: "Residential Proxies",
    icon: LineChart,
    overview: [
      "Public web data is the widest available source of market signal: pricing pages, job postings, product launches, press coverage, review volumes, regional promotions. It is also fragmented by geography.",
      "Proxies remove the geographic constraint. Research collected from exits across your target markets reflects what participants in those markets actually see, not what your office network is served.",
      "Residential exits give the broadest access to region-gated content, and country targeting lets you build a comparable dataset market by market.",
    ],
    points: [
      {
        title: "Regional insights",
        description:
          "Collect the same public data points across countries and compare them without geographic distortion.",
      },
      {
        title: "Trend monitoring",
        description:
          "Track how pricing, positioning and messaging shift over time by capturing public pages on a schedule.",
      },
      {
        title: "Public data research",
        description:
          "Aggregate publicly available signals — listings, reviews, launches, coverage — into a structured research set.",
      },
      {
        title: "Competitive intelligence",
        description:
          "Observe how competitors present themselves in each market, including localisation, pricing and promotional cadence.",
      },
    ],
    productRationale:
      "Residential proxies reach region-gated content that datacenter ranges are often excluded from, and country targeting keeps each market's dataset clean. Datacenter exits work well for high-volume collection from targets that do not gate by region.",
    workflow: [
      {
        title: "Define the question",
        description:
          "Decide what decision the research informs before you decide what to collect. It determines both scope and cadence.",
      },
      {
        title: "Provision per market",
        description: "Select residential proxies with country targeting for each market in scope.",
      },
      {
        title: "Collect on a schedule",
        description:
          "Capture the same sources at the same cadence across markets, so the comparison holds over time.",
      },
      {
        title: "Normalise and analyse",
        description:
          "Store raw captures alongside parsed fields — source pages change, and you will want to re-parse without re-crawling.",
      },
    ],
    compliance:
      "Market research must rely on publicly accessible information. Do not collect personal data without a lawful basis, access non-public or confidential material, or use the Service to infer or enrich personal data about identifiable individuals.",
    faqs: [
      {
        question: "Is public web data legal to collect?",
        answer:
          "It depends on the data, the jurisdiction, the source's terms and what you do with it. We do not provide legal advice on whether a particular collection activity is lawful — that assessment is yours.",
      },
      {
        question: "Can I collect reviews and ratings?",
        answer:
          "Publicly displayed reviews, generally yes, subject to the platform's terms. Reviewer names, profiles and other identifying details are personal data and need a lawful basis.",
      },
      {
        question: "How many countries can I cover?",
        answer:
          "Country targeting is available across our supported locations. Check the locations page for current coverage before scoping a study.",
      },
    ],
  },
  {
    id: "social-media-management",
    slug: "social-media-management",
    title: "Social Media Management",
    shortTitle: "Social Management",
    description: "Support legitimate team workflows with stable network identities and clear compliance controls.",
    bestProduct: "Static ISP Proxies",
    icon: ShieldCheck,
    overview: [
      "Agencies and in-house teams manage client accounts from many locations, often through shared tooling. Platforms read that as unusual: the same account reached from a dozen networks in a day tends to attract security challenges.",
      "A stable, dedicated exit address per client account gives the platform a consistent network identity, so routine work by an authorised team does not read as a compromise.",
      "This is a legitimacy tool, not an evasion tool. It applies to accounts your team is authorised to operate, and nothing else.",
    ],
    points: [
      {
        title: "Team workflows",
        description:
          "Give distributed teams a single consistent exit per client account rather than a different network each session.",
      },
      {
        title: "Stable sessions",
        description:
          "Static ISP proxies hold the same address for the life of the plan, so session continuity is preserved across logins.",
      },
      {
        title: "IP whitelist controls",
        description:
          "Authenticate by whitelisted IP instead of credentials where your tooling supports it, keeping access scoped to your infrastructure.",
      },
      {
        title: "Compliance-first positioning",
        description:
          "Built for authorised account management. Mass registration, automated engagement and platform manipulation are prohibited.",
      },
    ],
    productRationale:
      "Static ISP proxies combine the stability of a dedicated address with an ISP-associated network profile, which is what social platforms expect from a normal user. Rotating exits are actively counterproductive here — a changing address is the pattern platforms flag.",
    workflow: [
      {
        title: "Map accounts to exits",
        description: "Assign one static ISP address per client account and keep the mapping stable over time.",
      },
      {
        title: "Choose an authentication method",
        description:
          "Use IP whitelisting where your management tool runs on fixed infrastructure, or username/password otherwise.",
      },
      {
        title: "Route only account traffic",
        description:
          "Send management-tool traffic through the assigned exit. Do not share one address across unrelated accounts.",
      },
      {
        title: "Keep the mapping documented",
        description:
          "Record which exit serves which client so that an address change is a deliberate action, not an accident.",
      },
    ],
    compliance:
      "This use case covers accounts you own or are authorised to manage. Mass account creation, automated or fake engagement, impersonation, platform manipulation, evasion of account bans and circumvention of platform security controls are prohibited under our Acceptable Use Policy and will result in termination.",
    faqs: [
      {
        question: "Can I use this to create many accounts?",
        answer:
          "No. Mass account creation in breach of platform rules is prohibited and grounds for immediate termination without refund.",
      },
      {
        question: "Will this stop platform security challenges?",
        answer:
          "It removes one common trigger — a constantly changing network origin. Platforms use many other signals, and we do not guarantee access to any third-party platform.",
      },
      {
        question: "Why not residential or mobile proxies?",
        answer:
          "Both rotate. For account management you want the opposite: one address, held steady, for as long as the account is under management.",
      },
    ],
  },
  {
    id: "geo-testing",
    slug: "geo-testing",
    title: "Geo-specific Testing",
    shortTitle: "Geo Testing",
    description: "Test localized content, pricing and application behavior from target regions.",
    bestProduct: "Datacenter Proxies",
    icon: Globe2,
    overview: [
      "If your application serves different content, currency, tax display, legal notices or feature flags by region, then testing from one office network verifies exactly one of those paths.",
      "Proxies let QA and engineering load the application as a visitor in any supported country, before a release rather than after a support ticket.",
      "Your own infrastructure rarely blocks your own traffic, so datacenter proxies are the natural fit: fast, cheap and predictable in CI.",
    ],
    points: [
      {
        title: "Localization QA",
        description:
          "Verify translations, currency formats, date formats and legal notices render correctly for each target region.",
      },
      {
        title: "Country selection",
        description: "Load your application from any supported country and confirm geo-routing behaves as designed.",
      },
      {
        title: "City targeting",
        description:
          "Where available, narrow to city level to test location-dependent features such as delivery zones or store locators.",
      },
      {
        title: "Developer workflows",
        description:
          "Standard HTTP and SOCKS5 endpoints drop into CI pipelines, test runners and local development without special tooling.",
      },
    ],
    productRationale:
      "Datacenter proxies are the pragmatic choice for testing your own systems: throughput is high, cost is low, and network origin does not matter because you control the target. Use residential exits only when testing against a third party that gates datacenter ranges.",
    workflow: [
      {
        title: "Enumerate the regions",
        description: "List every country whose behaviour differs in your application — that is your test matrix.",
      },
      {
        title: "Provision datacenter exits",
        description: "Select country targeting per region, adding city targeting where a feature depends on it.",
      },
      {
        title: "Wire into the test runner",
        description:
          "Configure the proxy in Playwright, Cypress, Selenium or your HTTP client and parameterise the exit country per test case.",
      },
      {
        title: "Assert on geo behaviour",
        description:
          "Assert currency, language, legal notices and feature availability per region, and run the suite on every release.",
      },
    ],
    compliance:
      "Test only systems you own or are authorised to test. Using proxies to probe, scan or exercise third-party infrastructure without permission is prohibited and may be unlawful.",
    faqs: [
      {
        question: "Can I use this in CI?",
        answer:
          "Yes. Authenticate by whitelisted IP if your runners have stable addresses, or by username and password otherwise, and set the proxy per test case.",
      },
      {
        question: "How precise is city targeting?",
        answer:
          "City targeting is offered where available and is derived from geolocation databases, which are best-effort. Do not build assertions that depend on city precision being exact.",
      },
      {
        question: "Will a proxy affect my performance measurements?",
        answer:
          "Yes — routing adds latency. Use proxies to test correctness of geo-dependent behaviour, not to benchmark response times.",
      },
    ],
  },
  {
    id: "automation",
    slug: "automation",
    title: "Automation Workflows",
    shortTitle: "Automation",
    description: "Run business automation and monitoring tasks with predictable proxy configuration.",
    bestProduct: "Datacenter Proxies",
    icon: BarChart3,
    overview: [
      "Scheduled business automation — uptime checks, content monitoring, data synchronisation, internal reporting — accumulates request volume quickly, and volume from a single address is what triggers rate limiting.",
      "A predictable proxy configuration gives these jobs a stable endpoint, a known exit region and traffic controls you can reason about when something goes wrong at three in the morning.",
      "Datacenter proxies give you fixed endpoints, high throughput and both HTTP and SOCKS5, which is what most automation stacks already speak.",
    ],
    points: [
      {
        title: "Predictable endpoints",
        description:
          "Fixed proxy endpoints that behave the same on every run, so a failing job points at your code rather than the network.",
      },
      {
        title: "Protocol choice",
        description:
          "HTTP, HTTPS and SOCKS5 support covers HTTP clients, headless browsers and anything that speaks a socket.",
      },
      {
        title: "Traffic controls",
        description:
          "Rate and concurrency limits keep an automation bug from consuming a month of bandwidth in an afternoon.",
      },
      {
        title: "Dashboard management",
        description:
          "See usage per proxy, rotate credentials and adjust configuration without redeploying your automation.",
      },
    ],
    productRationale:
      "Automation values predictability over network profile. Datacenter proxies give you stable endpoints and the best per-request economics. Reach for residential exits only when a specific target treats datacenter ranges differently.",
    workflow: [
      {
        title: "Inventory the jobs",
        description: "List the automated tasks, their targets, their cadence and their expected request volume.",
      },
      {
        title: "Provision by region",
        description:
          "Select datacenter proxies with country targeting where the job's target is region-dependent, and pick a plan that fits the volume.",
      },
      {
        title: "Configure with retries and backoff",
        description:
          "Set the proxy in your job runner and add exponential backoff, so transient failures do not become retry storms.",
      },
      {
        title: "Alert on usage anomalies",
        description:
          "Watch bandwidth and error rates in the dashboard and alert on deviation. A job that suddenly doubles its traffic is a bug.",
      },
    ],
    compliance:
      "Automation must not degrade our network or third-party systems. Traffic flooding, vulnerability scanning without authorisation, denial-of-service behaviour, credential attacks and unauthorised access are prohibited and monitored.",
    faqs: [
      {
        question: "Are there concurrency limits?",
        answer:
          "Yes. Rate, concurrency and bandwidth limits apply per product and plan, and we may apply fair usage measures to protect network integrity. Limits for your plan are shown in the dashboard.",
      },
      {
        question: "What happens if a job runs away?",
        answer:
          "Bandwidth is consumed against your plan, and sustained abnormal traffic may trigger throttling or temporary suspension. Set alerts on the usage figures in the dashboard.",
      },
      {
        question: "Can I rotate credentials without downtime?",
        answer:
          "Yes. Issue new credentials from the dashboard, roll them into your job configuration, then retire the old ones.",
      },
    ],
  },
];

export function getUseCaseBySlug(slug: string) {
  return useCases.find((useCase) => useCase.slug === slug);
}
