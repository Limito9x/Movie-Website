"use client";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import { decode } from "jsonwebtoken";
import authApi from "@/services/auth.api";
import RenderInput from "@/components/RenderInput";
import { registerConfig } from "@/utils/inputConfig";

function LoginBox() {
    const router = useRouter();
    const [loginForm, setLoginForm] = useState({
      loginName: "",
      password: "",
    });
    const [cookies, setCookie] = useCookies(["token", "user"]);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setLoginForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await authApi.login(loginForm);
        console.log("Login successful:", response);
        if (response.token) {
          const decodedToken = decode(response.token);
          console.log("Decoded Token:", decodedToken);
          const expiresAt = new Date(decodedToken.exp * 1000); // JWT exp là UNIX timestamp (giây), Date cần miligiây
          setCookie("token", response.token, { path: "/", expires: expiresAt });
          setCookie("user", JSON.stringify(decodedToken), {
            path: "/",
            expires: expiresAt,
          });
        }
        router.push("/");
      } catch (error) {
        console.error("Login failed:", error);
      }
    };
  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Typography
        variant="h4"
        color="#fff"
        fontWeight="bold"
        textAlign="center"
        marginBottom={2}
      >
        Đăng nhập
      </Typography>

      <TextField
        name="loginName"
        required
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
          width: "80%",
        }}
      />
      <TextField
        name="password"
        required
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
          width: "80%",
        }}
      />
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Đăng nhập
      </Button>
    </form>
  );
}

function RegisterBox() {

  const [cookies, setCookie] = useCookies(["token", "user"]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Register successful:", response);
    } catch (error) {
      console.error("Register failed:", error);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        alignItems: "center",
        justifyContent: "center",
        width: "80%",
      }}
    >
      <Typography
        variant="h4"
        color="#fff"
        fontWeight="bold"
        textAlign="center"
        marginBottom={2}
      >
        Đăng ký
      </Typography>
      <RenderInput formConfig={registerConfig} />
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Đăng ký
      </Button>
    </form>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);

  const [cookies, setCookie] = useCookies(["token","user"]);


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
          maxWidth: 950, // Chiều rộng tối đa
          height: "60vh",
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
            display: "flex",
            width: { xs: "100%", sm: 350 }, // Chiều rộng linh hoạt
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          {isLogin?<LoginBox></LoginBox>:<RegisterBox></RegisterBox>}
          <Button onClick={() => setIsLogin(!isLogin)}>{isLogin?"Tạo tài khoản":"Đăng nhập"}</Button>
        </Box>
      </Box>
    </Box>
  );
}
