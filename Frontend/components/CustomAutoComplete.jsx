import { useState, useEffect } from "react";
import { TextField, Autocomplete, IconButton, Tooltip } from "@mui/material";
import DataManage from "./DataManage";
import { useApi } from "@/services/useApi";
import SettingsIcon from "@mui/icons-material/Settings";

export default function CustomAutoComplete({
  onChange,
  value,
  api,
  config,
  optionLabel,
  label,
}) {
  const addConfig = config.create ? config.create : config;
  const updateConfig = config.update ? config.update : config;
  const { data, refetch } = useApi(api, null);
  const [openMange, setOpenManage] = useState(false);
  const toggleManage = () => {
    setOpenManage(!openMange);
  };

  const [curVal, setCurVal] = useState([]);
  useEffect(() => {
    if (value && data) {
      const selected = data.filter((item) => value.includes(item.id));
      setCurVal(selected);
    }
  }, [data]);

  return (
    <div className="autoComplete flex items-center">
      <Autocomplete
        multiple
        options={(data || []).sort((a, b) =>
          a[optionLabel].localeCompare(b[optionLabel])
        )}
        value={curVal}
        getOptionLabel={(option) => option[optionLabel]}
        onChange={(event, newValues) => {
          setCurVal(newValues);
          onChange(newValues.map((value) => value.id));
        }}
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
        api={api}
        categoryName={label.toLowerCase()}
        data={data}
        addConfig={addConfig}
        updateConfig={updateConfig}
        atcRefetch={refetch}
      />
    </div>
  );
}
