import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useState,useRef, useEffect } from "react";
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
  const [imageName, setImageName] = useState("");
  const [videoName, setVideoName] = useState("");
  useEffect(() => {
    const fileInputs = inputConfig.filter((input) => input.type === "dropzone");
    if (fileInputs.length > 0) {
      setHasFile(true);
      fileInputs.forEach((fileInput) => {
      if (fileInput.fileType === "image") {
        setImageName(fileInput.name);
      }
      if (fileInput.fileType === "video") {
        setVideoName(fileInput.name);
      }
      console.log("File type:", fileInput.fileType);
      });
    }
  }, [inputConfig]);
  
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
          const { [imageName]: imageFile, [videoName]: videoFile, ...rest } = newData;
          console.log("rest", rest);
          console.log("imageFile", imageFile);
          console.log("videoFile", videoFile);
          const formData = createFormData(rest, videoFile, imageFile);
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
          inputConfig={inputConfig} 
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAdd}>Thêm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
