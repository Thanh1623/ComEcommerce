'use client';

import { useState } from 'react';
import { toast } from 'sonner';

interface CartItem {
  name: string;
  quantity: number;
}

interface Order {
  id: string;
  name: string;
  phone: string;
  address: string;
  total: number;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'CANCELLED';
  items: CartItem[];
}

export default function OrderList({ initialOrders }: { initialOrders: Order[] }) {
  const [orders, setOrders] = useState<Order[]>(initialOrders);

  const updateStatus = async (id: string, status: string) => {
    const res = await fetch('/api/orders', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    
    if (res.ok) {
        toast.success('Đã cập nhật trạng thái đơn hàng!');
        const updated = await fetch('/api/orders');
        setOrders(await updated.json());
    } else {
        const error = await res.json();
        toast.error(`Lỗi: ${error.error}`);
    }
  };

  const deleteOrder = async (id: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa đơn hàng này?')) return;
    const res = await fetch('/api/orders', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    
    if (res.ok) {
        toast.success('Đã xóa đơn hàng!');
        const updated = await fetch('/api/orders');
        setOrders(await updated.json());
    } else {
        toast.error('Có lỗi xảy ra khi xóa đơn hàng.');
    }
  };

  return (
    <div className="overflow-x-auto shadow-xl rounded-2xl border-2 border-emerald-100 bg-white">
      <table className="w-full text-left">
        <thead className="bg-emerald-50 text-emerald-800">
          <tr>
            <th className="p-4">Khách hàng & Đơn hàng</th>
            <th className="p-4">Trạng thái</th>
            <th className="p-4 text-right">Tổng tiền</th>
            <th className="p-4 text-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-t border-emerald-100">
              <td className="p-4">
                <p className="font-semibold text-black">{order.name}</p>
                <p className="text-sm text-gray-500">{order.phone}</p>
                <div className="text-xs text-emerald-700 mt-2 bg-emerald-50 p-2 rounded">
                    {Array.isArray(order.items) && order.items.map((item: any, i: number) => (
                        <p key={i}>{item.name} x{item.quantity}</p>
                    ))}
                </div>
              </td>
              <td className="p-4">
                <select 
                  value={order.status} 
                  onChange={(e) => updateStatus(order.id, e.target.value)}
                  className="border p-2 rounded text-black"
                >
                  <option value="PENDING">PENDING</option>
                  <option value="PROCESSING">PROCESSING</option>
                  <option value="COMPLETED">COMPLETED</option>
                  <option value="CANCELLED">CANCELLED</option>
                </select>
              </td>
              <td className="p-4 text-right font-bold text-black">{order.total.toLocaleString('vi-VN')} đ</td>
              <td className="p-4 text-center">
                <button onClick={() => deleteOrder(order.id)} className="text-red-500 hover:text-red-700 font-semibold">Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
