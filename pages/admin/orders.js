import AdminSideBar from "../../components/AdminSideBar";


export default function OrdersAdminPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSideBar active="/admin/orders" />
      <main className="flex-1 py-12 px-8">
        <h2 className="text-2xl font-playfair mb-6">Quản lý đơn hàng</h2>
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          {/* Content for managing orders will go here */}
          <p>Chức năng quản lý đơn hàng sẽ được phát triển sau.</p>
        </div>
      </main>
    </div>
  )
}