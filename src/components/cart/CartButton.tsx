'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function CartButton() {
  const { cart } = useCart();
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Link href="/cart" className="hover:text-emerald-200">
      Giỏ Hàng ({itemCount})
    </Link>
  );
}
