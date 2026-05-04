'use client';

import { useState } from 'react';
import { toast } from 'sonner';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

export default function ProductList({ initialProducts }: { initialProducts: Product[] }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [editing, setEditing] = useState<Product | null>(null);
  const [formData, setFormData] = useState({ name: '', description: '', price: 0, image: '' });

  const fetchProducts = async () => {
    const res = await fetch('/api/products');
    setProducts(await res.json());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editing ? 'PATCH' : 'POST';
    const body = editing ? { id: editing.id, ...formData } : formData;

    await fetch('/api/products', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    toast.success(editing ? 'Đã cập nhật sản phẩm!' : 'Đã thêm sản phẩm!');
    setEditing(null);
    setFormData({ name: '', description: '', price: 0, image: '' });
    fetchProducts();
  };

  const deleteProduct = async (id: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) return;
    await fetch('/api/products', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    toast.success('Đã xóa sản phẩm!');
    fetchProducts();
  };

  return (
    <div className="space-y-10">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl border-2 border-emerald-100 space-y-4">
        <h3 className="text-2xl font-bold text-emerald-900">{editing ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}</h3>
        <input type="text" placeholder="Tên" className="border p-3 rounded w-full placeholder:text-emerald-900 text-emerald-950" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
        <input type="text" placeholder="Mô tả" className="border p-3 rounded w-full placeholder:text-emerald-900 text-emerald-950" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required />
        <input type="number" placeholder="Giá" className="border p-3 rounded w-full placeholder:text-emerald-900 text-emerald-950" value={formData.price} onChange={e => setFormData({...formData, price: parseInt(e.target.value)})} required />
        <input type="text" placeholder="Hình ảnh URL" className="border p-3 rounded w-full placeholder:text-emerald-900 text-emerald-950" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} required />
        <button type="submit" className="bg-emerald-700 text-white p-3 rounded hover:bg-emerald-600 transition w-full font-bold">{editing ? 'Cập nhật' : 'Thêm'}</button>
      </form>

      <div className="overflow-x-auto shadow-xl rounded-2xl border-2 border-emerald-100 bg-white">
        <table className="w-full text-left">
          <thead className="bg-emerald-50 text-emerald-800">
            <tr>
              <th className="p-4">Tên</th>
              <th className="p-4">Giá</th>
              <th className="p-4 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t border-emerald-100">
                <td className="p-4">{product.name}</td>
                <td className="p-4">{product.price.toLocaleString('vi-VN')} đ</td>
                <td className="p-4 text-center space-x-2">
                  <button onClick={() => { setEditing(product); setFormData({ name: product.name, description: product.description, price: product.price, image: product.image }) }} className="text-blue-500 font-semibold">Sửa</button>
                  <button onClick={() => deleteProduct(product.id)} className="text-red-500 font-semibold">Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
