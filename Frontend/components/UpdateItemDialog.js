import { Button,TextField,Dialog,DialogActions,
    DialogContent,DialogTitle
 } 
from '@mui/material'
import { useState,useRef } from 'react'
import RenderInput from './RenderInput';

export default function UpdateItemDialog({inputConfig,dataValue,instance,refetch}) {
  const inputRef = useRef();  
  const [open,setOpen] = useState(false);
    const [input,setinput] = useState(inputConfig||[]);
    const [data,setData] = useState(dataValue||{});
    const handleClick = () => {
        setOpen(!open);
    }

    const handleUpdate = async (event) => {
      event.preventDefault();
      try{
        const newData = inputRef.current.getData();
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
        <RenderInput ref={inputRef} inputConfig={input} data={data}/>
        </DialogContent>
        <DialogActions>
        <Button onClick={handleUpdate}>Lưu thay đổi</Button>
        </DialogActions>
      </Dialog>
      </div>
    );
}