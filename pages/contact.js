import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl mb-6">Liên hệ</h1>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2>Thông tin</h2>
            <ul className="space-y-2 text-gray-700">
              <li>Zalo: +84 9xxxx</li>
              <li>WhatsApp: +84 9xxxx</li>
              <li>TikTok: @mika.wig</li>
              <li>Facebook: Mika.wig</li>
            </ul>
          </div>
          <div>
            <h2>Gửi tin nhắn</h2>
            <form className="space-y-4">
              <input className="w-full border px-3 py-2 rounded" placeholder="Tên" />
              <input className="w-full border px-3 py-2 rounded" placeholder="Email hoặc SĐT" />
              <textarea className="w-full border px-3 py-2 rounded" placeholder="Nội dung" rows={4} />
              <button className="btn-primary">Gửi</button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
