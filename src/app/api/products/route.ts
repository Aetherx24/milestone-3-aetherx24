import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

const API_URL = 'https://api.escuelajs.co/api/v1';

export const revalidate = 30; // Revalidate every 30 seconds

export async function GET() {
  try {
    const response = await fetch(`${API_URL}/products`, {
      next: { revalidate: 30 } // ISR: revalidate every 30 seconds
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    const products = await response.json();
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Received product data:', body);

    // Validate required fields
    if (!body.title || !body.price || !body.description || !body.categoryId || !body.images) {
      console.log('Missing fields:', {
        title: !!body.title,
        price: !!body.price,
        description: !!body.description,
        categoryId: !!body.categoryId,
        images: !!body.images
      });
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const productData = {
      title: body.title,
      price: Number(body.price),
      description: body.description,
      categoryId: Number(body.categoryId),
      images: Array.isArray(body.images) ? body.images : [body.images],
    };
    console.log('Sending product data to API:', productData);

    const response = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error('API Error Response:', {
        status: response.status,
        statusText: response.statusText,
        errorData
      });
      throw new Error(errorData?.message || `Failed to create product: ${response.statusText}`);
    }

    const product = await response.json();
    console.log('Product created successfully:', product);
    
    // Revalidate all relevant paths
    revalidatePath('/');
    revalidatePath('/admin');
    revalidatePath('/products');
    return NextResponse.json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create product' },
      { status: 500 }
    );
  }
} 