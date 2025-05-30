"use client"

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

interface Category {
  id: number;
  name: string;
}

interface CategoryFilterProps {
  categories: Category[];
}

export default function CategoryFilter({ categories }: CategoryFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setCurrentCategory(searchParams.get('category'));
    setIsLoading(false);
  }, [searchParams]);

  const handleCategoryClick = (categoryId: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (currentCategory === categoryId.toString()) {
      params.delete('category');
    } else {
      params.set('category', categoryId.toString());
    }
    router.push(`/products?${params.toString()}`);
  };

  if (isLoading) {
    return (
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Categories</h2>
        <div className="flex flex-wrap gap-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="px-4 py-2 rounded-full bg-gray-100 animate-pulse"
            >
              {category.name}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8" suppressHydrationWarning>
      <h2 className="text-xl font-semibold mb-4">Categories</h2>
      <div className="flex flex-wrap gap-4">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className={`px-4 py-2 rounded-full transition-colors text-black ${
              currentCategory === category.id.toString()
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
} 