export default function Home() {
  return (
    <div className="font-sans text-gray-800">
      <header className="bg-slate-900 text-white p-6">
        <nav className="flex justify-between items-center max-w-6xl mx-auto">
          <div className="text-xl font-bold">Brand</div>
          <ul className="flex gap-6">
            <li><a href="#services" className="hover:text-blue-300">Services</a></li>
            <li><a href="#testimonials" className="hover:text-blue-300">Testimonials</a></li>
            <li><a href="#contact" className="hover:text-blue-300">Contact</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <section id="hero" className="bg-slate-100 py-24 text-center">
          <h1 className="text-5xl font-bold mb-4">Professional Solutions for Your Business</h1>
          <p className="text-xl mb-8">Driving growth through innovation and excellence.</p>
          <button className="bg-slate-900 text-white px-8 py-3 rounded-full hover:bg-slate-700">Get Started</button>
        </section>

        <section id="services" className="py-20 px-6 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border p-8 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Service 1</h3>
              <p>Description of service 1.</p>
            </div>
            <div className="border p-8 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Service 2</h3>
              <p>Description of service 2.</p>
            </div>
            <div className="border p-8 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Service 3</h3>
              <p>Description of service 3.</p>
            </div>
          </div>
        </section>

        <section id="testimonials" className="bg-slate-50 py-20 px-6 text-center">
          <h2 className="text-3xl font-bold mb-8">Testimonials</h2>
          <p className="italic text-lg">"Exceptional service!"</p>
        </section>

        <section id="contact" className="py-20 px-6 max-w-md mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Contact Us</h2>
          <form className="flex flex-col gap-4">
            <input type="text" placeholder="Name" className="border p-3 rounded" required />
            <input type="email" placeholder="Email" className="border p-3 rounded" required />
            <button type="submit" className="bg-slate-900 text-white p-3 rounded hover:bg-slate-700">Send</button>
          </form>
        </section>
      </main>

      <footer className="bg-slate-900 text-white text-center py-8">
        <p>&copy; 2026 Company Name</p>
      </footer>
    </div>
  );
}
