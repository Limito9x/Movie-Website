"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@mui/material";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Header() {
  const [cookies, setCookie, removeCookie] = useCookies(["token", "user"]);
  const pathname = usePathname();
  const router = useRouter();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  // Đừng render Header nếu đang ở trang /login
  if (pathname === "/login") {
    return null;
  }

  const handleLogout = () => {
    removeCookie("token", { path: "/" });
    removeCookie("user", { path: "/" });
    // ✅ Chuyển hướng về trang chủ sau khi đăng xuất
    router.push("/");
  };

  // Tránh lỗi khi không có cookie user
  const user = cookies.user;

  return (
    <header className="mb-3">
      <div className="flex justify-between items-center p-4">
        <Image
          className="invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        {cookies.token ? (
          <div className="flex items-center gap-4">
            {/* ✅ Kiểm tra user trước khi truy cập .name */}
            {user ? <div>Xin chào {user.name}</div> : <div>Xin chào</div>}
            <Button onClick={handleLogout} variant="contained" color="primary">
              Đăng xuất
            </Button>
          </div>
        ) : (
          // ✅ Sử dụng component Link hoặc truyền component vào Button
          <Link href="/login" passHref>
            <Button variant="contained">Đăng nhập</Button>
          </Link>
        )}
      </div>
      <nav className="flex w-max mx-auto gap-4">
        <Link href="/">Trang chủ</Link>
        <Link href="/actors">Diễn viên</Link>
        <Link href="/uploads">Uploads</Link>
      </nav>
    </header>
  );
}
