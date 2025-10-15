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

export default function UpdateItemDialog({
  openState,
  handleClose,
  config,
  data,
  label,
}) {
  const methods = useForm();
  const [updateItem] = config.api.useUpdateMutation();

  useEffect(() => {
    if (data) {
      methods.reset(data);
    }
  }, [data, methods]);

  const handleUpdate = async (newData) => {
    try {
      // Normalize dữ liệu trước khi gửi
      const normalizedData = normalizeFormData(newData);
      console.log("Data to update: ", normalizedData);

      if (confirm("Xác nhận cập nhật dữ liệu?")) {
        const result = await updateItem({
          id: data.id,
          data: normalizedData,
        }).unwrap();
        alert(result.message || "Cập nhật thành công!");
        handleClose();
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
