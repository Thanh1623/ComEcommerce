'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, BarChart3, Package, ShoppingCart, Home } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside 
        className={`${
          isOpen ? 'w-64' : 'w-20'
        } bg-emerald-950 text-white p-6 transition-all duration-300 ease-in-out flex flex-col`}
      >
        <div className="flex items-center justify-between mb-8">
          {isOpen && <h1 className="text-xl font-bold">Admin Panel</h1>}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="p-1 hover:bg-emerald-800 rounded-md transition-colors"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="space-y-2">
          <Link href="/admin/stats" className="flex items-center gap-3 p-3 hover:bg-emerald-900 rounded-lg transition-colors">
            <BarChart3 size={20} />
            {isOpen && <span>Thống kê</span>}
          </Link>
          <Link href="/admin/orders" className="flex items-center gap-3 p-3 hover:bg-emerald-900 rounded-lg transition-colors">
            <ShoppingCart size={20} />
            {isOpen && <span>Đơn hàng</span>}
          </Link>
          <Link href="/admin/products" className="flex items-center gap-3 p-3 hover:bg-emerald-900 rounded-lg transition-colors">
            <Package size={20} />
            {isOpen && <span>Sản phẩm</span>}
          </Link>
          <div className="border-t border-emerald-900 my-4" />
          <Link href="/" className="flex items-center gap-3 p-3 hover:bg-emerald-900 rounded-lg transition-colors">
            <Home size={20} />
            {isOpen && <span>Trang chủ</span>}
          </Link>
        </nav>
      </aside>
      <main className="flex-1 p-8 transition-all duration-300">{children}</main>
    </div>
  );
}
