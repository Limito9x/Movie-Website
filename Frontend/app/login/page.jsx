"use client";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import { decode } from "jsonwebtoken";
import authApi from "@/services/auth.api";
import RenderInput from "@/components/RenderInput";
import { registerConfig } from "@/utils/inputConfig";
import userApi from "@/services/user.api";

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
          width: "100%",
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
          width: "100%",
        }}
      />
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Đăng nhập
      </Button>
    </form>
  );
}

function RegisterBox() {

  const ref = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = ref.current.getData();
      const response = await userApi.create(formData);
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
        width: "100%",
      }}
    >
      <Typography
        variant="h4"
        color="#fff"
        fontWeight="bold"
        textAlign="center"
      >
        Đăng ký
      </Typography>
      <RenderInput formConfig={registerConfig} ref={ref} />
      <Button type="submit" variant="contained" color="primary">
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
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        minHeight: "900px",
        width: "100vw",
        backgroundColor: "#5f5f5fff",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "80%",
          maxWidth: 950,
          height: "65%",
          boxShadow: 15,
          borderRadius: 4,
          overflow: "hidden",
          backgroundColor: "#242424",
        }}
      >
        <Box
          sx={{
            flex: 1,
            minHeight: 400,
            backgroundImage: 'url("/loginBg.webp")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: { xs: "none", sm: "none", md: "block" },
          }}
        ></Box>
        <Box
          sx={{
            display: "flex",
            width: { xs: "100%", sm: "100%", md: 350, lg: 400 },
            alignItems: "center",
            flexDirection: "column",
            position: "relative",
            height: "100%", // Sử dụng hết chiều cao còn lại của Box cha
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: 400,
              p: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flex: 1, // Chiếm hết phần còn lại
              flexDirection: "column",
              height: "100%", // Đảm bảo chiếm hết chiều cao
            }}
          >
            {isLogin ? <LoginBox /> : <RegisterBox />}
          </Box>
          <Box sx={{ width: "100%", position: "absolute", bottom: 0, height: 50 }}>
            <Button fullWidth onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "Tạo tài khoản" : "Đến đăng nhập"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
