'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '@/data/products';

interface FeaturedProductsSliderProps {
  products: Product[];
}

export default function FeaturedProductsSlider({ products }: FeaturedProductsSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4;
  const totalSlides = Math.ceil(products.length / itemsPerPage);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % totalSlides);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);

  if (products.length === 0) {
    return <p className="text-center text-gray-500">Đang cập nhật sản phẩm nổi bật...</p>;
  }

  return (
    <div className="relative">
      {/* Mobile/Tablet Swipe Wrapper */}
      <div className="lg:hidden relative cursor-grab active:cursor-grabbing overflow-hidden">
        <motion.div 
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={(e, { offset }) => {
            const swipe = offset.x;
            if (swipe < -50) nextSlide();
            else if (swipe > 50) prevSlide();
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4"
        >
          {products
            .slice(currentIndex * itemsPerPage, (currentIndex + 1) * itemsPerPage)
            .map((prod) => (
              <Link href={`/products/${prod.id}`} key={prod.id}>
                <motion.div 
                  className="border border-emerald-100 p-4 rounded-2xl shadow-sm bg-white"
                  initial={{ scale: 1 }}
                  animate={{ y: [0, -10, 0], scale: 1 }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                >
                  <Image src={prod.image} alt={prod.name} width={400} height={200} className="w-full h-48 object-cover rounded-xl mb-4" />
                  <h3 className="text-lg font-bold text-emerald-900 mb-1">{prod.name}</h3>
                  <p className="text-emerald-700 font-semibold">{prod.price.toLocaleString('vi-VN')} đ</p>
                </motion.div>
              </Link>
            ))}
        </motion.div>
      </div>

      {/* Desktop View */}
      <div className="hidden lg:block relative overflow-hidden">
        <AnimatePresence mode='wait'>
          <motion.div 
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="grid lg:grid-cols-4 gap-6 p-4"
          >
            {products
              .slice(currentIndex * itemsPerPage, (currentIndex + 1) * itemsPerPage)
              .map((prod) => (
                <Link href={`/products/${prod.id}`} key={prod.id}>
                  <motion.div 
                    className="border border-emerald-100 p-4 rounded-2xl shadow-sm bg-white h-full relative z-10"
                    initial={{ scale: 1 }}
                    animate={{ y: [0, -10, 0], scale: 1 }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  >
                    <Image src={prod.image} alt={prod.name} width={400} height={200} className="w-full h-48 object-cover rounded-xl mb-4" />
                    <h3 className="text-lg font-bold text-emerald-900 mb-1">{prod.name}</h3>
                    <p className="text-emerald-700 font-semibold">{prod.price.toLocaleString('vi-VN')} đ</p>
                  </motion.div>
                </Link>
              ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination Dots */}
      {totalSlides > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalSlides }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-3 w-3 rounded-full transition-all ${currentIndex === idx ? 'bg-emerald-600 w-8' : 'bg-emerald-200'}`}
            />
          ))}
        </div>
      )}

      {/* Desktop Arrows */}
      {totalSlides > 1 && (
        <div className="hidden lg:block">
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
        </div>
      )}
    </div>
  );
}
