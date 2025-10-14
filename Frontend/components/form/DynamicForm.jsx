import { Controller } from "react-hook-form";

const layoutProps = {
  fullWidth: true,
  variant: "outlined",
  margin: "dense",
};

export default function DynamicForm({ config, control, defaultValues = {} }) {
  return config?.map((attr) => {
    const { key, input, ...restConfig } = attr;
    const InputComponent = input.render;

    // Sử dụng hàm transform nếu có, nếu không thì dùng giá trị mặc định
    const defaultValue = input.transform
      ? input.transform(defaultValues[key])
      : defaultValues[key] ?? input.initValue;

    return (
      <Controller
        key={key}
        name={key}
        control={control}
        defaultValue={defaultValue}
        render={({ field, fieldState }) => (
          <InputComponent
            {...layoutProps}
            {...restConfig}
            {...field}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />
    );
  });
}
