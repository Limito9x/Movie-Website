import { GridColDef } from "@mui/x-data-grid";
import ApiClient from "@/services/axios";
import { defineConfig } from "./formConfig";

export type EntityConfig = {
  name: string;
  label: string;
  permission: {
    create?: boolean;
    read?: boolean;
    update?: boolean;
  }
  getColumns: (actions: {
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
  }) => GridColDef[];
  api: ApiClient | any;
  formConfig: ReturnType<typeof defineConfig>;
};
