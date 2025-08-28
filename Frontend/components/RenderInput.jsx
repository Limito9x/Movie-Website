import { TextField, MenuItem } from "@mui/material";
import CustomDatePicker from "./CustomDatePicker";
import Dropzone from "./Dropzone";
import CustomAutoComplete from "./CustomAutoComplete";
import UpdateFile from "./UpdateFile";
import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import React from "react";

const commonProps = {
  fullWidth: true,
  variant: "outlined",
  margin: "dense",
};

const inputComponents = {
  date: (props) => {
    const { onChange, ...restProps } = props; // Exclude the value prop
    return (
      <CustomDatePicker
        {...restProps}
        onChange={(value) => onChange(value, restProps.name)}
      />
    );
  },
  text: (props) => {
    return (
      <TextField
        {...props}
        onChange={(event) =>
          props.onChange(event.target.value, event.target.name)
        }
      />
    );
  },
  sex: (props) => {
    return (
      <TextField
        {...props}
        onChange={(event) =>
          props.onChange(event.target.value, event.target.name)
        }
        select
      >
        <MenuItem value={"false"}>Nam</MenuItem>
        <MenuItem value={"true"}>Nữ</MenuItem>
      </TextField>
    );
  },
  dropzone: (props) => {
    const { value, onChange, ...restProps } = props;
    return (
      <Dropzone
        {...restProps}
        value={value}
        onChange={(values) => onChange(values, props.name)}
      />
    );
  },
  autoComplete: (props) => {
    return (
      <CustomAutoComplete
        {...props}
        ids={props.value}
        onChange={(values) => props.onChange(values, props.name)}
        serviceType={props.instance}
        inputs={props.detailconfig}
      />
    );
  },
  updateFile: (props) => {
    const { value, addImages ,onChange, detailconfig, ...restProps } = props;
    console.log(props.addImages)
    return (
      <UpdateFile
        items={value}
        addImages={addImages}
        onAdd={(value) => onChange(value, "addImages")}
        onDelete={(value) => onChange(value, "deleteIds")}
        {...restProps}
        {...detailconfig}
      ></UpdateFile>
    );
  },
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
        } else if (input.type === "sex") {
          initialState[input.key] = data[input.name] || "false";
        } else if (input.type === "fileInput") {
          initialState[input.key] = data[input.name] || [];
          initialState["addImages"] = [];
          initialState["deleteIds"] = [];
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

  const handleChange = (values, propName) => {
    setLocalData((prev) => ({
      ...prev,
      [propName]: values,
    }));
  };

  useEffect(() => {
    console.log(localData);
  }, [localData]);

  return inputConfig?.map((config) => {
    let extraProps = {};
    if (config.type === "updateFile") {
      extraProps = {
      addImages: localData["addImages"],
      deleteIds: localData["deleteIds"],
      };
    }
    const InputComponent = inputComponents[config.type] || TextField;
    const { key, type, defaultValue, ...restConfig } = config;
    const inputProps = {
      ...commonProps,
      ...restConfig,
      ...extraProps,
      value: localData[key],
      onChange: handleChange,
    };
    return <InputComponent key={config.key} {...inputProps} />;
  });
});

export default RenderInput;
