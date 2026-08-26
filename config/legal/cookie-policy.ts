import type { LegalDoc } from "./types";

export const cookiePolicy: LegalDoc = {
  slug: "cookie-policy",
  title: "Cookie Policy",
  updated: "August 26, 2026",
  intro: [
    { type: "p", text: "This Policy explains how we use cookies and similar technologies on virenzaproxy.com and our dashboard." },
    { type: "p", text: "This policy applies to the website, dashboard and services offered under the Virenza Proxy brand. The service provider is VIRENZA LTD, company number 17231719, of Dept 6814, 196 High Road, Wood Green, London, United Kingdom, N22 8HH (\"Virenza Proxy\", \"we\", \"us\" or \"our\"). You may contact us at info@virenzaproxy.com." },
  ],
  sections: [
    {
      title: "Cookies and Similar Technologies",
      blocks: [
        { type: "p", text: "Cookies are small files placed on your device. Similar technologies include localStorage, sessionStorage, pixels, tags, scripts, SDKs and device identifiers." },
      ],
    },
    {
      title: "Purposes",
      blocks: [
        { type: "p", text: "We may use these technologies to operate the website and dashboard, maintain secure sessions, remember preferences, process checkout actions, prevent fraud and abuse, measure performance and, where applicable and consented to, support analytics or marketing." },
      ],
    },
    {
      title: "Necessary Technologies",
      blocks: [
        { type: "p", text: "Strictly necessary technologies support login, security, consent choices, load management, forms and dashboard functionality. They are required for core operation and may be used without consent where permitted by law." },
      ],
    },
    {
      title: "Optional Technologies",
      blocks: [
        { type: "p", text: "Functional, analytics and marketing technologies are used only as permitted by applicable law. Where consent is required, you can accept, reject or change your choices through the cookie banner or settings tool where available." },
      ],
    },
    {
      title: "Third Parties and Controls",
      blocks: [
        { type: "p", text: "Payment, hosting, security, analytics and support providers may set or access technologies according to their own policies. You can also manage cookies through your browser, although blocking necessary technologies may prevent the dashboard or checkout from working." },
      ],
    },
    {
      title: "Cookie Information and Contact",
      blocks: [
        { type: "p", text: "The exact technologies in use may change as the website and providers develop. We will update any cookie table or consent settings where appropriate. Questions may be sent to info@virenzaproxy.com." },
      ],
    },
  ],
};
