import { Button,TextField,Dialog,DialogActions,
    DialogContent,DialogTitle,IconButton,Tooltip
 } 
from '@mui/material'
import { useState } from 'react'
import CustomDatePicker from './CustomDatePicker';
import AddIcon from "@mui/icons-material/Add";

export default function AddItemDialog({label,inputConfig,instance,refetch}) {
    const title = `Thêm ${label.toLowerCase()}`;
    const [open,setOpen] = useState(false);
    const [input,setinput] = useState(inputConfig||[]);
    const [data,setData] = useState({});
    const handleClick = () => {
        setOpen(!open);
    }

    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setData({...data,[name]:value})
      console.log(data);
    };

    const handleAdd = async (event) => {
      event.preventDefault();
      try{
        if(!instance) return alert("Instance chưa được khởi tạo");
        const result = await instance.add(data);
        console.log(result)
        if(result) {
          alert(result.message);
          handleClick();
          if(refetch) refetch();
        }
        alert(`${title} thành công`);
      }catch(error){
        console.log(error);
      }
    }

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
        {input.map((config) => (
          config.type === "date" ? (
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
            onChange={handleInputChange}
          />
          )
        ))}
        </DialogContent>
        <DialogActions>
        <Button onClick={handleAdd}>Thêm</Button>
        </DialogActions>
      </Dialog>
      </div>
    );
}