import ProductPage from "@/components/products/ProductPage";
import { getProductBySlug } from "@/config/products";

export default function SerpScrapingApiPage() {
  return <ProductPage product={getProductBySlug("serp-scraping-api")!} />;
}
