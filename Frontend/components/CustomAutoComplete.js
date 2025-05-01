import { useState } from "react";
import {
  TextField,
  Button,
  Autocomplete,
  Tooltip,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ApiClient from "@/services/axios";
import CustomDatePicker from "@/components/CustomDatePicker";
/**
 * @param {ApiClient} serviceType
 */

export default function CustomAutoComplete({
  serviceType,
  label,
  optionVal,
  handleChange,
}) {
    const [actorData, setActorData] = useState({
        name: "",
        sex: "",
        dateOfBirth: "",
      });

    const [open,setOpen] = useState(false);
        const handleClick = () => {
            setOpen(!open);
        }
    
        const handleInputChange = (event) => {
          const { name, value } = event.target;
          setData({...data,[name]:value})
        };
    
        const handleAdd = async (event) => {
          event.preventDefault();
          try{
            alert("Thêm thành công")
            }
          catch(error){
            console.log(error);
          }
        }
  return (
    <div className="autoComplete">
      <Autocomplete
        multiple
        options={optionVal}
        getOptionLabel={(option) => option.name}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField {...params} label={label} variant="outlined" />
        )}
        sx={{ width: "350px" }}
      />
      <Tooltip title={`Thêm ${label.toLowerCase()} `}>
        <IconButton color="primary" aria-label="add" onClick={handleClick}>
          <AddIcon />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClick}>
        <DialogTitle>Thêm {label.toLowerCase()}</DialogTitle>
        <DialogContent>
          <TextField
            label="Tên diễn viên"
            variant="outlined"
            name="name"
            value={actorData.name}
            onChange={handleInputChange}
            required
          />
          <TextField
            select
            name="sex"
            label="Giới tính"
            variant="outlined"
            value={actorData.sex}
            onChange={handleInputChange}
          >
            <MenuItem value={false}>Nam</MenuItem>
            <MenuItem value={true}>Nữ</MenuItem>
          </TextField>
          <CustomDatePicker
            date={actorData.dateOfBirth}
            setDate={(newDate) =>
              setActorData((prev) => ({ ...prev, dateOfBirth: newDate }))
            }
            label="Ngày sinh"
          ></CustomDatePicker>
          Ảnh đại diện:
          <input
            type="file"
            name="images"
            accept="image/*"
            onChange={(event) => {
              setImageFile([event.target.files[0]]);
            }}
          ></input>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAdd}>Thêm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
