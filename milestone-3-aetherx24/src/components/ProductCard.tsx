import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/types/product'

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <Link href={`/product/${product.id}`}>
            <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
                <div className="relative w-full h-48 mb-4">
                    <Image
                        src={product.images[0]}
                        alt={product.title}
                        fill 
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw,33vw"
                        className="object-cover rounded-md"
                        priority
                    />
                </div>
                <h2 className="text-lg font-semibold mb-2 truncate">{product.title}</h2>
                <p className="text-gray-600 mb-2">{product.category.name}</p>
                <p className="text-xl font-bold">${product.price}</p>
            </div>
        </Link>
    )
}