import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useRef } from "react";
import RenderInput from "./RenderInput";
import RenderInput2 from "./RenderInput";
import { createFormData } from "@/utils/formUtils";

export default function UpdateItemDialog({
  openState,
  handleClose,
  inputConfig,
  dataValue,
  instance,
  refetch,
  label
}) {
  const inputRef = useRef();

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      const newData = inputRef.current.getData();
      console.log("Data to update: ",newData);
      // createFormData(newData);
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
        <DialogTitle>Cập nhật {label}</DialogTitle>
        <DialogContent>
          {/* <RenderInput ref={inputRef} inputConfig={inputConfig} data={dataValue} /> */}
          <RenderInput2
            ref={inputRef}
            formConfig={inputConfig}
            data={dataValue}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdate}>Lưu thay đổi</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
