"use client"

import { useEffect, useState } from "react"
import { Product } from "@/types/product"
import ProductCard from "@/components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('https://api.escuelajs.co/api/v1/products');
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
    fetchProducts();
  }, []);

  return (
    <main className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4 p-4"> Welcome to RevoShop</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {products.map(product => ( 
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  )
}