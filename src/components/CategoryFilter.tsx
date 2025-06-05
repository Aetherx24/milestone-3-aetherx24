"use client"

import { useSearchParams } from 'next/navigation'

interface CategoryFilterProps {
  categories: string[]
}

export default function CategoryFilter({ categories }: CategoryFilterProps) {
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get('category');

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (selectedCategory === category) {
      params.delete('category');
    } else {
      params.set('category', category);
    }
    window.location.search = params.toString();
  };

  return (
    <div className="space-y-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleCategoryChange(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            selectedCategory === category
              ? 'bg-indigo-600 text-white hover:bg-indigo-700'
              : 'bg-gray-100 text-black hover:bg-gray-200'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
} 