'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function Home() {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [errors, setErrors] = useState({ name: '', email: '' });

  const validate = () => {
    let isValid = true;
    const newErrors = { name: '', email: '' };

    if (!formData.name) {
      newErrors.name = 'Vui lòng nhập tên.';
      isValid = false;
    }
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Vui lòng nhập email hợp lệ.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      alert('Đã gửi yêu cầu thành công!');
      setFormData({ name: '', email: '' });
    }
  };

  return (
    <main className="overflow-x-hidden">
      {/* Hero Section */}
      <motion.section 
        className="bg-emerald-50 py-24 text-center px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.h1 
          className="text-6xl font-bold mb-6 text-emerald-900"
          initial={{ y: -50 }}
          animate={{ y: 0 }}
        >
          Cốm Làng Vòng - Tinh Hoa Ẩm Thực Hà Nội
        </motion.h1>
        <p className="text-xl mb-10 text-emerald-800 max-w-2xl mx-auto">
          Mang hương vị mùa thu Hà Nội vào từng sản phẩm cốm truyền thống.
        </p>
        <button className="bg-emerald-800 text-white px-10 py-4 rounded-full text-lg hover:bg-emerald-700 transition">
          Đặt Mua Ngay
        </button>
      </motion.section>

      {/* Story Section */}
      <motion.section 
        className="py-20 px-6 max-w-4xl mx-auto text-center"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-bold mb-8 text-emerald-900">Câu chuyện Cốm Làng Vòng</h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          Cốm Làng Vòng không chỉ là một món ăn, mà là cả một nền văn hóa, một mảnh hồn của Hà Nội cổ kính. 
          Qua bao thăng trầm, nghề làm cốm tại Làng Vòng vẫn được gìn giữ như một báu vật, 
          chắt lọc những hạt lúa nếp cái hoa vàng tinh túy nhất của đất trời.
        </p>
      </motion.section>

      {/* Process Section */}
      <motion.section 
        className="py-20 px-6 bg-white"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-bold mb-16 text-center text-emerald-900">Quy trình làm Cốm công phu</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 max-w-6xl mx-auto text-center">
          {['Tuyển chọn', 'Ngâm lúa', 'Rang cốm', 'Giã cốm', 'Gói lá'].map((step, idx) => (
            <motion.div key={step} whileHover={{ scale: 1.05 }}>
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-800 font-bold text-xl">{idx + 1}</div>
              <h3 className="font-semibold text-emerald-900">{step}</h3>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Services Section */}
      <motion.section 
        className="py-20 px-6 max-w-6xl mx-auto"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold mb-12 text-center text-emerald-900">Sản Phẩm Đặc Sản</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: 'Cốm Tươi Làng Vòng', img: '/assets/com-tuoi.svg', desc: 'Cốm mới giã, xanh non, thơm dịu.' },
            { name: 'Bánh Cốm', img: '/assets/banh-com.svg', desc: 'Vỏ dẻo thơm, nhân đậu xanh bùi.' },
            { name: 'Cốm Khô Đặc Biệt', img: '/assets/com-kho.svg', desc: 'Lựa chọn hoàn hảo quanh năm.' }
          ].map((prod) => (
            <motion.div 
              key={prod.name}
              className="border border-emerald-100 p-8 rounded-lg shadow-sm hover:shadow-lg transition flex flex-col items-center text-center"
              whileHover={{ y: -10 }}
            >
              <img src={prod.img} alt={prod.name} className="w-16 h-16 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-emerald-800">{prod.name}</h3>
              <p>{prod.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </main>
  );
}
