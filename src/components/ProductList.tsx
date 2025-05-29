"use client"

import { Product } from "@/types/product"
import ProductCard from "@/components/ProductCard"

interface ProductListProps {
  products: Product[]
}

export default function ProductList({ products }: ProductListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {products.map((product: Product) => ( 
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
} 