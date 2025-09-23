import { Box, Pagination, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function CustomPagination({ api, limit, onChange }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const [count, setCount] = useState(1);
  const [num, setNum] = useState(page);

  const fetchData = async () => {
    // Lấy tất cả params hiện tại
    const paramsObj = Object.fromEntries(searchParams.entries());
    paramsObj.page = page;
    paramsObj.limit = limit;
    const data = await api.getList(paramsObj);
    setCount(Math.ceil(data.total / limit));
    onChange(data.data);
    setNum(page);
  };

  useEffect(() => {
    fetchData();
  }, [searchParams]);

  const handleChangePage = (newPage) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage);
    router.push(`?${params.toString()}`);
  };

  return (
    <Box display="flex" alignItems="center" gap={2}>
      <Pagination
        count={count}
        color="primary"
        page={page}
        onChange={(event, value) => handleChangePage(value)}
      />
      <TextField
        type="text"
        value={num}
        onChange={(e) => {
          const val = e.target.value;
          // Chỉ nhận giá trị rỗng hoặc số nguyên dương
          if ((val === "" || /^[0-9]+$/.test(val)) && val <= count) {
            setNum(val);
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            const newPage = Number(num);
            if (num !== "" && newPage >= 1 && newPage <= count) {
              handleChangePage(newPage);
            }
          }
        }}
        label="Go to page"
        size="small"
        sx={{ width: 100 }}
      />
    </Box>
  );
}
// Movie list cần truyền vào 1 movies để hiển thị danh sách phim
// Để làm pagination động, sau khi thay đổi page thì cần push url với query page tương ứng
// Có thể sẽ cần truyền API để lấy dữ liệu theo page
// Chỉ push thêm query page, giữ nguyên các query khác nếu có
// Ví dụ: /videos?page=2
// Ví dụ: /videos?category=action&page=2
// Ví dụ: /videos?category=action&sort=asc&page=2
// Khi thay đổi page thì cần gọi API để lấy dữ liệu tương ứng với page đó
// Truyền dữ liệu ra component cha và truyền vào MovieList để hiển thị
// Giả sử /videos/search?query=avengers&page=2
// Pagination này tự động đọc các tham số từ URL
// Sử dụng API truyền vào để lấy dữ liệu bằng getList tương ứng với các tham số
// Khi thay đổi page thì push URL với query page tương ứng
// Ví dụ: /videos/search?query=avengers&page=3
// Như vậy mỗi khi cần tạo 1 page để hiển thị danh sách (không chỉ mỗi phim, có thể là danh sách người dùng, danh sách đơn hàng, v.v...)
// Pagination này có thể tái sử dụng được, truyền ngược lại dữ liệu cho component cha để hiển thị
