export default function PopupConfirm({ message, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg">
        <p className="mb-4">{message}</p>
        <div className="flex justify-end">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded mr-2"
            onClick={onConfirm}
          >
            Xóa
          </button>
          <button
            className="bg-gray-300 px-4 py-2 rounded"
            onClick={onCancel}
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
}
