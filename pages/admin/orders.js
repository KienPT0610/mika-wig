import AdminSideBar from "../../components/AdminSideBar";
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function OrdersAdminPage() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  async function fetchOrders(){
    setLoading(true)
    const res = await fetch('/api/orders')
    const j = await res.json()
    setOrders(j.orders || [])
    setLoading(false)
  }

  useEffect(()=>{ fetchOrders() }, [])

  function viewOrder(id){
    router.push(`/admin/orders/${id}`)
  }

  async function updateStatus(id, status){
    await fetch('/api/orders', { method: 'PUT', headers: { 'Content-Type':'application/json' }, body: JSON.stringify({ id, status }) })
    fetchOrders()
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSideBar active="/admin/orders" />
      <main className="flex-1 py-12 px-8">
        <h2 className="text-2xl font-playfair mb-6">Quản lý đơn hàng</h2>
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          {loading ? (
            <div>Đang tải...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr>
                    <th className="px-3 py-2">ID</th>
                    <th className="px-3 py-2">Khách hàng</th>
                    <th className="px-3 py-2">Email</th>
                    <th className="px-3 py-2">Tổng</th>
                    <th className="px-3 py-2">Trạng thái</th>
                    <th className="px-3 py-2">Ngày</th>
                    <th className="px-3 py-2">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(o => (
                    <tr key={o.id} className="border-t">
                      <td className="px-3 py-2">{o.id}</td>
                      <td className="px-3 py-2">{o.name}</td>
                      <td className="px-3 py-2">{o.email}</td>
                      <td className="px-3 py-2">{o.total} {o.currency}</td>
                      <td className="px-3 py-2">{o.status}</td>
                      <td className="px-3 py-2">{new Date(o.created_at).toLocaleString()}</td>
                      <td className="px-3 py-2">
                        <button onClick={() => viewOrder(o.id)} className="mr-2 text-sm text-blue-600">Xem</button>
                        <select value={o.status} onChange={e => updateStatus(o.id, e.target.value)} className="border px-2 py-1 text-sm">
                          <option value="pending">pending</option>
                          <option value="processing">processing</option>
                          <option value="completed">completed</option>
                          <option value="cancelled">cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Order detail now opens in its own page */}
      </main>
    </div>
  )
}