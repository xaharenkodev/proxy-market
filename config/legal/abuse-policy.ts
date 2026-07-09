import type { LegalDoc } from "./types";

export const abusePolicy: LegalDoc = {
  slug: "abuse-policy",
  title: "Abuse Reporting Policy",
  updated: "July 9, 2026",
  intro: [
    {
      type: "p",
      text: "This Abuse Reporting Policy (“Policy”) explains how VIRENZA LTD, trading as Virenza Proxy, receives, reviews and responds to abuse reports, complaints, security notices, provider alerts and third-party allegations relating to misuse of the Virenza Proxy service.",
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
      text: "In this Policy, “Virenza Proxy”, “we”, “us” and “our” refer to VIRENZA LTD. “User”, “customer”, “you” and “your” refer to any person or organisation accessing, purchasing or using the Service.",
    },
  ],
  sections: [
    {
      title: "Purpose of this Policy",
      blocks: [
        {
          type: "p",
          text: "Virenza Proxy provides proxy infrastructure for lawful business, technical, testing, monitoring, research and public web data workflows.",
        },
        {
          type: "p",
          text: "Because proxy services may be misused, this Policy explains how abuse reports should be submitted and how we may review, investigate and respond to suspected misuse of the Service.",
        },
        {
          type: "p",
          text: "This Policy is designed to:",
        },
        {
          type: "list",
          items: [
            "provide a clear reporting channel for abuse complaints",
            "help third parties submit useful evidence",
            "protect legitimate users of the Service",
            "detect and stop unlawful or abusive activity",
            "protect third-party systems, platforms and networks",
            "support responsible proxy service operation",
            "protect our infrastructure, providers and payment partners",
            "support compliance with our Terms & Conditions and Acceptable Use Policy",
          ],
        },
      ],
    },
    {
      title: "Abuse Contact",
      blocks: [
        {
          type: "p",
          text: "Abuse reports may be sent to:",
        },
        {
          type: "p",
          text: "Email: info@virenzaproxy.com",
        },
        {
          type: "p",
          text: "Subject line: Abuse Report — [brief description]",
        },
        {
          type: "p",
          text: "Please include as much relevant information as possible so that we can review the report efficiently.",
        },
        {
          type: "p",
          text: "If a dedicated abuse email address is created later, this Policy may be updated to include it.",
        },
      ],
    },
    {
      title: "What Counts as Abuse",
      blocks: [
        {
          type: "p",
          text: "For the purposes of this Policy, “abuse” means suspected misuse of the Service, including activity that may violate our Terms & Conditions, Acceptable Use Policy, Proxy Service & Fair Usage Policy, applicable law, third-party rights or network integrity standards.",
        },
        {
          type: "p",
          text: "Abuse may include, without limitation:",
        },
        {
          type: "list",
          items: [
            "spam",
            "phishing",
            "malware",
            "ransomware activity",
            "credential stuffing",
            "brute force attacks",
            "account takeover attempts",
            "unauthorised login attempts",
            "DDoS attacks",
            "traffic flooding",
            "unauthorised vulnerability scanning",
            "unauthorised port scanning",
            "payment fraud",
            "carding",
            "refund fraud",
            "marketplace abuse",
            "fake reviews or fake engagement",
            "unlawful scraping",
            "scraping of non-public data",
            "unlawful personal data collection",
            "intellectual property infringement",
            "platform manipulation",
            "sanctions evasion",
            "restricted jurisdiction access",
            "use connected with illegal content",
            "activity that overloads, disrupts or harms third-party systems",
            "any other unlawful, harmful, deceptive or unauthorised activity",
          ],
        },
      ],
    },
    {
      title: "Who May Submit an Abuse Report",
      blocks: [
        {
          type: "p",
          text: "An abuse report may be submitted by:",
        },
        {
          type: "list",
          items: [
            "affected websites",
            "online platforms",
            "hosting providers",
            "network operators",
            "cloud providers",
            "payment providers",
            "security researchers",
            "brand owners",
            "intellectual property rights holders",
            "data protection complainants",
            "individuals affected by suspicious activity",
            "law enforcement agencies",
            "regulators",
            "infrastructure providers",
            "Virenza Proxy users",
            "any other person or organisation with a legitimate concern",
          ],
        },
        {
          type: "p",
          text: "We may prioritise reports based on seriousness, credibility, evidence, urgency, legal risk and impact.",
        },
      ],
    },
    {
      title: "Information to Include in an Abuse Report",
      blocks: [
        {
          type: "p",
          text: "To help us review an abuse report, please include as much of the following information as possible:",
        },
        {
          type: "list",
          items: [
            "your name and organisation",
            "your contact email",
            "your role or authority to report the issue",
            "description of the suspected abuse",
            "affected website, platform, system, account or network",
            "relevant URLs",
            "relevant IP addresses",
            "relevant domain names",
            "proxy IP or endpoint involved, if known",
            "timestamps, including date, time and time zone",
            "server logs",
            "HTTP logs",
            "firewall logs",
            "authentication logs",
            "request headers, where relevant and lawful to share",
            "screenshots",
            "sample messages or payloads",
            "error messages",
            "evidence of harm or attempted harm",
            "any previous correspondence or complaint references",
            "requested action, if any",
          ],
        },
        {
          type: "p",
          text: "Reports with clear timestamps, IP addresses, logs and technical evidence are easier to investigate.",
        },
      ],
    },
    {
      title: "Timestamp Requirements",
      blocks: [
        {
          type: "p",
          text: "Where possible, timestamps should include:",
        },
        {
          type: "list",
          items: [
            "full date",
            "exact time",
            "time zone",
            "whether the time is UTC or local time",
            "log source",
            "affected endpoint or system",
          ],
        },
        {
          type: "p",
          text: "Example format:",
        },
        {
          type: "p",
          text: "2026-07-09 14:35:22 UTC",
        },
        {
          type: "p",
          text: "Reports without timestamps may be difficult or impossible to match to our records.",
        },
      ],
    },
    {
      title: "Evidence Quality",
      blocks: [
        {
          type: "p",
          text: "We may be unable to take action based on vague, incomplete or unsupported reports.",
        },
        {
          type: "p",
          text: "Examples of insufficient reports may include:",
        },
        {
          type: "list",
          items: [
            "“your proxy attacked us” without IPs, logs or timestamps",
            "screenshots without technical data",
            "allegations without affected URLs or systems",
            "reports that do not identify the relevant traffic",
            "reports sent long after the event where records are no longer available",
            "complaints based only on general dislike of proxy services",
            "reports that appear abusive, fraudulent or misleading",
          ],
        },
        {
          type: "p",
          text: "We may request additional information before taking action.",
        },
      ],
    },
    {
      title: "Do Not Send Unnecessary Sensitive Data",
      blocks: [
        {
          type: "p",
          text: "When submitting an abuse report, please avoid sending unnecessary personal data, confidential information, credentials, private keys, payment data, sensitive personal data or excessive log data.",
        },
        {
          type: "p",
          text: "You should redact or minimise data where possible while still providing enough information for us to review the report.",
        },
        {
          type: "p",
          text: "Do not send passwords, authentication tokens, private keys, payment card numbers, medical data or other highly sensitive information unless we specifically request it and you have a lawful basis to share it.",
        },
      ],
    },
    {
      title: "Initial Review",
      blocks: [
        {
          type: "p",
          text: "After receiving an abuse report, we may carry out an initial review to determine:",
        },
        {
          type: "list",
          items: [
            "whether the report relates to the Service",
            "whether sufficient evidence has been provided",
            "whether the reported IP, endpoint, account or traffic can be identified",
            "whether the issue is urgent",
            "whether immediate protective action is needed",
            "whether the report relates to unlawful or prohibited activity",
            "whether additional information is required",
            "whether another provider or third party is better placed to act",
          ],
        },
        {
          type: "p",
          text: "We are not required to take action on every report, especially where the report is incomplete, unrelated, unsupported or outside our control.",
        },
      ],
    },
    {
      title: "Investigation Process",
      blocks: [
        {
          type: "p",
          text: "Where we decide to investigate, we may review relevant records, including:",
        },
        {
          type: "list",
          items: [
            "account records",
            "order records",
            "payment records",
            "proxy allocation records",
            "authentication logs",
            "connection timestamps",
            "traffic volume",
            "bandwidth usage",
            "endpoint or gateway records",
            "API usage records",
            "dashboard activity",
            "security logs",
            "abuse indicators",
            "support communications",
            "previous complaints",
            "provider alerts",
            "compliance review records",
          ],
        },
        {
          type: "p",
          text: "We may also contact the relevant customer, provider, payment processor or reporting party where appropriate.",
        },
        {
          type: "p",
          text: "Our ability to investigate depends on the quality of the report, the availability of records and applicable legal, technical and privacy limitations.",
        },
      ],
    },
    {
      title: "Possible Actions",
      blocks: [
        {
          type: "p",
          text: "Depending on the report and our investigation, we may take one or more actions, including:",
        },
        {
          type: "list",
          items: [
            "requesting more information from the reporter",
            "requesting an explanation from the customer",
            "warning the customer",
            "requiring the customer to stop or modify activity",
            "blocking specific traffic",
            "blocking destinations",
            "blocking ports or protocols",
            "applying rate limits",
            "applying concurrency limits",
            "disabling specific credentials",
            "rotating or withdrawing proxy access",
            "suspending the account",
            "terminating the account",
            "cancelling pending orders",
            "refusing future service",
            "preserving relevant records",
            "notifying upstream providers",
            "notifying payment providers",
            "notifying affected parties where appropriate",
            "reporting activity to regulators, law enforcement or competent authorities where legally appropriate",
            "taking no action where the report is not substantiated",
          ],
        },
        {
          type: "p",
          text: "We may act without prior notice to the customer where the report indicates urgent risk, unlawful activity, serious abuse, security threat, provider requirement or legal obligation.",
        },
      ],
    },
    {
      title: "Serious Abuse",
      blocks: [
        {
          type: "p",
          text: "Certain reports may be treated as serious abuse and may result in immediate suspension or termination.",
        },
        {
          type: "p",
          text: "Serious abuse may include:",
        },
        {
          type: "list",
          items: [
            "child sexual abuse material or exploitation",
            "terrorism-related activity",
            "credible threats of violence",
            "malware distribution",
            "ransomware activity",
            "phishing",
            "credential theft",
            "account takeover",
            "DDoS attacks",
            "large-scale spam",
            "payment fraud",
            "sanctions evasion",
            "unlawful access to protected systems",
            "activity causing immediate harm to third parties",
            "activity that exposes Virenza Proxy, our providers or users to serious legal or security risk",
          ],
        },
        {
          type: "p",
          text: "Where required or appropriate, serious abuse may be reported to competent authorities.",
        },
      ],
    },
    {
      title: "Customer Cooperation",
      blocks: [
        {
          type: "p",
          text: "If we contact you about an abuse report involving your account, you must cooperate promptly and in good faith.",
        },
        {
          type: "p",
          text: "You may be required to:",
        },
        {
          type: "list",
          items: [
            "explain the relevant use case",
            "identify scripts, tools or systems involved",
            "provide technical logs",
            "stop or reduce traffic",
            "block specific destinations",
            "change configuration",
            "confirm that your activity is lawful",
            "provide proof of authorisation",
            "provide company or customer details where relevant",
            "respond within a specified timeframe",
          ],
        },
        {
          type: "p",
          text: "Failure to cooperate may result in suspension, termination or refusal of future service.",
        },
      ],
    },
    {
      title: "Suspension During Investigation",
      blocks: [
        {
          type: "p",
          text: "We may suspend or limit access while reviewing an abuse report.",
        },
        {
          type: "p",
          text: "During investigation, we may:",
        },
        {
          type: "list",
          items: [
            "disable proxy credentials",
            "pause API access",
            "block specific traffic",
            "freeze new orders",
            "restrict dashboard functionality",
            "block certain destinations",
            "limit bandwidth or request rates",
            "require customer verification",
            "preserve relevant records",
          ],
        },
        {
          type: "p",
          text: "Suspension during investigation does not automatically entitle the customer to a refund, credit or extension.",
        },
      ],
    },
    {
      title: "No Refunds for Abuse",
      blocks: [
        {
          type: "p",
          text: "If an account, order or access is suspended, restricted or terminated because of abuse, suspected abuse, unlawful activity, policy violations, failure to cooperate or serious risk, the customer may not be entitled to a refund.",
        },
        {
          type: "p",
          text: "This includes unused access, unused traffic, prepaid balances, credits, subscriptions, custom orders and manually configured services.",
        },
        {
          type: "p",
          text: "Refunds are handled under our Refund & Cancellation Policy.",
        },
      ],
    },
    {
      title: "Repeat Abuse",
      blocks: [
        {
          type: "p",
          text: "We may treat repeat complaints or recurring suspicious activity as evidence of higher risk, even where each individual report is limited.",
        },
        {
          type: "p",
          text: "Repeat abuse may result in:",
        },
        {
          type: "list",
          items: [
            "stricter limits",
            "enhanced monitoring",
            "mandatory use-case review",
            "loss of replacement rights",
            "refusal of high-volume access",
            "suspension",
            "termination",
            "refusal of future orders",
            "reporting to providers or payment processors",
          ],
        },
        {
          type: "p",
          text: "We may also terminate accounts where repeated complaints indicate that the customer cannot or will not control their traffic.",
        },
      ],
    },
    {
      title: "False or Abusive Reports",
      blocks: [
        {
          type: "p",
          text: "You must not submit knowingly false, misleading, malicious, abusive or bad-faith reports.",
        },
        {
          type: "p",
          text: "We may ignore or reject reports that appear to be:",
        },
        {
          type: "list",
          items: [
            "knowingly false",
            "retaliatory",
            "abusive",
            "spam",
            "unsupported",
            "intended to harass a customer",
            "intended to obtain confidential information",
            "unrelated to the Service",
            "part of a commercial dispute unrelated to abuse",
            "legally defective or overbroad",
          ],
        },
        {
          type: "p",
          text: "Submitting an abuse report does not give you the right to receive confidential customer information, internal logs, investigation details or enforcement explanations.",
        },
      ],
    },
    {
      title: "Confidentiality of Investigations",
      blocks: [
        {
          type: "p",
          text: "We may keep investigation details confidential to protect:",
        },
        {
          type: "list",
          items: [
            "customer privacy",
            "reporter privacy",
            "security controls",
            "abuse detection methods",
            "provider relationships",
            "legal privilege",
            "law enforcement activity",
            "ongoing investigations",
            "commercially sensitive information",
            "the integrity of the Service",
          ],
        },
        {
          type: "p",
          text: "We may provide a general response where appropriate, but we are not required to disclose:",
        },
        {
          type: "list",
          items: [
            "customer identity",
            "account details",
            "internal logs",
            "payment records",
            "full investigation results",
            "enforcement rationale",
            "security methods",
            "provider information",
            "legal analysis",
          ],
        },
      ],
    },
    {
      title: "Law Enforcement and Regulatory Requests",
      blocks: [
        {
          type: "p",
          text: "Requests from law enforcement agencies, regulators, courts or competent authorities should be sent to:",
        },
        {
          type: "p",
          text: "info@virenzaproxy.com",
        },
        {
          type: "p",
          text: "Such requests should include:",
        },
        {
          type: "list",
          items: [
            "name of authority",
            "officer or case contact",
            "legal basis for the request",
            "relevant case reference",
            "specific information requested",
            "affected IPs, accounts, timestamps or identifiers",
            "urgency level",
            "official contact details",
          ],
        },
        {
          type: "p",
          text: "We may require formal legal process before disclosing customer information, unless emergency disclosure is permitted or required by law.",
        },
      ],
    },
    {
      title: "Emergency Requests",
      blocks: [
        {
          type: "p",
          text: "If a report concerns an urgent threat to life, serious physical harm, child exploitation, terrorism, active cyberattack or other serious emergency, please clearly mark the subject line as:",
        },
        {
          type: "p",
          text: "URGENT ABUSE REPORT",
        },
        {
          type: "p",
          text: "or",
        },
        {
          type: "p",
          text: "URGENT LEGAL / SAFETY REQUEST",
        },
        {
          type: "p",
          text: "Emergency reports should include all available evidence, timestamps and contact details for immediate follow-up.",
        },
        {
          type: "p",
          text: "We will review urgent reports as quickly as reasonably possible, but we do not guarantee 24/7 emergency response unless expressly stated in a separate written agreement.",
        },
      ],
    },
    {
      title: "Intellectual Property Complaints",
      blocks: [
        {
          type: "p",
          text: "If your complaint concerns intellectual property infringement, please include:",
        },
        {
          type: "list",
          items: [
            "identification of the protected work or right",
            "evidence of ownership or authority to act",
            "affected URLs or systems",
            "relevant timestamps",
            "description of the alleged infringement",
            "supporting evidence",
            "your contact details",
            "requested action",
          ],
        },
        {
          type: "p",
          text: "Virenza Proxy is a proxy infrastructure provider and may not host or control the content accessed through the Service.",
        },
        {
          type: "p",
          text: "Where appropriate, you may also need to contact the website, platform, hosting provider, domain registrar, content provider or other party that controls the relevant content.",
        },
      ],
    },
    {
      title: "Data Protection Complaints",
      blocks: [
        {
          type: "p",
          text: "If your complaint concerns personal data, privacy or unlawful data collection, please include:",
        },
        {
          type: "list",
          items: [
            "description of the alleged personal data issue",
            "affected website, account, system or individual",
            "relevant IPs, URLs, timestamps and logs",
            "why you believe the activity is unlawful",
            "your role or authority to complain",
            "any previous correspondence with the customer or affected platform",
            "supporting evidence",
          ],
        },
        {
          type: "p",
          text: "We may review whether the reported activity violates our Acceptable Use Policy, Privacy Policy, Terms & Conditions or applicable law.",
        },
        {
          type: "p",
          text: "Virenza Proxy does not provide legal advice and may not be able to determine all underlying data protection disputes between third parties.",
        },
      ],
    },
    {
      title: "Security Research Reports",
      blocks: [
        {
          type: "p",
          text: "Security researchers may report suspected misuse, vulnerabilities or security concerns to:",
        },
        {
          type: "p",
          text: "info@virenzaproxy.com",
        },
        {
          type: "p",
          text: "Please include:",
        },
        {
          type: "list",
          items: [
            "clear description of the issue",
            "steps to reproduce, where relevant",
            "evidence of impact",
            "affected systems",
            "timestamps",
            "your contact details",
            "whether disclosure has been made or is planned",
          ],
        },
        {
          type: "p",
          text: "You must not conduct unauthorised testing, scanning, exploitation or access against Virenza Proxy systems, our customers, our providers or third-party systems.",
        },
        {
          type: "p",
          text: "Security research must be lawful, responsible and non-disruptive.",
        },
      ],
    },
    {
      title: "Abuse Reports from Providers",
      blocks: [
        {
          type: "p",
          text: "We may receive abuse reports from hosting providers, proxy infrastructure providers, network operators, payment providers, fraud prevention providers or other service providers.",
        },
        {
          type: "p",
          text: "Provider reports may trigger immediate review, traffic restrictions, suspension, credential disabling or termination, especially where provider rules require quick action.",
        },
        {
          type: "p",
          text: "We may rely on provider reports as evidence of risk, even where the provider does not disclose all internal detection methods.",
        },
      ],
    },
    {
      title: "Abuse Reports from Third-Party Platforms",
      blocks: [
        {
          type: "p",
          text: "Third-party platforms, websites, marketplaces, search engines, advertising networks or online services may submit reports about traffic they believe is abusive or unauthorised.",
        },
        {
          type: "p",
          text: "We may review such reports and take action if the traffic appears to violate our policies.",
        },
        {
          type: "p",
          text: "However, we do not automatically enforce every third-party platform rule. We assess reports based on evidence, legal context, technical impact, customer explanation, our policies and the risk to the Service.",
        },
      ],
    },
    {
      title: "Abuse Related to Third-Party Content",
      blocks: [
        {
          type: "p",
          text: "Virenza Proxy may provide proxy access but may not host, publish, control or edit third-party content accessed through the Service.",
        },
        {
          type: "p",
          text: "If your complaint relates to content hosted on a third-party website, you may need to contact:",
        },
        {
          type: "list",
          items: [
            "the website operator",
            "the hosting provider",
            "the domain registrar",
            "the content platform",
            "the email provider",
            "the relevant law enforcement authority",
            "another provider closer to the content or account",
          ],
        },
        {
          type: "p",
          text: "Where the complaint relates to misuse of Virenza Proxy infrastructure, we will review the proxy-related aspect of the report.",
        },
      ],
    },
    {
      title: "Record Preservation",
      blocks: [
        {
          type: "p",
          text: "Where appropriate, we may preserve records relating to an abuse report, including:",
        },
        {
          type: "list",
          items: [
            "account records",
            "proxy allocation records",
            "authentication logs",
            "usage records",
            "support communications",
            "payment records",
            "compliance review records",
            "security logs",
            "enforcement actions",
            "correspondence with reporters, customers, providers or authorities",
          ],
        },
        {
          type: "p",
          text: "Records may be retained for as long as reasonably necessary for abuse prevention, legal compliance, fraud prevention, dispute resolution, provider requirements, enforcement of our policies or legal claims.",
        },
        {
          type: "p",
          text: "Further details are provided in our Privacy Policy.",
        },
      ],
    },
    {
      title: "Data Protection and Privacy",
      blocks: [
        {
          type: "p",
          text: "We process personal data involved in abuse reports in accordance with our Privacy Policy.",
        },
        {
          type: "p",
          text: "Depending on the circumstances, we may process personal data for:",
        },
        {
          type: "list",
          items: [
            "legitimate interests",
            "legal obligations",
            "fraud prevention",
            "security",
            "abuse prevention",
            "compliance review",
            "enforcement of our Terms & Conditions",
            "establishment, exercise or defence of legal claims",
            "cooperation with lawful requests",
          ],
        },
        {
          type: "p",
          text: "We may share relevant information with providers, payment processors, affected parties, regulators, law enforcement or competent authorities where lawful and appropriate.",
        },
      ],
    },
    {
      title: "Reporter Responsibilities",
      blocks: [
        {
          type: "p",
          text: "By submitting an abuse report, you confirm that:",
        },
        {
          type: "list",
          items: [
            "the information you provide is accurate to the best of your knowledge",
            "you have a legitimate reason to submit the report",
            "you are authorised to share the evidence provided",
            "you have minimised unnecessary personal or confidential data where possible",
            "you will respond to reasonable follow-up questions",
            "you will not misuse the abuse reporting process",
          ],
        },
        {
          type: "p",
          text: "You are responsible for ensuring that any information you provide to us is lawfully obtained and lawfully shared.",
        },
      ],
    },
    {
      title: "Customer Responsibilities",
      blocks: [
        {
          type: "p",
          text: "Customers must use the Service in accordance with our Terms & Conditions, Acceptable Use Policy, Proxy Service & Fair Usage Policy, Sanctions & Restricted Jurisdictions Policy and all applicable laws.",
        },
        {
          type: "p",
          text: "Customers must:",
        },
        {
          type: "list",
          items: [
            "monitor their own traffic",
            "prevent abuse by employees, contractors, customers or sub-users",
            "secure credentials and API keys",
            "stop harmful activity immediately",
            "cooperate with abuse investigations",
            "maintain reasonable controls for automation and scraping",
            "avoid unlawful or unauthorised activity",
            "respond promptly to our inquiries",
          ],
        },
        {
          type: "p",
          text: "Customers remain responsible for all activity conducted through their accounts, credentials, integrations and authorised users.",
        },
      ],
    },
    {
      title: "Relationship with Other Policies",
      blocks: [
        {
          type: "p",
          text: "This Policy should be read together with our:",
        },
        {
          type: "list",
          items: [
            "Terms & Conditions",
            "Acceptable Use Policy",
            "Proxy Service & Fair Usage Policy",
            "Customer Verification & Compliance Review Policy",
            "Sanctions & Restricted Jurisdictions Policy",
            "Payment, Billing & Taxes Policy",
            "Refund & Cancellation Policy",
            "Digital Delivery / Provisioning Policy",
            "Privacy Policy",
            "Complaints Policy",
          ],
        },
        {
          type: "p",
          text: "If this Policy conflicts with another policy, the stricter rule may apply where necessary for legal, security, provider, payment, sanctions, anti-abuse or compliance reasons.",
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
          text: "Continued use of the Service after the updated Policy becomes effective means that you accept the updated Policy.",
        },
        {
          type: "p",
          text: "If you do not agree with the updated Policy, you must stop using the Service.",
        },
      ],
    },
    {
      title: "Contact",
      blocks: [
        {
          type: "p",
          text: "If you have questions about this Policy or wish to submit an abuse report, you may contact us at:",
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
        {
          type: "p",
          text: "Please use the subject line:",
        },
        {
          type: "p",
          text: "Abuse Report — [brief description]",
        },
        {
          type: "p",
          text: "and include all relevant timestamps, IP addresses, URLs, logs and supporting evidence.",
        },
      ],
    },
  ],
};
