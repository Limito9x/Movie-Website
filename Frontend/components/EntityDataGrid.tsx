"use client";

import { DataGrid, type GridPaginationModel } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { EntityConfig } from "@/lib/entities/types";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import { viVN } from "@mui/x-data-grid/locales";
import SearchBar from "./SearchBar";
import { useCallback, useMemo } from "react";

interface EntityDataGridProps {
  config: EntityConfig;
}

const DEFAULT_PAGE_SIZE = 10;

export default function EntityDataGrid({ config }: EntityDataGridProps) {
  const router = useRouter(); // Chỉ dùng 1 biến router
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  if (!config) {
    return <div>Entity config not found</div>;
  }

  // --- 1. Xử lý fallback an toàn cho params để tránh NaN ---
  const search = searchParams.get("search") || "";
  // Nếu parse lỗi thì về 1
  const pageParam = parseInt(searchParams.get("page") || "1", 10);
  const page = isNaN(pageParam) ? 1 : pageParam;

  const limitParam = parseInt(
    searchParams.get("limit") || `${DEFAULT_PAGE_SIZE}`,
    10
  );
  const limit = isNaN(limitParam) ? DEFAULT_PAGE_SIZE : limitParam;

  const { data, isLoading, error } = useQuery({
    queryKey: [config.name, search, page, limit],
    queryFn: async () =>
      await config.api.getList({
        query: search,
        page,
        limit,
      }),
    placeholderData: keepPreviousData,
  });

  if (error) {
    return <div>Lỗi tải dữ liệu: {(error as Error).message}</div>;
  }

  // Nếu đang loading lần đầu (chưa có data cũ), rowCount sẽ là 0
  const rowCount = data?.total || 0;

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => await config.api.delete(id),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: [config.name, search, page, limit],
      });
      alert(response?.message || "Xóa thành công");
    },
    onError: (error) => {
      console.error("Delete mutation error:", error);
    },
  });

  // --- 2. Logic Pagination an toàn ---
  const handlePaginationChange = (model: GridPaginationModel) => {
    // QUAN TRỌNG: Nếu đang loading, DataGrid có thể tự reset page về 0 vì rowCount=0.
    // Chúng ta phải chặn việc update URL trong trường hợp này để tránh lỗi "update during render".
    if (isLoading && rowCount === 0) return;

    const newPage = model.page + 1;
    const newLimit = model.pageSize;

    // Chỉ push nếu giá trị thực sự thay đổi để tránh vòng lặp
    if (newPage === page && newLimit === limit) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    params.set("limit", newLimit.toString());
    router.push(`/dashboard/${config.name}?${params.toString()}`);
  };

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const handleSearch = (query: string) => {
    // Chỉ search nếu query khác hiện tại
    if (query === search) return;

    const queryString = createQueryString("search", query);
    // Khi search mới, nên reset về trang 1
    const params = new URLSearchParams(queryString);
    params.set("page", "1");

    router.push(`/dashboard/${config.name}?${params.toString()}`);
  };

  const onDelete = useCallback(
    (item: any) => {
      if (
        confirm(`Bạn có chắc muốn xóa ${config.label.toLowerCase()} này không?`)
      ) {
        deleteMutation.mutate(item.id);
      }
    },
    [config.label, deleteMutation]
  );

  const memoizedColumns = useMemo(
    () =>
      config.getColumns({
        onEdit: (value) => {
          router.push(`/dashboard/${config.name}/${value}/edit`);
        },
        onDelete,
      }),
    [config, onDelete, router] // Đã sửa dependency thành router
  );

  return (
    <Box>
      <Box
        mb={2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <SearchBar onSearch={(query) => handleSearch(query)} />
        <Box sx={{ display: "flex", gap: 2 }}>
          {config.permission?.create && (
            <Button
              variant="contained"
              color="primary"
              component={Link}
              href={`/dashboard/${config.name}/new`}
            >
              + Thêm mới
            </Button>
          )}
        </Box>
      </Box>

      <DataGrid
        getRowId={(row) => row.id}
        rows={data?.data || []}
        columns={memoizedColumns}
        loading={isLoading}
        paginationModel={{
          page: page - 1 < 0 ? 0 : page - 1, // Đảm bảo không âm
          pageSize: limit,
        }}
        paginationMode="server"
        rowCount={rowCount}
        pageSizeOptions={[10, 25, 50]}
        onPaginationModelChange={handlePaginationChange}
        disableRowSelectionOnClick
        localeText={viVN.components.MuiDataGrid.defaultProps.localeText}
      />
    </Box>
  );
}
