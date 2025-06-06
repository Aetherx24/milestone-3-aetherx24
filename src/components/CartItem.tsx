'use client';

import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';

interface CartItemProps {
  product: Product;
  quantity: number;
}

const DEFAULT_IMAGE = 'https://placehold.co/400x400?text=No+Image';

export default function CartItem({ product, quantity }: CartItemProps) {
  const { removeFromCart, updateQuantity } = useCart();
  const imageUrl = product.images?.[0] || DEFAULT_IMAGE;
  const altText = product.title ? `Image of ${product.title}` : 'Product image';

  return (
    <div className="flex items-center gap-4 py-4 border-b">
      <div className="relative w-24 h-24 flex-shrink-0 bg-gray-50">
        <Image
          src={imageUrl}
          alt={altText}
          fill
          className="object-contain"
          unoptimized
          priority
        />
      </div>
      <div className="flex-grow">
        <h3 className="text-lg font-semibold text-gray-900">{product.title}</h3>
        <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => updateQuantity(product.id, quantity - 1)}
              className="px-2 py-1 text-gray-600 hover:text-gray-800"
              disabled={quantity <= 1}
            >
              -
            </button>
            <span className="w-8 text-center">{quantity}</span>
            <button
              onClick={() => updateQuantity(product.id, quantity + 1)}
              className="px-2 py-1 text-gray-600 hover:text-gray-800"
            >
              +
            </button>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-lg font-bold text-gray-900">
              ${(product.price * quantity).toFixed(2)}
            </span>
            <button
              onClick={() => removeFromCart(product.id)}
              className="text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 