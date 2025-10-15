"use client";

import { Box, Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useMemo, useEffect, useRef, useState } from "react";
import { getEntityConfig } from "@/lib/entities";
import { useRouter } from "next/navigation";

type EntityDataGridProps = {
  entitySlug: string;
};

export function EntityDataGrid({ entitySlug }: EntityDataGridProps) {
  const mountedRef = useRef(true);
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  // Memoize config to prevent re-renders
  const config = useMemo(() => getEntityConfig(entitySlug), [entitySlug]);

  // Cleanup effect to prevent state updates after unmount
  useEffect(() => {
    mountedRef.current = true;
    // Đảm bảo component đã mount hoàn toàn trước khi đánh dấu ready
    // setTimeout để đảm bảo chạy sau khi render hoàn tất
    const timer = setTimeout(() => {
      if (mountedRef.current) {
        setIsReady(true);
      }
    }, 0);

    return () => {
      clearTimeout(timer);
      mountedRef.current = false;
      setIsReady(false);
    };
  }, []);

  if (!config) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error">Invalid entity: {entitySlug}</Typography>
      </Box>
    );
  }

  // Skip query hoàn toàn nếu component chưa sẵn sàng
  // Điều này đảm bảo RTK Query hooks không chạy quá sớm
  const result = config?.api?.useGetQuery(null, {
    skip: !isReady || !mountedRef.current,
  });

  // Memoize data để tránh re-render không cần thiết
  const data = useMemo(() => {
    if (!isReady || !result?.data) return [];
    return Array.isArray(result.data) ? result.data : [];
  }, [result?.data, isReady]);

  const columns = useMemo(() => {
    return config.getColumns({
      onEdit: (id: number | string) => router.push(`/dashboard/${config.slug}/edit/${id}`),
      onDelete: (id: number | string) => console.log("Delete", id),
    });
  }, [config]);

  // Memoize the DataGrid props to prevent unnecessary re-renders
  const dataGridProps = useMemo(
    () => ({
      rows: data,
      columns,
      loading: result?.isLoading,
      initialState: {
        pagination: {
          paginationModel: { pageSize: 10, page: 0 },
        },
      },
      pageSizeOptions: [5, 10, 25, 50],
    }),
    [data, columns, result?.isLoading]
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        {config.name} Management
      </Typography>
      <Box>
        <Button onClick={() => router.push(`/dashboard/${config.slug}/new`)}>
          Create {config.name}
        </Button>
      </Box>
      <DataGrid {...dataGridProps} />
    </Box>
  );
}
