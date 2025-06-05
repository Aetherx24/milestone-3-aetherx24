'use client';

import { useCart } from '@/context/CartContext';
import Image from 'next/image';

export default function Cart() {
  const { items, removeFromCart, updateQuantity, clearCart } = useCart();

  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.product.id} className="flex items-center gap-4 p-4 bg-white rounded-lg shadow">
          <div className="relative w-20 h-20">
            <Image
              src={item.product.images[0]}
              alt={item.product.name}
              fill
              className="object-cover rounded"
              sizes="80px"
            />
          </div>
          <div className="flex-1">
            <h3 className="font-medium">{item.product.name}</h3>
            <p className="text-gray-500">${item.product.price.toFixed(2)}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
              className="px-2 py-1 text-gray-600 hover:bg-gray-100 rounded"
            >
              -
            </button>
            <span className="w-8 text-center">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
              className="px-2 py-1 text-gray-600 hover:bg-gray-100 rounded"
            >
              +
            </button>
          </div>
          <button
            onClick={() => removeFromCart(item.product.id)}
            className="text-red-500 hover:text-red-700"
          >
            Remove
          </button>
        </div>
      ))}
      <div className="flex justify-between items-center pt-4 border-t">
        <span className="font-medium">Total: ${total.toFixed(2)}</span>
        <button
          onClick={clearCart}
          className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded"
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
} 