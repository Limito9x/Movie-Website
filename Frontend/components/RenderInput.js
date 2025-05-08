import { TextField,Input } from "@mui/material";
import dayjs from "dayjs";
import CustomDatePicker from "./CustomDatePicker";
import { handleInputChange } from "@/utils/formUtils";
import { useState } from "react";

const inputComponents = {
  text: (props) => <TextField {...props} />,
  date: (props) => <CustomDatePicker {...props} />,
  file: (props) => <Input type="file" {...props} />,
};

const commonProps = {
  text: {
    fullWidth: true,
    variant: "outlined",
    margin: "dense",
    required: true,
  },
  file: {
    fullWidth: true,
    variant: "outlined",
    margin: "dense",
    accept: "image/*",
  },
};

export default function RenderInput({inputConfig}) {
  const [data, setData] = useState({});
  const handleChange = (event) => {
    handleInputChange(setData, event);
  };

  return (
    <div className="flex flex-col gap-3">
      {inputConfig?.map((config) => {
    const InputComponent = inputComponents[config.type] || TextField;
    return (
      <InputComponent
        key={config.key}
        label={config.label}
        name={config.key}
        type={config.type || "text"}
        value={data[config.key] || ""}
        onChange={handleChange}
        {...commonProps[config.type]}
        {...(config.type === "date" && {
          value: data[config.key] ? dayjs(data[config.key]) : null,
          setDate: (date) => setData((prevData) => ({ ...prevData, [config.key]: date })),
        })}
      />
    );
  })}
    </div>
  );
  
}
