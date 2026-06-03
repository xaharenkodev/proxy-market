import ProductPage from "@/components/products/ProductPage";
import { getProductBySlug } from "@/config/products";

export default function StaticResidentialProxiesPage() {
  return <ProductPage product={getProductBySlug("static-residential-proxies")!} />;
}
