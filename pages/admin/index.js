import AdminSideBar from '../../components/AdminSideBar'
import dynamic from 'next/dynamic'

const AdminCharts = dynamic(() => import('../../components/AdminCharts'), { ssr: false })

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSideBar active="/admin" />
      <main className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          <AdminCharts />
        </div>
      </main>
    </div>
  )
}
