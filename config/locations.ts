export interface LocationCity {
  name: string;
  state?: string;
}

export interface LocationCountry {
  country: string;
  code: string;
  region: string;
  cities: LocationCity[];
  carriers?: string[];
  products: string[];
  cityTargeting?: boolean;
  carrierTargeting?: boolean;
}

export const locationRegions = [
  "All",
  "North America",
  "Europe",
  "Asia Pacific",
  "Latin America",
  "Middle East & Africa",
] as const;

export const locations: LocationCountry[] = [
  {
    country: "United States",
    code: "US",
    region: "North America",
    cities: [
      { name: "Seattle", state: "WA" },
      { name: "New York", state: "NY" },
      { name: "San Diego", state: "CA" },
      { name: "Chicago", state: "IL" },
      { name: "Dallas", state: "TX" },
      { name: "Miami", state: "FL" },
      { name: "Los Angeles", state: "CA" },
      { name: "Washington", state: "DC" },
      { name: "Charlotte", state: "NC" },
      { name: "Irvine", state: "CA" },
      { name: "Tempe", state: "AZ" },
    ],
    carriers: ["AT&T", "T-Mobile", "Verizon"],
    products: ["Datacenter", "Residential", "Static ISP", "Mobile"],
    cityTargeting: true,
    carrierTargeting: true,
  },
  {
    country: "Canada",
    code: "CA",
    region: "North America",
    cities: [{ name: "Toronto" }, { name: "Vancouver" }, { name: "Montreal" }],
    products: ["Residential", "Datacenter"],
    cityTargeting: true,
  },
  {
    country: "United Kingdom",
    code: "GB",
    region: "Europe",
    cities: [{ name: "London" }, { name: "Manchester" }, { name: "Birmingham" }],
    carriers: ["EE", "Three", "Vodafone"],
    products: ["Static ISP", "Residential", "Mobile"],
    cityTargeting: true,
    carrierTargeting: true,
  },
  {
    country: "Germany",
    code: "DE",
    region: "Europe",
    cities: [{ name: "Frankfurt" }, { name: "Berlin" }, { name: "Munich" }],
    products: ["Datacenter", "Residential", "Static ISP"],
    cityTargeting: true,
  },
  {
    country: "France",
    code: "FR",
    region: "Europe",
    cities: [{ name: "Paris" }, { name: "Marseille" }],
    carriers: ["Orange", "SFR"],
    products: ["Residential", "Mobile"],
    cityTargeting: true,
    carrierTargeting: true,
  },
  {
    country: "Netherlands",
    code: "NL",
    region: "Europe",
    cities: [{ name: "Amsterdam" }, { name: "Rotterdam" }],
    products: ["Datacenter", "Residential"],
    cityTargeting: true,
  },
  {
    country: "Italy",
    code: "IT",
    region: "Europe",
    cities: [{ name: "Verona" }, { name: "Milan" }, { name: "Rome" }],
    carriers: ["TIM", "Vodafone IT"],
    products: ["Residential", "Mobile"],
    cityTargeting: true,
    carrierTargeting: true,
  },
  {
    country: "Spain",
    code: "ES",
    region: "Europe",
    cities: [{ name: "Madrid" }, { name: "Barcelona" }],
    products: ["Residential", "Static ISP"],
    cityTargeting: true,
  },
  {
    country: "Poland",
    code: "PL",
    region: "Europe",
    cities: [{ name: "Warsaw" }, { name: "Krakow" }],
    products: ["Residential", "Datacenter"],
    cityTargeting: true,
  },
  {
    country: "Ukraine",
    code: "UA",
    region: "Europe",
    cities: [{ name: "Kyiv" }, { name: "Lviv" }],
    products: ["Residential"],
    cityTargeting: true,
  },
  {
    country: "Japan",
    code: "JP",
    region: "Asia Pacific",
    cities: [{ name: "Tokyo" }, { name: "Osaka" }],
    products: ["Residential", "Datacenter"],
    cityTargeting: true,
  },
  {
    country: "Singapore",
    code: "SG",
    region: "Asia Pacific",
    cities: [{ name: "Singapore" }],
    products: ["Datacenter", "Residential"],
    cityTargeting: true,
  },
  {
    country: "Australia",
    code: "AU",
    region: "Asia Pacific",
    cities: [{ name: "Sydney" }, { name: "Melbourne" }],
    products: ["Residential", "Datacenter"],
    cityTargeting: true,
  },
  {
    country: "India",
    code: "IN",
    region: "Asia Pacific",
    cities: [{ name: "Mumbai" }, { name: "Delhi" }],
    carriers: ["Jio", "Airtel"],
    products: ["Residential", "Mobile"],
    cityTargeting: true,
    carrierTargeting: true,
  },
  {
    country: "Brazil",
    code: "BR",
    region: "Latin America",
    cities: [{ name: "São Paulo" }, { name: "Rio de Janeiro" }],
    products: ["Residential", "Mobile"],
    cityTargeting: true,
  },
  {
    country: "Mexico",
    code: "MX",
    region: "Latin America",
    cities: [{ name: "Mexico City" }],
    products: ["Residential"],
    cityTargeting: true,
  },
  {
    country: "United Arab Emirates",
    code: "AE",
    region: "Middle East & Africa",
    cities: [{ name: "Dubai" }, { name: "Abu Dhabi" }],
    products: ["Residential", "Mobile"],
    cityTargeting: true,
  },
  {
    country: "South Africa",
    code: "ZA",
    region: "Middle East & Africa",
    cities: [{ name: "Johannesburg" }, { name: "Cape Town" }],
    products: ["Residential"],
    cityTargeting: true,
  },
];

export function getLocationByCountry(country: string) {
  return locations.find((l) => l.country === country);
}

export function getCitiesForCountry(country: string): LocationCity[] {
  return getLocationByCountry(country)?.cities || [];
}

export function getCarriersForCountry(country: string): string[] {
  return getLocationByCountry(country)?.carriers || [];
}
