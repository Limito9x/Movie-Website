"use client";
import { createTheme } from "@mui/material/styles";


const darkTheme = createTheme({
  typography: {
    fontFamily: "var(--font-roboto)",
  },
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",
    },
    secondary: {
      main: "#f48fb1",
    },
    background: {
      default: "#121212", // Màu nền mặc định cho dark mode
      paper: "#1e1e1e",
    },
    text: {
      primary: "#fff",
      secondary: "#e0e0e0",
    },
  },
});

export default darkTheme;