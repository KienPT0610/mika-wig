import { useState } from "react";
import { useRouter } from "next/router";
import { useAlert } from "../context/AlertContext";
import { AlertType, MESSAGE } from "../constanst";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const { showAlert } = useAlert();
  const router = useRouter();
  const { redirect } = router.query;

  async function submit(e) {
    e.preventDefault();
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(form),
    });
    const j = await res.json();

    if (!res.ok) {
      showAlert(AlertType.ERROR, j.error || MESSAGE.LOGIN_FAILED);
      return;
    }

    // success
    showAlert(AlertType.SUCCESS, MESSAGE.LOGIN_SUCCESS);
    localStorage.setItem(
      "user",
      JSON.stringify({
        email: j.email,
        id: j.id,
        name: j.name,
        address: j.address,
        phone: j.phone,
        avatar: j.avatar,
      })
    );
    router.push(redirect || "/");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-img-1">
      <div className="bg-white backdrop-blur-md shadow-xl rounded-3xl px-10 py-12 w-full max-w-md border border-mika-blue-100">
        <h1 className="text-3xl font-bold text-center text-mika-blue mb-2">
          Chào mừng trở lại 💖
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Đăng nhập để tiếp tục hành trình cùng{" "}
          <span className="font-semibold text-mika-blue">Mika.wig</span>
        </p>

        <form onSubmit={submit} className="space-y-5">
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

          <button
            type="submit"
            className="w-full bg-mika-blue text-white py-2.5 rounded-lg font-medium shadow hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
          >
            Đăng nhập
          </button>
        </form>

        <div className="mt-6 text-sm text-center text-gray-600">
          Chưa có tài khoản?{" "}
          <a
            href="/register"
            className="text-mika-blue font-medium hover:underline"
          >
            Đăng ký ngay
          </a>
        </div>
      </div>
    </div>
  );
}
