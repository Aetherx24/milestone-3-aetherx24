"use client"

import { useState } from 'react'
import { Product } from '@/types'
import { useCart } from '@/context/CartContext'

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setShowToast(true);
    // Hide toast after 2 seconds
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <label htmlFor={`quantity-${product.id}`} className="text-gray-600">
          Quantity:
        </label>
        <select
          id={`quantity-${product.id}`}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="border rounded-md px-3 py-2 text-black bg-white [&>option]:text-black [&>option]:bg-white"
          style={{ color: 'black' }}
        >
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num} style={{ color: 'black' }}>
              {num}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleAddToCart}
        className="bg-blue-600 text-white py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors w-full md:w-auto"
      >
        Add to Cart
      </button>

      {/* Success Toast */}
      {showToast && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-md shadow-lg transition-opacity duration-300">
          Added {quantity} {quantity === 1 ? 'item' : 'items'} to cart!
        </div>
      )}
    </div>
  );
} 