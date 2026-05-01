'use client';

import { products } from '@/data/products';
import { notFound } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { use } from 'react';
import ProductIcon from '@/components/ProductIcon';
import { toast } from 'sonner';

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetail({ params }: ProductDetailPageProps) {
  const { id } = use(params);
  const product = products.find((p) => p.id === id);
  const { addToCart } = useCart();

  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} đã được thêm vào giỏ hàng!`);
  };

  return (
    <div className="py-20 px-6 max-w-4xl mx-auto">
      <div className="border-2 border-emerald-100 p-8 rounded-2xl shadow-xl bg-white">
        <ProductIcon id={product.id} className="w-32 h-32 mx-auto mb-6" />
        <h2 className="text-5xl font-extrabold mb-4 text-emerald-950 text-center tracking-tight">{product.name}</h2>
        <p className="text-emerald-700 mb-6 text-lg text-center">{product.description}</p>
        <p className="text-3xl font-bold text-emerald-950 text-center">{product.price.toLocaleString('vi-VN')} đ</p>
        <div className="text-center mt-8">
            <button 
                onClick={handleAddToCart}
                className="bg-emerald-700 text-white px-10 py-4 rounded-full text-lg hover:bg-emerald-600 transition"
            >
                Thêm vào giỏ hàng
            </button>
        </div>
      </div>
    </div>
  );
}
