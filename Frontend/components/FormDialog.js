import { Button,TextField,Dialog,DialogActions,
    DialogContent,DialogTitle
 } 
from '@mui/material'
import { useState } from 'react'
import CustomDatePicker from './CustomDatePicker';
import RenderInput from './RenderInput';

export default function FormDialog({inputConfig,dataValue,instance,refetch}) {
    const [open,setOpen] = useState(false);
    const [input,setinput] = useState(inputConfig||[]);
    const [data,setData] = useState(dataValue||{});
    const handleClick = () => {
        setOpen(!open);
    }

    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setData({...data,[name]:value})
    };

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
        {input.map((config) => (
          config.type === "date" ? (
          <CustomDatePicker
            key={config.key}
            label={config.label}
            name={config.key}
            date={data[config.key]}
            setDate={setData}
          />
          ) : (
          <TextField
            key={config.key}
            label={config.label}
            name={config.key}
            variant="outlined"
            margin="dense"
            value={data[config.key]}
            fullWidth
            type={config.type || "text"}
            onChange={handleInputChange}
          />
          )
        ))}
        <RenderInput inputConfig={input}/>
        </DialogContent>
        <DialogActions>
        <Button onClick={handleUpdate}>Lưu thay đổi</Button>
        </DialogActions>
      </Dialog>
      </div>
    );
}