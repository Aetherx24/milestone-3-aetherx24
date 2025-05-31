"use client"

import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/types'
import { useCart } from '@/context/CartContext'
import { useState } from 'react'

interface ProductCardProps {
    product: Product;
    onAddToCart: () => void;
}

const DEFAULT_IMAGE = 'https://placehold.co/400x400?text=No+Image';

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
    const { isInCart, getItemQuantity } = useCart();
    const { id, name, price, images } = product;
    const imageUrl = images?.[0] || DEFAULT_IMAGE;
    const altText = name ? `Image of ${name}` : 'Product image';
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = () => {
        onAddToCart();
        setQuantity(1);
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <Link href={`/products/${id}`}>
                <div className="relative aspect-square w-full">
                    <Image
                        src={imageUrl}
                        alt={altText}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        unoptimized
                    />
                </div>
            </Link>
            <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-bold text-gray-900">${price.toFixed(2)}</span>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                            className="px-2 py-1 text-gray-600 hover:text-gray-800"
                            disabled={quantity <= 1}
                        >
                            -
                        </button>
                        <span className="w-8 text-center text-gray-900 font-medium">{quantity}</span>
                        <button
                            onClick={() => setQuantity(prev => prev + 1)}
                            className="px-2 py-1 text-gray-600 hover:text-gray-800"
                        >
                            +
                        </button>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Link
                        href={`/products/${id}`}
                        className="flex-1 py-2 px-4 rounded-md text-sm font-medium text-center bg-gray-100 text-gray-800 hover:bg-gray-200"
                    >
                        View Details
                    </Link>
                    <button
                        onClick={handleAddToCart}
                        className={`flex-1 py-2 px-4 rounded-md text-sm font-medium ${
                            isInCart(id)
                                ? 'bg-green-100 text-green-800'
                                : 'bg-indigo-600 text-white hover:bg-indigo-700'
                        }`}
                    >
                        {isInCart(id) ? `Added (${getItemQuantity(id)})` : 'Add to Cart'}
                    </button>
                </div>
            </div>
        </div>
    )
}