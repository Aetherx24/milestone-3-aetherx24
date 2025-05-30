"use client"

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Category } from '@/types'

interface CategoryFilterProps {
  categories: Category[]
  onCategorySelect: (categoryId: number | null) => void
}

export default function CategoryFilter({ categories, onCategorySelect }: CategoryFilterProps) {
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
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Categories</h2>
      <div className="space-y-2">
        <button
          onClick={() => onCategorySelect(null)}
          className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          All Categories
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategorySelect(category.id)}
            className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
} 