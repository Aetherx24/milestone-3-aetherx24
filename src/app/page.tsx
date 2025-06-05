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
  const res = await fetch('https://api.escuelajs.co/api/v1/categories', {
    cache: 'no-store'
  });
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
}

async function HomeContent() {
  const limit = 20;
  const offset = 0;

  const [products, categories] = await Promise.all([
    getProducts(offset, limit),
    getCategories()
  ]);

  // Map title to name for each product
  const productsWithName = products.map((product: any) => ({
    ...product,
    name: product.title,
  }));

  return (
    <ProductsWrapper
      initialProducts={productsWithName}
      initialCategories={categories}
      currentPage={1}
      itemsPerPage={limit}
      showCategories={false}
    />
  );
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