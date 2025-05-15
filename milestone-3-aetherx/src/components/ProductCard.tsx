import Image from "next/image";
import Link from 'next/link';
import { Product } from '@/types/product';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }:ProductCardProps) {
    return (
        <Link href={`/products/${product.id}`} className="group">
            <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-200">
                <Image
                    src={product.images[0]}
                    alt={product.title}
                    width={300}
                    height={300}
                    className="h-full w-full object-cover object-center"
                    />
            </div>
            <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
            <p className="mt-1 text-lg font-medium text-gray-900">${product.price}</p>
        </Link>
    );
}