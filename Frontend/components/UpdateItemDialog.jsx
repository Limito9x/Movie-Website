import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useRef } from "react";
import RenderInput from "./RenderInput";

export default function UpdateItemDialog({
  openState,
  handleClose,
  inputConfig,
  dataValue,
  instance,
  refetch,
}) {
  const inputRef = useRef();

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      const newData = inputRef.current.getData();
      let result = null;
      if (confirm("Xác nhận cập nhật dữ liệu?")) {
        result = await instance.update(dataValue.id, newData);
      }
      if (result) {
        alert(result.message);
        if (refetch) refetch();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {/* {updateButton&&<Button variant="outlined" onClick={handleClick}>
        Cập nhật
      </Button>} */}
      <Dialog scroll="paper" open={openState} onClose={handleClose}>
        <DialogTitle>Cập nhật</DialogTitle>
        <DialogContent>
          <RenderInput ref={inputRef} inputConfig={inputConfig} data={dataValue} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdate}>Lưu thay đổi</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
