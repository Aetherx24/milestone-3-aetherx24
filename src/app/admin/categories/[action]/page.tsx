import { CategoryFormClient } from './CategoryFormClient';

interface PageProps {
  params: {
    action: string;
    id?: string;
  };
}

export default function CategoryForm({ params }: PageProps) {
  return <CategoryFormClient params={params} />;
} 