'use client';

import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, ShoppingBag } from 'lucide-react';

export default function StatsPage() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetch('/api/stats')
      .then(res => res.json())
      .then(data => setStats(data));
  }, []);

  if (!stats) return <div>Đang tải...</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Thống kê</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-emerald-100 rounded-full">
            <DollarSign className="w-8 h-8 text-emerald-600" />
          </div>
          <div>
            <p className="text-gray-500">Tổng doanh thu</p>
            <h3 className="text-2xl font-bold">{stats.totalRevenue.toLocaleString('vi-VN')} đ</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <ShoppingBag className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <p className="text-gray-500">Tổng đơn hàng</p>
            <h3 className="text-2xl font-bold">{stats.orderCount}</h3>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold mb-4">Doanh thu theo ngày</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats.chartData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip formatter={(value: number) => [`${value.toLocaleString('vi-VN')} đ`, 'Doanh thu']} />
              <Bar dataKey="revenue" fill="#065f46" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
