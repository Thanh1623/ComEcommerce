'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
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
    <main>
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
        viewport={{ once: true, amount: 0.3 }}
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
        viewport={{ once: true, amount: 0.3 }}
      >
        <h2 className="text-4xl font-bold mb-16 text-center text-emerald-900">Quy trình làm Cốm công phu</h2>
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-5 gap-8 max-w-6xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {['Tuyển chọn', 'Ngâm lúa', 'Rang cốm', 'Giã cốm', 'Gói lá'].map((step, idx) => (
            <motion.div key={step} variants={itemVariants}>
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-800 font-bold text-xl">{idx + 1}</div>
              <h3 className="font-semibold text-emerald-900">{step}</h3>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Services Section */}
      <motion.section 
        className="py-20 px-6 max-w-6xl mx-auto"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <h2 className="text-3xl font-bold mb-12 text-center text-emerald-900">Sản Phẩm Đặc Sản</h2>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {[
            { 
              id: 'com-tuoi', 
              name: 'Cốm Tươi Làng Vòng', 
              icon: <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 mb-4 text-emerald-500"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>,
              desc: 'Cốm mới giã, xanh non, thơm dịu.' 
            },
            { 
              id: 'banh-com', 
              name: 'Bánh Cốm', 
              icon: <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 mb-4 text-emerald-500"><rect width="20" height="12" x="2" y="6" rx="2"/><path d="M12 12h.01"/><path d="M17 12h.01"/><path d="M7 12h.01"/></svg>,
              desc: 'Vỏ dẻo thơm, nhân đậu xanh bùi.' 
            },
            { 
              id: 'com-kho', 
              name: 'Cốm Khô Đặc Biệt', 
              icon: <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 mb-4 text-emerald-500"><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.9 4.9 1.4 1.4"/><path d="m17.7 17.7 1.4 1.4"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.3 17.7-1.4 1.4"/><path d="m19.1 6.3-1.4-1.4"/></svg>,
              desc: 'Lựa chọn hoàn hảo quanh năm.' 
            }
          ].map((prod) => (
            <Link href={`/products/${prod.id}`} key={prod.id}>
              <motion.div 
                className="border border-emerald-100 p-8 rounded-lg shadow-sm hover:shadow-lg transition flex flex-col items-center text-center cursor-pointer h-full"
                variants={itemVariants}
                whileHover={{ y: -10 }}
              >
                {prod.icon}
                <h3 className="text-xl font-semibold mb-2 text-emerald-800">{prod.name}</h3>
                <p>{prod.desc}</p>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </motion.section>

      {/* Contact Section */}
      <motion.section 
        className="py-20 px-6 max-w-md mx-auto"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-emerald-900">Liên Hệ Đặt Hàng</h2>
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
              type="email"
              placeholder="Email"
              className="w-full border border-gray-300 p-3 rounded"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          <button type="submit" className="bg-emerald-800 text-white p-3 rounded hover:bg-emerald-700">Gửi Yêu Cầu</button>
        </form>
      </motion.section>
    </main>
  );
}
