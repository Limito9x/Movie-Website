import { Button,TextField,Dialog,DialogActions,
    DialogContent,DialogTitle
 } 
from '@mui/material'
import { useState } from 'react'
import CustomDatePicker from './CustomDatePicker';

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
        console.log(result)
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
            value={data[config.key]}
            fullWidth
            date={data[config.key]}
            setDate={(date) => setData({ ...data, [config.key]: date })}
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
        </DialogContent>
        <DialogActions>
        <Button onClick={handleUpdate}>Lưu thay đổi</Button>
        </DialogActions>
      </Dialog>
      </div>
    );
}