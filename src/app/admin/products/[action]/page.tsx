import { ProductFormClient } from './ProductFormClient';

interface PageProps {
  params: Promise<{
    action: string;
    id?: string;
  }>;
}

export default async function ProductForm({ params }: PageProps) {
  const resolvedParams = await params;
  return <ProductFormClient params={resolvedParams} />;
} 