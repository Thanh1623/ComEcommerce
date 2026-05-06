import Link from 'next/link';
import CartButton from './cart/CartButton';

export default function Navbar() {
  return (
    <header className="bg-emerald-800 text-white p-6">
      <nav className="flex justify-between items-center max-w-6xl mx-auto">
        <Link href="/" className="text-2xl font-bold">Cốm Làng Vòng</Link>
        <ul className="flex gap-6 items-center">
          <li><Link href="/products" className="hover:text-emerald-200">Sản Phẩm</Link></li>
          <li><CartButton /></li>
        </ul>
      </nav>
    </header>
  );
}
