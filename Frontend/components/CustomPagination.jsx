import { Box, Pagination, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";

export default function CustomPagination({ api, limit, onChange }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = useSelector((state) => state.page);
  const dispatch = useDispatch();
  dispatch({ type: "setPage", payload: searchParams.get("page") || 1 });
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
