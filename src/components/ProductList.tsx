"use client"

import { useState, useEffect } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { Product } from '@/types'
import ProductCard from './ProductCard'
import CategoryFilter from './CategoryFilter'
import { useCart } from '@/context/CartContext'

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
  const { addToCart } = useCart();

  useEffect(() => {
    if (initialProducts.length === 0) {
      const fetchProducts = async () => {
        try {
          const response = await fetch('/api/products');
          const data = await response.json();
          setProducts(data);
        } catch (error) {
          console.error('Error fetching products:', error);
          setError('Failed to load products');
        }
      };

      fetchProducts();
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
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={() => addToCart(product)}
              />
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