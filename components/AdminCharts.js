import { useEffect, useRef, useState } from 'react'

export default function AdminCharts() {
  const visitsRef = useRef(null)
  const actionsRef = useRef(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let visitsChart = null
    let actionsChart = null

    async function loadAndRender() {
      try {
        const res = await fetch('/api/logs')
        const json = await res.json()

        const visits = json?.visits || []
        const cartStats = json?.cartStats || []

        // prepare visits data (chronological)
        const visitsByDay = Array.isArray(visits) ? visits.slice().reverse() : []
        const visitLabels = visitsByDay.map(v => v.day)
        const visitValues = visitsByDay.map(v => Number(v.visits || 0))

        // prepare actions pie (add_to_cart vs checkout)
        const actionMap = {}
        Array.isArray(cartStats) && cartStats.forEach(a => { actionMap[a.action] = Number(a.total || 0) })
        const actionLabels = Object.keys(actionMap)
        const actionValues = actionLabels.map(k => actionMap[k])

        // load Chart.js if needed
        if (!window.Chart) {
          await new Promise((resolve, reject) => {
            const s = document.createElement('script')
            s.src = 'https://cdn.jsdelivr.net/npm/chart.js'
            s.onload = resolve
            s.onerror = reject
            document.head.appendChild(s)
          })
        }

        // ensure canvases mounted
        if (!visitsRef.current || !actionsRef.current) {
          await new Promise(resolve => requestAnimationFrame(resolve))
        }

        if (!visitsRef.current || !actionsRef.current) {
          throw new Error('Canvas elements not found')
        }

        // destroy existing charts if any
        try {
          if (window.Chart && typeof window.Chart.getChart === 'function') {
            const existingV = window.Chart.getChart(visitsRef.current)
            if (existingV) existingV.destroy()
            const existingA = window.Chart.getChart(actionsRef.current)
            if (existingA) existingA.destroy()
          }
        } catch (e) {}

        const vCtx = visitsRef.current.getContext('2d')
        visitsChart = new window.Chart(vCtx, {
          type: 'line',
          data: {
            labels: visitLabels,
            datasets: [{
              label: 'Lượt truy cập (visits)',
              data: visitValues,
              borderColor: 'rgb(59 130 246)',
              backgroundColor: 'rgba(59,130,246,0.2)',
              fill: true,
            }]
          },
          options: { responsive: true, plugins: { legend: { display: true } }, scales: { y: { beginAtZero: true } } }
        })

        const aCtx = actionsRef.current.getContext('2d')
        actionsChart = new window.Chart(aCtx, {
          type: 'pie',
          data: {
            labels: actionLabels,
            datasets: [{ data: actionValues, backgroundColor: actionLabels.map((_, i) => `hsl(${(i*90)%360} 70% 50%)`) }]
          },
          options: { responsive: true, plugins: { legend: { position: 'right' } } }
        })

        setLoading(false)
      } catch (err) {
        console.error('Error rendering charts', err)
        setLoading(false)
      }
    }

    loadAndRender()

    return () => {
      try { if (visitsChart) visitsChart.destroy() } catch (e) {}
      try { if (actionsChart) actionsChart.destroy() } catch (e) {}
    }
  }, [])

  return (
    <div className="bg-white shadow rounded p-4">
      <h3 className="text-lg font-semibold mb-3">Thống kê truy cập & mua hàng</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="text-sm text-gray-600 mb-2">Lượt truy cập theo ngày (14 ngày)</div>
          <div className="w-full">
            <canvas ref={visitsRef} />
          </div>
        </div>

        <div>
          <div className="text-sm text-gray-600 mb-2">Tỷ lệ Thêm giỏ / Mua hàng</div>
          <div className="w-full">
            <canvas ref={actionsRef} />
          </div>
        </div>
      </div>
      {loading && <div className="text-sm text-gray-500 mt-2">Đang tải...</div>}
    </div>
  )
}
