import axios from "axios";

// Hàm lấy token từ LocalStorage
// const getToken = () => localStorage.getItem("token");

const commonConfig = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

// Hàm tạo API client theo baseURL
export default (baseURL) => {
  const instance = axios.create({
    baseURL ,
    ...commonConfig,
  });

  // Tự động thêm token vào Header Authorization
//   instance.interceptors.request.use((config) => {
//     const token = getToken();
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   });

  return instance;
};
