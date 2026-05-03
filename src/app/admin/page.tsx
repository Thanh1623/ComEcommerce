import { prisma } from '@/lib/prisma';

export default async function AdminPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="py-20 px-6 max-w-6xl mx-auto">
      <h2 className="text-5xl font-extrabold mb-12 text-center text-emerald-900">Quản Lý Đơn Hàng</h2>
      <div className="overflow-x-auto shadow-sm rounded-lg border border-emerald-100">
        <table className="w-full text-left">
          <thead className="bg-emerald-50 text-emerald-800">
            <tr>
              <th className="p-4">Khách hàng</th>
              <th className="p-4">Điện thoại</th>
              <th className="p-4">Địa chỉ</th>
              <th className="p-4 text-right">Tổng tiền</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t border-emerald-50">
                <td className="p-4">{order.name}</td>
                <td className="p-4">{order.phone}</td>
                <td className="p-4">{order.address}</td>
                <td className="p-4 text-right font-bold">{order.total.toLocaleString('vi-VN')} đ</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
