"use client"

import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { useSession, signOut } from 'next-auth/react'
import { useEffect, useState } from 'react'

export default function Navigation() {
  const { items } = useCart();
  const { data: session } = useSession();
  const [isClient, setIsClient] = useState(false);
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <nav className="bg-white shadow-lg" suppressHydrationWarning>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-gray-800">RevoShop</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/products"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
              >
                Products
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
              >
                About
              </Link>
              <Link
                href="/faq"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
              >
                FAQ
              </Link>
              {isClient && session ? (
                <>
                  <Link
                    href="/profile"
                    className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
                  >
                    Profile
                  </Link>
                  {session.user.email === "admin@example.com" && (
                    <Link
                      href="/admin"
                      className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
                    >
                      Admin Dashboard
                    </Link>
                  )}
                </>
              ) : (
                <Link
                  href="/login"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
          <div className="flex items-center">
            <Link href="/cart" className="relative p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {isClient && itemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-blue-600 rounded-full">
                  {itemCount}
                </span>
              )}
            </Link>
            {isClient && session && (
              <button
                onClick={() => signOut()}
                className="ml-4 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}