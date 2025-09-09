"use client";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
import authApi from "@/services/auth.api";

export default function LoginPage() {
  const router = useRouter();
  const [loginForm, setLoginForm] = useState({
    loginName: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authApi.login(loginForm);
      console.log("Login successful:", response);
      router.push("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center", // Canh giữa theo chiều ngang
        alignItems: "center", // Canh giữa theo chiều dọc
        minHeight: "100vh", // Chiều cao tối thiểu 100% của viewport
        backgroundColor: "#5f5f5fff", // Màu nền tổng thể
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "80%", // Giới hạn chiều rộng tổng thể của card
          maxWidth: 900, // Chiều rộng tối đa
          boxShadow: 15,
          borderRadius: 4,
          overflow: "hidden", // Quan trọng để bo tròn góc
          backgroundColor: "#242424", // Màu nền form
        }}
      >
        <Box
          sx={{
            flex: 1,
            minHeight: 400,
            backgroundImage: 'url("/loginBg.webp")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: { xs: "none", sm: "block" },
          }}
        ></Box>
        <Box
          sx={{
            flexShrink: 0, // Ngăn form co lại
            width: { xs: "100%", sm: 350 }, // Chiều rộng linh hoạt
            alignItems: "center",
          }}
        >
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <Typography
              variant="h4"
              color="#fff"
              fontWeight="bold"
              textAlign="center"
            >
              Đăng nhập
            </Typography>

            <TextField
              name="loginName"
              onChange={handleChange}
              label="Tên đăng nhập hoặc email"
              variant="outlined"
              margin="normal"
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#333",
                  "& fieldset": {
                    borderColor: "#555",
                  },
                  "&:hover fieldset": {
                    borderColor: "primary.main",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "primary.main",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#ccc",
                },
                "& .MuiInputBase-input": {
                  color: "#eee",
                },
              }}
            />
            <TextField
              name="password"
              onChange={handleChange}
              label="Mật khẩu"
              type="password"
              variant="outlined"
              margin="normal"
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#333",
                  "& fieldset": {
                    borderColor: "#555",
                  },
                  "&:hover fieldset": {
                    borderColor: "primary.main",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "primary.main",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#ccc",
                },
                "& .MuiInputBase-input": {
                  color: "#eee",
                },
              }}
            />
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
              Đăng nhập
            </Button>
          </form>
        </Box>
      </Box>
    </Box>
  );
}
