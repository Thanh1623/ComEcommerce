'use client';

import { useCart } from '@/context/CartContext';
import ProductIcon from '@/components/ProductIcon';

export default function CartPage() {
  const { cart, removeFromCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="py-20 px-6 max-w-4xl mx-auto">
      <h2 className="text-5xl font-extrabold mb-4 text-center text-emerald-950 tracking-tight">Giỏ Hàng Của Bạn</h2>
      <div className="w-24 h-1 bg-emerald-500 mx-auto mb-16 rounded-full"></div>
      
      {cart.length === 0 ? (
        <p className="text-center text-emerald-700 text-lg">Giỏ hàng đang trống.</p>
      ) : (
        <div className="space-y-6">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center border-2 border-emerald-100 p-6 rounded-2xl bg-white shadow-sm">
              <div className="flex items-center gap-4">
                <ProductIcon id={item.id} className="w-16 h-16" />
                <div>
                  <h3 className="font-bold text-emerald-900 text-lg">{item.name}</h3>
                  <p className="text-emerald-700">Số lượng: {item.quantity}</p>
                </div>
              </div>
              <p className="font-bold text-emerald-950 text-lg">{(item.price * item.quantity).toLocaleString('vi-VN')} đ</p>
              <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 font-semibold">Xóa</button>
            </div>
          ))}
          <div className="text-right text-3xl font-bold text-emerald-950 mt-8 pt-6 border-t-2 border-emerald-100">
            Tổng cộng: {total.toLocaleString('vi-VN')} đ
          </div>
        </div>
      )}
    </div>
  );
}
