export default function Home() {
  return (
    <div className="font-sans text-gray-800">
      <header className="bg-emerald-800 text-white p-6">
        <nav className="flex justify-between items-center max-w-6xl mx-auto">
          <div className="text-2xl font-bold">Cốm Làng Vòng</div>
          <ul className="flex gap-6">
            <li><a href="#services" className="hover:text-emerald-200">Sản Phẩm</a></li>
            <li><a href="#testimonials" className="hover:text-emerald-200">Đánh Giá</a></li>
            <li><a href="#contact" className="hover:text-emerald-200">Liên Hệ</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <section id="hero" className="bg-emerald-50 py-24 text-center">
          <h1 className="text-5xl font-bold mb-4 text-emerald-900">Cốm Làng Vòng - Tinh Hoa Ẩm Thực Hà Nội</h1>
          <p className="text-xl mb-8 text-emerald-800">Mang hương vị mùa thu Hà Nội vào từng sản phẩm cốm truyền thống.</p>
          <button className="bg-emerald-800 text-white px-8 py-3 rounded-full hover:bg-emerald-700">Đặt Mua Ngay</button>
        </section>

        <section id="services" className="py-20 px-6 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-emerald-900">Sản Phẩm Đặc Sản</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border border-emerald-100 p-8 rounded-lg shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-2 text-emerald-800">Cốm Tươi Làng Vòng</h3>
              <p>Cốm mới giã, xanh non, thơm dịu, chuẩn hương vị truyền thống.</p>
            </div>
            <div className="border border-emerald-100 p-8 rounded-lg shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-2 text-emerald-800">Bánh Cốm</h3>
              <p>Vỏ bánh dẻo thơm hòa quyện cùng nhân đậu xanh bùi ngậy.</p>
            </div>
            <div className="border border-emerald-100 p-8 rounded-lg shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-2 text-emerald-800">Cốm Khô Đặc Biệt</h3>
              <p>Lựa chọn hoàn hảo để chế biến các món ngon quanh năm.</p>
            </div>
          </div>
        </section>

        <section id="testimonials" className="bg-emerald-900 text-emerald-50 py-20 px-6 text-center">
          <h2 className="text-3xl font-bold mb-8">Khách hàng nói gì?</h2>
          <p className="italic text-lg">"Hương vị chuẩn Hà Nội, thơm nồng nàn, đúng chất cốm làng Vòng. Rất đáng thử!"</p>
          <p className="mt-4 font-semibold">- Khách hàng yêu Hà Nội -</p>
        </section>

        <section id="contact" className="py-20 px-6 max-w-md mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center text-emerald-900">Liên Hệ Đặt Hàng</h2>
          <form className="flex flex-col gap-4">
            <input type="text" placeholder="Họ và tên" className="border border-gray-300 p-3 rounded" required />
            <input type="email" placeholder="Email" className="border border-gray-300 p-3 rounded" required />
            <button type="submit" className="bg-emerald-800 text-white p-3 rounded hover:bg-emerald-700">Gửi Yêu Cầu</button>
          </form>
        </section>
      </main>

      <footer className="bg-emerald-950 text-emerald-200 text-center py-8">
        <p>&copy; 2026 Cốm Làng Vòng Hà Nội</p>
        <p>Địa chỉ: Làng Vòng, Dịch Vọng Hậu, Cầu Giấy, Hà Nội</p>
      </footer>
    </div>
  );
}
