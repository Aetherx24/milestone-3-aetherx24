"use client"

import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { useEffect, useState } from 'react'

export default function Navigation() {
  const { items } = useCart();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Home Link */}
          <Link href="/" className="text-xl font-bold text-blue-600">
            RevoShop
          </Link>

          {/* Navigation Links */}
          <div className="flex space-x-4">
            <Link href="/" className="text-gray-700 hover:text-blue-600">
              Home
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-blue-600">
              Products
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600">
              About
            </Link>
            <Link href="/faq" className="text-gray-700 hover:text-blue-600">
              FAQ
            </Link>
            <Link href="/cart" className="text-gray-700 hover:text-blue-600 relative">
              Cart
              {mounted && itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}