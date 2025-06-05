"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import type { Product } from '@/types'

interface ProductCardProps {
    product: Product;
}

const DEFAULT_IMAGE = 'https://placehold.co/400x400?text=No+Image';

export default function ProductCard({ product }: ProductCardProps) {
    const { addToCart } = useCart();
    const { id, name, price, images } = product;
    const imageUrl = images?.[0] || DEFAULT_IMAGE;
    const altText = name ? `Image of ${name}` : 'Product image';

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
                </div>
                <div className="flex gap-2">
                    <Link
                        href={`/products/${id}`}
                        className="flex-1 py-2 px-4 rounded-md text-sm font-medium text-center bg-gray-100 text-gray-800 hover:bg-gray-200"
                    >
                        View Details
                    </Link>
                    <button
                        onClick={() => addToCart(product)}
                        className="flex-1 py-2 px-4 rounded-md text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    )
}