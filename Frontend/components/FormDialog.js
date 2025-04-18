import { Button,TextField,Dialog,DialogActions,
    DialogContent,DialogContentText,DialogTitle
 } 
from '@mui/material'
import { useState } from 'react'
export default function FormDialog({inputConfig}) {
    const [open,setOpen] = useState(false);
    const [input,setinput] = useState(inputConfig||[]);

    const handleClick = () => {
        setOpen(!open);
    }

    const handleInputChange = (event) => {
      const { name, value } = event.target;
    };

    return (
      <div>
        <Button variant="outlined" onClick={handleClick}>
          Cập nhật
        </Button>
        <Dialog open={open} onClose={handleClick}>
          <DialogTitle>Cập nhật</DialogTitle>
          <DialogContent>
            {input.map((config) => (
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
            ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClick}>Lưu thay đổi</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
}