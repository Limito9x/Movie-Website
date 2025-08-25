import { TextField,MenuItem } from "@mui/material";
import CustomDatePicker from "./CustomDatePicker";
import Dropzone from "./Dropzone";
import CustomAutoComplete from "./CustomAutoComplete";
import { handleInputChange } from "@/utils/formUtils";
import { useState, useEffect ,forwardRef, useImperativeHandle, useRef } from "react";
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
    const { value, name,onChange ,...restProps } = props;
    return (
      <Dropzone {...restProps} name={name} state={value} setState={onChange} />
    );
  },
  autoComplete: (props) => {
    return (
      <CustomAutoComplete
        {...props}
        initIds={props.value}
        handleChange={props.onChange}
        serviceType={props.instance}
        inputs={props.detailconfig}
      />
    );
  }
};

const RenderInput = forwardRef(({ inputConfig, data }, ref) => {
  const [localData, setLocalData] = useState(() => {
    // Logic khởi tạo ban đầu, chỉ chạy một lần
    const initialState = {};
    if (data) {
      // Trường hợp cập nhật: Khởi tạo với dữ liệu từ prop 'data'
      inputConfig.forEach((input) => {
        if (input.type === "autoComplete") {
          // Chuyển đổi dữ liệu từ mảng đối tượng thành mảng ID
          initialState[input.key] =
            data[input.name]?.map((item) => item.id) || [];
        } else {
          initialState[input.key] = data[input.name] || "";
        }
      });
    } else {
      // Trường hợp thêm mới: Khởi tạo với giá trị mặc định
      inputConfig?.forEach((config) => {
        initialState[config.key] = config.defaultValue || "";
      });
    }
    return initialState;
  });

  useImperativeHandle(ref, () => ({
    getData: () => {
      return localData;
    },
  }));

  const handleChange = (event, values, propName) => {
    handleInputChange(setLocalData, event, values, propName);
  };

  const handle = {
    text: handleChange,
    sex: handleChange,
    autoComplete: handleChange,
    date: setLocalData,
    dropzone: setLocalData,
  };

  return inputConfig?.map((config) => {
    const InputComponent = inputComponents[config.type] || TextField;
    const { key, type, defaultValue, ...restConfig } = config;
    const inputProps = {
      ...commonProps,
      ...restConfig,
      value: localData[key],
      onChange: handle[type] || handleChange,
    };
    return <InputComponent key={config.key} {...inputProps} />;
  });
});

export default RenderInput;
