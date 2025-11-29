import { Box, Pagination as MuiPagination, TextField } from "@mui/material";
import { useState } from "react";

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void; 
}

export default function Pagination({ page, totalPages, onChange }: PaginationProps) {
  const [num, setNum] = useState<number>(page);

  return (
    <Box display="flex" alignItems="center" gap={2}>
      <MuiPagination
        count={totalPages || 1}
        color="primary"
        page={num}
        onChange={(_, value) => onChange(value)}
      />
      <TextField
        type="number"
        value={num}
        onChange={(e) => {
          const val = e.target.value;
          // Chỉ nhận giá trị rỗng hoặc số nguyên dương
          if (
            (val === "" || /^[0-9]+$/.test(val)) &&
            Number(val) <= totalPages
          ) {
            setNum(val === "" ? 0 : Number(val));
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            const newPage = Number(num);
            if (newPage >= 1 && newPage <= totalPages) {
              onChange(newPage);
            }
          }
        }}
        sx={{
          "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
            {
              WebkitAppearance: "none",
              margin: 0,
            },
          "& input[type=number]": {
            MozAppearance: "textfield",
          },
        }}
        label="Go to page"
        size="small"
      />
    </Box>
  );
}
