"use client"

import { useState } from 'react'
import ProductCard from '@/components/ProductCard'
import CategoryFilter from './CategoryFilter'
import { useFetch } from '@/hooks/useFetch'
import type { Product, Category } from '@/types'

export default function ProductList() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  
  const { data: products, loading: productsLoading } = useFetch<Product[]>(
    selectedCategory 
      ? `https://api.escuelajs.co/api/v1/categories/${selectedCategory}/products`
      : 'https://api.escuelajs.co/api/v1/products'
  )
  
  const { data: categories, loading: categoriesLoading } = useFetch<Category[]>(
    'https://api.escuelajs.co/api/v1/categories'
  )

  if (productsLoading || categoriesLoading) {
    return null // Loading is handled by Suspense
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="md:col-span-1">
        <CategoryFilter 
          categories={categories || []} 
          onCategorySelect={setSelectedCategory}
        />
      </div>
      <div className="md:col-span-3">
        {(!products || products.length === 0) ? (
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