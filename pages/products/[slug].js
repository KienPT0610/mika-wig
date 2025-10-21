import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { useRouter } from 'next/router'
import Image from 'next/image'
import prodImg from '../../assets/images/image.png'
import { useState } from 'react'

export default function ProductDetail() {
  const router = useRouter()
  const { slug } = router.query
  const [adding, setAdding] = useState(false)

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
            <button
              className="btn-primary flex items-center gap-2"
              onClick={() => {
                if (typeof window !== 'undefined') {
                  const user = localStorage.getItem('user')
                  if (!user) {
                    router.push('/login?redirect=' + encodeURIComponent(router.asPath))
                    return
                  }
                  setAdding(true)
                  setTimeout(() => {
                    setAdding(false)
                    alert('Đã thêm vào giỏ hàng!')
                  }, 700)
                }
              }}
              disabled={adding}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7a1 1 0 00.9 1.3h12.2a1 1 0 00.9-1.3L17 13M7 13V6a1 1 0 011-1h5a1 1 0 011 1v7" /></svg>
              {adding ? 'Đang thêm...' : 'Thêm vào giỏ hàng'}
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
