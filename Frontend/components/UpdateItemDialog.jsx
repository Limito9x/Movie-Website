import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import DynamicForm from "./DynamicForm";
import { useForm, FormProvider } from "react-hook-form";
import { useEffect } from "react";
import { normalizeFormData } from "@/utils/formUtils";
import { useMutation, QueryClient } from "@tanstack/react-query";

export default function UpdateItemDialog({
  openState,
  handleClose,
  config,
  data,
  label,
}) {
  const methods = useForm();
  const queryClient = new QueryClient();
  const updateItem = useMutation({
    mutationFn: ({ id, data }) => config.api.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [config.name] });
      alert(`${config.name} updated successfully`);
    },
  });

  useEffect(() => {
    if (data) {
      methods.reset(data);
    }
  }, [data, methods]);

  const handleUpdate = async (formData) => {
    try {
      const normalizedData = normalizeFormData(formData);
      console.log("data", normalizedData);
      if (confirm("Xác nhận cập nhật dữ liệu?")) {
        updateItem.mutate(
          { id: data.id, data: normalizedData },
          {
            onSuccess: () => {
              alert("Cập nhật thành công!");
              handleClose();
            },
            onError: () => {
              alert("Cập nhật thất bại!");
            },
          }
        );
      }
    } catch (error) {
      console.log(error);
      alert("Cập nhật thất bại!");
    }
  };

  return (
    <FormProvider {...methods}>
      <Dialog scroll="paper" open={openState} onClose={handleClose}>
        <form onSubmit={methods.handleSubmit(handleUpdate)}>
          <DialogTitle>Cập nhật {label}</DialogTitle>
          <DialogContent>
            <DynamicForm
              control={methods.control}
              config={config.update || config.base}
              defaultValues={data}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Hủy</Button>
            <Button type="submit" variant="contained">
              Lưu thay đổi
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </FormProvider>
  );
}
