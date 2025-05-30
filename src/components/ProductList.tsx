"use client"

import { useState } from 'react'
import ProductCard from '@/components/ProductCard'
import CategoryFilter from './CategoryFilter'
import type { Product, Category } from '@/types'

interface ProductListProps {
  initialProducts: Product[]
  initialCategories: Category[]
}

export default function ProductList({ initialProducts, initialCategories }: ProductListProps) {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [loading, setLoading] = useState(false)

  const handleCategorySelect = async (categoryId: number | null) => {
    setSelectedCategory(categoryId)
    setLoading(true)
    try {
      const url = categoryId 
        ? `https://api.escuelajs.co/api/v1/categories/${categoryId}/products`
        : 'https://api.escuelajs.co/api/v1/products'
      const response = await fetch(url)
      if (!response.ok) throw new Error('Failed to fetch products')
      const data = await response.json()
      setProducts(data)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="md:col-span-1">
        <CategoryFilter 
          categories={initialCategories} 
          onCategorySelect={handleCategorySelect}
        />
      </div>
      <div className="md:col-span-3">
        {loading ? (
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
        ) : products.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">No products found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 