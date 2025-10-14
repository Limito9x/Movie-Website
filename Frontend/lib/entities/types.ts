import { GridColDef } from "@mui/x-data-grid";
import { createReduxApi } from "@/redux/api/reduxApi";

export type EntityConfig = {
    name: string;
    slug: string;
    getColumns: (actions: {
        onEdit: (id: number) => void;
        onDelete: (id: number) => void;
    }) => GridColDef[]
    api: {
        useGetQuery: ReturnType<typeof createReduxApi>["useGetQuery"];
        useCreateMutation: ReturnType<typeof createReduxApi>["useCreateMutation"];
        useUpdateMutation: ReturnType<typeof createReduxApi>["useUpdateMutation"];
        useDeleteMutation: ReturnType<typeof createReduxApi>["useDeleteMutation"];
    };
}