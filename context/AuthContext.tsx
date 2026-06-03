"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from "react";

export interface AuthProxyRequest {
  id: string;
  requestKind?: "ready-package" | "custom";
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
  status: "paid" | "requested" | "reviewing" | "confirmed" | "completed" | "cancelled";
  paidAt?: string;
  createdAt: string;
}

export interface AuthUser {
  _id: string;
  email: string;
  name: string;
  surname: string;
  phoneNumber: string;
  dateOfBirth: string;
  address: {
    street: string;
    city: string;
    country: string;
    postCode: string;
  };
  balanceGBP: number;
  transactions: AuthTransaction[];
  orders: AuthOrder[];
  proxyRequests?: AuthProxyRequest[];
  createdAt: string;
  updatedAt: string;
}

export interface AuthTransaction {
  id: string;
  type: "topup" | "purchase" | "refund" | "adjustment";
  amountGBP: number;
  currency: "GBP";
  description: string;
  status: "pending" | "completed" | "failed";
  createdAt: string;
}

export interface AuthOrder {
  id: string;
  platform: string;
  service: string;
  packageName: string;
  quantity: number;
  priceGBP: number;
  targetUrl?: string;
  targetHandle?: string;
  status: "processing" | "in_progress" | "completed" | "failed";
  createdAt: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: AuthUser | null;
  login: (user: AuthUser) => void;
  logout: () => void;
  updateUser: (user: AuthUser) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = "proxymarket_user";
const LEGACY_KEY = "growpulse_user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        let stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) {
          const legacy = localStorage.getItem(LEGACY_KEY);
          if (legacy) {
            stored = legacy;
            localStorage.setItem(STORAGE_KEY, legacy);
            localStorage.removeItem(LEGACY_KEY);
          }
        }
        if (stored) {
          setUser(JSON.parse(stored));
        }
      } catch {
        // Corrupt storage - ignore
      }
      setLoaded(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const login = useCallback((u: AuthUser) => {
    setUser(u);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const updateUser = useCallback((u: AuthUser) => {
    setUser(u);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
  }, []);

  if (!loaded) return null;

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!user,
        user,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
