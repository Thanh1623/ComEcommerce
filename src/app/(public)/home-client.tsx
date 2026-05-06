'use client';

import { motion } from 'framer-motion';
import { Product } from '@/data/products';
import ContactForm from '@/components/home/ContactForm';
import AnimatedHero from '@/components/home/AnimatedHero';
import FeaturedProductsSlider from '@/components/home/FeaturedProductsSlider';

interface HomeClientProps {
  initialProducts: Product[];
}

export default function HomeClient({ initialProducts }: HomeClientProps) {
  const sectionVariants: any = {
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

  return (
    <main>
      <AnimatedHero />

      {/* Featured Products Section */}
      <section className="py-12 px-6 max-w-6xl mx-auto">
        <h2 className="text-5xl font-extrabold mb-4 text-center text-emerald-400 tracking-tight">Sản Phẩm Đặc Sản Nổi Bật</h2>
        <div className="w-24 h-1 bg-emerald-400 mx-auto mb-12 rounded-full"></div>
        <FeaturedProductsSlider products={initialProducts} />
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
        <ContactForm />
      </motion.section>
    </main>
  );
}
