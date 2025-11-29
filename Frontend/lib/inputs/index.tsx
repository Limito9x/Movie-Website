import React, { JSX } from "react";
import { TextField, MenuItem } from "@mui/material";

// Generic render props shape used by input renderers
export type RenderProps<Value = any> = {
  value?: Value;
  onChange: (value: Value) => void;
} & Record<string, unknown>;

export type InputConfig<Value = any> = {
  name: string;
  initValue: Value;
  transform?: (value: any) => any;
  render: (props: RenderProps<Value>) => JSX.Element;
};

export type Option = { value: string | number; label: React.ReactNode };
export const text = (type = "text"): InputConfig<string> => {
  return {
    name: "text",
    initValue: "",
    render: (props: RenderProps<string>) => {
      const { onChange, setValue, ...restProps } =
        props as RenderProps<string> & { setValue?: any };
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

export const option = (
  value: string | number,
  label: React.ReactNode
): Option => {
  return { value, label };
};

export const select = (range: Option[]) => {
  return {
    name: "select",
    initValue: "",
    render: (props: RenderProps<string | number>) => {
      const { onChange, value, setValue, ...restProp } = props as RenderProps<
        string | number
      > & { setValue?: any };
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

export const date: InputConfig<string> = {
  name: "date",
  initValue: "",
  render: (props: RenderProps<string>) => {
    const { onChange, setValue, ...restProps } =
      props as RenderProps<string> & { setValue?: any };
    // Import client component lazily so this module stays server-safe
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const CustomDatePicker = require("@/components/inputs/DatePicker").default;
    return (
      <CustomDatePicker
        {...(restProps as any)}
        onChange={(value: any) => onChange(value)}
      />
    );
  },
};

export const atc = (detailConfig: any, labelKey: string) => {
  return {
    name: "autoComplete",
    initValue: [],
    transform: (value: any) => {
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
    render: (props: RenderProps<any[]>) => {
      const { value, onChange, setValue, ...restProps } = props as RenderProps<
        any[]
      > & { setValue?: any };

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

      // Lazy import to avoid pulling client-only module into server bundle
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const CustomAutoComplete =
        require("@/components/inputs/AutoComplete").default;
      return (
        <CustomAutoComplete
          {...(restProps as any)}
          labelKey={labelKey}
          label={detailConfig.label}
          config={detailConfig}
          value={normalizedValue}
          onChange={(ids: any[]) => {
            // Luôn trả về mảng ID thuần túy
            onChange(ids);
          }}
        />
      );
    },
  };
};

export const dropzone = (
  maxFiles: number,
  fileType: string,
  purpose?: string
) => ({
  name: "dropzone",
  render: (props: RenderProps<any>) => {
    // Lazy import Dropzone to avoid server-side evaluation of client code
    const { setValue, ...restProps } = props as RenderProps<any> & {
      setValue?: any;
    };
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const Dropzone = require("@/components/inputs/Dropzone").default;
    return (
      <Dropzone
        {...(restProps as any)}
        maxFiles={maxFiles}
        fileType={fileType}
        purpose={purpose}
      />
    );
  },
});

export const updateFile = (
  maxFiles: number,
  fileType: string,
  urlName: string,
  publicIdName: string
) => {
  const typeName =
    fileType.charAt(0).toUpperCase() + fileType.slice(1).toLowerCase();
  const addPropname = `new${typeName}s`;
  const delPropname = `del${typeName}s`;
  return {
    name: "updateFile",
    addPropname,
    delPropname,
    render: (props: RenderProps<any[]>) => {
      const { value, onAdd, onDelete, setValue, ...restProps } =
        props as RenderProps<any[]> &
          Record<string, any> & {
            setValue?: (name: string, value: any) => void;
          };
      // Lazy import UpdateFile to keep server bundle clean
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const UpdateFile = require("@/components/inputs/UpdateFile").default;
      return (
        <UpdateFile
          {...(restProps as any)}
          items={value || []}
          maxFiles={maxFiles}
          fileType={fileType}
          urlName={urlName}
          publicIdName={publicIdName}
          onAdd={(newFiles: any[]) =>
            setValue ? setValue(addPropname, newFiles) : onAdd?.(newFiles)
          }
          onDelete={(ids: any[]) =>
            setValue ? setValue(delPropname, ids) : onDelete?.(ids)
          }
        />
      );
    },
  };
};
