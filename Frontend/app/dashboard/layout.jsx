"use client";
import {
  AppProvider,
  DashboardLayout as MUIDashboard,
  Crud,
} from "@toolpad/core";
import { Home } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import Link from "next/link";

function Header() {
  return (
    <IconButton color="inherit" LinkComponent={Link} href="/">
      <Home />
    </IconButton>
  );
}

export default function DashboardLayout({ children }) {
  return (
    <AppProvider theme={{ darkMode: true }}>
      <MUIDashboard
        slots={{
          toolbarActions: Header,
          appTitle: () => "Movie Web Dashboard",
        }}
        defaultSidebarCollapsed
      >
        <Box sx={{ mt: 3}}>{children}</Box>
      </MUIDashboard>
    </AppProvider>
  );
}
