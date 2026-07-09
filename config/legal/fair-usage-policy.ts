import type { LegalDoc } from "./types";

export const fairUsagePolicy: LegalDoc = {
  slug: "fair-usage-policy",
  title: "Proxy Service & Fair Usage Policy",
  updated: "July 9, 2026",
  intro: [
    {
      type: "p",
      text: "This Proxy Service & Fair Usage Policy (“Policy”) explains how proxy services provided by VIRENZA LTD, trading as Virenza Proxy, are supplied, configured, measured, limited, replaced, maintained and used fairly.",
    },
    {
      type: "p",
      text: "This Policy forms part of our Terms & Conditions and applies to all access to and use of the Virenza Proxy website, dashboard, proxy infrastructure, credentials, APIs, tools, support services and related services (together, the “Service”).",
    },
    {
      type: "p",
      text: "The Service is operated by:",
    },
    {
      type: "p",
      text: "VIRENZA LTD",
    },
    {
      type: "p",
      text: "Company number: 17231719",
    },
    {
      type: "p",
      text: "Registered office: Dept 6814, 196 High Road, Wood Green, London, United Kingdom, N22 8HH",
    },
    {
      type: "p",
      text: "Email: info@virenzaproxy.com",
    },
    {
      type: "p",
      text: "Website: virenzaproxy.com",
    },
    {
      type: "p",
      text: "In this Policy, “Virenza Proxy”, “we”, “us” and “our” refer to VIRENZA LTD. “User”, “customer”, “you” and “your” refer to any person or organisation accessing or using the Service.",
    },
    {
      type: "p",
      text: "By purchasing, accessing or using the Service, you agree to comply with this Policy.",
    },
  ],
  sections: [
    {
      title: "Purpose of this Policy",
      blocks: [
        {
          type: "p",
          text: "Proxy services are shared, technical and network-dependent services. Their performance may depend on product type, location, routing, customer configuration, upstream providers, third-party target websites, request patterns, fair usage controls, maintenance and abuse prevention measures.",
        },
        {
          type: "p",
          text: "This Policy is designed to:",
        },
        {
          type: "list",
          items: [
            "explain how our proxy products work",
            "set realistic service expectations",
            "protect network stability",
            "prevent excessive or abusive use",
            "describe fair usage rules",
            "explain traffic, sessions, rotation and location behaviour",
            "clarify replacement and support rules",
            "protect other users, our providers and third parties",
            "reduce disputes about third-party blocking, speed, usage or availability",
          ],
        },
        {
          type: "p",
          text: "This Policy should be read together with our Terms & Conditions, Acceptable Use Policy, Digital Delivery / Provisioning Policy, Refund & Cancellation Policy and Privacy Policy.",
        },
      ],
    },
    {
      title: "Nature of Proxy Services",
      blocks: [
        {
          type: "p",
          text: "Virenza Proxy provides access to proxy infrastructure and related tools for lawful business, technical, research and monitoring purposes.",
        },
        {
          type: "p",
          text: "Depending on the product selected and availability, the Service may include:",
        },
        {
          type: "list",
          items: [
            "datacenter proxies",
            "static ISP proxies",
            "residential proxies",
            "mobile proxies",
            "rotating proxies",
            "sticky sessions",
            "HTTP, HTTPS and SOCKS5 proxy access",
            "username/password authentication",
            "country or location configuration",
            "dashboard-based access management",
            "usage statistics",
            "API access, where enabled",
            "future scraping or data access tools, where made available by us",
          ],
        },
        {
          type: "p",
          text: "Proxy services act as an intermediary connection layer between your software, browser, application, script or system and third-party websites, platforms, applications or online services.",
        },
        {
          type: "p",
          text: "We provide the proxy access layer. We do not control third-party target websites, their acceptance of proxy traffic, their anti-bot systems, their account rules, their rate limits, their content, their availability or their legal terms.",
        },
      ],
    },
    {
      title: "Product Descriptions",
      blocks: [
        {
          type: "p",
          text: "Product descriptions on our website, dashboard, pricing pages, order forms, invoices, help materials or written offers are provided to help you understand the general nature of each product.",
        },
        {
          type: "p",
          text: "Product descriptions may include information such as:",
        },
        {
          type: "list",
          items: [
            "proxy type",
            "available countries or regions",
            "supported protocols",
            "rotation options",
            "sticky session options",
            "bandwidth or traffic limits",
            "access duration",
            "number of proxies",
            "concurrency rules",
            "authentication method",
            "indicative speed or performance",
            "intended use cases",
            "restrictions or special conditions",
          ],
        },
        {
          type: "p",
          text: "Product descriptions are not guarantees unless expressly stated as binding in a written agreement signed or confirmed by us.",
        },
      ],
    },
    {
      title: "Datacenter Proxies",
      blocks: [
        {
          type: "p",
          text: "Datacenter proxies use IP infrastructure associated with datacenter, hosting, cloud or server environments.",
        },
        {
          type: "p",
          text: "They may be suitable for lawful workflows that require speed, scale, automation, monitoring, testing, public data access or technical reliability.",
        },
        {
          type: "p",
          text: "Datacenter proxies may be more likely to be detected, challenged, blocked or rate-limited by some third-party websites compared with ISP, residential or mobile proxies.",
        },
        {
          type: "p",
          text: "We do not guarantee that datacenter proxies will work with any specific third-party website, platform, account, application, marketplace, search engine, advertising network or online service.",
        },
      ],
    },
    {
      title: "Static ISP Proxies",
      blocks: [
        {
          type: "p",
          text: "Static ISP proxies are designed to provide stable proxy access using IP addresses associated with internet service provider-type ranges where available.",
        },
        {
          type: "p",
          text: "They may be suitable for lawful workflows requiring more stable sessions or more consistent IP identity than rotating products.",
        },
        {
          type: "p",
          text: "Availability, speed, routing, geolocation, provider assignment, recognition by third-party databases and third-party acceptance may vary.",
        },
        {
          type: "p",
          text: "We do not guarantee that a static ISP proxy will be recognised by any third-party platform as residential, ISP, static, local or suitable for any particular use case.",
        },
      ],
    },
    {
      title: "Residential Proxies",
      blocks: [
        {
          type: "p",
          text: "Residential proxy products may provide access to IP addresses associated with residential internet connections through approved network sources, routing arrangements or infrastructure partners.",
        },
        {
          type: "p",
          text: "Residential proxies may be rotating, session-based, traffic-based or otherwise configured depending on the product.",
        },
        {
          type: "p",
          text: "Residential proxy availability may vary based on:",
        },
        {
          type: "list",
          items: [
            "country",
            "region",
            "city",
            "time of day",
            "network conditions",
            "provider availability",
            "demand",
            "lawful sourcing rules",
            "technical limitations",
            "abuse controls",
          ],
        },
        {
          type: "p",
          text: "Residential proxies are not guaranteed to provide constant access to a specific IP address, region, city, ISP or device type unless expressly stated in the applicable product terms.",
        },
      ],
    },
    {
      title: "Mobile Proxies",
      blocks: [
        {
          type: "p",
          text: "Mobile proxy products may provide access to IP addresses associated with mobile networks where available.",
        },
        {
          type: "p",
          text: "Mobile proxy behaviour may be affected by:",
        },
        {
          type: "list",
          items: [
            "mobile carrier routing",
            "NAT or shared carrier infrastructure",
            "signal or provider conditions",
            "carrier-side IP rotation",
            "location routing",
            "speed variation",
            "latency variation",
            "upstream provider rules",
            "availability of mobile pools",
            "third-party geolocation databases",
          ],
        },
        {
          type: "p",
          text: "Mobile IPs may change more frequently than static products. We do not guarantee permanent access to a specific mobile IP, carrier, city, ASN or location unless expressly agreed in writing.",
        },
      ],
    },
    {
      title: "Rotating Proxies",
      blocks: [
        {
          type: "p",
          text: "Rotating proxies are designed to change the exit IP address according to product configuration, routing logic, session settings, provider behaviour or availability.",
        },
        {
          type: "p",
          text: "Rotation may occur based on:",
        },
        {
          type: "list",
          items: [
            "each request",
            "session expiry",
            "time interval",
            "traffic behaviour",
            "gateway logic",
            "manual configuration",
            "provider rules",
            "network availability",
            "abuse prevention measures",
            "technical maintenance",
          ],
        },
        {
          type: "p",
          text: "We do not guarantee that every request will use a different IP unless the product description expressly states this.",
        },
        {
          type: "p",
          text: "Rotation behaviour may vary between datacenter, ISP, residential and mobile products.",
        },
      ],
    },
    {
      title: "Sticky Sessions",
      blocks: [
        {
          type: "p",
          text: "Sticky sessions are designed to maintain the same proxy IP or session identity for a limited period where technically available.",
        },
        {
          type: "p",
          text: "Sticky session duration may depend on:",
        },
        {
          type: "list",
          items: [
            "product type",
            "selected location",
            "upstream provider rules",
            "connection stability",
            "user configuration",
            "gateway behaviour",
            "IP availability",
            "maintenance",
            "abuse controls",
          ],
        },
        {
          type: "p",
          text: "Sticky sessions are not permanent IP reservations unless expressly stated. A sticky session may end or change because of timeout, network changes, provider limitations, failed connections, system maintenance, IP unavailability or policy enforcement.",
        },
        {
          type: "p",
          text: "We do not guarantee that a sticky session will remain accepted by any third-party platform for the full session period.",
        },
      ],
    },
    {
      title: "Protocols",
      blocks: [
        {
          type: "p",
          text: "The Service may support one or more proxy protocols, including:",
        },
        {
          type: "list",
          items: [
            "HTTP",
            "HTTPS",
            "SOCKS5",
          ],
        },
        {
          type: "p",
          text: "Protocol availability depends on the product, dashboard settings, endpoint, gateway, technical setup and provider support.",
        },
        {
          type: "p",
          text: "You are responsible for choosing and configuring the correct protocol in your software, browser, application, script or integration.",
        },
        {
          type: "p",
          text: "We are not responsible for issues caused by incorrect protocol selection, unsupported software, customer-side misconfiguration, firewall restrictions or third-party target restrictions.",
        },
      ],
    },
    {
      title: "Authentication",
      blocks: [
        {
          type: "p",
          text: "The Service may use authentication methods such as:",
        },
        {
          type: "list",
          items: [
            "username and password",
            "IP allowlisting",
            "API keys",
            "access tokens",
            "dashboard-generated credentials",
            "custom authentication settings",
          ],
        },
        {
          type: "p",
          text: "You are responsible for keeping all credentials confidential and secure.",
        },
        {
          type: "p",
          text: "You must not share, publish, leak, sell, sublicense, resell or distribute credentials unless expressly authorised by us in writing.",
        },
        {
          type: "p",
          text: "We may reset, rotate, disable or replace credentials where necessary for security, abuse prevention, maintenance, fraud review, provider requirements or policy enforcement.",
        },
      ],
    },
    {
      title: "Location Targeting",
      blocks: [
        {
          type: "p",
          text: "Where location targeting is available, you may be able to select or request proxy access by country, region, city, ASN, carrier or other location-related criteria.",
        },
        {
          type: "p",
          text: "Location targeting is provided on a commercially reasonable basis and is subject to availability.",
        },
        {
          type: "p",
          text: "Geolocation is not always exact. Different third-party databases may classify the same IP address differently.",
        },
        {
          type: "p",
          text: "We do not guarantee that:",
        },
        {
          type: "list",
          items: [
            "an IP address will be recognised as the selected location by every third-party website",
            "country, region or city targeting will be perfectly accurate",
            "a third-party platform will treat the IP as local",
            "an IP will remain in the same geolocation database category",
            "an IP will be accepted for region-specific accounts, content, advertising, search results or platform access",
          ],
        },
        {
          type: "p",
          text: "Geolocation differences do not automatically mean that the Service is defective.",
        },
      ],
    },
    {
      title: "IP Allocation",
      blocks: [
        {
          type: "p",
          text: "Depending on the product, proxy access may be provided through:",
        },
        {
          type: "list",
          items: [
            "dedicated IPs",
            "shared IPs",
            "rotating pools",
            "gateways",
            "static endpoints",
            "country gateways",
            "mobile gateways",
            "API-based allocation",
            "dashboard-managed configurations",
          ],
        },
        {
          type: "p",
          text: "Unless a product expressly includes dedicated IPs, you should assume that proxy infrastructure may be shared with other users and may rotate or change according to product rules.",
        },
        {
          type: "p",
          text: "We may change, rotate, replace, withdraw or reassign IPs, gateways or endpoints where necessary for maintenance, availability, provider requirements, security, abuse prevention or operational reasons.",
        },
      ],
    },
    {
      title: "Dedicated and Shared Resources",
      blocks: [
        {
          type: "p",
          text: "Some products may provide dedicated resources. Other products may rely on shared pools.",
        },
        {
          type: "p",
          text: "For shared resources, performance and availability may be affected by:",
        },
        {
          type: "list",
          items: [
            "overall network load",
            "user demand",
            "fair usage limits",
            "provider capacity",
            "location popularity",
            "abuse prevention controls",
            "technical maintenance",
          ],
        },
        {
          type: "p",
          text: "Shared proxy access does not guarantee exclusive use of any IP address, gateway, bandwidth path, ASN, provider, subnet or location unless expressly stated.",
        },
        {
          type: "p",
          text: "Dedicated resources may still be affected by upstream provider issues, routing changes, maintenance, target website blocking and fair usage rules.",
        },
      ],
    },
    {
      title: "Bandwidth and Traffic Measurement",
      blocks: [
        {
          type: "p",
          text: "For traffic-based products, usage may be measured by our systems and/or provider systems.",
        },
        {
          type: "p",
          text: "Traffic may include, depending on product rules:",
        },
        {
          type: "list",
          items: [
            "upload traffic",
            "download traffic",
            "request traffic",
            "response traffic",
            "connection overhead",
            "retries",
            "failed requests",
            "API usage",
            "authentication traffic",
            "traffic generated by your scripts, tools or integrations",
          ],
        },
        {
          type: "p",
          text: "Dashboard figures may be delayed, rounded, estimated, synchronised periodically or adjusted after provider reconciliation.",
        },
        {
          type: "p",
          text: "Our internal records are used for billing, support, fair usage, dispute and refund purposes.",
        },
        {
          type: "p",
          text: "You are responsible for monitoring your own usage and ensuring that your tools do not consume traffic unintentionally.",
        },
      ],
    },
    {
      title: "Unlimited or High-Volume Products",
      blocks: [
        {
          type: "p",
          text: "If a product is described as “unlimited”, “high-volume”, “unmetered” or similar, this does not mean that use is unrestricted, abusive use is permitted or network impact can be ignored.",
        },
        {
          type: "p",
          text: "All such products remain subject to:",
        },
        {
          type: "list",
          items: [
            "this Policy",
            "our Acceptable Use Policy",
            "technical limits",
            "fair usage rules",
            "provider capacity",
            "network integrity controls",
            "anti-abuse measures",
            "product-specific restrictions",
            "reasonable use standards",
          ],
        },
        {
          type: "p",
          text: "We may apply throttling, limits, restrictions or suspension where usage materially exceeds normal or reasonable patterns, degrades service quality, affects other users, triggers provider complaints or creates legal, security or operational risk.",
        },
      ],
    },
    {
      title: "Fair Usage Standard",
      blocks: [
        {
          type: "p",
          text: "You must use the Service fairly, reasonably and in a way that does not harm the Service, other users, our providers or third parties.",
        },
        {
          type: "p",
          text: "Unfair or excessive use may include:",
        },
        {
          type: "list",
          items: [
            "unusually high request rates",
            "excessive bandwidth consumption",
            "excessive concurrency",
            "uncontrolled scraping loops",
            "repeated failed requests",
            "aggressive retries",
            "traffic flooding",
            "high error-rate automation",
            "large traffic spikes inconsistent with the selected product",
            "using shared resources as if they were dedicated",
            "bypassing or attempting to bypass technical limits",
            "using multiple accounts to avoid limits",
            "using the Service in a way that causes IP ranges, providers or gateways to be blocked or degraded",
            "generating complaints from third-party networks, platforms or providers",
          ],
        },
        {
          type: "p",
          text: "We may determine fair usage based on product type, plan, customer history, traffic patterns, technical impact, provider requirements, complaints and comparison with normal customer behaviour.",
        },
      ],
    },
    {
      title: "Rate Limits and Concurrency",
      blocks: [
        {
          type: "p",
          text: "We may apply rate limits, concurrency limits, request limits, connection limits, session limits or other technical controls.",
        },
        {
          type: "p",
          text: "Such limits may be:",
        },
        {
          type: "list",
          items: [
            "published in the product description",
            "shown in the dashboard",
            "agreed in writing",
            "applied dynamically",
            "applied for security or anti-abuse reasons",
            "applied without prior notice where necessary to protect the Service",
          ],
        },
        {
          type: "p",
          text: "You must not attempt to bypass limits by using multiple accounts, shared credentials, automated workarounds, proxy chaining, credential rotation or other evasive methods.",
        },
        {
          type: "p",
          text: "If you need higher limits, you should contact us before increasing usage.",
        },
      ],
    },
    {
      title: "Throttling and Traffic Management",
      blocks: [
        {
          type: "p",
          text: "To protect network stability, we may throttle, slow, queue, restrict or shape traffic where usage is excessive, harmful, abnormal or inconsistent with product rules.",
        },
        {
          type: "p",
          text: "Traffic management may apply based on:",
        },
        {
          type: "list",
          items: [
            "bandwidth usage",
            "request rate",
            "concurrency",
            "destination",
            "protocol",
            "location",
            "product type",
            "error rate",
            "security indicators",
            "provider restrictions",
            "abuse risk",
          ],
        },
        {
          type: "p",
          text: "Throttling or traffic management does not automatically mean that the Service is defective and does not automatically create a refund right.",
        },
      ],
    },
    {
      title: "Destination and Port Restrictions",
      blocks: [
        {
          type: "p",
          text: "We may block, restrict or limit access to certain:",
        },
        {
          type: "list",
          items: [
            "destinations",
            "websites",
            "IP ranges",
            "domains",
            "ports",
            "protocols",
            "countries",
            "services",
            "content categories",
            "traffic patterns",
          ],
        },
        {
          type: "p",
          text: "Restrictions may be applied for legal, compliance, provider, security, operational, sanctions, anti-abuse or network integrity reasons.",
        },
        {
          type: "p",
          text: "We are not required to provide access to destinations, ports or traffic types that create unacceptable risk or violate our policies.",
        },
      ],
    },
    {
      title: "Prohibited Network Behaviour",
      blocks: [
        {
          type: "p",
          text: "You must not use the Service for network behaviour that is harmful, abusive or unauthorised.",
        },
        {
          type: "p",
          text: "This includes:",
        },
        {
          type: "list",
          items: [
            "DDoS attacks",
            "stress testing without authorisation",
            "traffic flooding",
            "port scanning without authorisation",
            "vulnerability scanning without authorisation",
            "brute force traffic",
            "credential attacks",
            "malware traffic",
            "spam traffic",
            "phishing infrastructure",
            "botnet activity",
            "command-and-control traffic",
            "excessive retries that overload third-party systems",
            "activity intended to bypass security controls unlawfully",
          ],
        },
        {
          type: "p",
          text: "Such behaviour may result in immediate suspension or termination without refund.",
        },
      ],
    },
    {
      title: "Third-Party Website Behaviour",
      blocks: [
        {
          type: "p",
          text: "Third-party websites and platforms may:",
        },
        {
          type: "list",
          items: [
            "block proxies",
            "detect proxy use",
            "show CAPTCHA or challenges",
            "rate-limit requests",
            "ban accounts",
            "restrict content",
            "block specific IP ranges",
            "change access rules",
            "alter anti-bot systems",
            "classify geolocation differently",
            "reject automated traffic",
            "refuse login or registration attempts",
          ],
        },
        {
          type: "p",
          text: "We do not control third-party websites or platforms.",
        },
        {
          type: "p",
          text: "A third-party restriction does not automatically mean that the Service is defective, unavailable or not delivered.",
        },
        {
          type: "p",
          text: "You are responsible for ensuring that your intended access is lawful, authorised and compliant with third-party rules.",
        },
      ],
    },
    {
      title: "No Guarantee of Specific Results",
      blocks: [
        {
          type: "p",
          text: "We do not guarantee that the Service will:",
        },
        {
          type: "list",
          items: [
            "access any specific third-party website",
            "bypass CAPTCHA",
            "bypass anti-bot systems",
            "avoid rate limits",
            "avoid account bans",
            "avoid platform verification",
            "avoid IP blacklisting",
            "produce successful scraping results",
            "maintain a specific success rate",
            "provide a specific speed to every target",
            "provide a specific latency",
            "provide perfect geolocation accuracy",
            "avoid detection by third-party services",
            "work with any specific browser, script, bot, scraper, software or integration",
          ],
        },
        {
          type: "p",
          text: "You should test your use case before purchasing high-volume, custom or long-term access.",
        },
      ],
    },
    {
      title: "Speed and Performance",
      blocks: [
        {
          type: "p",
          text: "Proxy speed and performance may vary.",
        },
        {
          type: "p",
          text: "Performance may depend on:",
        },
        {
          type: "list",
          items: [
            "proxy type",
            "location",
            "target website",
            "routing",
            "protocol",
            "time of day",
            "provider capacity",
            "customer-side internet connection",
            "customer-side software",
            "concurrency",
            "request size",
            "target server response time",
            "network congestion",
            "maintenance",
            "fair usage controls",
          ],
        },
        {
          type: "p",
          text: "Any speed, bandwidth or performance information shown on the website is indicative unless expressly guaranteed in a separate written agreement.",
        },
        {
          type: "p",
          text: "We are not responsible for slow performance caused by third-party websites, customer-side configuration, excessive traffic, target server delays or external networks outside our control.",
        },
      ],
    },
    {
      title: "Uptime and Availability",
      blocks: [
        {
          type: "p",
          text: "We aim to provide a reliable Service, but we do not guarantee uninterrupted availability unless a separate written service level agreement expressly applies.",
        },
        {
          type: "p",
          text: "The Service may be unavailable or degraded due to:",
        },
        {
          type: "list",
          items: [
            "maintenance",
            "upgrades",
            "technical failures",
            "routing changes",
            "provider outages",
            "power or connectivity issues",
            "cyberattacks",
            "high demand",
            "abuse mitigation",
            "sanctions or compliance controls",
            "payment or account restrictions",
            "security incidents",
            "force majeure events",
          ],
        },
        {
          type: "p",
          text: "Temporary unavailability, maintenance or provider disruption does not automatically entitle you to a refund unless required by law or expressly stated in our Refund & Cancellation Policy.",
        },
      ],
    },
    {
      title: "Maintenance",
      blocks: [
        {
          type: "p",
          text: "We may perform scheduled or emergency maintenance.",
        },
        {
          type: "p",
          text: "Maintenance may involve:",
        },
        {
          type: "list",
          items: [
            "dashboard downtime",
            "proxy gateway changes",
            "routing changes",
            "credential changes",
            "API interruptions",
            "location unavailability",
            "product changes",
            "database maintenance",
            "security patches",
            "provider migration",
            "temporary suspension of specific features",
          ],
        },
        {
          type: "p",
          text: "Where practical, we may provide notice of scheduled maintenance. Emergency maintenance may be performed without prior notice.",
        },
      ],
    },
    {
      title: "IP Replacement Rules",
      blocks: [
        {
          type: "p",
          text: "IP replacement may be available for certain products, subject to availability, product rules, fair usage limits and our discretion.",
        },
        {
          type: "p",
          text: "Replacement may be considered where:",
        },
        {
          type: "list",
          items: [
            "an IP is technically unavailable",
            "the proxy cannot authenticate due to our issue",
            "the allocated resource is not working as delivered",
            "the product description provides for replacement",
            "we determine that replacement is an appropriate remedy",
          ],
        },
        {
          type: "p",
          text: "Replacement may be refused where the issue is caused by:",
        },
        {
          type: "list",
          items: [
            "third-party platform blocking",
            "target website restrictions",
            "your use case",
            "your scripts or configuration",
            "abuse or excessive usage",
            "violations of our policies",
            "blacklisting caused by your activity",
            "unsupported protocols",
            "geolocation expectations not guaranteed by the product",
            "repeated replacement requests inconsistent with fair usage",
          ],
        },
        {
          type: "p",
          text: "IP replacement is a technical remedy. It does not automatically create a refund right.",
        },
      ],
    },
    {
      title: "Geolocation and Database Differences",
      blocks: [
        {
          type: "p",
          text: "IP geolocation is determined by third-party databases and may vary between providers.",
        },
        {
          type: "p",
          text: "The same IP may be classified differently by different websites, databases, analytics tools or platforms.",
        },
        {
          type: "p",
          text: "We do not control third-party geolocation databases.",
        },
        {
          type: "p",
          text: "We may offer replacement or adjustment where reasonable and available, but we do not guarantee that every third-party database will show the exact intended country, region, city, ISP, ASN, carrier or residential/mobile classification.",
        },
      ],
    },
    {
      title: "Blacklisting and Reputation",
      blocks: [
        {
          type: "p",
          text: "IP addresses may be listed, scored, restricted or classified by third-party services for reasons outside our control.",
        },
        {
          type: "p",
          text: "Blacklisting, risk scoring or reputation issues may occur because of:",
        },
        {
          type: "list",
          items: [
            "third-party database decisions",
            "previous third-party activity",
            "customer activity",
            "shared pool usage",
            "platform anti-abuse systems",
            "automated security tools",
            "traffic patterns",
            "market-wide proxy detection",
          ],
        },
        {
          type: "p",
          text: "We do not guarantee that any IP address will be free from all blacklists, risk scores, proxy detection systems, reputation databases or platform restrictions.",
        },
        {
          type: "p",
          text: "We may assist with replacement or troubleshooting where reasonable and available, but third-party blacklisting does not automatically entitle you to a refund.",
        },
      ],
    },
    {
      title: "Customer Configuration",
      blocks: [
        {
          type: "p",
          text: "You are responsible for configuring your own tools, scripts, applications, browsers, servers, integrations and systems.",
        },
        {
          type: "p",
          text: "Customer-side configuration includes:",
        },
        {
          type: "list",
          items: [
            "proxy protocol selection",
            "authentication setup",
            "endpoint and port setup",
            "rotation settings",
            "sticky session settings",
            "request timing",
            "retry logic",
            "rate limits",
            "browser or scraper settings",
            "headers and user agents",
            "API configuration",
            "firewall or network permissions",
            "error handling",
          ],
        },
        {
          type: "p",
          text: "We are not responsible for issues caused by incorrect customer configuration, unsupported software, customer network restrictions or unsafe automation.",
        },
      ],
    },
    {
      title: "Script and Automation Responsibility",
      blocks: [
        {
          type: "p",
          text: "If you use scripts, bots, scrapers, crawlers, automation tools or integrations with the Service, you are responsible for ensuring that they are lawful, controlled and properly configured.",
        },
        {
          type: "p",
          text: "You must avoid:",
        },
        {
          type: "list",
          items: [
            "uncontrolled loops",
            "infinite retries",
            "excessive concurrency",
            "unnecessary failed requests",
            "traffic spikes",
            "aggressive scraping",
            "violation of target website rules",
            "collection of prohibited data",
            "activity that creates complaints or abuse reports",
          ],
        },
        {
          type: "p",
          text: "We may suspend or restrict access where your automation creates technical, legal, security, reputational or operational risk.",
        },
      ],
    },
    {
      title: "Usage Records",
      blocks: [
        {
          type: "p",
          text: "For technical, billing, support, abuse prevention, refund and dispute purposes, we may rely on internal usage records.",
        },
        {
          type: "p",
          text: "These may include:",
        },
        {
          type: "list",
          items: [
            "account ID",
            "product type",
            "traffic volume",
            "bandwidth usage",
            "authentication events",
            "connection timestamps",
            "proxy endpoint used",
            "API usage",
            "access period",
            "dashboard activity",
            "error rates",
            "session information",
            "technical logs",
            "abuse indicators",
          ],
        },
        {
          type: "p",
          text: "Our handling of personal data is described in our Privacy Policy.",
        },
        {
          type: "p",
          text: "In the event of a dispute about usage, activation, delivery, consumption or fair usage, our system records will be used as the primary reference unless clearly shown to be incorrect.",
        },
      ],
    },
    {
      title: "Dashboard Statistics",
      blocks: [
        {
          type: "p",
          text: "Dashboard statistics may be provided for your convenience.",
        },
        {
          type: "p",
          text: "Dashboard statistics may be:",
        },
        {
          type: "list",
          items: [
            "delayed",
            "rounded",
            "estimated",
            "synchronised periodically",
            "affected by provider reporting times",
            "adjusted after reconciliation",
            "different from real-time local software counters",
          ],
        },
        {
          type: "p",
          text: "You should not rely on dashboard statistics as guaranteed real-time accounting unless expressly stated.",
        },
      ],
    },
    {
      title: "API Usage",
      blocks: [
        {
          type: "p",
          text: "Where API access is available, API use may be subject to:",
        },
        {
          type: "list",
          items: [
            "rate limits",
            "quotas",
            "credit usage",
            "bandwidth usage",
            "endpoint limits",
            "authentication rules",
            "technical documentation",
            "fair usage rules",
            "API-specific terms",
          ],
        },
        {
          type: "p",
          text: "API output, response times and success rates may vary depending on product type, target websites, request design, customer configuration, network conditions and third-party restrictions.",
        },
        {
          type: "p",
          text: "We may suspend or limit API access where it creates excessive load, abuse risk, security risk or violates our policies.",
        },
      ],
    },
    {
      title: "Resale and Shared Access",
      blocks: [
        {
          type: "p",
          text: "You must not resell, sublicense, rent, pool, redistribute, share or provide access to the Service to third parties unless we have expressly authorised this in writing.",
        },
        {
          type: "p",
          text: "Unauthorised resale or shared access may create excessive load, abuse complaints, credential compromise and fair usage violations.",
        },
        {
          type: "p",
          text: "If we approve resale, agency use or managed access, you remain fully responsible for all usage by your customers, employees, contractors, agents, sub-users and any person using the Service through your account or credentials.",
        },
        {
          type: "p",
          text: "We may require additional verification, use-case review, compliance controls or written terms for resale or managed use.",
        },
      ],
    },
    {
      title: "Security and Credential Protection",
      blocks: [
        {
          type: "p",
          text: "You must keep your account credentials, proxy credentials and API keys secure.",
        },
        {
          type: "p",
          text: "You must not:",
        },
        {
          type: "list",
          items: [
            "publish credentials",
            "share credentials in public repositories",
            "embed credentials in insecure client-side code",
            "sell or leak credentials",
            "use compromised credentials",
            "allow unauthorised persons to use your account",
            "ignore signs of account compromise",
          ],
        },
        {
          type: "p",
          text: "If credentials are compromised, you must notify us promptly.",
        },
        {
          type: "p",
          text: "We may disable or rotate credentials without prior notice where needed to protect the Service.",
        },
      ],
    },
    {
      title: "Suspicious or Abusive Usage",
      blocks: [
        {
          type: "p",
          text: "We may investigate traffic patterns, customer behaviour, payment behaviour, account activity or external reports suggesting suspicious or abusive usage.",
        },
        {
          type: "p",
          text: "Suspicious usage may include:",
        },
        {
          type: "list",
          items: [
            "sudden abnormal traffic spikes",
            "high failed authentication rates",
            "high error rates",
            "unusual destinations",
            "spam indicators",
            "credential attack indicators",
            "malware indicators",
            "payment fraud indicators",
            "sanctions indicators",
            "excessive replacement requests",
            "activity inconsistent with the declared use case",
          ],
        },
        {
          type: "p",
          text: "We may limit, suspend or terminate access during review.",
        },
      ],
    },
    {
      title: "Enforcement Measures",
      blocks: [
        {
          type: "p",
          text: "If we reasonably believe that your usage violates this Policy, our Terms & Conditions, Acceptable Use Policy or applicable law, we may take enforcement measures, including:",
        },
        {
          type: "list",
          items: [
            "warning you",
            "requesting additional information",
            "requiring traffic reduction",
            "applying rate limits",
            "applying concurrency limits",
            "throttling traffic",
            "blocking destinations",
            "blocking ports or protocols",
            "disabling specific credentials",
            "refusing IP replacement",
            "suspending access",
            "terminating your account",
            "cancelling orders",
            "refusing future service",
            "preserving relevant records",
            "reporting activity where appropriate",
          ],
        },
        {
          type: "p",
          text: "We may act without prior notice where necessary to protect the Service, our users, providers or third parties.",
        },
      ],
    },
    {
      title: "No Refunds for Fair Usage or Policy Violations",
      blocks: [
        {
          type: "p",
          text: "If access is restricted, throttled, suspended or terminated because of excessive use, unfair use, abuse, prohibited activity, breach of this Policy or breach of our Acceptable Use Policy, you may not be entitled to a refund.",
        },
        {
          type: "p",
          text: "Refunds are handled under our Refund & Cancellation Policy.",
        },
        {
          type: "p",
          text: "Fair usage controls, throttling, destination blocking, rate limits, provider restrictions or security measures do not automatically create refund rights.",
        },
      ],
    },
    {
      title: "Support",
      blocks: [
        {
          type: "p",
          text: "We may provide support for reasonable technical issues related to the Service.",
        },
        {
          type: "p",
          text: "Support may include:",
        },
        {
          type: "list",
          items: [
            "basic configuration guidance",
            "credential troubleshooting",
            "dashboard access help",
            "product clarification",
            "connection testing",
            "replacement review where applicable",
            "usage investigation",
            "billing-related technical checks",
          ],
        },
        {
          type: "p",
          text: "Support does not include:",
        },
        {
          type: "list",
          items: [
            "legal advice",
            "advice on bypassing third-party security systems",
            "help with prohibited use cases",
            "guaranteed success with specific websites",
            "custom scraper development unless expressly agreed",
            "third-party account recovery",
            "support for unlawful or abusive activity",
            "unlimited troubleshooting for customer-side scripts or systems",
          ],
        },
      ],
    },
    {
      title: "Product Changes",
      blocks: [
        {
          type: "p",
          text: "We may change proxy products, locations, gateways, IP pools, protocols, pricing, limits, dashboard tools, API functions and technical features from time to time.",
        },
        {
          type: "p",
          text: "Changes may be required because of:",
        },
        {
          type: "list",
          items: [
            "provider changes",
            "network quality",
            "abuse prevention",
            "legal restrictions",
            "sanctions rules",
            "product improvement",
            "commercial decisions",
            "technical maintenance",
            "security requirements",
          ],
        },
        {
          type: "p",
          text: "Where a material change affects an active paid product, we will take reasonable steps to notify you where practical.",
        },
      ],
    },
    {
      title: "Customer Testing",
      blocks: [
        {
          type: "p",
          text: "Before purchasing large, custom, long-term or high-volume access, you should test whether the selected proxy type is suitable for your intended lawful use case.",
        },
        {
          type: "p",
          text: "Trial or test access may be available at our discretion.",
        },
        {
          type: "p",
          text: "A successful test does not guarantee future performance, availability or third-party acceptance, because proxy conditions and third-party website controls may change.",
        },
      ],
    },
    {
      title: "High-Risk Use Cases",
      blocks: [
        {
          type: "p",
          text: "Certain use cases may require prior review, approval or additional controls.",
        },
        {
          type: "p",
          text: "High-risk use cases may include:",
        },
        {
          type: "list",
          items: [
            "high-volume scraping",
            "scraping in regulated sectors",
            "personal data-related workflows",
            "financial services monitoring",
            "advertising platform automation",
            "marketplace automation",
            "social media automation",
            "account-based workflows",
            "security research",
            "resale or managed access",
            "politically sensitive or public-sector related use",
            "use involving restricted jurisdictions",
            "use likely to generate abuse reports",
          ],
        },
        {
          type: "p",
          text: "We may request additional information, apply limits or refuse such use cases.",
        },
      ],
    },
    {
      title: "Customer Responsibility for Lawful Use",
      blocks: [
        {
          type: "p",
          text: "You are solely responsible for ensuring that your use of the Service is lawful and authorised.",
        },
        {
          type: "p",
          text: "This includes compliance with:",
        },
        {
          type: "list",
          items: [
            "applicable laws",
            "data protection laws",
            "privacy laws",
            "cybersecurity laws",
            "intellectual property laws",
            "sanctions and export controls",
            "third-party terms of service",
            "platform rules",
            "contractual restrictions",
            "website access rules",
            "database rights",
            "any other rules applicable to your use case",
          ],
        },
        {
          type: "p",
          text: "Virenza Proxy does not provide legal advice and does not confirm that any specific scraping, automation, monitoring or data access activity is lawful.",
        },
      ],
    },
    {
      title: "Changes to this Policy",
      blocks: [
        {
          type: "p",
          text: "We may update this Policy from time to time.",
        },
        {
          type: "p",
          text: "The updated version will be posted on the website or made available through the dashboard. The effective date will be updated accordingly.",
        },
        {
          type: "p",
          text: "Changes will not affect completed orders unless the order is renewed, extended, upgraded, modified or otherwise continued after the updated Policy takes effect.",
        },
        {
          type: "p",
          text: "Continued use of the Service after the updated Policy becomes effective means that you accept the updated Policy.",
        },
      ],
    },
    {
      title: "Contact",
      blocks: [
        {
          type: "p",
          text: "If you have questions about proxy usage, fair usage, product limits, technical configuration, IP replacement or this Policy, you may contact us at:",
        },
        {
          type: "p",
          text: "VIRENZA LTD",
        },
        {
          type: "p",
          text: "Dept 6814, 196 High Road, Wood Green, London, United Kingdom, N22 8HH",
        },
        {
          type: "p",
          text: "Email: info@virenzaproxy.com",
        },
      ],
    },
  ],
};
