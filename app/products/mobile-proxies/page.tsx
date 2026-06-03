import ProductPage from "@/components/products/ProductPage";
import { getProductBySlug } from "@/config/products";

export default function MobileProxiesPage() {
  return <ProductPage product={getProductBySlug("mobile-proxies")!} />;
}
