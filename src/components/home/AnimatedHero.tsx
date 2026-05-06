'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function AnimatedHero() {
  return (
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
      <Link href="/products" className="bg-emerald-700 text-white px-10 py-4 rounded-full text-lg hover:bg-emerald-600 transition">
        Đặt Mua Ngay
      </Link>
    </motion.section>
  );
}
