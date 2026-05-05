'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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

export default function HomeClient() {

  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4;

  useEffect(() => {
    fetch('/api/products?isFeatured=true')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          setFeaturedProducts(data);
        } else {
          setFeaturedProducts([]);
        }
      })
      .catch(err => {
        console.error(err);
        setFeaturedProducts([]);
      });
  }, []);

  const totalSlides = Math.ceil(featuredProducts.length / itemsPerPage);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % totalSlides);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);

  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [errors, setErrors] = useState({ name: '', phone: '' });

  const validate = () => {
    let isValid = true;
    const newErrors = { name: '', phone: '' };

    if (!formData.name) {
      newErrors.name = 'Vui lòng nhập tên.';
      isValid = false;
    }
    // Regex for basic phone number validation
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
    <main>
      {/* Hero Section */}
      <motion.section 
        className="bg-emerald-50 py-16 text-center px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.h1 
          className="text-6xl font-bold mb-6 text-emerald-800"
          initial={{ y: -50 }}
          animate={{ y: 0 }}
        >
          Cốm Làng Vòng - Tinh Hoa Ẩm Thực Hà Nội
        </motion.h1>
        <p className="text-xl mb-10 text-emerald-700 max-w-2xl mx-auto">
          Mang hương vị mùa thu Hà Nội vào từng sản phẩm cốm truyền thống.
        </p>
        <button className="bg-emerald-700 text-white px-10 py-4 rounded-full text-lg hover:bg-emerald-600 transition">
          Đặt Mua Ngay
        </button>
      </motion.section>

      {/* Featured Products Section */}
      <section className="py-12 px-6 max-w-6xl mx-auto">
        <h2 className="text-5xl font-extrabold mb-4 text-center text-emerald-800 tracking-tight">Sản Phẩm Đặc Sản Nổi Bật</h2>
        <div className="w-24 h-1 bg-emerald-400 mx-auto mb-12 rounded-full"></div>
        {featuredProducts.length === 0 ? (
          <p className="text-center text-gray-500">Đang cập nhật sản phẩm nổi bật...</p>
        ) : (
          <div className="relative">
            <div className="overflow-hidden">
              <AnimatePresence mode='wait'>
                <motion.div 
                  key={currentIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-4 gap-6 p-4"
                >
                  {featuredProducts
                    .slice(currentIndex * itemsPerPage, (currentIndex + 1) * itemsPerPage)
                    .map((prod) => (
                      <Link href={`/products/${prod.id}`} key={prod.id}>
                        <motion.div 
                          className="border border-emerald-100 p-4 rounded-2xl shadow-sm bg-white h-full relative z-10"
                          initial={{ scale: 1 }}
                          animate={{ y: [0, -10, 0], scale: 1 }}
                          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                        >
                          <img src={prod.image} alt={prod.name} className="w-full h-48 object-cover rounded-xl mb-4" />
                          <h3 className="text-lg font-bold text-emerald-900 mb-1">{prod.name}</h3>
                          <p className="text-emerald-700 font-semibold">{prod.price.toLocaleString('vi-VN')} đ</p>
                        </motion.div>
                      </Link>
                    ))}
                </motion.div>
              </AnimatePresence>
            </div>
            {totalSlides > 1 && (
                <>
                <button 
                  onClick={prevSlide} 
                  className="absolute top-1/2 -left-12 -translate-y-1/2 bg-white text-emerald-800 p-3 rounded-full shadow-md hover:bg-emerald-50 transition-all border border-emerald-100"
                >
                  <ChevronLeft size={24} />
                </button>
                <button 
                  onClick={nextSlide} 
                  className="absolute top-1/2 -right-12 -translate-y-1/2 bg-white text-emerald-800 p-3 rounded-full shadow-md hover:bg-emerald-50 transition-all border border-emerald-100"
                >
                  <ChevronRight size={24} />
                </button>
                </>
            )}
          </div>
        )}
      </section>

      {/* Story Section */}
      <motion.section 
        className="py-12 px-8 max-w-4xl mx-auto text-center bg-white rounded-3xl shadow-lg border border-emerald-100 my-8"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <h2 className="text-4xl font-extrabold mb-8 text-emerald-800">Câu chuyện Cốm Làng Vòng</h2>
        <p className="text-xl text-emerald-700 leading-relaxed italic">
          "Cốm Làng Vòng không chỉ là một món ăn, mà là cả một nền văn hóa, một mảnh hồn của Hà Nội cổ kính. 
          Qua bao thăng trầm, nghề làm cốm tại Làng Vòng vẫn được gìn giữ như một báu vật, 
          chắt lọc những hạt lúa nếp cái hoa vàng tinh túy nhất của đất trời."
        </p>
      </motion.section>

      {/* Process Section */}
      <motion.section 
        className="py-12 px-6 bg-white"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <h2 className="text-4xl font-bold mb-12 text-center text-emerald-800">Quy trình làm Cốm công phu</h2>
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-5 gap-8 max-w-6xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {['Tuyển chọn', 'Ngâm lúa', 'Rang cốm', 'Giã cốm', 'Gói lá'].map((step, idx) => (
            <motion.div key={step} variants={itemVariants}>
              <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600 font-bold text-xl">{idx + 1}</div>
              <h3 className="font-semibold text-emerald-700">{step}</h3>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Contact Section */}
      <motion.section 
        className="py-12 px-6 max-w-md mx-auto"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-emerald-800">Liên Hệ Đặt Hàng</h2>
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
      </motion.section>
    </main>
  );
}
