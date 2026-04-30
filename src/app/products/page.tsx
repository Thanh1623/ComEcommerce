import { products } from '@/data/products';
import Link from 'next/link';

export default function ProductListing() {
  return (
    <div className="py-20 px-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-12 text-center text-emerald-900">Danh Mục Sản Phẩm</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <Link href={`/products/${product.id}`} key={product.id}>
            <div className="border border-emerald-100 p-8 rounded-lg shadow-sm hover:shadow-md transition flex flex-col items-center text-center cursor-pointer">
              <img src={product.image} alt={product.name} className="w-16 h-16 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-emerald-800">{product.name}</h3>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <p className="text-lg font-bold text-emerald-900">{product.price.toLocaleString('vi-VN')} đ</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
