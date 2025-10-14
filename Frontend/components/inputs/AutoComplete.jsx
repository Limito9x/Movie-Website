"use client";
import { TextField, Autocomplete, IconButton, Tooltip } from "@mui/material";
import DataManage from "@/components/DataManage";
import SettingsIcon from "@mui/icons-material/Settings";
import { useState, useEffect } from "react";

export default function CustomAutoComplete({
  onChange,
  value = [], // Mặc định là mảng rỗng, value luôn là mảng ID
  config,
  labelKey,
  label,
}) {
  const [openManage, setOpenManage] = useState(false);
  const { data = [] } = config.api.useGetQuery();

  // Sort options theo label
  const sortedOptions = [...data].sort(
    (a, b) => a[labelKey]?.localeCompare(b[labelKey]) || 0
  );

  // Chuyển đổi từ mảng ID sang mảng object để hiển thị trong Autocomplete
  const selectedObjects = data.filter((item) => value.includes(item.id));

  const toggleManage = () => {
    setOpenManage(!openManage);
  };

  return (
    <div className="autoComplete flex w-full items-center">
      <Autocomplete
        multiple
        options={sortedOptions}
        value={selectedObjects}
        getOptionLabel={(option) => option[labelKey] || ""}
        onChange={(event, newValues) => {
          // Luôn trả về mảng ID cho form
          const newIds = newValues.map((item) => item.id);
          onChange(newIds);
        }}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        noOptionsText={`Không tìm thấy ${label.toLowerCase()}`}
        disableCloseOnSelect
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
        open={openManage}
        onClose={toggleManage}
        config={config}
        label={label}
        data={data}
      />
    </div>
  );
}
