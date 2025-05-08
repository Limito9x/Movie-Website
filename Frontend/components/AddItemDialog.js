import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useState } from "react";
import CustomDatePicker from "./CustomDatePicker";
import { handleInputChange, createFormData } from "@/utils/formUtils";
import AddIcon from "@mui/icons-material/Add";

/**
 * label: Tên của dialog
 * inputConfig: Cấu hình các trường dữ liệu
 * instance: Tham số truyền vào để gọi API
 * refetch: Hàm gọi lại để lấy dữ liệu mới
 *
 */



export default function AddItemDialog({
  label,
  inputConfig,
  instance,
  refetch,
}) {
  const title = `Thêm ${label.toLowerCase()}`;
  const [open, setOpen] = useState(false);
  const [input, setinput] = useState(inputConfig || []);
  const [data, setData] = useState({
    // Khởi tạo các giá trị mặc định cho các trường dữ liệu
    ...input.reduce((acc, config) => {
      acc[config.key] = config.defaultValue || "";
      return acc;
    }, {}),
  }); // Phần data khởi tạo để gửi lên server

  const handleClick = () => {
    setOpen(!open);
  };

  const handleChange = (event) => {
    handleInputChange(setData, event);
  };

  const handleAdd = async (event) => {
    event.preventDefault();
    try {
      if (!instance) return alert("Instance chưa được khởi tạo");
      if (confirm("Xác nhận thêm dữ liệu?")) {
        const result = await instance.add(data);
        console.log(result);
        if (result) {
          alert(result.message);
          handleClick();
          if (refetch) refetch();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Tooltip title={title}>
        <IconButton onClick={handleClick}>
          <AddIcon />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClick}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          {input.map((config) => {
            return config.type === "date" ? (
              <CustomDatePicker
                key={config.key}
                label={config.label}
                name={config.key}
                fullWidth
                setDate={(date) => setData({ ...data, [config.key]: date })}
              />
            ) : (
              <TextField
                key={config.key}
                label={config.label}
                name={config.key}
                variant="outlined"
                margin="dense"
                fullWidth
                type={config.type || "text"}
                onChange={handleChange}
              />
            );
          })}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAdd}>Thêm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
