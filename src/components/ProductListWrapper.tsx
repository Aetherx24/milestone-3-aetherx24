"use client"

import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import Loading from '@/components/Loading'
import type { Product, Category } from '@/types'

const ProductList = dynamic(() => import('@/components/ProductList'), {
  loading: () => <Loading />,
  ssr: false
})

interface ProductListWrapperProps {
  initialProducts: Product[]
  initialCategories: Category[]
  currentPage: number
  itemsPerPage: number
}

export default function ProductListWrapper({ 
  initialProducts, 
  initialCategories,
  currentPage,
  itemsPerPage 
}: ProductListWrapperProps) {
  const categoryNames = initialCategories.map(category => category.name)
  
  return (
    <Suspense fallback={<Loading />}>
      <ProductList 
        initialProducts={initialProducts} 
        categories={categoryNames}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
      />
    </Suspense>
  )
} 