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

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  isFeatured: boolean;
}

export default function HomeClient() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4;

  useEffect(() => {
    fetch('/api/products?isFeatured=true')
      .then(res => res.json())
      .then(data => setFeaturedProducts(data));
  }, []);

  const totalSlides = Math.ceil(featuredProducts.length / itemsPerPage);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % totalSlides);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);

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
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-5xl font-extrabold mb-12 text-center text-emerald-800 tracking-tight">Sản Phẩm Đặc Sản Nổi Bật</h2>
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
                  className="grid grid-cols-1 md:grid-cols-4 gap-6"
                >
                  {featuredProducts
                    .slice(currentIndex * itemsPerPage, (currentIndex + 1) * itemsPerPage)
                    .map((prod) => (
                      <Link href={`/products/${prod.id}`} key={prod.id}>
                        <div className="border border-emerald-100 p-4 rounded-2xl shadow-sm hover:shadow-lg transition bg-white h-full">
                          <img src={prod.image} alt={prod.name} className="w-full h-48 object-cover rounded-xl mb-4" />
                          <h3 className="text-lg font-bold text-emerald-900 mb-1">{prod.name}</h3>
                          <p className="text-emerald-700 font-semibold">{prod.price.toLocaleString('vi-VN')} đ</p>
                        </div>
                      </Link>
                    ))}
                </motion.div>
              </AnimatePresence>
            </div>
            {totalSlides > 1 && (
                <>
                <button onClick={prevSlide} className="absolute top-1/2 -left-4 bg-emerald-700 text-white p-2 rounded-full shadow-lg"><ChevronLeft /></button>
                <button onClick={nextSlide} className="absolute top-1/2 -right-4 bg-emerald-700 text-white p-2 rounded-full shadow-lg"><ChevronRight /></button>
                </>
            )}
          </div>
        )}
      </section>

      {/* ... rest of the file (Story, Process, Contact) */}
    </main>
  );
}
