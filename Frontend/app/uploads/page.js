"use client";
import { TextField, Box, Button, Typography } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useCallback, useState } from "react";
import MovieApi from "@/services/movie.api";

export default function Uploads() {
  const [movieData, setMovieData] = useState({
    title: "",
    description: "",
    releaseDate: "", // ISO string
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMovieData((prev) => ({ ...prev, [name]: value }));
  };

  const [videoFile, setVideoFile] = useState(null);
  const [imageFiles, setImageFiles] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("title", movieData.title);
    formData.append("description", movieData.description);
    formData.append("releaseDate", movieData.releaseDate);
    formData.append("video",videoFile);
    imageFiles.forEach((file)=>{
      formData.append("images",file)
    })

    try {
      const response = await MovieApi.create(formData);
      console.log("Movie created:", response);
    } catch (error) {
      console.error("Error creating movie:", error);
    }
  };

  return (
    <main style={{ padding: "20px" }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Thêm Phim Mới
      </Typography>
      <form className="mt-3" onSubmit={handleSubmit}>
        <Box className="flex flex-col gap-3" maxWidth="500px">
          <TextField
            label="Tên phim"
            variant="outlined"
            name="title"
            value={movieData.title}
            onChange={handleInputChange}
            required
          />
          <TextField
            label="Mô tả"
            variant="outlined"
            name="description"
            value={movieData.description}
            onChange={handleInputChange}
            multiline
            rows={4}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label="Ngày phát hành"
                onChange={(newValue) => {
                  const isoDate = newValue?.toISOString();
                  setMovieData((prev) => ({
                    ...prev,
                    releaseDate: isoDate || "",
                  }));
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
          Video
          <input
            type="file"
            name="video"
            accept="video/*"
            onChange={(event) => {
              setVideoFile(event.target.files[0]);
            }}
          ></input>
          Hình ảnh
          <input
            type="file"
            name="images"
            multiple
            accept="image/*"
            onChange={(event) => {
              setImageFiles([...event.target.files]);
            }}
          ></input>
          <Button type="submit" variant="contained" color="primary">
            Thêm Phim
          </Button>
        </Box>
      </form>
    </main>
  );
}
