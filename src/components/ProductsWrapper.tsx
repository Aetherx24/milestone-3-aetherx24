"use client"

import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import Loading from '@/components/Loading'
import type { Product, Category } from '@/types'

const ProductList = dynamic(() => import('@/components/ProductList'), {
  loading: () => <Loading />,
  ssr: false
})

interface ProductsWrapperProps {
  initialProducts: Product[]
  initialCategories: Category[]
}

export default function ProductsWrapper({ initialProducts, initialCategories }: ProductsWrapperProps) {
  const categoryNames = initialCategories.map(category => category.name)
  
  return (
    <Suspense fallback={<Loading />}>
      <ProductList initialProducts={initialProducts} categories={categoryNames} />
    </Suspense>
  )
} 