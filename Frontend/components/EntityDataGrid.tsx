"use client";

import { Box, Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useMemo } from "react";
import { getEntityConfig } from "@/lib/entities";
import { useRouter } from "next/navigation";

type EntityDataGridProps = {
  entitySlug: string;
};

export function EntityDataGrid({ entitySlug }: EntityDataGridProps) {
  // Lấy config trực tiếp trong Client Component
  const config = getEntityConfig(entitySlug);
  const router = useRouter();

  if (!config) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error">Invalid entity: {entitySlug}</Typography>
      </Box>
    );
  }

  const result = config.api.useGetQuery(null);
  const data = Array.isArray(result?.data) ? result.data : [];

  const columns = useMemo(() => {
    return config.getColumns({
      onEdit: (id: number | string) => console.log("Edit", id),
      onDelete: (id: number | string) => console.log("Delete", id),
    });
  }, [config]);

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
      <DataGrid
        rows={data}
        columns={columns}
        loading={result?.isLoading}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10, page: 0 },
          },
        }}
        pageSizeOptions={[5, 10, 25, 50]}
      />
    </Box>
  );
}
