import { CreditCard, HelpCircle, Home, ListOrdered, Server, Settings, ShoppingCart } from "lucide-react";
import { products } from "./products";
import { useCases } from "./useCases";

export const productNavigation = products.map((product) => ({
  href: `/products/${product.slug}`,
  label: product.name,
  status: product.status,
}));

export const useCaseNavigation = useCases.slice(0, 5).map((useCase) => ({
  href: `/use-cases/${useCase.slug}`,
  label: useCase.title,
}));

export const headerNavigation = [
  { href: "/pricing", label: "Pricing" },
  { href: "/locations", label: "Locations" },
  { href: "/use-cases", label: "Use Cases" },
  { href: "/faq", label: "FAQ" },
];

export const dashboardNavigation = [
  { href: "/dashboard", label: "Overview", icon: Home },
  { href: "/dashboard/buy", label: "Buy Proxies", icon: ShoppingCart },
  { href: "/dashboard/proxies", label: "Active Proxies", icon: Server },
  { href: "/dashboard/orders", label: "Orders", icon: ListOrdered },
  { href: "/dashboard/payments", label: "Payments", icon: CreditCard },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
  { href: "/dashboard/support", label: "Support", icon: HelpCircle },
];

export const authLinks = {
  login: "/login",
  register: "/register",
  dashboard: "/dashboard",
};
