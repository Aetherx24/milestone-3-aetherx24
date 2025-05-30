import ProductForm from '@/components/ProductForm';

export default function EditProductPage({ params }: { params: { id: string } }) {
  return <ProductForm params={{ action: 'edit', id: params.id }} />;
} 