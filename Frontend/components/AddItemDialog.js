import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useState,useRef, use } from "react";
import RenderInput from "./RenderInput";
import { createFormData } from "@/utils/formUtils";
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
  const [hasFile, setHasFile] = useState(false);
  const [open, setOpen] = useState(false);
  const [input, setinput] = useState(inputConfig || []);
  const [data, setData] = useState(() => {
    const initialData = {};
    inputConfig?.forEach((field) => {
      if (field.type === "file") {
        setHasFile(true);
      }
      initialData[field.key] = field.defaultValue || "";
    });
    return initialData;
  });
  const inputRef = useRef();

  const handleClick = () => {
    setOpen(!open);
  };

  const handleAdd = async (event) => {
    event.preventDefault();
    try {
      const newData = inputRef.current.getData();
      console.log("data", newData);
      if (!instance) return console.log("Instance chưa được khởi tạo");
      if (confirm("Xác nhận thêm dữ liệu?")) {
        let result = null;
        if (hasFile) {
          const {images,...rest} = newData;
          console.log("rest", rest);
          console.log("images", images);
          const formData = createFormData(rest, null, images);
          result = await instance.create(formData);
        } else {
          result = await instance.add(newData);
        }
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
          <RenderInput
          ref={inputRef} 
          inputConfig={input} 
          data={data} 
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAdd}>Thêm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
