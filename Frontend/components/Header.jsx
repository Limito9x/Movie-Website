"use client";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Header() {
  const [openDrawer, setDrawer] = useState(false);
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawer(open);
  };
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

  const navLinks = [
    { title: "Trang chủ", path: "/", icon: <HomeIcon /> },
    { title: "Diễn viên", path: "/actors", icon: <PersonIcon /> },
    { title: "Uploads", path: "/uploads", icon: <CloudUploadIcon /> },
  ];

  return (
    <Box>
      <AppBar
        sx={{
          position: "fixed",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton
              sx={{ display: { xs: "block", md: "none" } }}
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Drawer open={openDrawer} onClose={toggleDrawer(false)}>
              <Box sx={{ width: 250 }} role="presentation">
                <List>
                  {navLinks.map((link) => (
                    <ListItem key={link.path} disablePadding>
                      <ListItemButton
                        onClick={toggleDrawer(false)}
                        component={Link}
                        href={link.path}
                      >
                        <ListItemIcon>{link.icon}</ListItemIcon>
                        <ListItemText primary={link.title} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Drawer>
            <Link href="/">
              <Image
                className="invert"
                src="/next.svg"
                alt="Next.js logo"
                width={180}
                height={37}
              />
            </Link>
          </Box>
          <Box
            component="nav"
            sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}
          >
            {navLinks.map((link) => (
              <Link key={link.path} href={link.path}>
                {link.title}
              </Link>
            ))}
          </Box>
          <Box>
            {cookies.token ? (
              <div className="flex items-center gap-4">
                {/* ✅ Kiểm tra user trước khi truy cập .name */}
                {user ? <div>Xin chào {user.name}</div> : <div>Xin chào</div>}
                <Button
                  onClick={handleLogout}
                  variant="contained"
                  color="primary"
                >
                  Đăng xuất
                </Button>
              </div>
            ) : (
              // ✅ Sử dụng component Link hoặc truyền component vào Button
              <Link href="/login" passHref legacyBehavior>
                <Button variant="contained" component="a">
                  Đăng nhập
                </Button>
              </Link>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar sx={{ mb: 5 }} />
    </Box>
  );
}
