import { products } from '@/data/products';
import { notFound } from 'next/navigation';

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetail({ params }: ProductDetailPageProps) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  return (
    <div className="py-20 px-6 max-w-4xl mx-auto">
      <div className="border border-emerald-100 p-8 rounded-lg shadow-sm">
        <img src={product.image} alt={product.name} className="w-32 h-32 mx-auto mb-6" />
        <h2 className="text-4xl font-bold mb-4 text-emerald-900 text-center">{product.name}</h2>
        <p className="text-gray-600 mb-6 text-lg text-center">{product.description}</p>
        <p className="text-2xl font-bold text-emerald-900 text-center">{product.price.toLocaleString('vi-VN')} đ</p>
        <div className="text-center mt-8">
            <button className="bg-emerald-800 text-white px-8 py-3 rounded-full hover:bg-emerald-700">Thêm vào giỏ hàng</button>
        </div>
      </div>
    </div>
  );
}
