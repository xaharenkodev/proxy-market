import type { LegalDoc } from "./types";

export const sanctionsPolicy: LegalDoc = {
  slug: "sanctions-policy",
  title: "Sanctions & Restricted Jurisdictions Policy",
  updated: "July 9, 2026",
  intro: [
    {
      type: "p",
      text: "This Sanctions & Restricted Jurisdictions Policy (“Policy”) explains how VIRENZA LTD, trading as Virenza Proxy, manages sanctions, restricted jurisdictions, prohibited customers, prohibited use cases, compliance checks and related access restrictions.",
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
    {
      type: "p",
      text: "By creating an account, placing an order, purchasing proxy access, using the dashboard, receiving credentials or otherwise using the Service, you agree to comply with this Policy.",
    },
  ],
  sections: [
    {
      title: "Purpose of this Policy",
      blocks: [
        {
          type: "p",
          text: "Virenza Proxy provides proxy infrastructure and related digital services that may be accessed globally. Because proxy services may be misused to conceal activity, bypass controls or facilitate restricted transactions, we apply sanctions, restricted jurisdiction and compliance controls to protect:",
        },
        {
          type: "list",
          items: [
            "Virenza Proxy",
            "our users",
            "our providers",
            "payment processors",
            "infrastructure partners",
            "third-party platforms and websites",
            "affected individuals and organisations",
            "the integrity of our Service",
            "compliance with applicable laws and sanctions regimes",
          ],
        },
        {
          type: "p",
          text: "This Policy is designed to prevent the Service from being provided to or used by sanctioned persons, restricted jurisdictions, prohibited entities, high-risk users, unlawful use cases or activities that may expose us or others to sanctions, legal, security, financial, operational or reputational risk.",
        },
      ],
    },
    {
      title: "Applicable Sanctions and Legal Requirements",
      blocks: [
        {
          type: "p",
          text: "As a company incorporated in the United Kingdom, VIRENZA LTD must consider applicable UK sanctions and legal restrictions.",
        },
        {
          type: "p",
          text: "Depending on the circumstances, we may also consider or apply other sanctions, export control, trade restriction, anti-terrorism, anti-money laundering, anti-fraud, cybersecurity or compliance requirements, including where relevant:",
        },
        {
          type: "list",
          items: [
            "United Kingdom sanctions",
            "United Nations sanctions",
            "European Union sanctions",
            "United States sanctions, including OFAC-related restrictions where relevant to payment providers, infrastructure providers or transaction processing",
            "sanctions or restrictions imposed by countries where we, our providers or our payment processors operate",
            "export control and trade restrictions",
            "anti-terrorism financing restrictions",
            "payment network and banking restrictions",
            "infrastructure provider requirements",
            "legal or regulatory requirements applicable to the Service",
          ],
        },
        {
          type: "p",
          text: "This Policy does not provide legal advice. You are responsible for ensuring that your access to and use of the Service complies with all laws and restrictions applicable to you.",
        },
      ],
    },
    {
      title: "Prohibited Customers",
      blocks: [
        {
          type: "p",
          text: "You must not create an account, place an order, purchase, access or use the Service if you are:",
        },
        {
          type: "list",
          items: [
            "a sanctioned person",
            "a designated person",
            "an asset-freeze target",
            "owned or controlled by a sanctioned or designated person",
            "acting on behalf of a sanctioned or designated person",
            "located in a prohibited or comprehensively restricted jurisdiction",
            "resident in a prohibited or comprehensively restricted jurisdiction",
            "incorporated, registered or operating from a prohibited or restricted jurisdiction",
            "using a payment method connected with a sanctioned or restricted person",
            "using the Service for sanctions evasion",
            "otherwise prohibited from receiving the Service under applicable law",
          ],
        },
        {
          type: "p",
          text: "You must not attempt to access the Service indirectly through another person, company, reseller, agent, payment method, VPN, proxy, nominee, shell entity or misleading account information if direct access would be prohibited.",
        },
      ],
    },
    {
      title: "Restricted Jurisdictions",
      blocks: [
        {
          type: "p",
          text: "We may refuse, restrict, suspend or terminate access to the Service for users, entities, payments, traffic or use cases connected with jurisdictions that are subject to sanctions, embargoes, trade restrictions, internet service restrictions, payment restrictions, provider restrictions or other legal limitations.",
        },
        {
          type: "p",
          text: "Restricted jurisdictions may include, depending on applicable law and risk assessment:",
        },
        {
          type: "list",
          items: [
            "countries or territories subject to comprehensive sanctions",
            "countries or territories subject to broad trade or financial restrictions",
            "territories subject to occupation-related or conflict-related restrictions",
            "jurisdictions associated with high sanctions evasion risk",
            "jurisdictions where proxy services are prohibited or heavily restricted",
            "jurisdictions where our payment providers, infrastructure providers or upstream providers do not permit service",
            "jurisdictions where we determine that providing the Service creates unacceptable legal, compliance, security, operational or reputational risk",
          ],
        },
        {
          type: "p",
          text: "We may update restricted jurisdiction controls at any time without prior notice.",
        },
        {
          type: "p",
          text: "Because sanctions and restrictions change, we do not guarantee that a jurisdiction available at one time will remain available.",
        },
      ],
    },
    {
      title: "Examples of Restricted Connections",
      blocks: [
        {
          type: "p",
          text: "A customer, order, payment or use case may be treated as restricted if it is connected with a prohibited person or jurisdiction through:",
        },
        {
          type: "list",
          items: [
            "billing address",
            "registered address",
            "residence",
            "place of incorporation",
            "business operations",
            "beneficial ownership",
            "director, officer or controlling person",
            "payment method",
            "bank account",
            "card issuer",
            "IP address",
            "login location",
            "proxy traffic destination",
            "declared use case",
            "customer website",
            "customer end users",
            "reseller or agency relationship",
            "source of funds",
            "sanctions screening result",
            "provider or payment processor restriction",
            "other risk indicators",
          ],
        },
        {
          type: "p",
          text: "We may consider both direct and indirect connections.",
        },
      ],
    },
    {
      title: "Sanctions Evasion Prohibited",
      blocks: [
        {
          type: "p",
          text: "You must not use the Service to evade, circumvent or assist another person in evading or circumventing sanctions, export controls, trade restrictions, payment restrictions, platform restrictions or legal requirements.",
        },
        {
          type: "p",
          text: "Prohibited sanctions evasion includes:",
        },
        {
          type: "list",
          items: [
            "hiding the true location of a sanctioned or restricted person",
            "creating accounts for restricted persons",
            "routing traffic on behalf of restricted persons",
            "using proxies to bypass geo-blocks imposed for legal or sanctions reasons",
            "using false billing or company details",
            "using nominee companies or intermediaries to hide ownership or control",
            "paying through third parties to avoid restrictions",
            "accessing restricted services, platforms or systems on behalf of prohibited users",
            "helping a restricted person obtain goods, services, accounts, data, infrastructure or digital access",
            "disguising traffic destinations or traffic purposes to avoid review",
          ],
        },
        {
          type: "p",
          text: "Any suspected sanctions evasion may result in immediate suspension or termination without refund.",
        },
      ],
    },
    {
      title: "Restricted Use Cases",
      blocks: [
        {
          type: "p",
          text: "Even where a customer is not directly sanctioned, we may restrict, refuse or terminate use cases that create sanctions, legal, security or compliance risk.",
        },
        {
          type: "p",
          text: "Restricted use cases may include:",
        },
        {
          type: "list",
          items: [
            "use connected with sanctioned persons or entities",
            "use connected with prohibited territories",
            "use for government, military, intelligence or defence-related purposes in high-risk jurisdictions",
            "use for cyber operations, surveillance or monitoring on behalf of restricted parties",
            "use to access restricted platforms, services or accounts in violation of sanctions or legal controls",
            "use involving export-controlled goods, services, technology or data",
            "use connected with terrorism, extremism or organised crime",
            "use involving financial fraud, payment abuse, cryptocurrency fraud or sanctions evasion",
            "use for unauthorised scraping of sensitive government, defence, financial or critical infrastructure data",
            "use likely to trigger sanctions, export control, cybercrime, anti-terrorism or national security concerns",
          ],
        },
        {
          type: "p",
          text: "We may require additional information before approving or continuing any high-risk use case.",
        },
      ],
    },
    {
      title: "Prohibited Proxy Destinations",
      blocks: [
        {
          type: "p",
          text: "We may block or restrict traffic to certain destinations where required or appropriate for legal, sanctions, provider, security or compliance reasons.",
        },
        {
          type: "p",
          text: "This may include:",
        },
        {
          type: "list",
          items: [
            "sanctioned entities",
            "prohibited platforms",
            "restricted government systems",
            "defence or military systems",
            "critical infrastructure systems",
            "financial systems where access appears abusive or unauthorised",
            "destinations associated with malware, phishing, fraud or cyberattacks",
            "destinations subject to provider restrictions",
            "IP ranges, domains, ports or services that create unacceptable risk",
            "destinations connected with restricted jurisdictions or prohibited activity",
          ],
        },
        {
          type: "p",
          text: "We are not required to provide access to any destination that we consider unlawful, prohibited, high risk or inconsistent with this Policy.",
        },
      ],
    },
    {
      title: "Customer Screening and Verification",
      blocks: [
        {
          type: "p",
          text: "We may screen, review or verify customers, orders, payments and use cases before or after providing the Service.",
        },
        {
          type: "p",
          text: "Screening and verification may include:",
        },
        {
          type: "list",
          items: [
            "sanctions screening",
            "restricted jurisdiction checks",
            "payment risk checks",
            "fraud prevention checks",
            "identity or company review",
            "beneficial ownership review where appropriate",
            "use-case review",
            "IP and login location review",
            "billing information review",
            "payment method review",
            "traffic destination review",
            "provider or payment processor risk review",
            "manual review of high-risk activity",
          ],
        },
        {
          type: "p",
          text: "We may use internal systems, third-party tools, public databases, sanctions lists, payment provider information, fraud prevention services, infrastructure provider feedback and other lawful sources.",
        },
      ],
    },
    {
      title: "Information We May Request",
      blocks: [
        {
          type: "p",
          text: "To complete a review, we may request additional information from you, including:",
        },
        {
          type: "list",
          items: [
            "full legal name",
            "company name",
            "company registration number",
            "registered address",
            "trading address",
            "billing address",
            "country of residence or establishment",
            "website or business profile",
            "ownership or control information",
            "proof of authority to act for a company",
            "intended use case",
            "target countries or traffic destinations",
            "explanation of traffic volume",
            "payment verification details",
            "confirmation that you are not sanctioned or restricted",
            "confirmation that your use case is lawful",
            "other information reasonably required for compliance review",
          ],
        },
        {
          type: "p",
          text: "If you do not provide requested information, or if the information appears incomplete, inaccurate, misleading or high risk, we may refuse or suspend the Service.",
        },
      ],
    },
    {
      title: "Customer Representations",
      blocks: [
        {
          type: "p",
          text: "By using the Service, you represent and warrant that:",
        },
        {
          type: "list",
          items: [
            "you are not a sanctioned person",
            "you are not owned or controlled by a sanctioned person",
            "you are not acting on behalf of a sanctioned person",
            "you are not located in a prohibited jurisdiction",
            "you are not using the Service for sanctions evasion",
            "your payment method is not connected with a sanctioned or restricted person",
            "your use of the Service complies with all applicable sanctions and legal restrictions",
            "you will not allow any prohibited person to access or benefit from the Service",
            "all information you provide to us is accurate, complete and not misleading",
          ],
        },
        {
          type: "p",
          text: "You must notify us immediately if any of these statements becomes inaccurate.",
        },
      ],
    },
    {
      title: "Duty to Update Information",
      blocks: [
        {
          type: "p",
          text: "You must promptly update us if:",
        },
        {
          type: "list",
          items: [
            "your location changes to a restricted jurisdiction",
            "your company changes ownership or control",
            "a beneficial owner, director or controlling person becomes sanctioned",
            "your use case changes materially",
            "your traffic destination changes to a high-risk or restricted destination",
            "your payment method becomes unavailable, restricted or linked to a prohibited person",
            "you become subject to sanctions, investigation or legal restrictions",
            "any information previously provided to us becomes inaccurate",
          ],
        },
        {
          type: "p",
          text: "Failure to provide updated information may result in suspension or termination.",
        },
      ],
    },
    {
      title: "Account Registration Restrictions",
      blocks: [
        {
          type: "p",
          text: "We may refuse account registration where:",
        },
        {
          type: "list",
          items: [
            "the country is restricted",
            "the email, billing, IP or payment information appears high risk",
            "the account information is incomplete or false",
            "sanctions screening produces a match or possible match",
            "we cannot verify the customer or use case",
            "the account appears to be created for a restricted person",
            "multiple accounts are used to bypass restrictions",
            "account creation appears automated, abusive or misleading",
            "the registration conflicts with our provider, payment or compliance requirements",
          ],
        },
        {
          type: "p",
          text: "We are not required to provide access to the Service merely because registration was technically possible.",
        },
      ],
    },
    {
      title: "Payment Restrictions",
      blocks: [
        {
          type: "p",
          text: "We may refuse, delay, cancel, refund or block payments where:",
        },
        {
          type: "list",
          items: [
            "the payment method is issued in a restricted jurisdiction",
            "the payment provider flags sanctions, fraud or compliance risk",
            "the payment appears to be made on behalf of a restricted person",
            "the billing details are inconsistent or misleading",
            "the transaction appears structured to evade restrictions",
            "the payment source cannot be verified where required",
            "the bank, card issuer or payment provider restricts the transaction",
            "payment acceptance would create sanctions, legal or compliance risk",
          ],
        },
        {
          type: "p",
          text: "A successful payment does not guarantee account approval, order acceptance or Service activation.",
        },
      ],
    },
    {
      title: "Access Restrictions and Geo-Blocking",
      blocks: [
        {
          type: "p",
          text: "We may use technical measures to restrict access from certain countries, regions, IP ranges, networks, payment sources or traffic destinations.",
        },
        {
          type: "p",
          text: "These measures may include:",
        },
        {
          type: "list",
          items: [
            "geo-blocking",
            "payment blocking",
            "account review",
            "traffic filtering",
            "destination blocking",
            "port blocking",
            "protocol restrictions",
            "dashboard restrictions",
            "API restrictions",
            "manual approval requirements",
            "temporary or permanent suspension",
          ],
        },
        {
          type: "p",
          text: "Geo-blocking and related restrictions may be imperfect. You must not attempt to bypass them.",
        },
      ],
    },
    {
      title: "No Circumvention of Controls",
      blocks: [
        {
          type: "p",
          text: "You must not attempt to bypass our sanctions, restricted jurisdiction, fraud, payment, verification or access controls.",
        },
        {
          type: "p",
          text: "Prohibited circumvention includes:",
        },
        {
          type: "list",
          items: [
            "using false account details",
            "using another person’s identity",
            "using a nominee company",
            "using misleading company information",
            "using third-party payment methods to hide your identity or location",
            "using VPNs, proxies or remote access tools to hide a prohibited location",
            "creating multiple accounts after refusal or suspension",
            "routing activity through another customer",
            "using resellers or intermediaries to avoid restrictions",
            "concealing the true beneficiary of the Service",
            "misrepresenting your use case",
          ],
        },
        {
          type: "p",
          text: "Any attempted circumvention may result in immediate termination without refund.",
        },
      ],
    },
    {
      title: "Resellers, Agencies and Managed Use",
      blocks: [
        {
          type: "p",
          text: "If you are a reseller, agency, managed service provider or otherwise provide access to the Service for third parties, you must not provide access to any person or entity that would be prohibited from using the Service directly.",
        },
        {
          type: "p",
          text: "You are responsible for:",
        },
        {
          type: "list",
          items: [
            "screening your own customers where appropriate",
            "ensuring your customers comply with sanctions and restricted jurisdiction rules",
            "preventing access by prohibited persons",
            "maintaining reasonable records of customer use where required",
            "responding to compliance requests from us",
            "terminating access for restricted or prohibited users",
          ],
        },
        {
          type: "p",
          text: "We may require additional terms, verification, customer information or compliance procedures before approving reseller, agency or managed use.",
        },
      ],
    },
    {
      title: "Business Customers and Beneficial Ownership",
      blocks: [
        {
          type: "p",
          text: "For business customers, we may consider ownership and control.",
        },
        {
          type: "p",
          text: "A company may be restricted if it is owned, controlled, directed by or acting on behalf of a sanctioned or restricted person, even if the company itself does not appear by name on a sanctions list.",
        },
        {
          type: "p",
          text: "We may request ownership or control information where appropriate.",
        },
        {
          type: "p",
          text: "We may refuse or terminate service if we cannot reasonably determine that the customer is not owned or controlled by a prohibited person.",
        },
      ],
    },
    {
      title: "High-Risk Countries and Enhanced Review",
      blocks: [
        {
          type: "p",
          text: "Some countries may not be fully prohibited but may still trigger enhanced review because of sanctions risk, cybercrime risk, fraud risk, provider restrictions, payment risk, export control risk or abuse history.",
        },
        {
          type: "p",
          text: "Enhanced review may involve:",
        },
        {
          type: "list",
          items: [
            "requesting additional information",
            "delaying activation",
            "limiting products",
            "restricting locations",
            "restricting traffic destinations",
            "applying lower usage limits",
            "refusing certain payment methods",
            "manual approval",
            "ongoing monitoring",
            "periodic re-review",
          ],
        },
        {
          type: "p",
          text: "We may decide not to provide the Service where enhanced review does not resolve the risk.",
        },
      ],
    },
    {
      title: "Traffic Monitoring for Compliance",
      blocks: [
        {
          type: "p",
          text: "To enforce this Policy, we may monitor relevant account, payment, technical, usage, login, authentication, destination and security information.",
        },
        {
          type: "p",
          text: "This may include:",
        },
        {
          type: "list",
          items: [
            "account country",
            "billing country",
            "payment method country",
            "login IP",
            "proxy usage patterns",
            "traffic destination patterns",
            "bandwidth use",
            "API use",
            "authentication logs",
            "account activity",
            "abuse reports",
            "provider alerts",
            "payment processor alerts",
            "sanctions screening indicators",
          ],
        },
        {
          type: "p",
          text: "We handle personal data in accordance with our Privacy Policy.",
        },
      ],
    },
    {
      title: "Suspension During Review",
      blocks: [
        {
          type: "p",
          text: "We may suspend or limit the Service while reviewing sanctions, restricted jurisdiction, fraud, payment, ownership, use-case or compliance concerns.",
        },
        {
          type: "p",
          text: "During review, we may:",
        },
        {
          type: "list",
          items: [
            "disable login",
            "disable proxy credentials",
            "block new orders",
            "freeze account balance or credits",
            "pause activation",
            "block certain destinations",
            "require additional information",
            "cancel pending orders",
          ],
        },
        {
          type: "p",
          text: "Suspension during review does not automatically entitle you to a refund.",
        },
        {
          type: "p",
          text: "If the review confirms a sanctions, restricted jurisdiction, fraud, abuse or policy issue, we may terminate the account without refund.",
        },
      ],
    },
    {
      title: "Termination Without Refund",
      blocks: [
        {
          type: "p",
          text: "We may terminate your account and refuse any refund where we reasonably believe that:",
        },
        {
          type: "list",
          items: [
            "you are a sanctioned or restricted person",
            "you are owned or controlled by a sanctioned or restricted person",
            "you are acting on behalf of a sanctioned or restricted person",
            "you are located in or operating from a prohibited jurisdiction",
            "you used false or misleading information",
            "you attempted to bypass sanctions or jurisdiction controls",
            "you used the Service for sanctions evasion",
            "you used the Service for unlawful or prohibited activity",
            "you failed to cooperate with compliance review",
            "your payment is connected with fraud, sanctions or restricted persons",
            "continuing to provide the Service would create legal, compliance, payment, provider, security or reputational risk",
          ],
        },
        {
          type: "p",
          text: "Where required or appropriate, we may preserve records and report activity to payment providers, infrastructure providers, regulators, law enforcement or competent authorities.",
        },
      ],
    },
    {
      title: "Refunds and Restricted Orders",
      blocks: [
        {
          type: "p",
          text: "Refunds for restricted orders are handled under our Refund & Cancellation Policy.",
        },
        {
          type: "p",
          text: "If an order is cancelled before activation solely because we cannot provide the Service due to legal or provider restrictions, and there is no fraud, abuse, false information, sanctions issue or policy breach by you, we may issue a refund where appropriate.",
        },
        {
          type: "p",
          text: "No refund may be provided where the order, account or payment is connected with:",
        },
        {
          type: "list",
          items: [
            "sanctions evasion",
            "prohibited jurisdiction use",
            "false information",
            "fraud",
            "payment abuse",
            "unlawful activity",
            "breach of this Policy",
            "breach of our Acceptable Use Policy",
            "chargeback abuse",
            "attempted circumvention of controls",
          ],
        },
        {
          type: "p",
          text: "We may also be legally restricted from returning funds in certain sanctions-related circumstances.",
        },
      ],
    },
    {
      title: "Reporting and Cooperation",
      blocks: [
        {
          type: "p",
          text: "We may report suspected sanctions breaches, restricted use, fraud, abuse or unlawful activity where required or appropriate.",
        },
        {
          type: "p",
          text: "Reports may be made to:",
        },
        {
          type: "list",
          items: [
            "payment processors",
            "banks or card schemes",
            "infrastructure providers",
            "affected third parties",
            "regulators",
            "law enforcement agencies",
            "sanctions authorities",
            "competent public authorities",
          ],
        },
        {
          type: "p",
          text: "We may also cooperate with lawful requests, investigations, subpoenas, court orders or regulatory requirements.",
        },
        {
          type: "p",
          text: "We will not disclose more information than we consider necessary or legally required in the circumstances.",
        },
      ],
    },
    {
      title: "Recordkeeping",
      blocks: [
        {
          type: "p",
          text: "We may retain records relating to sanctions screening, restricted jurisdiction checks, customer verification, orders, payments, account activity, traffic patterns, compliance reviews and enforcement decisions.",
        },
        {
          type: "p",
          text: "Records may be retained for as long as reasonably necessary for:",
        },
        {
          type: "list",
          items: [
            "legal compliance",
            "sanctions compliance",
            "fraud prevention",
            "payment disputes",
            "abuse investigations",
            "provider requirements",
            "regulatory requests",
            "dispute resolution",
            "enforcement of our Terms & Conditions",
            "legal claims",
          ],
        },
        {
          type: "p",
          text: "Further information is provided in our Privacy Policy.",
        },
      ],
    },
    {
      title: "No Obligation to Disclose Internal Criteria",
      blocks: [
        {
          type: "p",
          text: "We may use internal risk rules, screening methods, provider requirements, payment processor requirements and compliance criteria to determine whether to provide, restrict, suspend or terminate the Service.",
        },
        {
          type: "p",
          text: "We are not required to disclose:",
        },
        {
          type: "list",
          items: [
            "internal risk scoring",
            "screening thresholds",
            "provider restrictions",
            "payment processor rules",
            "detection methods",
            "investigation methods",
            "reasons that would compromise security, fraud prevention, sanctions controls or legal compliance",
          ],
        },
        {
          type: "p",
          text: "We may provide a general explanation where appropriate, but we are not required to provide detailed internal compliance analysis.",
        },
      ],
    },
    {
      title: "Changes in Law or Risk Environment",
      blocks: [
        {
          type: "p",
          text: "Sanctions, restricted jurisdictions, trade controls, payment rules, provider requirements and legal obligations may change quickly.",
        },
        {
          type: "p",
          text: "We may update restrictions, block countries, suspend accounts, cancel orders, change available products, restrict payment methods or modify this Policy at any time where needed to respond to:",
        },
        {
          type: "list",
          items: [
            "new sanctions",
            "legal changes",
            "provider requirements",
            "payment processor requirements",
            "enforcement trends",
            "fraud or abuse trends",
            "geopolitical developments",
            "security threats",
            "regulatory guidance",
            "business risk",
          ],
        },
        {
          type: "p",
          text: "Where practical, we may provide notice, but urgent changes may be made without prior notice.",
        },
      ],
    },
    {
      title: "Customer Responsibility",
      blocks: [
        {
          type: "p",
          text: "You are responsible for ensuring that your use of the Service complies with all sanctions, export controls, trade restrictions, cybersecurity laws, data protection laws, platform rules and other applicable laws.",
        },
        {
          type: "p",
          text: "This includes laws applicable to:",
        },
        {
          type: "list",
          items: [
            "your location",
            "your company",
            "your beneficial owners",
            "your users",
            "your payment method",
            "your traffic destinations",
            "your customers",
            "your data collection activity",
            "your industry",
            "your use case",
          ],
        },
        {
          type: "p",
          text: "Virenza Proxy does not provide legal advice and does not confirm that your use case is lawful.",
        },
        {
          type: "p",
          text: "If you are unsure whether your use is permitted, you should obtain independent legal advice before using the Service.",
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
            "Payment, Billing & Taxes Policy",
            "Refund & Cancellation Policy",
            "Digital Delivery / Provisioning Policy",
            "Privacy Policy",
            "Abuse Reporting Policy",
            "Customer Verification & Compliance Review Policy",
          ],
        },
        {
          type: "p",
          text: "If this Policy conflicts with another policy, the stricter provision may apply where necessary for sanctions, legal, payment, provider, security or compliance purposes.",
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
          text: "If you have questions about this Policy, restricted jurisdictions, sanctions screening, compliance review or a related account issue, you may contact us at:",
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
