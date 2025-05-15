import { getProducts } from '../lib/api';
import ProductCard from '../components/ProductCard';

export default async function Home() {
    const products = await getProducts();

    return (
        <main className='container mx-auto px-4 py-8'>
            <h1 className='text-3xl font-bold mb-8'>Welcome to RevoShop</h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </main>
    );
}