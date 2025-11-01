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
      // prefill name/email from logged in user so they don't need to type them
      setName(user.name || '')
      setEmail(user.email || '')
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
    // show form if not filled yet
    setShowForm(true)
  }

  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [placing, setPlacing] = useState(false)

  async function submitOrder() {
    // take name/email from logged in user if available (don't require them)
    const user = (typeof window !== 'undefined') ? JSON.parse(localStorage.getItem('user') || '{}') : {}
    const finalName = user.name || name
    const finalEmail = user.email || email
    if (!phone || !address) {
      showAlert('error', 'Vui lòng điền đủ thông tin người nhận (phone, địa chỉ)')
      return
    }
    const payload = {
      user_id: userId,
      name: finalName,
      email: finalEmail,
      phone,
      address,
      city,
      postal_code: postalCode,
      currency: 'VND',
      total,
      items: items.map(it => ({ product_id: it.product_id, variant_id: it.variant_id || null, name: it.name, quantity: it.quantity, unit_price: Number(it.variant_price != null ? it.variant_price : it.price) }))
    }
    try {
      setPlacing(true)
      const res = await fetch('/api/orders', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(payload) })
      const j = await res.json()
      if (!res.ok) {
        showAlert('error', j.error || 'Lỗi khi tạo đơn')
        setPlacing(false)
        return
      }
      const orderId = j.id
      // log user action
      logUserAction({ user_id: userId, action: 'checkout', details: JSON.stringify(payload.items) })
      // clear cart items
      for (const it of items) {
        try { await fetch('/api/cart', { method: 'DELETE', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ id: it.id }) }) } catch (e) {}
      }
      setItems([])
      setShowForm(false)
      showAlert('success', 'Đặt hàng thành công! Mã đơn: ' + orderId)
      // redirect to a thank you page if you have one
      // router.push(`/order-success?id=${orderId}`)
    } catch (err) {
      console.error(err)
      showAlert('error', 'Lỗi mạng khi đặt hàng')
    } finally {
      setPlacing(false)
    }
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

            {showForm ? (
              <div className="mt-4 bg-gray-50 p-4 rounded border">
                <h2 className="text-lg font-semibold mb-3">Thông tin người nhận</h2>
                {/* show logged-in user's name/email (read-only) */}
                <div className="mb-3 text-sm text-gray-700">
                  Người mua: <span className="font-medium">{name || '—'}</span>
                  {email ? <span className="ml-2 text-gray-500">({email})</span> : null}
                </div>

                <div className="grid md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm text-gray-700">Số điện thoại</label>
                    <input value={phone} onChange={e => setPhone(e.target.value)} className="mt-1 w-full border rounded px-3 py-2" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">Thành phố / Tỉnh</label>
                    <input value={city} onChange={e => setCity(e.target.value)} className="mt-1 w-full border rounded px-3 py-2" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm text-gray-700">Địa chỉ</label>
                    <input value={address} onChange={e => setAddress(e.target.value)} className="mt-1 w-full border rounded px-3 py-2" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">Mã bưu chính (tuỳ chọn)</label>
                    <input value={postalCode} onChange={e => setPostalCode(e.target.value)} className="mt-1 w-full border rounded px-3 py-2" />
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-3 justify-end">
                  <button className="px-4 py-2 bg-gray-200 rounded" onClick={() => setShowForm(false)} disabled={placing}>Hủy</button>
                  <button className="px-4 py-2 bg-mika-blue text-white rounded font-semibold" onClick={submitOrder} disabled={placing}>{placing ? 'Đang xử lý...' : 'Xác nhận đặt hàng'}</button>
                </div>
              </div>
            ) : (
              <button className="w-full md:inline-block md:w-auto px-6 py-2 bg-mika-blue text-white rounded font-bold" onClick={handleCheckout}>Đặt hàng</button>
            )}
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
