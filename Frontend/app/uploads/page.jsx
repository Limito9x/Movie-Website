"use client";
import { Button, Typography } from "@mui/material";
import DynamicForm from "@/components/DynamicForm";
import { movieReduxApi } from "@/redux/api/movie.reduxApi";
import { useForm, FormProvider } from "react-hook-form";
import { movieConfig } from "@/components/form/formConfig";

export default function Uploads() {
  console.log("movieConfig:", movieConfig);
  const methods = useForm();
  const [createMovie, { isLoading, error }] = movieReduxApi.useCreateMutation();

  const submit = async (data) => {
    if (!confirm("Xác nhận tạo phim ?")) return;
    try {
      const response = await createMovie(data).unwrap();
      console.log("Movie created:", response);
      alert(response.message);
    } catch (error) {
      console.error("Error creating movie:", error);
    }
  };

  return (
    <div className="flex flex-col w-4/5 max-w-2xl jusitify-center items-center">
      <Typography variant="h4" component="h1" gutterBottom>
        Thêm Phim Mới
      </Typography>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(submit)}
          className="flex flex-col w-full justify-center items-center"
        >
          <DynamicForm
            className="w-full"
            config={movieConfig.create || movieConfig.base}
            control={methods.control}
          />
          <Button type="submit" variant="contained" color="primary">
            Thêm Phim
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}
