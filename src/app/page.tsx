import { Metadata } from 'next';
import HomeClient from './home-client';

export const metadata: Metadata = {
  title: 'Cốm Làng Vòng Hà Nội | Đặc Sản Truyền Thống',
  description: 'Thưởng thức hương vị mùa thu Hà Nội với các sản phẩm Cốm Làng Vòng truyền thống.',
};

export default function Home() {
  return <HomeClient />;
}
