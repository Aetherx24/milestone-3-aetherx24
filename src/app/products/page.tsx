import { getAllProducts, getProductsByCategory } from "@/lib/api"
import { Product } from "@/types/product"
import ProductCard from "@/components/ProductCard"
import CategoryFilter from "@/components/CategoryFilter"
import { Suspense } from "react"

function ProductsGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product: Product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  let products: Product[] = [];
  let categories = [];

  try {
    const resolvedParams = await searchParams;
    const [productsData, categoriesData] = await Promise.all([
      resolvedParams.category 
        ? getProductsByCategory(parseInt(resolvedParams.category))
        : getAllProducts(),
      fetch('https://api.escuelajs.co/api/v1/categories', { 
        cache: 'no-store',
        next: { revalidate: 0 }
      }).then(res => res.json()),
    ]);

    // Ensure products is an array and has items
    products = Array.isArray(productsData) ? productsData : [];
    categories = Array.isArray(categoriesData) ? categoriesData : [];

    // Log the number of products for debugging
    console.log(`Fetched ${products.length} products`);
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <CategoryFilter categories={categories} />
        </div>
        <div className="md:col-span-3">
          {products.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">No products found.</p>
            </div>
          ) : (
            <Suspense fallback={
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="border rounded-lg p-4 animate-pulse">
                    <div className="bg-gray-200 h-48 mb-4 rounded-md"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                    <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                  </div>
                ))}
              </div>
            }>
              <ProductsGrid products={products} />
            </Suspense>
          )}
        </div>
      </div>
    </div>
  )
} 