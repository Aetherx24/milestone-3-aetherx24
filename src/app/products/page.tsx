import { Product } from "@/types/product"
import ProductList from "@/components/ProductList";
import CategoryFilter from "@/components/CategoryFilter";

async function getProducts(categoryId?: string) {
  try {
    const url = categoryId 
      ? `https://api.escuelajs.co/api/v1/products/?categoryId=${categoryId}`
      : 'https://api.escuelajs.co/api/v1/products';
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch products');
    return res.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

async function getCategories() {
  try {
    const res = await fetch('https://api.escuelajs.co/api/v1/categories', { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch categories');
    return res.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const [products, categories] = await Promise.all([
    getProducts(searchParams.category),
    getCategories(),
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>
      
      <CategoryFilter categories={categories} />
      <ProductList products={products} />
    </div>
  )
} 