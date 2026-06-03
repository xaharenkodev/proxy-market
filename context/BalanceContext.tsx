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
import { formatCurrency } from "@/config/currency";
import { useAuth, AuthUser, AuthProxyRequest } from "@/context/AuthContext";

const CURRENCY_STORAGE_KEY = "proxymarket_currency";

export interface Order {
  id: string;
  platform: string;
  service: string;
  package: string;
  quantity: number;
  price: number;
  status: "processing" | "in_progress" | "completed" | "failed";
  date: string;
}

export interface Transaction {
  id: string;
  type: "top_up" | "purchase";
  amount: number;
  description: string;
  date: string;
}

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
  estimatedPriceEUR: number;
  priceGBP?: number;
  displayCurrency: string;
  status: string;
  paidAt?: string;
  date: string;
}

export interface PurchaseResult {
  status: "success" | "insufficient" | "error";
  message: string;
}

interface BalanceContextType {
  balance: number;
  displayCurrency: SupportedCurrency;
  setDisplayCurrency: (currency: SupportedCurrency) => void;
  formattedBalance: string;
  orders: Order[];
  proxyRequests: ProxyRequest[];
  transactions: Transaction[];
  addBalance: (amountGBP: number) => Promise<boolean>;
  purchaseService: (order: {
    platform: string;
    service: string;
    package: string;
    quantity: number;
    price: number;
    targetUrl?: string;
    targetHandle?: string;
  }) => Promise<PurchaseResult>;
}

function mapOrders(user: AuthUser): Order[] {
  return user.orders.map((o) => ({
    id: o.id,
    platform: o.platform.charAt(0).toUpperCase() + o.platform.slice(1),
    service: o.service.charAt(0).toUpperCase() + o.service.slice(1),
    package: o.packageName,
    quantity: o.quantity,
    price: o.priceGBP,
    status: o.status,
    date: o.createdAt.split("T")[0],
  }));
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
    estimatedPriceEUR: r.estimatedPriceEUR,
    priceGBP: r.priceGBP,
    displayCurrency: r.displayCurrency,
    status: r.status,
    paidAt: r.paidAt,
    date: r.createdAt.split("T")[0],
  }));
}

function mapTransactions(user: AuthUser): Transaction[] {
  return user.transactions.map((t) => ({
    id: t.id,
    type: t.type === "topup" ? "top_up" : "purchase",
    amount: t.amountGBP,
    description: t.description,
    date: t.createdAt.split("T")[0],
  }));
}

const BalanceContext = createContext<BalanceContextType | undefined>(undefined);

export function BalanceProvider({ children }: { children: ReactNode }) {
  const { user, updateUser, isLoggedIn } = useAuth();
  const [displayCurrency, setDisplayCurrencyState] =
    useState<SupportedCurrency>("EUR");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const stored = localStorage.getItem(CURRENCY_STORAGE_KEY);
        if (stored === "EUR" || stored === "USD" || stored === "UAH") {
          setDisplayCurrencyState(stored);
        }
      } catch {}
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const setDisplayCurrency = useCallback((currency: SupportedCurrency) => {
    setDisplayCurrencyState(currency);
    try { localStorage.setItem(CURRENCY_STORAGE_KEY, currency); } catch {}
  }, []);

  const balance = user?.balanceGBP ?? 0;
  const orders = useMemo(() => (user ? mapOrders(user) : []), [user]);
  const proxyRequests = useMemo(() => (user ? mapProxyRequests(user) : []), [user]);
  const transactions = useMemo(
    () => (user ? mapTransactions(user) : []),
    [user]
  );

  const formattedBalance = useMemo(
    () => formatCurrency(balance, displayCurrency),
    [balance, displayCurrency]
  );

  const addBalance = useCallback(
    async (amountGBP: number): Promise<boolean> => {
      if (!isLoggedIn || !user) return false;
      try {
        const res = await fetch("/api/user/top-up", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user._id, amountGBP }),
        });
        const data = await res.json();
        if (data.success) {
          updateUser(data.user);
          return true;
        }
        return false;
      } catch {
        return false;
      }
    },
    [isLoggedIn, user, updateUser]
  );

  const purchaseService = useCallback(
    async (order: {
      platform: string;
      service: string;
      package: string;
      quantity: number;
      price: number;
      targetUrl?: string;
      targetHandle?: string;
    }): Promise<PurchaseResult> => {
      if (!isLoggedIn || !user) {
        return { status: "error", message: "You must be signed in to purchase." };
      }
      try {
        const res = await fetch("/api/orders/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user._id,
            platform: order.platform,
            service: order.service,
            packageName: order.package,
            quantity: order.quantity,
            priceGBP: order.price,
            targetUrl: order.targetUrl,
            targetHandle: order.targetHandle,
          }),
        });
        const data = await res.json();
        if (data.success) {
          updateUser(data.user);
          return { status: "success", message: "Order placed successfully!" };
        }
        if (data.error?.includes("Insufficient")) {
          return {
            status: "insufficient",
            message: data.error,
          };
        }
        return { status: "error", message: data.error || "Order failed." };
      } catch {
        return { status: "error", message: "Something went wrong. Please try again." };
      }
    },
    [isLoggedIn, user, updateUser]
  );

  return (
    <BalanceContext.Provider
      value={{
        balance,
        displayCurrency,
        setDisplayCurrency,
        formattedBalance,
        orders,
        proxyRequests,
        transactions,
        addBalance,
        purchaseService,
      }}
    >
      {children}
    </BalanceContext.Provider>
  );
}

export function useBalance() {
  const context = useContext(BalanceContext);
  if (!context)
    throw new Error("useBalance must be used within BalanceProvider");
  return context;
}
