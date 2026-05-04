import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import ProductDetail from './product-detail';
import { Metadata } from 'next';

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });
  return {
    title: product ? `${product.name} | Cốm Làng Vòng` : "Sản phẩm không tồn tại",
    description: product ? product.description : "Cốm Làng Vòng đặc sản Hà Nội",
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}
