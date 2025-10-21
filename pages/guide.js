import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Guide() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl mb-6">Hướng dẫn & Bảo dưỡng</h1>
        <article className="prose lg:prose-lg">
          <h2>Chăm sóc hàng ngày</h2>
          <p>Luôn chải nhẹ nhàng, tránh nhiệt cao, và rửa bằng sản phẩm chuyên dụng.</p>
          <h2>Bảo quản</h2>
          <p>Bảo quản trên giá hoặc hộp khô ráo, tránh ánh nắng trực tiếp.</p>
        </article>
      </main>
      <Footer />
    </div>
  )
}
