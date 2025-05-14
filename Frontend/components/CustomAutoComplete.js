import { useState } from "react";
import {
  TextField,
  Autocomplete,
} from "@mui/material";
import ApiClient from "@/services/axios";
import AddItemDialog from "./AddItemDialog";
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
  initValue,
}) {
  const { data,refetch } = useApi(serviceType, null);
  const [value,setValue] = useState(initValue||[])
  const handleAutoCompleteChange = (event, newValue) => {
    console.log("newValue", newValue);
    setValue(newValue);
    handleChange(event, newValue, name);
  };
  return (
    <div className="autoComplete">
      <Autocomplete
        multiple
        options={data || []}
        value={value}
        getOptionLabel={(option) => option.name}
        onChange={handleAutoCompleteChange}
        noOptionsText={`Không tìm thấy ${label.toLowerCase()}`}
        renderInput={(params) => (
          <TextField {...params} label={label} variant="outlined" margin="dense"/>
        )}
        sx={{ width: "350px" }}
        disableCloseOnSelect // Keeps the dropdown open when selecting an option
      />
      <AddItemDialog instance={serviceType} refetch={refetch} inputConfig={inputs} label={label}/>
    </div>
  );
}
