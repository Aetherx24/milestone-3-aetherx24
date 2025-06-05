'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetail({ params }: PageProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart, isInCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { id } = await params;
        const response = await fetch(`/api/products/${id}`);
        if (!response.ok) {
          throw new Error('Product not found');
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-96 bg-gray-200 rounded-lg mb-8"></div>
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            {error || 'Product not found'}
          </h1>
          <Link
            href="/"
            className="text-indigo-600 hover:text-indigo-800"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative aspect-square w-full bg-white rounded-lg">
          <Image
            src={product.images?.[0] || 'https://placehold.co/400x400?text=No+Image'}
            alt={product.name}
            fill
            className="object-contain p-4"
            unoptimized
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
          <p className="text-2xl font-bold text-indigo-600 mb-4">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-gray-600 mb-6">{product.description}</p>
          <div className="mb-6">
            <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-800">
              {product.category.name}
            </span>
          </div>
          <button
            onClick={() => addToCart(product)}
            className={`w-full md:w-auto px-8 py-3 rounded-md text-lg font-medium ${
              isInCart(product.id)
                ? 'bg-green-100 text-green-800'
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
          >
            {isInCart(product.id) ? 'Added to Cart' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
} 