import { products } from '@/data/products';
import { notFound } from 'next/navigation';
import ProductDetail from './product-detail';
import { Metadata } from 'next';

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = products.find((p) => p.id === id);
  return {
    title: product ? `${product.name} | Cốm Làng Vòng` : "Sản phẩm không tồn tại",
    description: product ? product.description : "Cốm Làng Vòng đặc sản Hà Nội",
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}
