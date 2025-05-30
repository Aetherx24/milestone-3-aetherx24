import { Product } from "@/types/product"
import ProductList from "@/components/ProductList";

async function getProducts() {
  try {
    const res = await fetch('https://api.escuelajs.co/api/v1/products', { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch products');
    return res.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export default async function Home() {
  const products: Product[] = await getProducts();

  return (
    <main className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4 p-4">Welcome to RevoShop</h1>
      <ProductList products={products} />
    </main>
  )
}