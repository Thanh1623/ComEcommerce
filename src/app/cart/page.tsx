'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import ProductIcon from '@/components/ProductIcon';

export default function CartPage() {
  const { cart, removeFromCart } = useCart();
// ...
          <div className="text-right text-3xl font-bold text-emerald-800 mt-8 pt-6 border-t-2 border-emerald-100">
            Tổng cộng: {total.toLocaleString('vi-VN')} đ
          </div>
          <div className="text-right mt-8">
            <Link 
              href="/checkout"
              className="bg-emerald-700 text-white px-10 py-4 rounded-full text-lg hover:bg-emerald-600 transition font-bold"
            >
              Tiến hành thanh toán
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

