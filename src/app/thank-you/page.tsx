import Link from 'next/link';

export default function ThankYouPage() {
  return (
    <div className="py-20 px-6 max-w-4xl mx-auto text-center">
      <h2 className="text-4xl font-bold mb-6 text-emerald-900">Cảm ơn bạn đã đặt hàng!</h2>
      <p className="text-xl text-gray-600 mb-8">Chúng tôi đã nhận được đơn hàng và sẽ liên hệ với bạn sớm nhất.</p>
      <Link href="/products" className="bg-emerald-800 text-white px-8 py-3 rounded-full hover:bg-emerald-700">
        Tiếp tục mua sắm
      </Link>
    </div>
  );
}
