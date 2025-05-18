import { useState, useEffect } from "react";
import {
  TextField,
  Autocomplete,
  Menu,
  MenuItem,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import ApiClient from "@/services/axios";
import AddItemDialog from "./AddItemDialog";
import UpdateItemDialog from "./UpdateItemDialog";
import { useApi } from "@/services/useApi";
/**
 * @param {ApiClient} serviceType
 */

export default function CustomAutoComplete({
  serviceType,
  name,
  label,
  handleChange,
  inputs,
  initIds,
}) {
  const optionlabel = inputs[0].key;
  const { data, refetch } = useApi(serviceType, null);
  const [value, setValue] = useState([]);

  let initValue = [];
  useEffect(() => {
    if (initIds) {
      initValue = data?.filter((item) => initIds.includes(item.id)) || [];
      setValue(initValue);
    }
  }, [data, initIds]);

  const handleAutoCompleteChange = (event, newValue) => {
    setValue(newValue);
    handleChange(event, newValue, name);
  };

  //Menu
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [openDialog,setOpenDialog] = useState(false);

  const handleClickMenu = (event, item) => {
    event.stopPropagation();
    const target = event.currentTarget;
    console.log(target);
    setTimeout(() => {
      setMenuAnchor(target);
      setSelectedItem(item);
    }, 0);
  };

  const handleCloseMenu = () => {
    setMenuAnchor(null);
    setSelectedItem(null);
  };

  return (
    <div className="autoComplete">
      <Autocomplete
        multiple
        options={(data || []).sort((a, b) =>
          a[optionlabel].localeCompare(b[optionlabel])
        )}
        value={value}
        getOptionLabel={(option) => option[optionlabel]}
        onChange={handleAutoCompleteChange}
        noOptionsText={`Không tìm thấy ${label.toLowerCase()}`}
        disableCloseOnSelect // Keeps the dropdown open when selecting an option
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            variant="outlined"
            margin="dense"
          />
        )}
        renderOption={(props, option) => (
          <ListItem
            {...props}
            key={option.id}
            secondaryAction={
              <div>
                <IconButton
                  edge="end"
                  onClick={(e) => handleClickMenu(e, option)}
                >
                  <MoreVert />
                </IconButton>
              </div>
            }
          >
            <ListItemText primary={option[optionlabel]} />
          </ListItem>
        )}
        sx={{ width: "350px" }}
      />
      <AddItemDialog
        instance={serviceType}
        refetch={refetch}
        inputConfig={inputs}
        label={label}
      />
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={() => setOpenDialog(true)}>Chỉnh sửa</MenuItem>
        <MenuItem>Xóa</MenuItem>
      </Menu>
      <UpdateItemDialog
        openState={openDialog}
        handleClose={() => setOpenDialog(false)}
        dataValue={selectedItem}
        inputConfig={inputs}
        instance={serviceType}
        refetch={refetch}
      />
    </div>
  );
}
