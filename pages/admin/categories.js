import { useEffect, useState } from "react";
import AdminSideBar from "../../components/AdminSideBar";
import { useAlert } from "./../../context/AlertContext"
import { AlertType} from "../../constanst";
import PopupConfirm from "../../components/PopupConfirm";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const pageSize = 10
  const [form, setForm] = useState({ name: "", description: "" });
  const [editing, setEditing] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const { showAlert } = useAlert();

  useEffect(() => {
    fetchCategories();
  }, []);

  const filtered = categories.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const pageItems = filtered.slice((page-1)*pageSize, page*pageSize)

  const fetchCategories = async () => {
    const res = await fetch("/api/admin/categories");
    const data = await res.json();
    setCategories(data.categories || []);
  }

  const startAdd = () => {
    setEditing("new");
    setForm({ name: "", description: "" });
  };
    const startEdit = (category) => {
    setEditing(category);
    setForm({ name: category.name, description: category.description });
  }

  const saveCategory = async (e) => {
    e.preventDefault();
    const payload = { ...form };
    if( editing !== "new") {
      payload.id = editing.id;
    }
    const res = await fetch("/api/admin/categories", {
      method: editing === "new" ? "POST" : "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      setEditing(null);
      setForm({ name: "", description: "" });
      showAlert(AlertType.SUCCESS, "Lưu danh mục thành công");
      fetchCategories();
    } else {
      const data = await res.json();
      showAlert(AlertType.ERROR, data.error || "Lỗi không xác định");
    }
  };

  const deleteCategory = async (id) => {
    const res = await fetch(`/api/admin/categories`, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      showAlert(AlertType.SUCCESS, "Xóa danh mục thành công");
      fetchCategories();
    } else {
      const data = await res.json();
      showAlert(AlertType.ERROR, data.error || "Lỗi không xác định");
    }
    setShowConfirm(false);
    setCategoryToDelete(null);
  };

  return (
      <div className="min-h-screen bg-gray-50 flex">
        <AdminSideBar active="/admin/categories" />
        <main className="flex-1 py-12 px-8">
          <h2 className="text-2xl font-playfair mb-6">Quản lý danh mục</h2>
          <div className="flex items-center justify-between mb-4">
            <button
              className="bg-mika-blue text-white px-4 py-2 rounded"
              onClick={startAdd}
            >
              Thêm danh mục mới
            </button>
            <div className="flex items-center gap-4">
              <input value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} placeholder="Tìm kiếm danh mục..." className="border px-3 py-2 rounded" />
              <div className="text-sm text-gray-600">Tổng: {categories.length}</div>
            </div>
          </div>
          {/* Product list */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <table className="min-w-full border">
              <thead>
                <tr className="bg-mika-blue/10">
                  <th className="px-4 py-2 text-left">STT</th>
                  <th className="px-4 py-2 text-left">Tên</th>
                  <th className="px-4 py-2 text-left">Mô tả</th>
                  <th className="px-4 py-2 text-left">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-4 text-gray-400">
                      Không có danh mục nào
                    </td>
                  </tr>
                ) : (
                  pageItems.map((c) => (
                    <tr key={c.id} className="border-t">
                      <td className="px-4 py-2 font-semibold">{c.id}</td>
                      <td className="px-4 py-2">{c.name}</td>
                      <td className="px-4 py-2">{c.description}</td>
                      <td className="px-4 py-2">
                        <button
                          className="mr-2 px-3 py-1 bg-blue-500 text-white rounded"
                          onClick={() => startEdit(c)}
                        >
                          Sửa
                        </button>
                        <button
                          className="px-3 py-1 bg-red-500 text-white rounded"
                          onClick={() => { setShowConfirm(true); setCategoryToDelete(c.id); }}
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          {filtered.length > pageSize && (
            <div className="flex items-center justify-center gap-2 mt-4">
              <button className="px-3 py-1 border rounded" onClick={() => setPage(p => Math.max(1, p-1))} disabled={page===1}>Prev</button>
              {Array.from({length: totalPages}).map((_, i) => (
                <button key={i} className={`px-3 py-1 border rounded ${page===i+1? 'bg-mika-blue text-white':''}`} onClick={() => setPage(i+1)}>{i+1}</button>
              ))}
              <button className="px-3 py-1 border rounded" onClick={() => setPage(p => Math.min(totalPages, p+1))} disabled={page===totalPages}>Next</button>
            </div>
          )}
          {/* Add/Edit modal */}
          {editing && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
              <form
                className="bg-white rounded-lg shadow p-6 max-w-xl w-full relative"
                onSubmit={saveCategory}
              >
                <button
                  type="button"
                  className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl"
                  onClick={() => setEditing(null)}
                >
                  &times;
                </button>
                <h3 className="text-xl font-bold mb-4">
                  {editing === "new" ? "Thêm danh mục" : "Sửa danh mục"}
                </h3>
                <div className="mb-4">
                  <label className="block mb-1 font-semibold">Tên</label>
                  <input
                    type="text"
                    className="border border-gray-300 p-2 w-full rounded"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1 font-semibold">Mô tả</label>
                  <textarea
                    className="border border-gray-300 p-2 w-full rounded"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                  />
                </div>
                <div className="flex gap-4 mt-4">
                  <button
                    type="submit"
                    className="bg-mika-blue text-white px-4 py-2 rounded"
                  >
                    Lưu
                  </button>
                  <button
                    type="button"
                    className="bg-gray-300 px-4 py-2 rounded"
                    onClick={() => setEditing(null)}
                  >
                    Hủy
                  </button>
                </div>
              </form>
            </div>
          )}

          {showConfirm && (
            <PopupConfirm
              message="Bạn có chắc chắn muốn xóa danh mục này?"
              onConfirm={() => deleteCategory(categoryToDelete)}
              onCancel={() => setShowConfirm(false)}
            />
          )}
        </main>
      </div>
    )
}
