"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
  ReactNode,
} from "react";
import { SupportedCurrency } from "@/config/site";
import { migrateStoredCurrency } from "@/config/currency";
import { useAuth, AuthUser, AuthProxyRequest } from "@/context/AuthContext";

const CURRENCY_STORAGE_KEY = "virenza_currency";
const LEGACY_CURRENCY_STORAGE_KEY = "proxymarket_currency";

export interface ProxyRequest {
  id: string;
  requestKind: string;
  packageName?: string;
  proxyType: string;
  country: string;
  city?: string;
  carrier?: string;
  protocol: string;
  rotation: string;
  authMethod: string;
  quantity: number;
  bandwidthGb: number;
  duration: string;
  durationQuantity?: number;
  estimatedPriceEUR: number;
  priceGBP?: number;
  displayCurrency: string;
  invoiceNumber?: string;
  status: string;
  paidAt?: string;
  date: string;
}

interface CurrencyContextType {
  /** Currency used for prices, checkout and the Invoice / Receipt. */
  displayCurrency: SupportedCurrency;
  setDisplayCurrency: (currency: SupportedCurrency) => void;
  /** Every order the customer has paid for individually. */
  proxyRequests: ProxyRequest[];
}

function mapProxyRequests(user: AuthUser): ProxyRequest[] {
  return (user.proxyRequests || []).map((r: AuthProxyRequest) => ({
    id: r.id,
    requestKind: r.requestKind || "custom",
    packageName: r.packageName,
    proxyType: r.proxyType,
    country: r.country,
    city: r.city,
    carrier: r.carrier,
    protocol: r.protocol,
    rotation: r.rotation,
    authMethod: r.authMethod,
    quantity: r.quantity,
    bandwidthGb: r.bandwidthGb,
    duration: r.duration,
    durationQuantity: r.durationQuantity,
    estimatedPriceEUR: r.estimatedPriceEUR,
    priceGBP: r.priceGBP,
    displayCurrency: r.displayCurrency,
    invoiceNumber: r.invoiceNumber,
    status: r.status,
    paidAt: r.paidAt,
    date: r.createdAt.split("T")[0],
  }));
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [displayCurrency, setDisplayCurrencyState] =
    useState<SupportedCurrency>("EUR");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const stored =
          localStorage.getItem(CURRENCY_STORAGE_KEY) ?? localStorage.getItem(LEGACY_CURRENCY_STORAGE_KEY);
        if (stored) {
          const currency = migrateStoredCurrency(stored);
          setDisplayCurrencyState(currency);
          if (currency !== stored) localStorage.setItem(CURRENCY_STORAGE_KEY, currency);
        }
      } catch {}
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const setDisplayCurrency = useCallback((currency: SupportedCurrency) => {
    setDisplayCurrencyState(currency);
    try { localStorage.setItem(CURRENCY_STORAGE_KEY, currency); } catch {}
  }, []);

  const proxyRequests = useMemo(() => (user ? mapProxyRequests(user) : []), [user]);

  return (
    <CurrencyContext.Provider value={{ displayCurrency, setDisplayCurrency, proxyRequests }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context)
    throw new Error("useCurrency must be used within CurrencyProvider");
  return context;
}
