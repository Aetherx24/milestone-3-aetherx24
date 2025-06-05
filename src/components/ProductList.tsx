"use client"

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import type { Product } from '@/types'
import ProductCard from './ProductCard'

interface ProductListProps {
  initialProducts: Product[]
  categories: string[]
  currentPage: number
  itemsPerPage: number
  showCategories?: boolean
}

export default function ProductList({
  initialProducts,
  categories,
  currentPage,
  itemsPerPage,
  showCategories = true,
}: ProductListProps) {
  console.log('ProductList received products:', initialProducts)
  console.log('ProductList received categories:', categories)

  const [products, setProducts] = useState(initialProducts)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [isMounted, setIsMounted] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    console.log('ProductList mounted, initialProducts:', initialProducts)
    setIsMounted(true)
    const category = searchParams.get('category')
    if (category) {
      setSelectedCategory(category)
    }
  }, [searchParams, initialProducts])

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', newPage.toString())
    if (selectedCategory) {
      params.set('category', selectedCategory)
    }
    router.push(`/products?${params.toString()}`)
  }

  if (!isMounted) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-md p-4 animate-pulse">
            <div className="h-48 bg-gray-200 rounded mb-4" />
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
          </div>
        ))}
      </div>
    )
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No products found</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {showCategories && categories.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-black hover:bg-gray-200'
              }`}
              onClick={() => {
                setSelectedCategory(category === selectedCategory ? null : category)
                const params = new URLSearchParams(searchParams.toString())
                if (category === selectedCategory) {
                  params.delete('category')
                } else {
                  params.set('category', category)
                }
                params.set('page', '1')
                router.push(`/products?${params.toString()}`)
              }}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {products.length > 0 && (
        <div className="flex justify-center items-center space-x-4 mt-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="text-gray-600">Page {currentPage}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={products.length < itemsPerPage}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
} 