import { Suspense } from 'react';
import { getAllProducts } from '@/lib/api';
import ProductList from '@/components/ProductList';
import Loading from './loading';
import type { Category } from '@/types';

export const revalidate = 60;

async function getCategories(): Promise<Category[]> {
  const res = await fetch('https://api.escuelajs.co/api/v1/categories', {
    cache: 'no-store'
  });
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
}

export default async function ProductsPage() {
  const [initialProducts, categories] = await Promise.all([
    getAllProducts(),
    getCategories()
  ]);

  const categoryNames = categories.map((category: Category) => category.name);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Products</h1>
      <Suspense fallback={<Loading />}>
        <ProductList
          initialProducts={initialProducts}
          categories={categoryNames}
          currentPage={1}
          itemsPerPage={12}
        />
      </Suspense>
    </div>
  );
} 