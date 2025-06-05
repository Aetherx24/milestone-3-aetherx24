import ProductsWrapper from '@/components/ProductsWrapper'

export const dynamic = 'force-dynamic';

async function getProducts() {
  try {
    const res = await fetch('https://api.escuelajs.co/api/v1/products')
    if (!res.ok) throw new Error('Failed to fetch products')
    return res.json()
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

async function getCategories() {
  try {
    const res = await fetch('https://api.escuelajs.co/api/v1/categories')
    if (!res.ok) throw new Error('Failed to fetch categories')
    return res.json()
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
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
      <ProductsWrapper initialProducts={products} initialCategories={categories} />
    </div>
  )
} 