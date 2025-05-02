import { useState } from "react";
import {
  TextField,
  Autocomplete,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ApiClient from "@/services/axios";
import AddItemDialog from "./AddItemDialog";

/**
 * @param {ApiClient} serviceType
 */

export default function CustomAutoComplete({
  serviceType,
  label,
  options,
  handleChange,
}) {
  const [optionVal, setOptionVal] = useState(options||[]);
  return (
    <div className="autoComplete">
      <Autocomplete
        multiple
        options={optionVal}
        getOptionLabel={(option) => option.name}
        onChange={handleChange}
        noOptionsText={`Không có ${label.toLowerCase()}`}
        renderInput={(params) => (
          <TextField {...params} label={label} variant="outlined" />
        )}
        sx={{ width: "350px" }}
      />
      <AddItemDialog label={label}/>
    </div>
  );
}
