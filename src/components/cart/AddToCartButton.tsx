'use client';

import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';
import { Product } from '@/data/products';

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} đã được thêm vào giỏ hàng!`);
  };

  return (
    <button 
        onClick={handleAddToCart}
        className="bg-emerald-700 text-white px-10 py-4 rounded-full text-lg hover:bg-emerald-600 transition cursor-pointer"
    >
        Thêm vào giỏ hàng
    </button>
  );
}
