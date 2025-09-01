"use client";
import { Button, Typography } from "@mui/material";
import { useRef } from "react";
import MovieApi from "@/services/movie.api";
import { movieConfig } from "@/utils/inputConfig";
import RenderInput from "@/components/RenderInput";

export default function Uploads() {
  const inputRef = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = inputRef.current.getData();
    if (!confirm("Xác nhận tạo phim ?")) return;
    try {
      const response = await MovieApi.create(data);
      console.log("Movie created:", response);
      alert(response.message);
    } catch (error) {
      console.error("Error creating movie:", error);
    }
  };

  return (
    <main className="flex flex-col max-w-full">
      <Typography variant="h4" component="h1" gutterBottom>
        Thêm Phim Mới
      </Typography>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-96">
        <RenderInput
          formConfig={movieConfig.create}
          ref={inputRef}
        ></RenderInput>
        <Button type="submit" variant="contained" color="primary">
          Thêm Phim
        </Button>
      </form>
    </main>
  );
}
