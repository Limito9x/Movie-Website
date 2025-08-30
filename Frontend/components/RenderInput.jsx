import { TextField, MenuItem } from "@mui/material";
import CustomDatePicker from "./CustomDatePicker";
import Dropzone from "./Dropzone";
import CustomAutoComplete from "./CustomAutoComplete";
import UpdateFile from "./UpdateFile";
import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import React from "react";

const layoutProps = {
  fullWidth: true,
  variant: "outlined",
  margin: "dense",
};

const inputComponents = {
  text: (props) => {
        const { onChange, ...restProp } = props;
    return (
      <TextField
        {...restProp}
        onChange={(event) =>
          onChange(event.target.value, props.propname)
        }
      />
    );
  },
  select: (props) => {
    const { input, onChange, ...restProp } = props;
    const value = props.value !== undefined ? props.value : "";
    return input.range ? (
      <TextField
        {...restProp}
        select
        value={value}
        defaultValue={""}
        onChange={(event) =>
          onChange(event.target.value, props.propname)
        }
      >
        {input.range.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    ) : (
      <TextField {...props} disabled select>
        <MenuItem>Không có giá trị nào được thiếp lập</MenuItem>
      </TextField>
    );
  },
  date: (props) => {
    const { onChange, ...restProps } = props;
    return (
      <CustomDatePicker
        {...restProps}
        onChange={(value) => onChange(value, restProps.propname)}
      />
    );
  },
  autoComplete: (props) => {
    const {input, ...restProp} = props;
    return (
      <CustomAutoComplete
        {...props}
        api={input.api}
        optionLabel={input.optionLabel}
        config={input.detailConfig}
        onChange={(values) => props.onChange(values, props.propname)}
      />
    );
  },
  dropzone: (props) => {
    const { onChange,input ,...restProps } = props;
    return (
      <Dropzone
        {...restProps}
        {...input}
        onChange={(values) => onChange(values, props.propname)}
      />
    );
  },
  updateFile: (props) => {
    const { value, input, onChange, ...restProps } = props;
    return (
      <UpdateFile
        {...restProps}
        {...input}
        items={value}
        onAdd={(value) => onChange(value, input.addPropname)}
        onDelete={(value) => onChange(value, input.delPropname)}
      ></UpdateFile>
    );
  },
};

const RenderInput = forwardRef(({ formConfig, data }, ref) => {
    const [localData, setLocalData] = useState(() => {
    // Logic khởi tạo ban đầu, chỉ chạy một lần
    const initialState = {};
    if (data) {
      // Trường hợp cập nhật: Khởi tạo với dữ liệu từ prop 'data'
      formConfig.forEach((attr) => {
        initialState[attr.key] = data[attr.key];
      });
    } else {
      // Trường hợp thêm mới: Khởi tạo với giá trị mặc định
      formConfig?.forEach((attr) => {
        initialState[attr.key] = attr.input.initValue;
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

  return formConfig?.map((attr) => {
    const InputComponent = inputComponents[attr.input.name];
    const { key, ...restConfig } = attr;
    const inputProps = {
      ...layoutProps,
      ...restConfig,
      propname: key,
      value: localData[key],
      onChange: handleChange,
    };
    return <InputComponent key={attr.key} {...inputProps} />;
  });
});

export default RenderInput;
