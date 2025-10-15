"use client";

import { Box, Button } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import { getEntityConfig } from "@/lib/entities";
import DynamicForm from "@/components/form/DynamicForm";
import { useRouter } from "next/navigation";

export default function EntityNewForm({ entitySlug }) {
  const router = useRouter();
  const config = getEntityConfig(entitySlug);

  if (!config) {
    return <div>Invalid entity: {entitySlug}</div>;
  }

  const methods = useForm({ defaultValues: {} });
  const [createItem, { isLoading }] = config.api.useCreateMutation();

  const onSubmit = methods.handleSubmit(async (values) => {
    try {
        console.log("Form values before normalization:", values);
        if (!confirm("Xác nhận tạo mới?")) return;
      const normalized = config.create?.transform
        ? config.create.transform(values)
        : values;
      await createItem(normalized).unwrap();
      // after create, navigate back to list
      router.push(`/dashboard/${config.slug}`);
    } catch (err) {
      console.error(err);
      // leave error handling to UI or toast in future
    }
  });

  return (
    <Box sx={{ p: 3 }}>
      <FormProvider {...methods}>
        <form onSubmit={onSubmit}>
          <DynamicForm
            config={config.formConfig.create || config.formConfig.base}
            control={methods.control}
          />
          <Box sx={{ mt: 2 }}>
            <Button type="submit" variant="contained" disabled={isLoading}>
              Create {config.name}
            </Button>
          </Box>
        </form>
      </FormProvider>
    </Box>
  );
}
