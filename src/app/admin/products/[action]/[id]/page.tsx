import { ProductFormClient } from './ProductFormClient';

interface PageProps {
  params: { action: string; id: string };
}

export default function ProductForm({ params }: PageProps) {
  return <ProductFormClient params={params} />;
} 