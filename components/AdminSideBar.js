import {
  Dashboard,
  Category,
  Inventory,
  RateReview,
  ReceiptLong,
  Person,
  ConnectWithoutContact
} from '@mui/icons-material';
import { useRouter } from 'next/router';

export const nav = [
  { label: "Tổng quan", href: "/admin", icon: Dashboard },
  { label: "Quản lý sản phẩm", href: "/admin/products", icon: Inventory },
  { label: "Quản lý người dùng", href: "/admin/customers", icon: Person },
  { label: "Quản lý danh mục", href: "/admin/categories", icon: Category },
  { label: "Quản lý phản hồi", href: "/admin/feedback", icon: RateReview },
  { label: "Quản lý đơn hàng", href: "/admin/orders", icon: ReceiptLong },
  { label: "Thống kê hành động", href: "/admin/stats", icon: ConnectWithoutContact },
];

export default function AdminSideBar({ active }) {
  const router = useRouter();
  return (
    <aside className="w-64 bg-white shadow-lg flex flex-col py-8 px-4">
      <h1 className="text-2xl font-bold text-mika-blue mb-10 text-center">
        Mika Admin
      </h1>
      <nav className="flex flex-col gap-4">
        {nav.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={`px-4 py-2 rounded-lg hover:bg-mika-blue/10 text-mika-blue font-semibold transition ${
              active === item.href ? "bg-mika-blue/10" : ""
            }`}
          >
            {item.icon && <item.icon className="mr-2 w-5 h-5" />}
            {item.label}
          </a>
        ))}
      </nav>
      <div className="mt-auto pt-10">
        <button
          className="w-full bg-mika-blue text-white py-2 rounded-lg font-semibold shadow hover:bg-blue-400 transition"
          onClick={() => {
            localStorage.removeItem("admin");
            router.replace("/admin/login");
          }}
        >
          Đăng xuất
        </button>
      </div>
    </aside>
  );
}
