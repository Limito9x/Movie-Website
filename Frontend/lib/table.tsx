import type { GridColDef } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import dayjs from "dayjs";

// Movie interface to define the shape of movie data
interface Movie {
  id: number; // Adding id since it's likely needed for the grid
  title: string;
  description: string;
  releaseDate: string;
  isPublic: boolean;
  isPremium: boolean;
  isFake: boolean;
}

function Action({
  params,
  onEdit,
  onDelete,
}: {
  params: any;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}) {
  return (
    <Box>
      <Button
        onClick={() => {
          onEdit(params.row.id);
        }}
      >
        Chỉnh sửa
      </Button>
      <Button
        onClick={() => {
          onDelete(params.row.id);
        }}
      >
        Xoá
      </Button>
    </Box>
  );
}

export const movieColumns = ({
  onEdit,
  onDelete,
}: {
  onEdit: any;
  onDelete: any;
}): GridColDef[] => {
  return [
    { field: "title", headerName: "Tiêu đề", width: 250 },
    { field: "description", headerName: "Mô tả", width: 250 },
    {
      field: "releaseDate",
      headerName: "Ngày phát hành",
      width: 150,
      type: "date",
      valueGetter: (value) => {
        if (!value) return null;
        return dayjs(value).toDate();
      },
    },
    { field: "isPublic", headerName: "Công khai", width: 100 },
    { field: "isPremium", headerName: "Premium", width: 100 },
    { field: "isFake", headerName: "Giả mạo", width: 100 },
    {
      field: "actions",
      headerName: "Thao tác",
      width: 200,
      sortable: false,
      renderCell: (params) => (
        <Action params={params} onEdit={onEdit} onDelete={onDelete} />
      ),
    },
  ];
};
