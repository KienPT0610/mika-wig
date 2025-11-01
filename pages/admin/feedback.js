import AdminSideBar from '../../components/AdminSideBar'
import { useEffect, useState } from 'react'

export default function AdminFeedbackPage(){
  const [loading, setLoading] = useState(true)
  const [feedback, setFeedback] = useState([])
  const [selected, setSelected] = useState(new Set())
  const [limit, setLimit] = useState(5)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [saving, setSaving] = useState(false)

  async function fetchAll(p = null){
    setLoading(true)
    const usePage = p || page
    const res = await fetch(`/api/admin/feedback?limit=${limit}&page=${usePage}`)
    const j = await res.json()
    setFeedback(j.feedback || [])
    setTotal(j.total || 0)
    setLoading(false)
  }

  useEffect(() => {
    fetchAll()
    // fetch current limit from settings via admin endpoint
    ;(async ()=>{
      try {
        const sres = await fetch('/api/admin/feedback?settings=feedback_limit')
        if (sres.ok) {
          const sj = await sres.json()
          if (sj.value) setLimit(Number(sj.value) || 5)
        }
      } catch(e){ }
    })()
  }, [])

  function toggle(id){
    setSelected(prev => {
      const n = new Set(prev)
      if (n.has(id)) n.delete(id)
      else n.add(id)
      return n
    })
  }

  async function deleteSelected(){
    if (selected.size === 0) return
    if (!confirm('Xác nhận xóa các phản hồi đã chọn?')) return
    const ids = Array.from(selected)
    const res = await fetch('/api/admin/feedback', { method: 'DELETE', headers: { 'Content-Type':'application/json' }, body: JSON.stringify({ ids }) })
    if (res.ok) {
      setSelected(new Set())
      // refetch current page (if deletion made current page empty, move back one page)
      const remaining = total - Array.from(selected).length
      const maxPage = Math.max(1, Math.ceil(remaining / limit))
      const nextPage = page > maxPage ? maxPage : page
      setPage(nextPage)
      await fetchAll(nextPage)
    } else {
      alert('Lỗi khi xóa')
    }
  }

  async function saveLimit(){
    const v = Number(limit)
    if (isNaN(v) || v <= 0) return alert('Số không hợp lệ')
    setSaving(true)
    const res = await fetch('/api/admin/feedback', { method: 'PUT', headers: { 'Content-Type':'application/json' }, body: JSON.stringify({ key: 'feedback_limit', value: String(v) }) })
    setSaving(false)
    if (res.ok) {
      alert('Lưu thành công')
      // reset to first page with new limit
      setPage(1)
      await fetchAll(1)
    } else {
      alert('Lỗi khi lưu')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSideBar active="/admin/feedback" />
      <main className="flex-1 py-12 px-8">
        <h2 className="text-2xl font-playfair mb-6">Quản lý phản hồi</h2>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <label className="block text-sm text-gray-700 mb-2">Số đánh giá hiển thị trên trang chủ</label>
          <div className="flex items-center gap-3">
            <input type="number" value={limit} onChange={e => setLimit(Number(e.target.value))} className="border px-2 py-1 w-28" />
            <button onClick={saveLimit} disabled={saving} className="px-3 py-1 bg-mika-blue text-white rounded">{saving ? 'Đang lưu...' : 'Lưu'}</button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          {loading ? <div>Đang tải...</div> : (
            <div>
              <div className="mb-4 flex items-center justify-between">
                <div>{feedback.length} phản hồi (Tổng: {total})</div>
                <div>
                  <button onClick={deleteSelected} className="px-3 py-1 bg-red-600 text-white rounded">Xóa chọn</button>
                </div>
              </div>
              <div className="space-y-3">
                {feedback.map(f => (
                  <div key={f.id} className="border rounded p-3 flex items-start gap-4">
                    <input type="checkbox" checked={selected.has(f.id)} onChange={() => toggle(f.id)} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="font-semibold">{f.user_name} <span className="text-sm text-gray-400">({f.email})</span></div>
                        <div className="text-sm text-gray-500">{new Date(f.created_at).toLocaleString()}</div>
                      </div>
                      <div className="text-sm text-amber-500 mt-1">Rating: {f.rating}</div>
                      <div className="mt-2 text-gray-700">{f.message}</div>
                    </div>
                    <div>
                      <button onClick={async ()=>{
                        if (!confirm('Xác nhận xóa phản hồi này?')) return
                        const res = await fetch('/api/admin/feedback', { method: 'DELETE', headers: { 'Content-Type':'application/json' }, body: JSON.stringify({ ids: [f.id] }) })
                        if (res.ok) fetchAll()
                        else alert('Lỗi khi xóa')
                      }} className="text-red-600">Xóa</button>
                    </div>
                  </div>
                ))}
              </div>
              {/* pagination controls */}
              <div className="mt-4 flex items-center justify-center gap-3">
                <button className="px-3 py-1 border rounded" onClick={async ()=>{ if (page>1) { setPage(p=>p-1); await fetchAll() } }} disabled={page<=1}>‹ Prev</button>
                <div className="text-sm text-gray-600">Trang {page} / {Math.max(1, Math.ceil((total||0)/limit))}</div>
                <button className="px-3 py-1 border rounded" onClick={async ()=>{ if (page < Math.ceil((total||0)/limit)) { setPage(p=>p+1); await fetchAll() } }} disabled={page >= Math.ceil((total||0)/limit)}>Next ›</button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
