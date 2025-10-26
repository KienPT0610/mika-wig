import Header from '../components/Header'
import Footer from '../components/Footer'
import { useEffect, useState } from 'react'
import formatCurrency from '../lib/format'
import { useRouter } from 'next/router'
import logUserAction from '../lib/logUserAction'
import { useAlert } from '../context/AlertContext'

export default function Cart() {
  const router = useRouter()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [userId, setUserId] = useState(null)
  const { showAlert } = useAlert()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const user = JSON.parse(localStorage.getItem('user') || '{}')
      if (!user.id) {
        router.push('/login?redirect=/cart')
        return
      }
      setUserId(user.id)
      fetch(`/api/cart?user_id=${user.id}`)
        .then(r => r.json())
        .then(j => {
          setItems(j.items || [])
          setLoading(false)
        })
    }
  }, [])

  function removeItem(id) {
    fetch('/api/cart', {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ id })
    }).then(() => {
      setItems(items => items.filter(it => it.id !== id))
    })
  }

  function updateQty(id, qty) {
    fetch('/api/cart', {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ id, quantity: qty })
    }).then(() => {
      setItems(items => items.map(it => it.id === id ? { ...it, quantity: qty } : it))
    })
  }

  // Use variant price when available
  const total = items.reduce((sum, it) => {
    const unit = it.variant_price != null ? Number(it.variant_price) : Number(it.price || 0)
    return sum + unit * Number(it.quantity || 0)
  }, 0)

  function handleCheckout() {
    if (!userId) return
    logUserAction({ user_id: userId, action: 'checkout', details: JSON.stringify(items.map(it => ({ product_id: it.product_id, quantity: it.quantity }))) })
    showAlert('success', 'Đặt hàng thành công!')
    // Thêm logic xử lý đơn hàng thực tế nếu cần
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl mb-6">Giỏ hàng của bạn</h1>
        {loading ? (
          <div className="text-center text-gray-400">Đang tải...</div>
        ) : items.length === 0 ? (
          <div className="text-center text-gray-400">Giỏ hàng trống</div>
        ) : (
          <div className="bg-white rounded-lg shadow p-6">
            {/* Desktop / tablet: table */}
            <div className="hidden md:block">
              <table className="min-w-full border mb-6">
                <thead>
                  <tr className="bg-mika-blue/10">
                    <th className="px-4 py-2 text-left">Sản phẩm</th>
                    <th className="px-4 py-2 text-left">Giá</th>
                    <th className="px-4 py-2 text-left">Số lượng</th>
                    <th className="px-4 py-2 text-left">Tổng</th>
                    <th className="px-4 py-2 text-left">Xóa</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map(it => (
                    <tr key={it.id} className="border-t">
                      <td className="px-4 py-2 flex items-center gap-2">
                        {it.image_urls && it.image_urls[0] && (
                          <img src={it.image_urls[0]} alt={it.name} className="w-12 h-12 object-cover rounded" />
                        )}
                        <div>
                          <div className="font-semibold">{it.name}</div>
                          {(it.variant_id || it.variant_material || it.variant_color || it.variant_hair_length) && (
                            <div className="text-sm text-gray-600">
                              {it.variant_material ? <span>Chất liệu: {it.variant_material}</span> : null}
                              {it.variant_color ? <span>{it.variant_material ? ' • ' : ''}Màu: {it.variant_color}</span> : null}
                              {it.variant_hair_length != null ? <span>{(it.variant_material || it.variant_color) ? ' • ' : ''}Chiều dài: {it.variant_hair_length}</span> : null}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-2">{formatCurrency(it.variant_price != null ? it.variant_price : it.price)}</td>
                      <td className="px-4 py-2">
                        <input type="number" min={1} value={it.quantity} onChange={e => updateQty(it.id, Number(e.target.value))} className="w-16 border rounded px-2 py-1" />
                      </td>
                      <td className="px-4 py-2 font-semibold">{formatCurrency((it.variant_price != null ? it.variant_price : it.price) * it.quantity)}</td>
                      <td className="px-4 py-2">
                        <button className="px-3 py-1 bg-red-500 text-white rounded" onClick={() => removeItem(it.id)}>Xóa</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile: stacked cards */}
            <div className="md:hidden space-y-4">
              {items.map(it => (
                <div key={it.id} className="border rounded p-3 flex gap-3 items-start">
                  <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                    {it.image_urls && it.image_urls[0] ? (
                      <img src={it.image_urls[0]} alt={it.name} className="w-full h-full object-cover" />
                    ) : null}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="font-semibold">{it.name}</div>
                      <button className="text-sm text-red-500" onClick={() => removeItem(it.id)}>Xóa</button>
                    </div>
                    <div className="text-sm text-gray-600 mt-1">Giá: <span className="font-semibold">{formatCurrency(it.variant_price != null ? it.variant_price : it.price)}</span></div>
                    <div className="mt-2 flex items-center gap-2">
                      <label className="text-sm">Số lượng</label>
                      <input type="number" min={1} value={it.quantity} onChange={e => updateQty(it.id, Number(e.target.value))} className="w-20 border rounded px-2 py-1" />
                    </div>
                    <div className="mt-2 text-sm font-semibold">Tổng: {formatCurrency((it.variant_price != null ? it.variant_price : it.price) * it.quantity)}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-right text-xl font-bold mb-4">Tổng cộng: {formatCurrency(total)}</div>
            <button className="w-full md:inline-block md:w-auto px-6 py-2 bg-mika-blue text-white rounded font-bold" onClick={handleCheckout}>Đặt hàng</button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
