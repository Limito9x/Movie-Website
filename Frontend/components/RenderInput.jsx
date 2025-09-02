import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import React from "react";

const layoutProps = {
  fullWidth: true,
  variant: "outlined",
  margin: "dense",
};

const RenderInput = forwardRef(({ formConfig, data }, ref) => {
  const [localData, setLocalData] = useState(() => {
    // Logic khởi tạo ban đầu, chỉ chạy một lần
    const initialState = {};
    if (data) {
      // Trường hợp cập nhật: Khởi tạo với dữ liệu từ prop 'data'
      formConfig.forEach((attr) => {
        if(attr.input.name==="autoComplete") {
          initialState[attr.key] = data[attr.key].map(item=>item.id);
        }
        else initialState[attr.key] = data[attr.key];
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

  return formConfig?.map((attr) => {
    const {key,input,...restConfig} = attr;
    const InputComponent = input.render;
    const inputProps = {
      ...layoutProps,
      ...restConfig,
      value: localData[key],
      onChange: handleChange,
    };
    return <InputComponent key={attr.key} {...inputProps} />;
  });
});

export default RenderInput;
