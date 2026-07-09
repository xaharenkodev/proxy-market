import type { LegalDoc } from "./types";

export const deliveryPolicy: LegalDoc = {
  slug: "delivery-policy",
  title: "Digital Delivery / Provisioning Policy",
  updated: "July 9, 2026",
  intro: [
    {
      type: "p",
      text: "This Digital Delivery / Provisioning Policy (“Policy”) explains how digital access to services provided by VIRENZA LTD, trading as Virenza Proxy, is delivered, activated, configured, delayed, replaced or refused.",
    },
    {
      type: "p",
      text: "This Policy forms part of our Terms & Conditions and applies to purchases made through virenzaproxy.com, the user dashboard, invoice, order form, written offer, support channel, API or any other approved sales process.",
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
      text: "In this Policy, “Virenza Proxy”, “we”, “us” and “our” refer to VIRENZA LTD. “User”, “customer”, “you” and “your” refer to any person or organisation purchasing or using the Service.",
    },
    {
      type: "p",
      text: "By placing an order, purchasing proxy access, using the dashboard, receiving credentials, activating traffic, using APIs or otherwise using the Service, you agree to this Policy.",
    },
  ],
  sections: [
    {
      title: "Scope of this Policy",
      blocks: [
        {
          type: "p",
          text: "This Policy applies to digital delivery and provisioning of all Virenza Proxy services, including where available:",
        },
        {
          type: "list",
          items: [
            "datacenter proxies",
            "static ISP proxies",
            "residential proxies",
            "mobile proxies",
            "rotating proxy access",
            "sticky sessions",
            "proxy bundles",
            "traffic packages",
            "access-duration packages",
            "dashboard access",
            "API keys",
            "future scraping or data access tools",
            "custom proxy configurations",
            "business or high-volume orders",
            "any related digital services provided by us",
          ],
        },
        {
          type: "p",
          text: "If a separate written agreement, invoice, order form or custom offer expressly provides different delivery or activation terms, those specific terms will apply to that order.",
        },
      ],
    },
    {
      title: "Digital Service Only",
      blocks: [
        {
          type: "p",
          text: "The Service is provided digitally.",
        },
        {
          type: "p",
          text: "No physical goods are shipped, posted or delivered by courier.",
        },
        {
          type: "p",
          text: "References to “delivery”, “provisioning”, “activation” or “making the Service available” mean the digital provision of access to the purchased Service. This may include access through the website, dashboard, email, credentials, proxy endpoints, gateways, traffic balance, API keys or manual account configuration.",
        },
      ],
    },
    {
      title: "What Counts as Delivery",
      blocks: [
        {
          type: "p",
          text: "The Service is considered delivered when one or more of the following has occurred:",
        },
        {
          type: "list",
          items: [
            "your account has been created or enabled",
            "dashboard access has been activated",
            "proxy credentials have been generated or issued",
            "proxy endpoints, gateways or connection details have been made available",
            "IPs, ports, sessions, gateways or proxy access have been allocated",
            "traffic balance, credits or access entitlement has been added to your account",
            "API keys or API access have been enabled",
            "an access period has started",
            "a custom configuration has been prepared and made available",
            "we have sent digital access details to your registered email address",
            "we have otherwise made the purchased digital Service available to you",
          ],
        },
        {
          type: "p",
          text: "Delivery does not require you to actually use the Service. If access has been made available, the Service may be treated as delivered even if you do not log in, connect, consume traffic or use the access during the paid period.",
        },
      ],
    },
    {
      title: "Delivery Methods",
      blocks: [
        {
          type: "p",
          text: "Depending on the product, delivery may take place through one or more of the following methods:",
        },
        {
          type: "list",
          items: [
            "automatic dashboard activation",
            "email confirmation",
            "generated username and password",
            "proxy endpoint or gateway details",
            "dashboard balance update",
            "traffic or credit allocation",
            "API key generation",
            "manual account configuration",
            "support-assisted setup",
            "written confirmation from us",
            "another digital delivery method made available by Virenza Proxy",
          ],
        },
        {
          type: "p",
          text: "You are responsible for checking your dashboard, registered email address, spam folder and any communication channel used during the order process.",
        },
      ],
    },
    {
      title: "Indicative Delivery Timeframes",
      blocks: [
        {
          type: "p",
          text: "Delivery and activation times may vary depending on the product, payment status, stock availability, technical setup, fraud checks, compliance review and selected configuration.",
        },
        {
          type: "p",
          text: "Unless a different timeframe is shown at checkout or agreed in writing, indicative delivery timeframes are:",
        },
        {
          type: "table",
          head: [
            "Service type",
            "Indicative delivery / activation timeframe",
          ],
          rows: [
            [
              "Automatically available dashboard products",
              "Usually within a few minutes after successful payment and order approval",
            ],
            [
              "Standard proxy packages requiring system allocation",
              "Usually within a few minutes to several hours",
            ],
            [
              "Products requiring manual review or manual configuration",
              "Usually within 1 business day",
            ],
            [
              "Custom, high-volume, special-location or enterprise orders",
              "Usually within 1–5 business days, depending on complexity and availability",
            ],
            [
              "Orders requiring fraud, sanctions or compliance review",
              "Delivery may be delayed until review is completed",
            ],
            [
              "Orders paid by bank transfer or manual invoice",
              "Delivery normally begins after cleared funds are received and matched to the order",
            ],
          ],
        },
        {
          type: "p",
          text: "These timeframes are indicative only and are not guaranteed unless expressly confirmed by us in writing.",
        },
      ],
    },
    {
      title: "Business Days",
      blocks: [
        {
          type: "p",
          text: "Unless stated otherwise, “business day” means a day other than Saturday, Sunday or a public holiday in England and Wales.",
        },
        {
          type: "p",
          text: "Orders placed outside normal business hours, during weekends or public holidays may be processed on the next business day where manual review, manual configuration or support assistance is required.",
        },
        {
          type: "p",
          text: "Automated delivery may still operate outside business hours, but this is not guaranteed.",
        },
      ],
    },
    {
      title: "Conditions for Delivery",
      blocks: [
        {
          type: "p",
          text: "We may delay or refuse delivery where:",
        },
        {
          type: "list",
          items: [
            "payment has not been received",
            "payment is pending, failed, disputed or reversed",
            "payment is under fraud review",
            "billing details are incomplete or inaccurate",
            "account details are incomplete",
            "the selected product is unavailable",
            "the selected location is unavailable",
            "the order requires manual configuration",
            "the order requires compliance review",
            "sanctions or restricted jurisdiction checks are triggered",
            "the use case appears prohibited, unlawful or high risk",
            "required information has not been provided",
            "technical issues prevent activation",
            "we are required to delay or refuse delivery by law, provider requirement, payment provider requirement or competent authority",
          ],
        },
        {
          type: "p",
          text: "Payment confirmation alone does not guarantee immediate delivery.",
        },
      ],
    },
    {
      title: "Customer Information Required for Provisioning",
      blocks: [
        {
          type: "p",
          text: "To deliver certain Services, we may need information from you, including:",
        },
        {
          type: "list",
          items: [
            "account email",
            "billing details",
            "company details",
            "intended use case",
            "preferred proxy type",
            "required country or location",
            "protocol requirements",
            "authentication requirements",
            "traffic or bandwidth needs",
            "session requirements",
            "API requirements",
            "technical configuration details",
            "compliance or verification information where required",
          ],
        },
        {
          type: "p",
          text: "If you do not provide required information, delivery may be delayed, limited or refused.",
        },
        {
          type: "p",
          text: "We are not responsible for delivery delays caused by incomplete, inaccurate or late information provided by you.",
        },
      ],
    },
    {
      title: "Payment Confirmation",
      blocks: [
        {
          type: "p",
          text: "For most orders, delivery begins only after payment has been successfully authorised, received or confirmed.",
        },
        {
          type: "p",
          text: "Depending on the payment method, payment confirmation may be instant or delayed.",
        },
        {
          type: "p",
          text: "Bank transfers, manual invoice payments and certain high-risk payments may take longer to verify.",
        },
        {
          type: "p",
          text: "If a payment is later reversed, disputed, charged back, rejected or identified as unauthorised or fraudulent, we may suspend or terminate access even if the Service has already been delivered.",
        },
      ],
    },
    {
      title: "Manual Review and Compliance Checks",
      blocks: [
        {
          type: "p",
          text: "Because proxy services may be misused, some orders may require manual review before delivery.",
        },
        {
          type: "p",
          text: "Manual review may include:",
        },
        {
          type: "list",
          items: [
            "fraud prevention checks",
            "sanctions screening",
            "payment risk checks",
            "account review",
            "use-case review",
            "high-volume traffic review",
            "restricted jurisdiction checks",
            "abuse risk review",
            "verification of company or customer details",
          ],
        },
        {
          type: "p",
          text: "We may request additional information before provisioning the Service.",
        },
        {
          type: "p",
          text: "If you do not provide the requested information, or if the review cannot be completed to our satisfaction, we may refuse delivery, cancel the order, issue a refund where appropriate or terminate the account.",
        },
        {
          type: "p",
          text: "We are not required to disclose detailed internal risk, fraud or compliance criteria.",
        },
      ],
    },
    {
      title: "Product Availability",
      blocks: [
        {
          type: "p",
          text: "Proxy availability may depend on:",
        },
        {
          type: "list",
          items: [
            "proxy type",
            "country or region",
            "IP pool availability",
            "upstream provider availability",
            "technical capacity",
            "routing conditions",
            "demand",
            "abuse risk",
            "maintenance",
            "provider restrictions",
            "legal or compliance restrictions",
          ],
        },
        {
          type: "p",
          text: "A product, location, IP type, gateway, protocol or feature shown on the website may become unavailable or limited before or after purchase.",
        },
        {
          type: "p",
          text: "Where a purchased product cannot be delivered substantially as ordered, we may offer:",
        },
        {
          type: "list",
          items: [
            "a reasonable alternative",
            "a different location",
            "replacement access",
            "account credit",
            "adjusted configuration",
            "delayed provisioning",
            "refund where appropriate under our Refund & Cancellation Policy",
          ],
        },
      ],
    },
    {
      title: "Proxy Credentials",
      blocks: [
        {
          type: "p",
          text: "Where the Service requires proxy credentials, you may receive or access:",
        },
        {
          type: "list",
          items: [
            "username",
            "password",
            "endpoint",
            "port",
            "gateway",
            "API key",
            "access token",
            "configuration parameters",
            "location or session settings",
            "dashboard-generated connection details",
          ],
        },
        {
          type: "p",
          text: "You are responsible for keeping all credentials confidential and secure.",
        },
        {
          type: "p",
          text: "You must not share, publish, leak, resell, sublicense or distribute credentials unless we have expressly authorised this in writing.",
        },
        {
          type: "p",
          text: "If you believe your credentials have been compromised, you must contact us promptly.",
        },
        {
          type: "p",
          text: "We may reset, rotate, disable or replace credentials where necessary for security, abuse prevention, technical maintenance or policy enforcement.",
        },
      ],
    },
    {
      title: "Dashboard Delivery",
      blocks: [
        {
          type: "p",
          text: "Where the Service is delivered through the dashboard, access is considered provided once the relevant product, balance, credentials, traffic package, proxy configuration, API key or entitlement appears in your dashboard or is otherwise made available to your account.",
        },
        {
          type: "p",
          text: "You are responsible for ensuring that you can access your account and dashboard.",
        },
        {
          type: "p",
          text: "If you cannot access your dashboard, you should contact us promptly at info@virenzaproxy.com.",
        },
        {
          type: "p",
          text: "Failure to log in, check the dashboard or use the activated Service does not mean that delivery has not occurred.",
        },
      ],
    },
    {
      title: "Email Delivery",
      blocks: [
        {
          type: "p",
          text: "Where access details, confirmations or setup instructions are sent by email, they will normally be sent to the email address associated with your account or order.",
        },
        {
          type: "p",
          text: "You are responsible for ensuring that your email address is accurate and that you can receive emails from us.",
        },
        {
          type: "p",
          text: "We are not responsible for delays or non-receipt caused by:",
        },
        {
          type: "list",
          items: [
            "incorrect email address",
            "full mailbox",
            "spam filtering",
            "email provider blocking",
            "corporate firewall",
            "customer-side mail server issues",
            "failure to check spam or junk folders",
          ],
        },
        {
          type: "p",
          text: "If you believe you did not receive expected delivery information, you should contact us promptly.",
        },
      ],
    },
    {
      title: "API Delivery",
      blocks: [
        {
          type: "p",
          text: "Where API access is included, delivery may occur when:",
        },
        {
          type: "list",
          items: [
            "an API key is generated",
            "API access is enabled",
            "API documentation is made available",
            "API credits are added",
            "API endpoint access is activated",
            "API credentials are provided",
            "dashboard API controls are enabled",
          ],
        },
        {
          type: "p",
          text: "You are responsible for protecting API keys and using APIs in accordance with our Terms & Conditions, Acceptable Use Policy and any API-specific terms.",
        },
        {
          type: "p",
          text: "API access may be subject to limits, quotas, rate limits, availability restrictions, maintenance and technical changes.",
        },
      ],
    },
    {
      title: "Custom Configuration",
      blocks: [
        {
          type: "p",
          text: "Some Services may require custom or manual configuration.",
        },
        {
          type: "p",
          text: "Custom configuration may include:",
        },
        {
          type: "list",
          items: [
            "dedicated proxy setup",
            "special location setup",
            "high-volume traffic setup",
            "custom authentication setup",
            "API configuration",
            "business account setup",
            "reseller or agency configuration",
            "routing or gateway configuration",
            "technical consultation",
            "enterprise arrangement",
          ],
        },
        {
          type: "p",
          text: "Delivery of custom configuration may take longer than standard automated delivery.",
        },
        {
          type: "p",
          text: "Custom orders may be non-refundable once work has started, resources have been reserved, proxies have been allocated, credentials have been generated or configuration has begun, as described in our Refund & Cancellation Policy.",
        },
      ],
    },
    {
      title: "Activation of Access Period",
      blocks: [
        {
          type: "p",
          text: "For time-based products, the access period normally starts when the Service is activated, credentials are issued, dashboard access is enabled, traffic entitlement is added or the product is otherwise made available, unless stated otherwise.",
        },
        {
          type: "p",
          text: "The access period does not normally start when you first use the Service, unless the product description or written offer expressly states so.",
        },
        {
          type: "p",
          text: "Failure to use the Service during the access period does not pause, extend or restart the access period.",
        },
      ],
    },
    {
      title: "Traffic Packages and Usage-Based Services",
      blocks: [
        {
          type: "p",
          text: "For traffic-based or usage-based Services, delivery occurs when the purchased traffic, credits, balance or usage entitlement is added to your account or otherwise made available.",
        },
        {
          type: "p",
          text: "Traffic or credits may be deducted based on system records, including:",
        },
        {
          type: "list",
          items: [
            "bandwidth usage",
            "API calls",
            "successful or attempted connections",
            "product-specific metering rules",
            "gateway or proxy usage",
            "other usage metrics shown in the dashboard or product description",
          ],
        },
        {
          type: "p",
          text: "You are responsible for monitoring usage and ensuring that your scripts, software and integrations do not consume traffic unintentionally.",
        },
      ],
    },
    {
      title: "No Guarantee of Third-Party Access",
      blocks: [
        {
          type: "p",
          text: "Delivery of the Service means that we have made the purchased proxy access, dashboard entitlement, credentials, API access or digital configuration available to you.",
        },
        {
          type: "p",
          text: "Delivery does not mean that the Service will successfully access any particular third-party website, platform, account, marketplace, search engine, advertising network, social network, application or online service.",
        },
        {
          type: "p",
          text: "Third-party websites and platforms may block, challenge, restrict, rate-limit, blacklist or reject proxy traffic for reasons outside our control.",
        },
        {
          type: "p",
          text: "Such third-party restrictions do not automatically mean that delivery failed.",
        },
      ],
    },
    {
      title: "Customer-Side Setup",
      blocks: [
        {
          type: "p",
          text: "You are responsible for configuring your own systems, tools, scripts, browsers, applications, integrations, authentication settings and network environment.",
        },
        {
          type: "p",
          text: "We are not responsible for delivery or access issues caused by:",
        },
        {
          type: "list",
          items: [
            "incorrect customer configuration",
            "unsupported software",
            "wrong protocol selection",
            "incorrect credentials entered by you",
            "customer firewall restrictions",
            "antivirus or security software",
            "browser or device settings",
            "DNS issues",
            "target website restrictions",
            "rate limits created by your scripts",
            "excessive retry behaviour",
            "unsupported use cases",
          ],
        },
        {
          type: "p",
          text: "We may provide support where reasonable, but customer-side setup remains your responsibility.",
        },
      ],
    },
    {
      title: "Delivery Delays",
      blocks: [
        {
          type: "p",
          text: "Delivery may be delayed for technical, payment, compliance, operational or provider-related reasons.",
        },
        {
          type: "p",
          text: "Examples include:",
        },
        {
          type: "list",
          items: [
            "payment review",
            "failed or delayed payment confirmation",
            "fraud checks",
            "compliance review",
            "sanctions screening",
            "manual configuration",
            "shortage of available IPs",
            "selected location unavailable",
            "upstream provider delay",
            "maintenance",
            "dashboard or API issue",
            "support backlog",
            "high-volume order review",
            "suspicious or high-risk use case",
            "customer failure to provide required information",
          ],
        },
        {
          type: "p",
          text: "Where we become aware of a material delay, we will take commercially reasonable steps to inform you where practical.",
        },
      ],
    },
    {
      title: "Failed Delivery",
      blocks: [
        {
          type: "p",
          text: "Delivery may be treated as failed where we are unable to make the purchased Service available due to our own technical or operational fault and no reasonable alternative is available.",
        },
        {
          type: "p",
          text: "Delivery is not treated as failed solely because:",
        },
        {
          type: "list",
          items: [
            "you did not use the Service",
            "you did not check your dashboard or email",
            "you selected the wrong product",
            "you entered incorrect account or billing details",
            "your software or scripts are misconfigured",
            "your target website blocks proxy traffic",
            "your third-party account is restricted or banned",
            "you do not pass a third-party verification system",
            "the IP geolocation differs in a third-party database",
            "your use case is unsupported or prohibited",
            "your access is suspended for policy violations",
          ],
        },
        {
          type: "p",
          text: "If delivery fails due to our fault, we may offer a replacement, extension, credit, alternative product or refund in accordance with our Refund & Cancellation Policy.",
        },
      ],
    },
    {
      title: "Replacement and Re-Provisioning",
      blocks: [
        {
          type: "p",
          text: "Where appropriate, we may re-provision or replace access instead of issuing a refund.",
        },
        {
          type: "p",
          text: "This may include:",
        },
        {
          type: "list",
          items: [
            "replacing credentials",
            "issuing a new endpoint",
            "changing a gateway",
            "reallocating proxy access",
            "adjusting dashboard balance",
            "providing an alternative location",
            "extending access time",
            "enabling a different protocol where available",
            "providing technical support",
            "offering account credit",
          ],
        },
        {
          type: "p",
          text: "Replacement or re-provisioning is subject to product availability, fair usage limits, technical feasibility and policy compliance.",
        },
        {
          type: "p",
          text: "We may refuse replacement where the issue is caused by abuse, prohibited activity, third-party blocking, customer misconfiguration or breach of our policies.",
        },
      ],
    },
    {
      title: "Security Holds",
      blocks: [
        {
          type: "p",
          text: "We may temporarily hold, delay or disable delivery where security risks are detected.",
        },
        {
          type: "p",
          text: "Security holds may apply where:",
        },
        {
          type: "list",
          items: [
            "unusual login activity is detected",
            "account takeover is suspected",
            "payment method appears compromised",
            "credentials are suspected to be leaked",
            "high-risk traffic patterns appear",
            "malware, phishing, spam or credential abuse indicators are detected",
            "a provider, payment processor or affected third party reports abuse",
            "we need to protect our systems, users, providers or third parties",
          ],
        },
        {
          type: "p",
          text: "A security hold may remain in place until the issue is resolved or the account is terminated.",
        },
      ],
    },
    {
      title: "Restricted Orders",
      blocks: [
        {
          type: "p",
          text: "We may refuse or cancel delivery where the order is connected with:",
        },
        {
          type: "list",
          items: [
            "prohibited jurisdictions",
            "sanctioned persons or entities",
            "unlawful activity",
            "abuse risk",
            "fraud risk",
            "payment abuse",
            "false or misleading information",
            "unsupported or prohibited use cases",
            "resale without approval",
            "high-risk traffic destinations",
            "legal or provider restrictions",
          ],
        },
        {
          type: "p",
          text: "If delivery is refused due to sanctions, fraud, abuse, policy violations or unlawful activity, no refund may be provided.",
        },
      ],
    },
    {
      title: "Customer Acceptance",
      blocks: [
        {
          type: "p",
          text: "By receiving or accessing the Service, you confirm that delivery has occurred unless you notify us promptly of a genuine delivery issue.",
        },
        {
          type: "p",
          text: "If you believe the Service has not been delivered, you must contact us as soon as possible at:",
        },
        {
          type: "p",
          text: "info@virenzaproxy.com",
        },
        {
          type: "p",
          text: "Your message should include:",
        },
        {
          type: "list",
          items: [
            "account email",
            "order number",
            "payment date",
            "product purchased",
            "screenshots where relevant",
            "description of the issue",
            "any error messages",
            "whether dashboard access is available",
            "whether credentials were received",
            "whether connection attempts were made",
          ],
        },
        {
          type: "p",
          text: "We may request further information to investigate.",
        },
      ],
    },
    {
      title: "Delivery Records",
      blocks: [
        {
          type: "p",
          text: "For delivery, billing, support, dispute and refund purposes, we may rely on our internal records, including:",
        },
        {
          type: "list",
          items: [
            "payment records",
            "order records",
            "dashboard activation logs",
            "credential generation records",
            "email delivery records",
            "traffic allocation records",
            "proxy authentication logs",
            "API key generation records",
            "API usage records",
            "support communications",
            "compliance review records",
            "security logs",
          ],
        },
        {
          type: "p",
          text: "These records may be used to confirm whether the Service was delivered, activated, used, consumed, suspended or made available.",
        },
      ],
    },
    {
      title: "Refunds Related to Delivery",
      blocks: [
        {
          type: "p",
          text: "Refunds related to delivery are handled under our Refund & Cancellation Policy.",
        },
        {
          type: "p",
          text: "A refund may be considered where:",
        },
        {
          type: "list",
          items: [
            "payment was taken but the Service was not delivered due to our verified fault",
            "the purchased product cannot be provided and no reasonable alternative is available",
            "a duplicate order or billing error occurred",
            "mandatory law requires a refund",
            "we expressly agree in writing",
          ],
        },
        {
          type: "p",
          text: "A refund is generally not available where delivery has occurred and the Service has been activated, allocated, made available or used, except where required by law or expressly agreed by us.",
        },
      ],
    },
    {
      title: "Consumer Digital Service Notice",
      blocks: [
        {
          type: "p",
          text: "If you purchase the Service as a consumer, you may have cancellation rights under applicable consumer law.",
        },
        {
          type: "p",
          text: "However, the Service is digital and may be activated immediately after purchase.",
        },
        {
          type: "p",
          text: "Where permitted by law, if you request or consent to immediate performance of the Service during any applicable cancellation period, and you acknowledge that cancellation rights may be affected once performance begins, your cancellation rights may be limited or lost once digital delivery has started.",
        },
        {
          type: "p",
          text: "Digital delivery may start when proxy credentials, dashboard access, traffic balance, API access, proxy endpoints or other digital entitlements are made available.",
        },
        {
          type: "p",
          text: "Nothing in this Policy excludes or limits mandatory consumer rights that cannot lawfully be excluded or limited.",
        },
      ],
    },
    {
      title: "Business Customers",
      blocks: [
        {
          type: "p",
          text: "If you purchase the Service for business, professional, commercial, technical, agency, resale, research or organisational purposes, you are responsible for ensuring that:",
        },
        {
          type: "list",
          items: [
            "the product is suitable for your intended use",
            "your billing and account details are accurate",
            "you provide required setup information promptly",
            "your use case is lawful and permitted",
            "your internal procurement process is complete before purchase",
            "your technical team can configure and use the Service",
            "you monitor activation, access periods and traffic usage",
          ],
        },
        {
          type: "p",
          text: "Business orders are generally considered delivered once access has been activated, allocated, configured or made available.",
        },
      ],
    },
    {
      title: "Changes to Delivery Processes",
      blocks: [
        {
          type: "p",
          text: "We may update, change or replace delivery and provisioning processes from time to time.",
        },
        {
          type: "p",
          text: "This may include changes to:",
        },
        {
          type: "list",
          items: [
            "dashboard activation",
            "credential format",
            "endpoint format",
            "gateway configuration",
            "API key generation",
            "authentication method",
            "email delivery",
            "traffic allocation",
            "manual review requirements",
            "fraud checks",
            "compliance checks",
            "delivery timeframes",
            "provider infrastructure",
          ],
        },
        {
          type: "p",
          text: "Where changes materially affect an active paid Service, we will take reasonable steps to notify you where practical.",
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
          text: "If you have questions about digital delivery, activation, provisioning, credentials, dashboard access or this Policy, you may contact us at:",
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
