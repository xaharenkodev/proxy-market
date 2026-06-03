import ProductPage from "@/components/products/ProductPage";
import { getProductBySlug } from "@/config/products";

export default function EcommerceScrapingApiPage() {
  return <ProductPage product={getProductBySlug("ecommerce-scraping-api")!} />;
}
