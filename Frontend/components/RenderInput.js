import { TextField, Input } from "@mui/material";
import CustomDatePicker from "./CustomDatePicker";
import { handleInputChange, handleFileChange } from "@/utils/formUtils";
import MenuItem from "@mui/material/MenuItem";
import React from "react";

const commonProps = {
  fullWidth: true,
  variant: "outlined",
  margin: "dense",
};

export default function RenderInput({ inputName, inputConfig, data, setData }) {
  console.log("Bắt đầu render", data);
  const handleFile = (event) => {
    const file = event.target.files[0];
    setData((prev) => ({
      ...prev,
      [props.name]: [file],
    }));
  };

  const handleChange = (event) => {
    if (event.target.name === "images") {
      handleFile(event);
    }
    handleInputChange(setData, event);
  };

  const inputComponents = {
    date: React.memo((props) => (
      <CustomDatePicker {...props} date={data[props.name]} setDate={setData} />
    )),
    file: React.memo((props) => {
      const { value, onChange, ...restProps } = props; // Exclude the value prop
      return (
        <Input
          onChange={(event) => {
            const file = event.target.files[0];
            setData((prev) => ({
              ...prev,
              [props.name]: [file],
            }));
          }}
          accept="image/*"
          type="file"
          {...restProps}
        ></Input>
      );
    }),
    sex: React.memo((props) => (
      <TextField {...props} select>
        <MenuItem value="false">Nam</MenuItem>
        <MenuItem value="true">Nữ</MenuItem>
      </TextField>
    )),
  };

  return inputConfig?.map((config) => {
    const InputComponent = inputComponents[config.type] || TextField;
    const inputProps = {
      ...commonProps,
      label: config.label,
      name: config.key,
      value: data[config.key] || "",
      onChange: handleChange,
    };
    return (
      <InputComponent key={`${config.key}_${inputName}`} {...inputProps} />
    );
  });
}
