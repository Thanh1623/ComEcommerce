'use client';

import { useCart } from '@/context/CartContext';

export default function CheckoutPage() {
  const { cart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Đơn hàng của bạn đã được đặt thành công!');
  };

  return (
    <div className="py-20 px-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-12 text-center text-emerald-900">Thanh Toán</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input type="text" placeholder="Họ và tên" className="border border-gray-300 p-3 rounded w-full" required />
          <input type="text" placeholder="Số điện thoại" className="border border-gray-300 p-3 rounded w-full" required />
          <input type="text" placeholder="Địa chỉ giao hàng" className="border border-gray-300 p-3 rounded w-full col-span-1 md:col-span-2" required />
        </div>
        
        <div className="border-t pt-6">
          <h3 className="text-xl font-semibold mb-4">Đơn hàng của bạn</h3>
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between py-2">
              <span>{item.name} x {item.quantity}</span>
              <span>{(item.price * item.quantity).toLocaleString('vi-VN')} đ</span>
            </div>
          ))}
          <div className="text-right text-2xl font-bold mt-4">
            Tổng cộng: {total.toLocaleString('vi-VN')} đ
          </div>
        </div>
        
        <button type="submit" className="bg-emerald-800 text-white p-3 rounded w-full hover:bg-emerald-700">Đặt Hàng</button>
      </form>
    </div>
  );
}
