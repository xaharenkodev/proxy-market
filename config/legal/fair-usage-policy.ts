import type { LegalDoc } from "./types";

export const fairUsagePolicy: LegalDoc = {
  slug: "fair-usage-policy",
  title: "Proxy Service & Fair Usage Policy",
  updated: "August 26, 2026",
  intro: [
    { type: "p", text: "This Policy describes product operation, technical limits and fair use of the Service." },
    { type: "p", text: "This policy applies to the website, dashboard and services offered under the Virenza Proxy brand. The service provider is VIRENZA LTD, company number 17231719, of Dept 6814, 196 High Road, Wood Green, London, United Kingdom, N22 8HH (\"Virenza Proxy\", \"we\", \"us\" or \"our\"). You may contact us at info@virenzaproxy.com." },
  ],
  sections: [
    {
      title: "Product Scope",
      blocks: [
        { type: "p", text: "The Service may include datacenter, static ISP, residential, mobile, rotating or sticky proxy products, HTTP/HTTPS/SOCKS5 connectivity, dashboard features and API access. Availability depends on the selected package and current technical capacity." },
      ],
    },
    {
      title: "Packages and Usage",
      blocks: [
        { type: "p", text: "A time-based package provides access for the stated period. A traffic package provides the stated traffic allowance. Access ends when the stated period ends or the traffic allowance is exhausted, as applicable." },
        { type: "p", text: "The dashboard and order confirmation identify the relevant product, price, traffic allowance, access period and applicable restrictions." },
      ],
    },
    {
      title: "Fair Use and Technical Limits",
      blocks: [
        { type: "p", text: "We may apply reasonable limits on concurrent connections, request rates, bandwidth, ports, protocols, locations, sessions or destinations to protect network integrity, providers and other customers." },
        { type: "p", text: "You must not circumvent technical limits, create abnormal load, interfere with network operations or use the Service in a way that creates unacceptable provider, security or abuse risk." },
      ],
    },
    {
      title: "Locations and IP Characteristics",
      blocks: [
        { type: "p", text: "Location labels, IP type, rotation behaviour and session persistence are subject to availability and technical constraints. IPs may be changed, withdrawn or unavailable due to provider controls, maintenance, complaints, bans or network conditions." },
      ],
    },
    {
      title: "Maintenance and Support",
      blocks: [
        { type: "p", text: "We may perform maintenance, security work and provider changes. We will use reasonable efforts to limit disruption but do not guarantee uninterrupted service. Contact info@virenzaproxy.com with relevant timestamps, product details and diagnostic information for technical support." },
      ],
    },
  ],
};
