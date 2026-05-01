import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Đặt hàng thành công | Cốm Làng Vòng',
  description: 'Cảm ơn bạn đã mua hàng tại Cốm Làng Vòng.',
};

export default function ThankYouPage() {
  return (
    <div className="py-20 px-6 max-w-4xl mx-auto text-center">
      <h2 className="text-5xl font-extrabold mb-6 text-emerald-800 tracking-tight">Cảm ơn bạn đã đặt hàng!</h2>
      <p className="text-xl text-emerald-600 mb-12">Chúng tôi đã nhận được đơn hàng và sẽ liên hệ với bạn sớm nhất.</p>
      <Link href="/products" className="bg-emerald-700 text-white px-10 py-4 rounded-full text-lg hover:bg-emerald-600 transition font-bold">
        Tiếp tục mua sắm
      </Link>
    </div>
  );
}
