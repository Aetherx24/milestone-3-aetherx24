"use client"

import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 border-b pb-4">
                <div className="w-24 h-24 bg-gray-200 rounded"></div>
                <div className="flex-grow">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-gray-600 mb-4">Add some items to your cart to continue shopping.</p>
        <Link 
          href="/"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>
      
      <div className="grid md:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="md:col-span-2 space-y-4">
          {items.map(item => {
            const imageUrl = item.images?.[0] || 'https://placehold.co/400x400?text=No+Image';
            return (
              <div key={item.id} className="flex items-center gap-4 border-b pb-4">
                <div className="relative w-24 h-24">
                  <Image
                    src={imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover rounded"
                    unoptimized
                  />
                </div>
                <div className="flex-grow">
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <p className="text-gray-600">${item.price}</p>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                    className="border rounded p-1"
                  >
                    {[1, 2, 3, 4, 5].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-lg shadow-md h-fit">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${getCartTotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
            </div>
            <Link
              href="/checkout"
              className="block w-full bg-blue-600 text-white text-center py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}