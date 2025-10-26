import AdminSideBar from "../../components/AdminSideBar";


export default function ReviewsAdminPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSideBar active="/admin/reviews" />
      <main className="flex-1 py-12 px-8">
        <h2 className="text-2xl font-playfair mb-6">Quản lý đánh giá</h2>
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          {/* Content for managing reviews will go here */}
          <p>Chức năng quản lý đánh giá sẽ được phát triển sau.</p>
        </div>
      </main>
    </div>
  )
}