'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const { cart } = useCart();
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-emerald-800 text-white p-6">
      <nav className="flex justify-between items-center max-w-6xl mx-auto">
        <Link href="/" className="text-2xl font-bold">Cốm Làng Vòng</Link>
        <ul className="flex gap-6 items-center">
          <li><Link href="/products" className="hover:text-emerald-200">Sản Phẩm</Link></li>
          <li><Link href="/cart" className="hover:text-emerald-200">
            Giỏ Hàng ({itemCount})
          </Link></li>
        </ul>
      </nav>
    </header>
  );
}
