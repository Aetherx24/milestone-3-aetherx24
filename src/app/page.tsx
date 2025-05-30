import ProductListWrapper from '@/components/ProductListWrapper'
import type { Product } from "@/types/product"

async function getProducts() {
  try {
    const res = await fetch('https://api.escuelajs.co/api/v1/products', { cache: 'no-store' })
    if (!res.ok) throw new Error('Failed to fetch products')
    return res.json()
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

async function getCategories() {
  try {
    const res = await fetch('https://api.escuelajs.co/api/v1/categories', { cache: 'no-store' })
    if (!res.ok) throw new Error('Failed to fetch categories')
    return res.json()
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

export default async function Home() {
  // Fetch data on the server
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories()
  ])

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Welcome to Our Store</h1>
      <ProductListWrapper initialProducts={products} initialCategories={categories} />
    </main>
  )
}