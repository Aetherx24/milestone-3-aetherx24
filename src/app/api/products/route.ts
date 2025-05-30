import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

const API_URL = 'https://api.escuelajs.co/api/v1';

export async function GET() {
  try {
    const response = await fetch(`${API_URL}/products`);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const products = await response.json();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const response = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error('Failed to create product');
    }

    const product = await response.json();
    
    // Revalidate the products page to update the cache
    revalidatePath('/');
    revalidatePath('/admin');
    
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
} 