import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { useRouter } from 'next/router'
import Image from 'next/image'
import prodImg from '../../assets/images/image.png'

export default function ProductDetail() {
  const router = useRouter()
  const { slug } = router.query

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow max-w-4xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="rounded-lg overflow-hidden">
              <Image src={prodImg} alt="Tóc giả lớn" width={720} height={480} className="w-full h-80 object-cover" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-playfair mb-4">Tên sản phẩm {slug}</h1>
            <p className="text-gray-700 mb-6">Mô tả chi tiết sản phẩm, chất liệu, chiều dài, màu sắc và hướng dẫn đặt hàng.</p>
            <button className="btn-primary">Điền yêu cầu đặt hàng</button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
