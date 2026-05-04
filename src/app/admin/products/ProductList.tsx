'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';

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
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  const fetchProducts = async () => {
    const res = await fetch('/api/products');
    setProducts(await res.json());
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let imageUrl = formData.image;

    if (file) {
      const fileName = `${Date.now()}_${file.name}`;
      const { error } = await supabase.storage
        .from('products')
        .upload(fileName, file);

      if (error) {
        toast.error('Lỗi khi tải ảnh lên Supabase!');
        return;
      }
      const { data } = supabase.storage.from('products').getPublicUrl(fileName);
      imageUrl = data.publicUrl;
    }

    const method = editing ? 'PATCH' : 'POST';
    const body = editing ? { id: editing.id, ...formData, image: imageUrl } : { ...formData, image: imageUrl };

    await fetch('/api/products', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    
    toast.success(editing ? 'Đã cập nhật sản phẩm!' : 'Đã thêm sản phẩm!');
    setEditing(null);
    setFormData({ name: '', description: '', price: 0, image: '' });
    setFile(null);
    setPreviewUrl('');
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
        <input type="number" placeholder="Giá" className="border p-3 rounded w-full placeholder:text-emerald-900 text-emerald-950" value={formData.price || ''} onChange={e => setFormData({...formData, price: parseInt(e.target.value) || 0})} required />
        
        <div className="flex flex-col items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-emerald-300 border-dashed rounded-lg cursor-pointer bg-emerald-50 hover:bg-emerald-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <p className="mb-2 text-sm text-emerald-900 font-semibold">Nhấn để tải ảnh sản phẩm</p>
                </div>
                <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            </label>
            {(previewUrl || formData.image) && (
                <img src={previewUrl || formData.image} alt="Preview" className="mt-4 w-32 h-32 object-cover rounded-lg border-2 border-emerald-200" />
            )}
        </div>
        
        <button type="submit" className="bg-emerald-700 text-white p-3 rounded hover:bg-emerald-600 transition w-full font-bold">{editing ? 'Cập nhật' : 'Thêm'}</button>
      </form>

      <div className="overflow-x-auto shadow-xl rounded-2xl border-2 border-emerald-100 bg-white">
        <table className="w-full text-left">
          <thead className="bg-emerald-50 text-emerald-800">
            <tr>
              <th className="p-4">Hình</th>
              <th className="p-4">Tên</th>
              <th className="p-4">Giá</th>
              <th className="p-4 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t border-emerald-100">
                <td className="p-4"><img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded" /></td>
                <td className="p-4 text-black font-semibold">{product.name}</td>
                <td className="p-4 text-black">{product.price.toLocaleString('vi-VN')} đ</td>
                <td className="p-4 text-center space-x-2">
                  <button onClick={() => { setEditing(product); setFormData({ name: product.name, description: product.description, price: product.price, image: product.image }); setPreviewUrl(product.image); }} className="text-blue-500 font-semibold">Sửa</button>
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
