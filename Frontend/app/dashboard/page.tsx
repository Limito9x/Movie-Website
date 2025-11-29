import { redirect } from "next/navigation";

// Đây là Server Component mặc định (không có 'use client')
export default function DashboardPage() {
  // Hàm này sẽ chặn render và ném về trang mới ngay lập tức
  redirect("/dashboard/movie");
}
