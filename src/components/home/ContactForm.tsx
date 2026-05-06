'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [errors, setErrors] = useState({ name: '', phone: '' });

  const validate = () => {
    let isValid = true;
    const newErrors = { name: '', phone: '' };

    if (!formData.name) {
      newErrors.name = 'Vui lòng nhập tên.';
      isValid = false;
    }
    if (!formData.phone || !/^[0-9]{10,11}$/.test(formData.phone)) {
      newErrors.phone = 'Vui lòng nhập số điện thoại hợp lệ (10-11 số).';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          body: JSON.stringify(formData),
          headers: { 'Content-Type': 'application/json' },
        });
        if (!res.ok) throw new Error('Có lỗi xảy ra.');
        alert('Đã gửi yêu cầu thành công!');
        setFormData({ name: '', phone: '' });
      } catch (error) {
        alert('Gửi yêu cầu thất bại. Vui lòng thử lại.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <input
          type="text"
          placeholder="Họ và tên"
          className="w-full border border-gray-300 p-3 rounded"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>
      <div>
        <input
          type="tel"
          placeholder="Số điện thoại"
          className="w-full border border-gray-300 p-3 rounded"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
      </div>
      <button type="submit" className="bg-emerald-700 text-white p-3 rounded hover:bg-emerald-600 transition font-bold text-lg">Gửi Yêu Cầu</button>
    </form>
  );
}
