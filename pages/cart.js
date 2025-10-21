import Header from '../components/Header'
import Footer from '../components/Footer'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import logUserAction from '../lib/logUserAction'

export default function Cart() {
  const router = useRouter()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [userId, setUserId] = useState(null)

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

  const total = items.reduce((sum, it) => sum + it.price * it.quantity, 0)

  function handleCheckout() {
    if (!userId) return
    logUserAction({ user_id: userId, action: 'checkout', details: JSON.stringify(items.map(it => ({ product_id: it.product_id, quantity: it.quantity }))) })
    alert('Đặt hàng thành công!')
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
                      <span>{it.name}</span>
                    </td>
                    <td className="px-4 py-2">{it.price}₫</td>
                    <td className="px-4 py-2">
                      <input type="number" min={1} value={it.quantity} onChange={e => updateQty(it.id, Number(e.target.value))} className="w-16 border rounded px-2 py-1" />
                    </td>
                    <td className="px-4 py-2 font-semibold">{it.price * it.quantity}₫</td>
                    <td className="px-4 py-2">
                      <button className="px-3 py-1 bg-red-500 text-white rounded" onClick={() => removeItem(it.id)}>Xóa</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="text-right text-xl font-bold mb-4">Tổng cộng: {total}₫</div>
            <button className="px-6 py-2 bg-mika-blue text-white rounded font-bold" onClick={handleCheckout}>Đặt hàng</button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
