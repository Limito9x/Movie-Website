import { useState, useEffect, useRef } from "react";
import { TextField, Autocomplete, IconButton, Tooltip } from "@mui/material";
import ApiClient from "@/services/axios";
import DataManage from "./DataManage";
import { useApi } from "@/services/useApi";
import SettingsIcon from "@mui/icons-material/Settings";
/**
 * @param {ApiClient} serviceType
 */

export default function CustomAutoComplete({
  serviceType,
  label,
  onChange,
  ids,
  inputs,
}) {
  const optionlabel = inputs[0].key;
  const { data, refetch } = useApi(serviceType, null);
  const [openMange, setOpenManage] = useState(false);
  const toggleManage = () => {
    setOpenManage(!openMange);
  };

  const [value, setValue] = useState([]);
  useEffect(() => {
    if (data) setValue(data.filter((item) => ids.includes(item.id)));
  }, [ids, data]);

  return (
    <div className="autoComplete flex items-center">
      <Autocomplete
        multiple
        options={(data || []).sort((a, b) =>
          a[optionlabel].localeCompare(b[optionlabel])
        )}
        value={value}
        getOptionLabel={(option) => option[optionlabel]}
        onChange={(event, newValues) =>
          onChange(newValues.map((value) => value.id))
        }
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
        sx={{ width: "100%" }}
      />
      <Tooltip title={`Quản lý ${label.toLowerCase()}`}>
        <IconButton onClick={toggleManage}>
          <SettingsIcon />
        </IconButton>
      </Tooltip>
      <DataManage
        open={openMange}
        onClose={toggleManage}
        categoryName={label.toLowerCase()}
        api={serviceType}
        addConfig={inputs}
        updateConfig={inputs}
        atcRefetch={refetch}
      />
    </div>
  );
}
