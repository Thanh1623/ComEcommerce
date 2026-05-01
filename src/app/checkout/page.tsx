'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const router = useRouter();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const [formData, setFormData] = useState({ name: '', phone: '', address: '' });
  const [errors, setErrors] = useState({ name: '', phone: '', address: '' });

  const validate = () => {
    let isValid = true;
    const newErrors = { name: '', phone: '', address: '' };

    if (!formData.name) {
      newErrors.name = 'Vui lòng nhập họ và tên.';
      isValid = false;
    }
    if (!formData.phone || formData.phone.length < 10) {
      newErrors.phone = 'Vui lòng nhập số điện thoại hợp lệ.';
      isValid = false;
    }
    if (!formData.address) {
      newErrors.address = 'Vui lòng nhập địa chỉ giao hàng.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      clearCart();
      router.push('/thank-you');
    }
  };

  return (
    <div className="py-20 px-6 max-w-4xl mx-auto">
      <h2 className="text-5xl font-extrabold mb-4 text-center text-emerald-800 tracking-tight">Thanh Toán</h2>
      <div className="w-24 h-1 bg-emerald-400 mx-auto mb-16 rounded-full"></div>
      
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-2xl shadow-xl border-2 border-emerald-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <input 
              type="text" 
              placeholder="Họ và tên" 
              className="border-2 border-emerald-100 p-4 rounded-xl w-full focus:border-emerald-500 focus:outline-none" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          <div>
            <input 
              type="text" 
              placeholder="Số điện thoại" 
              className="border-2 border-emerald-100 p-4 rounded-xl w-full focus:border-emerald-500 focus:outline-none" 
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>
          <div className="col-span-1 md:col-span-2">
            <input 
              type="text" 
              placeholder="Địa chỉ giao hàng" 
              className="border-2 border-emerald-100 p-4 rounded-xl w-full focus:border-emerald-500 focus:outline-none" 
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
            />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
          </div>
        </div>
        
        <div className="border-t-2 border-emerald-100 pt-6">
          <h3 className="text-2xl font-semibold mb-4 text-emerald-800">Đơn hàng của bạn</h3>
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between py-2 text-emerald-700">
              <span>{item.name} x {item.quantity}</span>
              <span className="font-semibold">{ (item.price * item.quantity).toLocaleString('vi-VN')} đ</span>
            </div>
          ))}
          <div className="text-right text-3xl font-bold text-emerald-800 mt-6">
            Tổng cộng: {total.toLocaleString('vi-VN')} đ
          </div>
        </div>
        
        <button type="submit" className="bg-emerald-700 text-white p-4 rounded-xl w-full hover:bg-emerald-600 transition font-bold text-lg">Đặt Hàng</button>
      </form>
    </div>
  );
}

