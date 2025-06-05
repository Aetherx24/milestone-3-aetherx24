import { CategoryFormClient } from './CategoryFormClient';

interface PageProps {
  params: Promise<{
    action: string;
    id?: string;
  }>;
}

export default async function CategoryForm({ params }: PageProps) {
  const resolvedParams = await params;
  return <CategoryFormClient params={resolvedParams} />;
} 