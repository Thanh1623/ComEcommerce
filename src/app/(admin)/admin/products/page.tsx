import { prisma } from '@/lib/prisma';
import ProductList from './ProductList';

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
  });

  const sanitizedProducts = products.map(p => ({ ...p, createdAt: p.createdAt.toISOString() }));

  return (
    <div className="py-20 px-6 max-w-6xl mx-auto">
      <h2 className="text-5xl font-extrabold mb-12 text-center text-emerald-800 tracking-tight">Quản Lý Sản Phẩm</h2>
      <ProductList initialProducts={sanitizedProducts as any} />
    </div>
  );
}
