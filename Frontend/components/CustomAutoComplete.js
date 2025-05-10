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
}) {
  const { data,refetch } = useApi(serviceType, null);
  const [value,setValue] = useState([])
  const handleAutoCompleteChange = (event, newValue) => {
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
          <TextField {...params} label={label} variant="outlined" />
        )}
        sx={{ width: "350px" }}
        disableCloseOnSelect // Keeps the dropdown open when selecting an option
      />
      <AddItemDialog name={name} instance={serviceType} refetch={refetch} inputConfig={inputs} label={label}/>
    </div>
  );
}
