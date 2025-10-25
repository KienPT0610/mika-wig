import AdminSideBar from '../../components/AdminSideBar'

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSideBar active="/admin" />
    </div>
  )
}
