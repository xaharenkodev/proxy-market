import ProductPage from "@/components/products/ProductPage";
import { getProductBySlug } from "@/config/products";

export default function DatacenterProxiesPage() {
  return <ProductPage product={getProductBySlug("datacenter-proxies")!} />;
}
