'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get('search') || '');

  useEffect(() => {
    const handler = setTimeout(() => {
      if (value === (searchParams.get('search') || '')) return;

      const params = new URLSearchParams(searchParams);
      if (value) {
        params.set('search', value);
      } else {
        params.delete('search');
      }
      router.replace(`/products?${params.toString()}`);
    }, 500);

    return () => clearTimeout(handler);
  }, [value, router, searchParams]);

  return (
    <input
      type="text"
      placeholder="Search products..."
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="border rounded-md px-4 w-full h-12"
    />
  );
}
