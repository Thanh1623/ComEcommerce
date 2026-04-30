'use client';

import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { cart, removeFromCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="py-20 px-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-12 text-center text-emerald-900">Giỏ Hàng Của Bạn</h2>
      {cart.length === 0 ? (
        <p className="text-center text-gray-600">Giỏ hàng đang trống.</p>
      ) : (
        <div className="space-y-6">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center border p-4 rounded">
              <div className="flex items-center gap-4">
                <img src={item.image} alt={item.name} className="w-16 h-16" />
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p>Số lượng: {item.quantity}</p>
                </div>
              </div>
              <p className="font-bold">{(item.price * item.quantity).toLocaleString('vi-VN')} đ</p>
              <button onClick={() => removeFromCart(item.id)} className="text-red-500">Xóa</button>
            </div>
          ))}
          <div className="text-right text-2xl font-bold">
            Tổng cộng: {total.toLocaleString('vi-VN')} đ
          </div>
        </div>
      )}
    </div>
  );
}
