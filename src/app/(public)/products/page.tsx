import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import Search from '@/components/Search';
import SortSelect from '@/components/SortSelect';

export const metadata: Metadata = {
  title: 'Danh Mục Sản Phẩm | Cốm Làng Vòng',
  description: 'Khám phá các sản phẩm Cốm Làng Vòng thơm ngon, chất lượng.',
};

export default async function ProductListing({ searchParams }: { searchParams: Promise<{ search?: string, sort?: string }> }) {
  const { search, sort } = await searchParams;

  const where: any = {};
  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
    ];
  }

  let orderBy: any = { createdAt: 'desc' };
  if (sort === 'priceAsc') orderBy = { price: 'asc' };
  else if (sort === 'priceDesc') orderBy = { price: 'desc' };
  else if (sort === 'newest') orderBy = { createdAt: 'desc' };

  const products = await prisma.product.findMany({
    where,
    orderBy,
  });

  return (
    <div className="py-20 px-6 max-w-6xl mx-auto">
      <h2 className="text-5xl font-extrabold mb-4 text-center text-emerald-400 tracking-tight">Danh Mục Sản Phẩm</h2>
      <div className="w-24 h-1 bg-emerald-400 mx-auto mb-8 rounded-full"></div>
      
      <div className="flex gap-4 items-center mb-6">
        <div className="flex-grow">
          <Search />
        </div>
        <SortSelect />
      </div>

      {products.length === 0 ? (
        <p className="text-center text-emerald-700">Không tìm thấy sản phẩm nào.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Link href={`/products/${product.id}`} key={product.id}>
              <div className="border-2 border-emerald-100 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition flex flex-col items-center text-center cursor-pointer bg-white">
                <Image src={product.image} alt={product.name} width={500} height={500} className="w-full h-64 mb-6 object-cover rounded-lg aspect-square" />
                <h3 className="text-2xl font-bold mb-2 text-emerald-800">{product.name}</h3>
                <p className="text-emerald-700 mb-4">{product.description}</p>
                <p className="text-lg font-bold text-emerald-800">{product.price.toLocaleString('vi-VN')} đ</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
