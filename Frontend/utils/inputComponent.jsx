import { TextField, MenuItem } from "@mui/material";
import CustomDatePicker from "@/components/CustomDatePicker";
import CustomAutoComplete from "@/components/CustomAutoComplete";
import Dropzone from "@/components/Dropzone";
import UpdateFile from "@/components/UpdateFile";

// Các hàm này tạo ra các đối tượng cấu hình input.
// ---
export const text = {
  name: "text",
  initValue: "",
  render: (props) => {
    const { onChange, ...restProp } = props;
    return (
      <TextField
        {...restProp}
        onChange={(event) => onChange(event.target.value, props.propname)}
      />
    );
  },
};

export const option = (value, label) => {
  return { value, label };
};

export const select = (range) => {
  return {
    name: "select",
    initValue: "",
    render: (props) => {
      const { onChange, ...restProp } = props;
      const value = props.value !== undefined ? props.value : "";
      return range ? (
        <TextField
          {...restProp}
          select
          value={value}
          defaultValue={""}
          onChange={(event) => onChange(event.target.value, props.propname)}
        >
          {range.map((option) => (
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
  };
};

export const date = {
  name: "date",
  initValue: "",
  render: (props) => {
    const { onChange, ...restProps } = props;
    return (
      <CustomDatePicker
        {...restProps}
        onChange={(value) => onChange(value, props.propname)}
      />
    );
  },
};

// Hàm lấy tên thuộc tính nhãn (label prop name)
const getOptionLabel = (config) => {
  if (config.create) return config.create[0].key;
  if (config.update) return config.update[0].key;
  // Trường hợp không có create/update, lấy key đầu tiên từ mảng base
  return config[0] ? config[0].key : "name";
};

export const atc = (api, detailConfig) => {
  const optionLabel = getOptionLabel(detailConfig);
  return {
    name: "autoComplete",
    api,
    initValue: [],
    render: (props) => {
      const { onChange, ...restProp } = props;
      return (
        <CustomAutoComplete
          {...restProp}
          api={api}
          optionLabel={optionLabel}
          config={detailConfig}
          onChange={(values) => props.onChange(values, props.propname)}
        />
      );
    },
  };
};

export const dropzone = (maxFiles, fileType,purpose) => ({
  name: "dropzone",
  render: (props) => {
    const { onChange, ...restProps } = props;
    return (
      <Dropzone
        {...restProps}
        maxFiles={maxFiles}
        fileType={fileType}
        purpose={purpose}
        onChange={(values) => onChange(values, props.propname)}
      />
    );
  },
});

export const updateFile = (maxFiles, fileType, urlName, publicIdName) => {
  const typeName = fileType.charAt(0).toUpperCase() + fileType.slice(1).toLowerCase();
  const addPropname = `new${typeName}s`;
  const delPropname = `del${typeName}s`;
  return {
    name: "updateFile",
    render: (props) => {
      const { value, onChange, ...restProps } = props;
      return (
        <UpdateFile
          {...restProps}
          items={value}
          maxFiles={maxFiles}
          fileType={fileType}
          urlName={urlName}
          publicIdName={publicIdName}
          onAdd={(value) => onChange(value, addPropname)}
          onDelete={(value) => onChange(value, delPropname)}
        ></UpdateFile>
      );
    },
  };
};
