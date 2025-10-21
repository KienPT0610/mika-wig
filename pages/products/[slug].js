import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { useRouter } from 'next/router'
import Image from 'next/image'

import { useEffect, useState } from 'react'
import logUserAction from '../../lib/logUserAction'
import formatCurrency from '../../lib/format'
import { useAlert } from '../../context/AlertContext'

export default function ProductDetail() {
  const router = useRouter()
  const { slug } = router.query
  const [product, setProduct] = useState(null)
  const [adding, setAdding] = useState(false)
  const [mainImgIdx, setMainImgIdx] = useState(0)
  const { showAlert } = useAlert()

  useEffect(() => {
    if (!slug) return
    fetch(`/api/admin/products?id=${slug}`)
      .then(r => r.json())
      .then(j => {
        if (j.products && j.products.length > 0) setProduct(j.products[0])
      })
    // Log view_product
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    logUserAction({ user_id: user.id, action: 'view_product', details: slug })
  }, [slug])

  useEffect(() => {
    setMainImgIdx(0)
  }, [product])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow max-w-4xl mx-auto px-6 py-12">
        {/* <button
          className="mb-6 px-4 py-2 rounded bg-mika-blue text-white hover:bg-blue-500 transition"
          onClick={() => router.push('/')}
        >
          ← Quay lại trang chủ
        </button> */}
        {!product ? (
          <div className="text-center text-gray-400">Đang tải sản phẩm...</div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="rounded-lg overflow-hidden">
                {product.image_urls && product.image_urls.length > 0 ? (
                  <img src={product.image_urls[mainImgIdx]} alt={product.name} className="w-full h-80 object-cover" />
                ) : (
                  <div className="w-full h-80 bg-gray-100 flex items-center justify-center text-gray-400">Không có ảnh</div>
                )}
              </div>
              {/* Hiển thị các ảnh phụ, cho phép bấm để xem chi tiết */}
              {product.image_urls && product.image_urls.length > 1 && (
                <div className="flex gap-2 mt-2">
                  {product.image_urls.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt="img"
                      className={`w-16 h-16 object-cover rounded cursor-pointer border ${mainImgIdx === i ? 'border-mika-blue' : 'border-transparent'}`}
                      onClick={() => setMainImgIdx(i)}
                    />
                  ))}
                </div>
              )}
            </div>
            <div>
              <h1 className="text-2xl font-playfair mb-4">{product.name}</h1>
              <p className="text-gray-700 mb-2">{product.description}</p>
              <div className="mb-2">Giá: <span className="font-bold text-mika-blue">{formatCurrency(product.price)}</span></div>
              <div className="mb-2">Kho: {product.stock}</div>
              <div className="mb-4">Loại: {product.category_name}</div>
              <button
                className={`btn-primary flex items-center gap-2 ${adding ? 'opacity-60 pointer-events-none' : ''}`}
                onClick={async () => {
                  if (typeof window !== 'undefined') {
                    const user = JSON.parse(localStorage.getItem('user') || '{}')
                    if (!user.id) {
                      router.push('/login?redirect=' + encodeURIComponent(router.asPath))
                      return
                    }
                    setAdding(true)
                    const res = await fetch('/api/cart', {
                      method: 'POST',
                      headers: { 'content-type': 'application/json' },
                      body: JSON.stringify({ user_id: user.id, product_id: product.id, quantity: 1 })
                    })
                    // Log add_to_cart
                    logUserAction({ user_id: user.id, action: 'add_to_cart', details: product.id })
                    setAdding(false)
                    if (res.ok) {
                      showAlert('success', 'Đã thêm vào giỏ hàng!')
                      if (typeof window !== 'undefined') {
                        window.dispatchEvent(new Event('cart-changed'))
                      }
                    } else {
                      const j = await res.json()
                      alert(j.error || 'Lỗi thêm vào giỏ hàng')
                    }
                  }
                }}
                disabled={adding}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7a1 1 0 00.9 1.3h12.2a1 1 0 00.9-1.3L17 13M7 13V6a1 1 0 011-1h5a1 1 0 011 1v7" /></svg>
                {adding ? 'Đang thêm...' : 'Thêm vào giỏ hàng'}
              </button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
