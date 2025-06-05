import { Suspense } from 'react';
import ProductsWrapper from '@/components/ProductsWrapper';
import Loading from '@/components/Loading';

async function getProducts(offset: number, limit: number) {
  try {
    const res = await fetch(`https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`, {
      next: { revalidate: 0 }
    });
    if (!res.ok) throw new Error('Failed to fetch products');
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

async function getCategories() {
  try {
    const res = await fetch('https://api.escuelajs.co/api/v1/categories', {
      next: { revalidate: 0 }
    });
    if (!res.ok) throw new Error('Failed to fetch categories');
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Featured Products</h1>
      <Suspense fallback={<Loading />}>
        <HomeContent />
      </Suspense>
    </main>
  );
}

async function HomeContent() {
  const limit = 20;
  const offset = 0;

  const [products, categories] = await Promise.all([
    getProducts(offset, limit),
    getCategories()
  ]);

  return (
    <ProductsWrapper
      initialProducts={products}
      initialCategories={categories}
      currentPage={1}
      itemsPerPage={limit}
    />
  );
}