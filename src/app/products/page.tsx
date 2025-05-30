import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import Loading from '@/components/Loading'

// Lazy load the ProductList component
const ProductList = dynamic(() => import('@/components/ProductList'), {
  loading: () => <Loading />,
  ssr: false // Disable server-side rendering for this component
})

async function getProducts() {
  const res = await fetch('https://api.escuelajs.co/api/v1/products', { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to fetch products')
  return res.json()
}

async function getCategories() {
  const res = await fetch('https://api.escuelajs.co/api/v1/categories', { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to fetch categories')
  return res.json()
}

export default async function ProductsPage() {
  // Fetch data on the server
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories()
  ])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Products</h1>
      <Suspense fallback={<Loading />}>
        <ProductList initialProducts={products} initialCategories={categories} />
      </Suspense>
    </div>
  )
} 