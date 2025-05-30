"use client"

import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/types/product'
import { useCart } from '@/context/CartContext'
import { useState, useEffect } from 'react'

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [showToast, setShowToast] = useState(false);
    const [isClient, setIsClient] = useState(false);
    
    // Use a placeholder image if the product image is not available
    const imageUrl = product.images[0] || 'https://placehold.co/400x400?text=No+Image';

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent navigation when clicking the button
        addToCart(product, quantity);
        setShowToast(true);
        // Hide toast after 2 seconds
        setTimeout(() => setShowToast(false), 2000);
    };

    return (
        <div className="relative" suppressHydrationWarning>
            <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
                <div className="relative w-full h-48 mb-4">
                    <Image
                        src={imageUrl}
                        alt={product.title}
                        fill 
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw,33vw"
                        className="object-cover rounded-md"
                        priority
                        unoptimized
                    />
                </div>
                <h2 className="text-lg font-semibold mb-2 truncate">{product.title}</h2>
                <p className="text-gray-600 mb-2">{product.category.name}</p>
                <p className="text-xl font-bold mb-4">${product.price}</p>
                
                {/* Quantity Selector and Buttons */}
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <label htmlFor={`quantity-${product.id}`} className="text-sm text-gray-600">
                            Quantity:
                        </label>
                        <select
                            id={`quantity-${product.id}`}
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            className="border rounded-md px-2 py-1 text-sm"
                            disabled={!isClient}
                        >
                            {[1, 2, 3, 4, 5].map((num) => (
                                <option key={num} value={num}>
                                    {num}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex gap-2">
                        <Link 
                            href={`/product/${product.id}`}
                            className="flex-1 bg-gray-100 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors text-center"
                        >
                            View Details
                        </Link>
                        <button
                            onClick={handleAddToCart}
                            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                            disabled={!isClient}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>

            {/* Success Toast */}
            {isClient && showToast && (
                <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-md shadow-lg transition-opacity duration-300">
                    Added {quantity} {quantity === 1 ? 'item' : 'items'} to cart!
                </div>
            )}
        </div>
    )
}