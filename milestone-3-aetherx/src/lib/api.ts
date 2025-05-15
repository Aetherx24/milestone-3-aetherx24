export async function getProducts() {
    const res = await fetch ('https://api.escuelajs.co/api/v1/products');
    if (!res.ok) throw new Error('Failed to fetch products');
    return res.json();
}

export async function getProduct(id: string) {
    const res = await fetch (`https://api.escuelajs.co/api/v1/products/${id}`);
    if (!res.ok) throw new Error('Failed to fetch product');
    return res.json();
}