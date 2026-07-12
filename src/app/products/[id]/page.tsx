import { notFound } from "next/navigation";
import { Product } from "@/lib/types";
import ImageGallery from "@/components/product/ImageGallery";
import ProductInfo from "@/components/product/ProductInfo";
import Specifications from "@/components/product/Specifications";
import ReviewsSection from "@/components/product/ReviewsSection";
import RelatedProducts from "@/components/product/RelatedProducts";

async function getProduct(id: string): Promise<Product | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`,
      { cache: "no-store" },
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.data;
  } catch {
    return null;
  }
}

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) notFound();

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <ImageGallery images={product.images} title={product.title} />
        <ProductInfo product={product} />
      </div>

      <Specifications product={product} />
      <ReviewsSection
        productId={product._id}
        initialCount={product.reviewCount}
      />
      <RelatedProducts category={product.category} excludeId={product._id} />
    </main>
  );
}
