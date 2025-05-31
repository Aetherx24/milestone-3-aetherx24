"use client"

import { useEffect, useState } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { Product } from '@/types'
import ProductCard from './ProductCard'
import CategoryFilter from './CategoryFilter'

interface ProductListProps {
  initialProducts: Product[]
  categories: string[]
}

function ProductListClient({ initialProducts, categories }: ProductListProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>(initialProducts || []);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialProducts.length === 0) {
      fetch('/api/products')
        .then((res) => res.json())
        .then((data) => setProducts(data))
        .catch((err) => setError('Failed to load products'));
    }
  }, [initialProducts]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (products.length === 0) {
    return <div>No products found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <CategoryFilter categories={categories} />
        </div>
        <div className="md:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Server Component
export default function ProductList(props: ProductListProps) {
  return <ProductListClient {...props} />;
} 