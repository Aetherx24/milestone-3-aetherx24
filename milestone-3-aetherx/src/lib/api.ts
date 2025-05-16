const BASE_URL = 'https://api.escuelajs.co/api/v1';

export async function getAllProducts() {
  const res = await fetch(`${BASE_URL}/products`);
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  return res.json();
}

export async function getProductById(id: string) {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  if (!res.ok) {
    throw new Error('Failed to fetch product');
  }
  return res.json();
}

export async function getProductsByCategory(categoryId: number) {
  const res = await fetch(`${BASE_URL}/categories/${categoryId}/products`);
  if (!res.ok) {
    throw new Error('Failed to fetch products by category');
  }
  return res.json();
}

export async function getRelatedProducts(productId: string) {
  const res = await fetch(`${BASE_URL}/products/${productId}/related`);
  if (!res.ok) {
    throw new Error('Failed to fetch related products');
  }
  return res.json();
}

// Pagination support
export async function getProductsPaginated(offset: number = 0, limit: number = 10) {
  const res = await fetch(`${BASE_URL}/products?offset=${offset}&limit=${limit}`);
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  return res.json();
}