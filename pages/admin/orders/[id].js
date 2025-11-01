import AdminSideBar from "../../../components/AdminSideBar";
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import formatCurrency from '../../../lib/format'

export default function OrderDetailPage(){
  const router = useRouter()
  const { id } = router.query
  const [loading, setLoading] = useState(true)
  const [order, setOrder] = useState(null)
  const [items, setItems] = useState([])
  const [updating, setUpdating] = useState(false)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    fetch(`/api/orders?id=${id}`).then(r => r.json()).then(j => {
      setOrder(j.order)
      setItems(j.items || [])
      setLoading(false)
    }).catch(err => { console.error(err); setLoading(false) })
  }, [id])

  async function updateStatus(newStatus){
    if (!order) return
    setUpdating(true)
    try {
      const res = await fetch('/api/orders', { method: 'PUT', headers: { 'Content-Type':'application/json' }, body: JSON.stringify({ id: order.id, status: newStatus }) })
      if (res.ok) {
        setOrder(o => ({ ...o, status: newStatus }))
      }
    } catch (err) {
      console.error(err)
    } finally {
      setUpdating(false)
    }
  }

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSideBar active="/admin/orders" />
      <main className="flex-1 py-12 px-8">Đang tải...</main>
    </div>
  )

  if (!order) return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSideBar active="/admin/orders" />
      <main className="flex-1 py-12 px-8">Không tìm thấy đơn hàng</main>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSideBar active="/admin/orders" />
      <main className="flex-1 py-12 px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-2xl font-semibold">Đơn hàng #{order.id}</h1>
              <div className="text-sm text-gray-500">Ngày: {new Date(order.created_at).toLocaleString()}</div>
            </div>
            <div className="text-right">
              <div className="mb-2">Trạng thái</div>
              <div className="flex items-center gap-2">
                <select value={order.status} onChange={e => updateStatus(e.target.value)} className="border rounded px-3 py-2">
                  <option value="pending">pending</option>
                  <option value="processing">processing</option>
                  <option value="completed">completed</option>
                  <option value="cancelled">cancelled</option>
                </select>
                <button onClick={() => router.push('/admin/orders')} className="px-3 py-2 bg-gray-100 rounded">Back</button>
              </div>
            </div>
          </div>

          <div id="invoice-area">
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-white p-4 rounded shadow">
                <h3 className="font-semibold mb-2">Thông tin khách hàng</h3>
                <div className="text-sm text-gray-700">Tên: {order.name}</div>
                <div className="text-sm text-gray-700">Email: {order.email}</div>
                <div className="text-sm text-gray-700">Điện thoại: {order.phone}</div>
                <div className="mt-3 text-sm text-gray-700"><strong>Giao tới:</strong><br />{order.address} {order.city} {order.postal_code}</div>
              </div>

              <div className="bg-white p-4 rounded shadow">
                <h3 className="font-semibold mb-2">Tổng quan</h3>
                <div className="flex justify-between text-sm"><span>Tổng tiền:</span><span className="font-semibold">{formatCurrency(order.total)} {order.currency}</span></div>
                <div className="flex justify-between text-sm mt-1"><span>Mã đơn:</span><span className="text-gray-600">{order.id}</span></div>
                <div className="flex justify-between text-sm mt-1"><span>Người tạo:</span><span className="text-gray-600">{order.user_id || 'Khách'}</span></div>
              </div>
            </div>

            <div className="bg-white rounded shadow overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3">Mã SP</th>
                    <th className="px-4 py-3">Sản phẩm</th>
                    <th className="px-4 py-3">Số lượng</th>
                    <th className="px-4 py-3">Đơn giá</th>
                    <th className="px-4 py-3">Tổng</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map(it => (
                    <tr key={it.id} className="border-t">
                      <td className="px-4 py-3">{it.id}</td>
                      <td className="px-4 py-3">
                        <div className="font-semibold">{it.name}</div>
                        <div className="text-sm text-gray-500">{it.variant_id ? `Variant: ${it.variant_id}` : ''}</div>
                      </td>
                      <td className="px-4 py-3">{it.quantity}</td>
                      <td className="px-4 py-3">{formatCurrency(it.unit_price)}</td>
                      <td className="px-4 py-3">{formatCurrency(it.total_price)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-4 flex justify-end gap-4">
            <button className="px-4 py-2 bg-gray-100 rounded" onClick={() => {
              // print only invoice area by opening a new window with the invoice HTML
              const el = document.getElementById('invoice-area')
              if (!el) return
              const w = window.open('', '_blank', 'width=800,height=600')
              const styles = `
                <style>
                  body{font-family: Inter, Arial, sans-serif; padding:20px}
                  h1,h2,h3{margin:0 0 8px}
                  table{width:100%;border-collapse:collapse}
                  th,td{border:1px solid #ddd;padding:8px;text-align:left}
                  .text-right{text-align:right}
                </style>`
              w.document.write('<html><head><title>Invoice #' + order.id + '</title>' + styles + '</head><body>' + el.innerHTML + '</body></html>')
              w.document.close()
              w.focus()
              w.print()
            }}>In hóa đơn</button>
            <button className="px-4 py-2 bg-green-600 text-white rounded" onClick={() => updateStatus('completed')} disabled={updating}>{updating ? 'Đang...' : 'Đánh dấu hoàn thành'}</button>
          </div>
        </div>
      </main>
    </div>
  )
}
