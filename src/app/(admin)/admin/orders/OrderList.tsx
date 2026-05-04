'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';

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

  useEffect(() => {
    if (!supabase) return;

    // Cấu hình channel theo chuẩn Supabase
    const channel = supabase
      .channel('order-changes')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'Order' }, // Thay đổi để bắt INSERT cụ thể
        (payload) => {
          console.log('Realtime INSERT received:', payload);
          fetchOrders(); // Tải lại dữ liệu khi có thay đổi
        }
      )
      .subscribe((status) => {
        console.log('Realtime subscription status:', status);
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchOrders = async () => {
    const res = await fetch('/api/orders');
    if (res.ok) {
        setOrders(await res.json());
    } else {
        console.error('Failed to fetch orders');
    }
  };

  const updateStatus = async (id: string, status: string) => {
    const res = await fetch('/api/orders', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    
    if (res.ok) {
        toast.success('Đã cập nhật trạng thái đơn hàng!');
        // Cập nhật state ngay lập tức để UI thay đổi
        setOrders(prevOrders => prevOrders.map(order => 
            order.id === id ? { ...order, status: status as any } : order
        ));
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
        // Cập nhật state ngay lập tức để UI thay đổi
        setOrders(prevOrders => prevOrders.filter(order => order.id !== id));
    } else {
        toast.error('Có lỗi xảy ra khi xóa đơn hàng.');
    }
  };

  return (
    <div className="overflow-x-auto" suppressHydrationWarning={true}>
      <table className="w-full text-left border-separate border-spacing-y-4">
        <thead className="bg-emerald-50 text-emerald-800">
          <tr>
            <th className="p-4 rounded-tl-lg">Khách hàng & Đơn hàng</th>
            <th className="p-4">Trạng thái</th>
            <th className="p-4 text-right">Tổng tiền</th>
            <th className="p-4 text-center rounded-tr-lg">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="bg-white shadow-sm hover:shadow-md transition">
              <td className="p-4 rounded-l-lg">
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
                  className={`p-2 rounded-lg font-medium cursor-pointer border text-black ${
                    order.status === 'PENDING' ? 'bg-amber-100 text-amber-800' :
                    order.status === 'PROCESSING' ? 'bg-blue-100 text-blue-800' :
                    order.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-800' :
                    'bg-red-100 text-red-800'
                  }`}
                >
                  <option value="PENDING">PENDING</option>
                  <option value="PROCESSING">PROCESSING</option>
                  <option value="COMPLETED">COMPLETED</option>
                  <option value="CANCELLED">CANCELLED</option>
                </select>
              </td>
              <td className="p-4 text-right font-bold text-black">{order.total.toLocaleString('vi-VN')} đ</td>
              <td className="p-4 text-center rounded-r-lg">
                <button onClick={() => deleteOrder(order.id)} className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition font-medium cursor-pointer">Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
