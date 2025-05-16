import { getProductById } from '@/lib/api';
import Image from 'next/image';
import { Product } from '@/types/product';

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product: Product = await getProductById(params.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="relative aspect-square">
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw,33vw"
            className="object-contain rounded-lg"
            priority
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-2xl font-bold mb-6">${product.price}</p>
          <p className="text-gray-600 mb-4">Category: {product.category.name}</p>
          
          <button className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors w-fit">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}