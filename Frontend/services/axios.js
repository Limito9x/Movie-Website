import axios from "axios";

// Hàm lấy token từ LocalStorage
// const getToken = () => localStorage.getItem("token");

const commonConfig = {
  headers: {
    Accept: "application/json",
  },
};
const apiURL = process.env.REACT_APP_API_BASE_URL || "http://localhost:3000";
// Hàm tạo API client theo baseURL
export default (endpoint) => {
  const instance = axios.create({
    baseURL: apiURL + endpoint,
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
