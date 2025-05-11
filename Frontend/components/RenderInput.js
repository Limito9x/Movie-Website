import { TextField, Input,MenuItem } from "@mui/material";
import CustomDatePicker from "./CustomDatePicker";
import Dropzone from "./Dropzone";
import { handleInputChange, handleFileChange } from "@/utils/formUtils";
import { useState, forwardRef, useImperativeHandle } from "react";

const commonProps = {
  fullWidth: true,
  variant: "outlined",
  margin: "dense",
};

const RenderInput = forwardRef(({ inputConfig, data }, ref) => {
  const [localData, setLocalData] = useState(() => ({ ...data }));
  useImperativeHandle(ref, () => ({
    getData: () => {
      return localData;
    },
  }));

  const handleFile = (newVal) => {
    setLocalData((prev) => ({
      ...prev,
      images: [newVal],
    }));
  };

  const handleChange = (event) => {
    if (event.target.name === "images") {
      handleFile(event);
    } else handleInputChange(setLocalData, event);
  };

  const inputComponents = {
    date: (props) => {
      const { value ,onChange, ...restProps } = props; // Exclude the value prop
      return (
        <CustomDatePicker
          {...restProps}
          date={localData[props.name]}
          setDate={setLocalData}
        />
      );
    },
    file: (props) => {
      const { value, ...restProps } = {...props}; // Exclude the value prop
      const combineProps = {
        ...restProps,
        accept: "image/*",
        type: "file",
      };
      console.log(combineProps);
      return <Input {...combineProps}></Input>;
    },
    sex: (props) => (
      <TextField {...props} select>
        <MenuItem value="false">Nam</MenuItem>
        <MenuItem value="true">Nữ</MenuItem>
      </TextField>
    ),
    dropzone: (props) => {
      const { value, ...restProps } = props;
      console.log(value);
      return <Dropzone {...restProps} state={value} setState={setLocalData} />;
    },
  };

  return inputConfig?.map((config) => {
    const InputComponent = inputComponents[config.type] || TextField;
    const inputProps = {
      ...commonProps,
      label: config.label,
      name: config.key,
      value: localData[config.key] || "",
      onChange: handleChange,
    };
    return <InputComponent key={config.key} {...inputProps} />;
  });
});

export default RenderInput;
