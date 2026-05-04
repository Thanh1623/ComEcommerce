import { prisma } from '@/lib/prisma';
import OrderList from './OrderList';

export default async function AdminPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
  });

    // Convert Date objects to JSON-safe format, ensuring same format for SSR and Client
    const sanitizedOrders = orders.map(order => ({
      ...order,
      createdAt: order.createdAt instanceof Date ? order.createdAt.toISOString() : new Date(order.createdAt).toISOString(),
      updatedAt: order.updatedAt instanceof Date ? order.updatedAt.toISOString() : new Date(order.updatedAt).toISOString(),
    }));


  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-5xl font-extrabold mb-12 text-center text-emerald-800 tracking-tight">Quản Lý Đơn Hàng</h2>
      <OrderList initialOrders={sanitizedOrders as any} />
    </div>
  );
}
