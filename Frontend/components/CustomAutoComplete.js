import { useState, useEffect, useRef } from "react";
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

  return (
    <div className="autoComplete flex items-center">
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
        sx={{ width: "350px" }}
      />
      <AddItemDialog
        instance={serviceType}
        refetch={refetch}
        inputConfig={inputs}
        label={label}
      />
    </div>
  );
}
