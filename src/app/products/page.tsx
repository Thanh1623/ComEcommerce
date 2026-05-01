import { products } from '@/data/products';
import Link from 'next/link';
import ProductIcon from '@/components/ProductIcon';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Danh Mục Sản Phẩm | Cốm Làng Vòng',
  description: 'Khám phá các sản phẩm Cốm Làng Vòng thơm ngon, chất lượng.',
};

export default function ProductListing() {
  return (
    <div className="py-20 px-6 max-w-6xl mx-auto">
      <h2 className="text-5xl font-extrabold mb-4 text-center text-emerald-800 tracking-tight">Danh Mục Sản Phẩm</h2>
      <div className="w-24 h-1 bg-emerald-400 mx-auto mb-16 rounded-full"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <Link href={`/products/${product.id}`} key={product.id}>
            <div className="border-2 border-emerald-100 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition flex flex-col items-center text-center cursor-pointer bg-white">
              <ProductIcon id={product.id} className="w-16 h-16 mb-4" />
              <h3 className="text-2xl font-bold mb-2 text-emerald-800">{product.name}</h3>
              <p className="text-emerald-700 mb-4">{product.description}</p>
              <p className="text-lg font-bold text-emerald-800">{product.price.toLocaleString('vi-VN')} đ</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
