"use client"

import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import Loading from '@/components/Loading'
import type { Product, Category } from '@/types'
import ProductList from './ProductList'

const ProductListComponent = dynamic(() => import('@/components/ProductList'), {
  loading: () => <Loading />,
  ssr: false
})

interface ProductsWrapperProps {
  initialProducts: Product[]
  initialCategories: Category[]
  currentPage: number
  itemsPerPage: number
  showCategories?: boolean
}

export default function ProductsWrapper({ 
  initialProducts, 
  initialCategories,
  currentPage,
  itemsPerPage,
  showCategories = true,
}: ProductsWrapperProps) {
  console.log('ProductsWrapper received products:', initialProducts); // Debug log
  console.log('ProductsWrapper received categories:', initialCategories); // Debug log

  if (!initialProducts || initialProducts.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No products found</p>
      </div>
    );
  }

  const categoryNames = initialCategories?.map(category => category.name) || [];
  
  return (
    <Suspense fallback={<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-white rounded-lg shadow-md p-4 animate-pulse">
          <div className="h-48 bg-gray-200 rounded mb-4" />
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
        </div>
      ))}
    </div>}>
      <ProductList 
        initialProducts={initialProducts} 
        categories={categoryNames}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        showCategories={showCategories}
      />
    </Suspense>
  )
} 