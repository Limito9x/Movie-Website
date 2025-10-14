import { TextField, MenuItem } from "@mui/material";
import CustomDatePicker from "./DatePicker";
import CustomAutoComplete from "./AutoComplete";
import Dropzone from "@/components/inputs/Dropzone";
import UpdateFile from "@/components/inputs/UpdateFile";
import { useFormContext } from "react-hook-form";

// Các hàm này tạo ra các đối tượng cấu hình input.
// ---
export const text = (type = "text") => {
  return {
    name: "text",
    initValue: "",
    render: (props) => {
      const { onChange, ...restProps } = props;
      return (
        <TextField
          {...restProps}
          type={type}
          onChange={(event) => onChange(event.target.value)}
        />
      );
    },
  };
};

export const option = (value, label) => {
  return { value, label };
};

export const select = (range) => {
  return {
    name: "select",
    initValue: "",
    render: (props) => {
      const { onChange, value, ...restProp } = props;
      const safeValue = value !== undefined && value !== null ? value : "";
      return range ? (
        <TextField
          {...restProp}
          select
          value={safeValue}
          onChange={(event) => onChange(event.target.value)}
        >
          {range.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      ) : (
        <TextField {...restProp} disabled select value="">
          <MenuItem value="">Không có giá trị nào được thiết lập</MenuItem>
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
      <CustomDatePicker {...restProps} onChange={(value) => onChange(value)} />
    );
  },
};

export const atc = (detailConfig, labelKey) => {
  return {
    name: "autoComplete",
    initValue: [],
    transform: (value) => {
      // Luôn trả về mảng ID
      if (!value) return [];
      const valueArray = Array.isArray(value) ? value : [value];
      return valueArray
        .map((item) => {
          if (!item) return null;
          return typeof item === "object" ? item.id : item;
        })
        .filter((id) => id != null);
    },
    render: (props) => {
      const { value, onChange, ...restProps } = props;

      // Normalize value: chuyển đổi mọi giá trị thành mảng ID
      const normalizedValue = (() => {
        if (!value) return [];
        if (!Array.isArray(value)) return [];

        return value
          .map((item) => {
            // Nếu là object thì lấy id, nếu là ID thì giữ nguyên
            if (item && typeof item === "object" && "id" in item) {
              return item.id;
            }
            return item;
          })
          .filter((id) => id != null);
      })();

      return (
        <CustomAutoComplete
          {...restProps}
          labelKey={labelKey}
          label={detailConfig.label}
          config={detailConfig}
          value={normalizedValue}
          onChange={(ids) => {
            // Luôn trả về mảng ID thuần túy
            onChange(ids);
          }}
        />
      );
    },
  };
};

export const dropzone = (maxFiles, fileType, purpose) => ({
  name: "dropzone",
  render: (props) => {
    return (
      <Dropzone
        {...props}
        maxFiles={maxFiles}
        fileType={fileType}
        purpose={purpose}
      />
    );
  },
});

export const updateFile = (maxFiles, fileType, urlName, publicIdName) => {
  const typeName =
    fileType.charAt(0).toUpperCase() + fileType.slice(1).toLowerCase();
  const addPropname = `new${typeName}s`;
  const delPropname = `del${typeName}s`;
  return {
    name: "updateFile",
    addPropname,
    delPropname,
    render: (props) => {
      const { setValue } = useFormContext();
      const { value, onAdd, onDelete, ...restProps } = props;
      return (
        <UpdateFile
          {...restProps}
          items={value || []}
          maxFiles={maxFiles}
          fileType={fileType}
          urlName={urlName}
          publicIdName={publicIdName}
          onAdd={(newFiles) => setValue(addPropname, newFiles)}
          onDelete={(ids) => setValue(delPropname, ids)}
        />
      );
    },
  };
};
