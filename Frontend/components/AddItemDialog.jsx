"use client";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useState } from "react";
import DynamicForm from "./form/DynamicForm";
import AddIcon from "@mui/icons-material/Add";
import { useForm, FormProvider } from "react-hook-form";
import { normalizeFormData } from "@/utils/formUtils";

export default function AddItemDialog({ label, config }) {
  const title = `Thêm ${label.toLowerCase()}`;
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const methods = useForm();
  const [createItem] = config.api.useCreateMutation();

  const handleAdd = async (data) => {
    try {
      // Normalize dữ liệu trước khi gửi
      const normalizedData = normalizeFormData(data);
      console.log("data", normalizedData);

      if (confirm("Xác nhận thêm dữ liệu?")) {
        const result = await createItem(normalizedData).unwrap();
        alert(result.message || "Thêm thành công!");
        handleClick();
        methods.reset();
      }
    } catch (error) {
      console.log(error);
      alert("Thêm thất bại!");
    }
  };

  return (
    <>
      <Tooltip title={title}>
        <IconButton onClick={handleClick}>
          <AddIcon />
        </IconButton>
      </Tooltip>
      <FormProvider {...methods}>
        <Dialog open={open} onClose={handleClick}>
          <form onSubmit={methods.handleSubmit(handleAdd)}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
              <DynamicForm
                control={methods.control}
                config={config.create || config.base}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClick}>Hủy</Button>
              <Button type="submit" variant="contained">
                Thêm
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </FormProvider>
    </>
  );
}
