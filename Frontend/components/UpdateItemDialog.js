import { Button,TextField,Dialog,DialogActions,
    DialogContent,DialogTitle
 } 
from '@mui/material'
import { useState } from 'react'
import RenderInput from './RenderInput';

export default function UpdateItemDialog({inputConfig,dataValue,instance,refetch}) {
    const [open,setOpen] = useState(false);
    const [input,setinput] = useState(inputConfig||[]);
    const [data,setData] = useState(dataValue||{});
    const handleClick = () => {
        setOpen(!open);
    }

    const handleUpdate = async (event) => {
      event.preventDefault();
      try{
        const result = await instance.update(data.id, data);
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
        <RenderInput inputConfig={input} data={data} setData={setData}/>
        </DialogContent>
        <DialogActions>
        <Button onClick={handleUpdate}>Lưu thay đổi</Button>
        </DialogActions>
      </Dialog>
      </div>
    );
}