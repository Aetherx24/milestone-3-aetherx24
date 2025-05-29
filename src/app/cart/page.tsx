"use client"

import { useCart } from '@/context/CartContext';
import Image from 'next/image';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, getCartTotal } = useCart();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      {items.length === 0 ? (
        <p className="text-gray-600">Your cart is empty</p>
      ) : (
        <>
          <div className="space-y-4">
            {items.map(item => (
              <div key={item.id} className="flex items-center gap-4 border-b pb-4">
                <div className="relative w-24 h-24">
                  <Image
                    src={item.images[0]}
                    alt={item.title}
                    fill
                    className="object-cover rounded"
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
            ))}
          </div>
          <div className="mt-8 text-right">
            <p className="text-xl font-bold">Total: ${getCartTotal().toFixed(2)}</p>
            <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}