import ProductPage from "@/components/products/ProductPage";
import { getProductBySlug } from "@/config/products";

export default function ResidentialProxiesPage() {
  return <ProductPage product={getProductBySlug("residential-proxies")!} />;
}
