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
  Tooltip,
  Divider,
} from "@mui/material";
import { Menu, Home, Movie, Person, CloudUpload ,Dashboard } from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import SearchBar from "@/components/SearchBar";

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

  // Define paths where header should be hidden
  const noHeaderPaths = ["/login"];
  
  // Check if current path is dashboard or any of its subpaths
  const isDashboardPath = pathname === "/dashboard" || pathname.startsWith("/dashboard/");
  
  // Combine both conditions for header visibility check
  if (noHeaderPaths.includes(pathname) || isDashboardPath) {
    return null;
  }

  // Đừng render Header nếu đang ở trang /login
  if (noHeaderPaths.includes(pathname)) {
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
    { title: "Trang chủ", path: "/", icon: <Home /> },
    { title: "Phim", path: "/videos", icon: <Movie /> },
    { title: "Diễn viên", path: "/actors", icon: <Person /> },
    { title: "Uploads", path: "/uploads", icon: <CloudUpload /> },
    { title: "Dashboard", path: "/dashboard", icon: <Dashboard /> },
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
            gap: { xs: 1, lg: "auto" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 1, lg: 5 },
            }}
          >
            <IconButton
              sx={{ display: { xs: "block", lg: "none" } }}
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <Menu />
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
                <Divider />
                <Box sx={{ p: 2, display: { xs: "block", sm: "none" } }}>
                  {cookies.token ? (
                    <div>
                      <Button
                        onClick={handleLogout}
                        variant="contained"
                        color="primary"
                      >
                        Đăng xuất
                      </Button>
                    </div>
                  ) : (
                    <Link href="/login" passHref>
                      <Button variant="contained">
                        Đăng nhập
                      </Button>
                    </Link>
                  )}
                </Box>
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
            <Box
              component="nav"
              sx={{ display: { xs: "none", lg: "flex" }, gap: 2 }}
            >
              {navLinks.map((link) => (
                <Link key={link.path} href={link.path}>
                  {link.title}
                </Link>
              ))}
            </Box>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <SearchBar
              onSearch={async (query) => {
                if (!query || query.trim() === "") {
                  return;
                }
                router.push(`/videos/search?query=${encodeURIComponent(query)}`);
              }}
            />
            {user && (
              <Tooltip title={`${user.name}`}>
                <IconButton href="/profile" color="inherit">
                  <AccountCircleIcon sx={{ fontSize: 40 }} />
                </IconButton>
              </Tooltip>
            )}
            <Box display={{ xs: "none", sm: "block" }}>
              {cookies.token ? (
                <Button
                  onClick={handleLogout}
                  variant="contained"
                  color="primary"
                >
                  Đăng xuất
                </Button>
              ) : (
                <Link href="/login" passHref>
                  <Button variant="contained">
                    Đăng nhập
                  </Button>
                </Link>
              )}
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar sx={{ mb: 5 }} />
    </Box>
  );
}
