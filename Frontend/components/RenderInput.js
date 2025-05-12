import { TextField,MenuItem } from "@mui/material";
import CustomDatePicker from "./CustomDatePicker";
import Dropzone from "./Dropzone";
import { handleInputChange } from "@/utils/formUtils";
import { useState, forwardRef, useImperativeHandle } from "react";
import React from "react";

const commonProps = {
  fullWidth: true,
  variant: "outlined",
  margin: "dense",
};

const inputComponents = {
  date: (props) => {
    const { value,onChange, ...restProps } = props; // Exclude the value prop
    return (
      <CustomDatePicker
        {...restProps}
        date={value}
        setDate={onChange}
      />
    );
  },
  text: (props) => {
    return (
      <TextField
      {...props}
      />
    )
  },
  sex: (props) => {
    return (
      <TextField {...props} select>
        <MenuItem value="false">Nam</MenuItem>
        <MenuItem value="true">Nữ</MenuItem>
      </TextField>
    );
  },
  dropzone: (props) => {
    const { value, name,data,onChange ,...restProps } = props;
    return (
      <Dropzone {...restProps} name={name} state={value} setState={onChange} />
    );
  },
};

const RenderInput = forwardRef(({ inputConfig, data }, ref) => {
  const [localData, setLocalData] = useState(() => ({ ...data }||{}));
  useImperativeHandle(ref, () => ({
    getData: () => {
      return localData;
    },
  }));

  const handleChange = (event) => {
    handleInputChange(setLocalData,event);
  }

  const handle = {
    text: handleChange,
    sex: handleChange,
    date: setLocalData,
    dropzone: setLocalData,
  }

  return inputConfig?.map((config) => {
    const InputComponent = inputComponents[config.type] || TextField;
    const {key,type,defaultValue,...restConfig} = config;
    const inputProps = {
      ...commonProps,
      ...restConfig,
      value: localData[config.key] || "",
      data: localData,
      onChange: handle[config.type] || handleChange,
    };
    return <InputComponent key={config.key} {...inputProps} />;
  });
});

export default React.memo(RenderInput);
