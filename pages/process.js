import Header from '../components/Header'
import Footer from '../components/Footer'

const steps = [
  'Lấy mẫu và tư vấn',
  'Chọn chất liệu',
  'Cắt tạo phom',
  'Tinh chỉnh màu & kết cấu',
  'Giao hàng và hậu mãi'
]

export default function Process() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-3xl mb-8">Quy trình sản xuất</h1>
        <div className="grid md:grid-cols-5 gap-6">
          {steps.map((s, i) => (
            <div key={i} className="p-6 border rounded-lg text-center">
              <div className="text-xl font-playfair mb-2">Bước {i+1}</div>
              <div className="text-gray-600">{s}</div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
