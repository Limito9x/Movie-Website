import { Box, Pagination, TextField } from "@mui/material";
import { useEffect, useState } from "react";

export default function CustomPagination({ page, count, onChange }) {
  const [num, setNum] = useState(page || 1);

  useEffect(() => {
    setNum(page);
  }, [page]);

  return (
    <Box display="flex" alignItems="center" gap={2}>
      <Pagination
        count={count}
        color="primary"
        page={page}
        onChange={(event, value) => onChange(value)}
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
              onChange(newPage);
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
