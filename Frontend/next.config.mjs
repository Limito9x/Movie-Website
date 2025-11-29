/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config, context) => {
    // Chỉ áp dụng polling khi ở môi trường dev
    if (context.dev) {
      config.watchOptions = {
        poll: 300, // Giảm từ 1000 xuống 300ms (check nhanh hơn)
        aggregateTimeout: 50, // Delay build lại sau khi gõ xong (giảm xuống cho mượt)
        ignored: /node_modules/, // Bỏ qua node_modules để đỡ tốn CPU
      };
    }
    return config;
  },
};

export default nextConfig;
