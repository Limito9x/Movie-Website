"use client";

import { Box, Button } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import DynamicForm from "@/components/form/DynamicForm";
import { useMutation, QueryClient } from "@tanstack/react-query";
import { EntityConfig } from "@/lib/entities/types";

export default function EntityNewForm({ config }: { config: EntityConfig }) {

  if (!config) {
    return <div>Could not load configuration</div>;
  }

  const methods = useForm({ defaultValues: {} });
  const queryClient = new QueryClient();

  const mutation = useMutation({
    mutationFn: (newItem: any) => config.api.create(newItem),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [config.name] });
      alert(`${config.name} created successfully`);
    }
  });
  

  const onSubmit = methods.handleSubmit(async (values) => {
    try {
        mutation.mutate(values);
    } catch (err) {
      console.error(err);
      console.log("Error creating item:", err);
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
            <Button type="submit" variant="contained" disabled={mutation.isPending}>
              Create {config.name}
            </Button>
          </Box>
        </form>
      </FormProvider>
    </Box>
  );
}
