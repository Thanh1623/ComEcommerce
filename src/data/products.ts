export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

export const products: Product[] = [
  {
    id: 'com-tuoi',
    name: 'Cốm Tươi Làng Vòng',
    description: 'Cốm mới giã, xanh non, thơm dịu, chuẩn hương vị truyền thống.',
    price: 150000,
    image: '/assets/com-tuoi.svg',
  },
  {
    id: 'banh-com',
    name: 'Bánh Cốm',
    description: 'Vỏ bánh dẻo thơm hòa quyện cùng nhân đậu xanh bùi ngậy.',
    price: 50000,
    image: '/assets/banh-com.svg',
  },
  {
    id: 'com-kho',
    name: 'Cốm Khô Đặc Biệt',
    description: 'Lựa chọn hoàn hảo để chế biến các món ngon quanh năm.',
    price: 120000,
    image: '/assets/com-kho.svg',
  },
];
