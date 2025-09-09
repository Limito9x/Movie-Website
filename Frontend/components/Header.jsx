"use client";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
export default function Header() {
  const pathname = usePathname();
  const showHeader = pathname !== "/login";
  if (!showHeader) return null;
  return (
    <header>
      <div className="flex justify-between items-center p-4">
        <Image
          className="invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <Link href="/login">Đăng nhập</Link>
      </div>
      <nav className="flex w-max mx-auto gap-4">
        <Link href="/">Trang chủ</Link>
        <Link href="/actors">Diễn viên</Link>
        <Link href="/uploads">Uploads</Link>
      </nav>
    </header>
  );
}
