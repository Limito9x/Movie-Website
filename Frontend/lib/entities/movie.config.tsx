import { EntityConfig } from "./types";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import movieApi from "@/services/movie.api";
import { movieConfig as movieFormConfig } from "./formConfig";
import dayjs from "dayjs";

function Action({
  params,
  onEdit,
  onDelete,
}: {
  params: GridRenderCellParams;
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

export const movieConfig: EntityConfig = {
  name: "movie",
  label: "Phim",
  permission: {
    create: true,
    read: true,
    update: true,
  },
  getColumns: (actions) => {
    const columns: GridColDef[] = [
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
          <Action params={params} onEdit={actions.onEdit} onDelete={actions.onDelete} />
        ),
      },
    ];
    return columns;
  },
  api: movieApi,
  formConfig: movieFormConfig,
};
