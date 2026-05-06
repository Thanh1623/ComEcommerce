'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  isFeatured: boolean;
}

export default function ProductList({ initialProducts }: { initialProducts: Product[] }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [editing, setEditing] = useState<Product | null>(null);
  const [formData, setFormData] = useState({ name: '', description: '', price: 0, image: '' });
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [errors, setErrors] = useState({ name: '', description: '', price: '', image: '' });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchProducts = async () => {
    const res = await fetch('/api/products');
    setProducts(await res.json());
  };

  const resetForm = () => {
    setFormData({ name: '', description: '', price: 0, image: '' });
    setFile(null);
    setPreviewUrl('');
    setEditing(null);
    setErrors({ name: '', description: '', price: '', image: '' });
    if (fileInputRef.current) {
        fileInputRef.current.value = '';
    }
  };

  const validate = () => {
    let isValid = true;
    const newErrors = { name: '', description: '', price: '', image: '' };

    if (!formData.name) { newErrors.name = 'Vui lòng nhập tên sản phẩm.'; isValid = false; }
    if (!formData.description) { newErrors.description = 'Vui lòng nhập mô tả.'; isValid = false; }
    if (formData.price <= 0) { newErrors.price = 'Giá phải lớn hơn 0.'; isValid = false; }
    if (!formData.image && !file) { newErrors.image = 'Vui lòng chọn hình ảnh.'; isValid = false; }

    setErrors(newErrors);
    return isValid;
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
      setErrors({...errors, image: ''});
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    let imageUrl = formData.image;

    if (file) {
      if (!supabase) {
        toast.error('Supabase chưa được cấu hình!');
        return;
      }
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
    resetForm();
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

  const toggleFeatured = async (id: string, isFeatured: boolean) => {
    await fetch('/api/products', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, isFeatured }),
    });
    toast.success(`Đã ${isFeatured ? 'đánh dấu' : 'bỏ'} nổi bật!`);
    fetchProducts();
  };

  return (
    <div className="space-y-10">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl border-2 border-emerald-100 space-y-4">
        <h3 className="text-2xl font-bold text-emerald-900">{editing ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}</h3>
        
        <div>
          <input type="text" placeholder="Tên sản phẩm" className="border p-3 rounded w-full placeholder:text-emerald-900 text-emerald-950" value={formData.name} onChange={e => { setFormData({...formData, name: e.target.value}); setErrors({...errors, name: ''}) }} />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>
        
        <div>
          <input type="text" placeholder="Mô tả" className="border p-3 rounded w-full placeholder:text-emerald-900 text-emerald-950" value={formData.description} onChange={e => { setFormData({...formData, description: e.target.value}); setErrors({...errors, description: ''}) }} />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>
        
        <div>
          <input type="number" placeholder="Giá" className="border p-3 rounded w-full placeholder:text-emerald-900 text-emerald-950" value={formData.price || ''} onChange={e => { setFormData({...formData, price: parseInt(e.target.value) || 0}); setErrors({...errors, price: ''}) }} />
          {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
        </div>

        <div className="flex flex-col items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-emerald-300 border-dashed rounded-lg cursor-pointer bg-emerald-50 hover:bg-emerald-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <p className="mb-2 text-sm text-emerald-900 font-semibold">Nhấn để tải ảnh sản phẩm</p>
                </div>
                <input type="file" ref={fileInputRef} accept="image/*" onChange={handleFileChange} className="hidden" />
            </label>
            {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
            {(previewUrl || formData.image) && (
                <Image src={previewUrl || formData.image} alt="Preview" width={128} height={128} className="mt-4 w-32 h-32 object-cover rounded-lg border-2 border-emerald-200" />
            )}
        </div>
        
        <div className="flex gap-4">
            <button type="submit" className="bg-emerald-700 text-white p-3 rounded hover:bg-emerald-600 transition flex-grow font-bold cursor-pointer">{editing ? 'Cập nhật' : 'Thêm'}</button>
            {editing && <button type="button" onClick={resetForm} className="bg-gray-300 text-gray-800 p-3 rounded hover:bg-gray-400 transition font-bold cursor-pointer">Hủy</button>}
        </div>
      </form>

      <div className="overflow-x-auto shadow-xl rounded-2xl border-2 border-emerald-100 bg-white">
        <table className="w-full text-left">
          <thead className="bg-emerald-50 text-emerald-800">
            <tr>
              <th className="p-4">Hình</th>
              <th className="p-4">Tên</th>
              <th className="p-4">Giá</th>
              <th className="p-4 text-center">Nổi bật</th>
              <th className="p-4 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t border-emerald-100">
                <td className="p-4"><Image src={product.image} alt={product.name} width={48} height={48} className="w-12 h-12 object-cover rounded" /></td>
                <td className="p-4 text-black font-semibold">{product.name}</td>
                <td className="p-4 text-black">{product.price.toLocaleString('vi-VN')} đ</td>
                <td className="p-4 text-center">
                    <input 
                      type="checkbox" 
                      checked={product.isFeatured} 
                      onChange={(e) => toggleFeatured(product.id, e.target.checked)}
                      className="w-5 h-5 cursor-pointer accent-emerald-600"
                    />
                </td>
                <td className="p-4 text-center space-x-2">
                  <button onClick={() => { setEditing(product); setFormData({ name: product.name, description: product.description, price: product.price, image: product.image }); setPreviewUrl(product.image); }} className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition font-medium cursor-pointer">Sửa</button>
                  <button onClick={() => deleteProduct(product.id)} className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition font-medium cursor-pointer">Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
