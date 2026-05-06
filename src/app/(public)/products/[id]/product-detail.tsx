import Image from 'next/image';
import { Product } from '@/data/products';
import AddToCartButton from '@/components/cart/AddToCartButton';

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  return (
    <div className="py-20 px-6 max-w-4xl mx-auto">
      <div className="border-2 border-emerald-100 p-8 rounded-2xl shadow-xl bg-white">
        <Image src={product.image} alt={product.name} width={256} height={256} className="w-64 h-64 mx-auto mb-8 rounded-2xl object-cover shadow-lg" />
        <h2 className="text-5xl font-extrabold mb-4 text-emerald-950 text-center tracking-tight">{product.name}</h2>
        <p className="text-emerald-700 mb-6 text-lg text-center">{product.description}</p>
        <p className="text-3xl font-bold text-emerald-950 text-center">{product.price.toLocaleString('vi-VN')} đ</p>
        <div className="text-center mt-8">
            <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}
