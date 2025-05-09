import { TextField,Input } from "@mui/material";
import CustomDatePicker from "./CustomDatePicker";
import { handleInputChange } from "@/utils/formUtils";
import { useState } from "react";

const inputComponents = {
  text: (props) => <TextField {...props} />,
  date: (props) => <CustomDatePicker {...props} />,
  file: (props) => <Input type="file" {...props} />,
};

const commonProps = {
    fullWidth: true,
    variant: "outlined",
    margin: "dense",
};

export default function RenderInput({inputConfig}) {
  const [data, setData] = useState({});
  const handleChange = (event) => {
    handleInputChange(setData, event);
  };

  return (
    <div className="">
      {inputConfig?.map((config) => {
    const InputComponent = inputComponents[config.type] || TextField;
    const inputProps = {
      ...commonProps,
      label: config.label,
      name: config.key,
      type: config.type || "text",
      value: data[config.key] || "",
      onChange: handleChange,
      ...(config.type === "date" && {
        date: data[config.key],
        setDate: setData,
      }),
    };
    return <InputComponent key={config.key} {...inputProps}/>;
  })}
    </div>
  );
  
}
