import { useState, useRef } from "react";
import { useRouter } from "next/router";
import { useAlert } from "../context/AlertContext";
import { AlertType, MESSAGE } from "../constanst";
import { Eye, EyeOff } from "lucide-react";

export default function Register() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    address: "",
    phone: "",
    avatar: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const fileRef = useRef();
  const router = useRouter();
  const { showAlert } = useAlert();

  async function submit(e) {
    e.preventDefault();
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(form),
    });
    const j = await res.json();

    if (!res.ok) {
      showAlert(AlertType.ERROR, j.error || MESSAGE.REGISTER_FAILED);
      return;
    }

    showAlert(AlertType.SUCCESS, MESSAGE.REGISTER_SUCCESS);
    router.push("/login");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-img-1">
      <div className="bg-white backdrop-blur-md shadow-xl rounded-3xl px-10 py-10 w-full max-w-3xl border border-mika-blue-100">
        <h1 className="text-3xl font-bold text-center text-mika-blue mb-2">
          Tạo tài khoản 💫
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Cùng <span className="font-semibold text-mika-blue">Mika.wig</span>{" "}
          khám phá phong cách riêng của bạn!
        </p>

        <form onSubmit={submit} className="grid md:grid-cols-2 gap-8">
          {/* CỘT TRÁI */}
          <div className="space-y-5">
            <div className="flex flex-col items-center mb-4">
              <div className="relative">
                <div className="w-28 h-28 rounded-full overflow-hidden bg-gray-100 border shadow-inner">
                  {form.avatar ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={form.avatar}
                      alt="avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xl text-gray-400">
                      {form.name
                        ? form.name
                            .split(" ")
                            .map((s) => s[0])
                            .slice(-2)
                            .join("")
                        : "U"}
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => fileRef.current && fileRef.current.click()}
                  className="absolute bottom-1 right-1 bg-white border border-gray-200 rounded-full p-1 shadow hover:scale-105 transition"
                >
                  ✏️
                </button>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files && e.target.files[0];
                    if (!f) return;
                    const reader = new FileReader();
                    reader.onload = (ev) =>
                      setForm((prev) => ({
                        ...prev,
                        avatar: ev.target.result,
                      }));
                    reader.readAsDataURL(f);
                  }}
                />
              </div>
              <p className="text-sm text-gray-500 mt-2">Ảnh đại diện</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Họ và tên
              </label>
              <input
                className="w-full border border-gray-200 focus:border-mika-blue focus:ring focus:ring-mika-blue-100 px-4 py-2 rounded-lg outline-none transition-all"
                placeholder="Nhập tên của bạn"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Địa chỉ
              </label>
              <input
                className="w-full border border-gray-200 focus:border-mika-blue focus:ring focus:ring-mika-blue-100 px-4 py-2 rounded-lg outline-none transition-all"
                placeholder="Nhập địa chỉ"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Số điện thoại
              </label>
              <input
                className="w-full border border-gray-200 focus:border-mika-blue focus:ring focus:ring-mika-blue-100 px-4 py-2 rounded-lg outline-none transition-all"
                placeholder="Nhập số điện thoại"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>
          </div>

          {/* CỘT PHẢI */}
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                className="w-full border border-gray-200 focus:border-mika-blue focus:ring focus:ring-mika-blue-100 px-4 py-2 rounded-lg outline-none transition-all"
                placeholder="Nhập email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mật khẩu
              </label>
              <input
                type={showPassword ? "text" : "password"}
                className="w-full border border-gray-200 focus:border-mika-blue focus:ring focus:ring-mika-blue-100 px-4 py-2 rounded-lg outline-none transition-all"
                placeholder="Nhập mật khẩu"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
              {/* Nút hiển thị/ẩn mật khẩu */}
              <button
                type="button"
                className="absolute right-3 top-9 text-gray-500 hover:text-mika-blue"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="pt-6">
              <button
                type="submit"
                className="w-full bg-mika-blue text-white py-2.5 rounded-lg font-medium shadow hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
              >
                Đăng ký
              </button>
            </div>
          </div>
        </form>

        <div className="mt-6 text-sm text-center text-gray-600">
          Đã có tài khoản?{" "}
          <a
            href="/login"
            className="text-mika-blue font-medium hover:underline"
          >
            Đăng nhập ngay
          </a>
        </div>
      </div>
    </div>
  );
}
