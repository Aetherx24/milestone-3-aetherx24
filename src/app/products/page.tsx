import { getAllProducts, getProductsByCategory } from "@/lib/api"
import { Product } from "@/types/product"
import ProductCard from "@/components/ProductCard"
import CategoryFilter from "@/components/CategoryFilter"
import { Suspense } from "react"
import dynamic from 'next/dynamic'
import Loading from '@/components/Loading'

// Lazy load the ProductList component
const ProductList = dynamic(() => import('@/components/ProductList'), {
  loading: () => <Loading />,
  ssr: false // Disable server-side rendering for this component
})

function ProductsGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product: Product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Products</h1>
      <Suspense fallback={<Loading />}>
        <ProductList />
      </Suspense>
    </div>
  )
} 