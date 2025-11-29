"use client";
import { AppProvider, DashboardLayout as MUIDashboard, type Navigation } from "@toolpad/core";
import { Home } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material"; // Bỏ Typography nếu ko dùng
import Link from "next/link";
import { MovieFilter,  } from "@mui/icons-material";

const NAVIGATION: Navigation = [
  {
    segment: 'dashboard/movie',
    title: 'Phim',
    icon: <MovieFilter />,
  },
];

function Header() {
  return (
    <IconButton color="inherit" LinkComponent={Link} href="/">
      <Home />
    </IconButton>
  );
}

// KHAI BÁO THEME Ở NGOÀI (Static) để tránh re-render
const THEME = {
  darkMode: true,
};

// Hoặc nếu muốn dùng useMemo (nếu theme phụ thuộc state):
// const theme = useMemo(() => ({ darkMode: true }), []);

export default function DashboardLayout({ children }) {
  return (
    <AppProvider theme={THEME} navigation={NAVIGATION}>
      <MUIDashboard
        slots={{
          toolbarActions: Header,
          appTitle: () => "Movie Web Dashboard",
        }}
        defaultSidebarCollapsed
      >
        {/* Thêm padding/margin chuẩn để content không bị dính sát header */}
        <Box sx={{ mt: 2, p: 2 }}>{children}</Box>
      </MUIDashboard>
    </AppProvider>
  );
}
