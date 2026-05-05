'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronDown } from 'lucide-react';

export default function SortSelect() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSort = (sort: string) => {
    const params = new URLSearchParams(searchParams);
    if (sort) params.set('sort', sort);
    else params.delete('sort');
    router.replace(`/products?${params.toString()}`);
  };

  return (
    <div className="relative">
      <select
        value={searchParams.get('sort') || 'newest'}
        onChange={(e) => handleSort(e.target.value)}
        className="appearance-none border border-emerald-200 rounded-md px-4 pr-10 h-12 bg-white text-black cursor-pointer"
      >
        <option value="newest">Mới nhất</option>
        <option value="priceAsc">Giá thấp đến cao</option>
        <option value="priceDesc">Giá cao đến thấp</option>
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-600 pointer-events-none" />
    </div>
  );
}
