import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 bg-emerald-900 text-white p-6">
        <h1 className="text-2xl font-bold mb-8">Admin Panel</h1>
        <nav className="space-y-4">
          <Link href="/admin/stats" className="block p-2 hover:bg-emerald-800 rounded">Thống kê</Link>
          <Link href="/admin/orders" className="block p-2 hover:bg-emerald-800 rounded">Đơn hàng</Link>
          <Link href="/admin/products" className="block p-2 hover:bg-emerald-800 rounded">Sản phẩm</Link>
          <Link href="/" className="block p-2 hover:bg-emerald-800 rounded">Về trang chủ</Link>
        </nav>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
