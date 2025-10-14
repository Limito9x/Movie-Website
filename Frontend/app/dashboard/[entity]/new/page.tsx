"use client";
import DynamicForm from "@/components/form/DynamicForm";
import { movieConfig } from "@/components/form/formConfig";
import { Box } from "@mui/material";
import { useForm } from "react-hook-form";

export default function UpdateEntityPage() {
  const { handleSubmit, control } = useForm();
  return (
    <Box sx={{ p: 3 }}>
      <DynamicForm config={movieConfig.create} control={control} />
    </Box>
  );
}