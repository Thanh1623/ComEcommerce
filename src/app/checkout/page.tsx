'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';

export default function CheckoutPage() {
  const { cart } = useCart();
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
      alert('Đơn hàng của bạn đã được đặt thành công!');
    }
  };

  return (
    <div className="py-20 px-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-12 text-center text-emerald-900">Thanh Toán</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <input 
              type="text" 
              placeholder="Họ và tên" 
              className="border border-gray-300 p-3 rounded w-full" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          <div>
            <input 
              type="text" 
              placeholder="Số điện thoại" 
              className="border border-gray-300 p-3 rounded w-full" 
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>
          <div className="col-span-1 md:col-span-2">
            <input 
              type="text" 
              placeholder="Địa chỉ giao hàng" 
              className="border border-gray-300 p-3 rounded w-full" 
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
            />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
          </div>
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
