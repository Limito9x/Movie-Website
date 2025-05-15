import { Button,Dialog,DialogActions,
    DialogContent,DialogTitle
 } 
from '@mui/material'
import { useState,useRef,useEffect } from 'react'
import RenderInput from './RenderInput';

export default function UpdateItemDialog({inputConfig,dataValue,instance,refetch}) {
  const inputRef = useRef(); 
  let data = {};
  useEffect(() => {
    data.id = dataValue.id;
    inputConfig.forEach((input) => {
      if (input.type === "autoComplete") {
        data[input.key] = dataValue[input.name]?.map(item => item.id) || [];
      } else {
        data[input.key] = dataValue[input.name] || "";
      }
    });
  })
  const [open,setOpen] = useState(false);
    const handleClick = () => {
        setOpen(!open);
    }

    const handleUpdate = async (event) => {
      event.preventDefault();
      try{
        const newData = inputRef.current.getData();
        console.log(newData);
        let result = null;
        if(confirm("Xác nhận cập nhật dữ liệu?")){
          result = await instance.update(newData.id, newData);
        }
        if(result) {
          alert(result.message);
          handleClick();
          if(refetch) refetch();
        }
      }catch(error){
        console.log(error);
      }
    }

    return (
      <div>
      <Button variant="outlined" onClick={handleClick}>
        Cập nhật
      </Button>
      <Dialog open={open} onClose={handleClick}>
        <DialogTitle>Cập nhật</DialogTitle>
        <DialogContent>
        <RenderInput ref={inputRef} inputConfig={inputConfig} data={data}/>
        </DialogContent>
        <DialogActions>
        <Button onClick={handleUpdate}>Lưu thay đổi</Button>
        </DialogActions>
      </Dialog>
      </div>
    );
}