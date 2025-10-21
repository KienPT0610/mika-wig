import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl mb-6">📞 Thông tin liên hệ Mika.wig - Tóc giả Mai</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="mb-4">Nếu bạn quan tâm hoặc muốn đặt hàng, đừng ngần ngại liên hệ với chúng tôi qua các kênh sau:</p>
          <ul className="list-disc ml-6 space-y-2 text-gray-700">
            <li><strong>TikTok:</strong> Mai Tóc Giả</li>
            <li><strong>Facebook:</strong> Mai Tóc Giả</li>
            <li><strong>Email:</strong> <a href="mailto:tmai60728@gmail.com" className="text-mika-blue">tmai60728@gmail.com</a></li>
            <li><strong>Zalo:</strong> 0787 105 263</li>
            <li><strong>WhatsApp:</strong> +84 787 105 263</li>
          </ul>
          <p className="mt-4">Mika.wig – Tóc giả Mai luôn sẵn sàng lắng nghe, tư vấn và đồng hành cùng bạn trong hành trình tìm kiếm mái tóc phù hợp và tự tin nhất.</p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
