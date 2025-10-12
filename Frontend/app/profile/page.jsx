"use client";
import { Box, Typography } from "@mui/material";
import { useCookies } from "react-cookie";
export default function ProfilePage() {
    const [cookies] = useCookies(["token", "user"]);
  return (
    <Box sx={{ p: 2, display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
      <Typography variant="h4">Profile Page</Typography>
      <Typography variant="body1">Họ và tên: {cookies.user.name}</Typography>
    </Box>
  );
}
