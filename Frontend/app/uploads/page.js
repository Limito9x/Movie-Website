"use client";
import {
  TextField,
  Box,
  Button,
  Typography,
  Autocomplete,
} from "@mui/material";
import { useState,useEffect, use } from "react";
import MovieApi from "@/services/movie.api";
import ActorApi from "@/services/actor.api";
import { useApi } from "@/services/useApi";
import createFormData from "@/utils/createFormData";
import CustomDatePicker from "@/components/CustomDatePicker";

export default function Uploads() {
  const [movieData, setMovieData] = useState({
    title: "",
    description: "",
    releaseDate: "", // ISO string
    selectedActors: [],
  });
  const { data: actors, loading, error } = useApi(ActorApi, null);

  const handleInputChange = (event, values) => {
    if (values) {
      console.log("Diễn viên đã chọn:", values);
      setMovieData((prev) => ({ ...prev, selectedActors: values }));
      
      return;
    }
    const { name, value } = event.target;
    setMovieData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (movieData.selectedActors)
        console.log("Diễn viên đã thêm:", movieData.selectedActors);
      console.log("Thông tin phim:", movieData);
},[movieData.selectedActors])

  const [videoFile, setVideoFile] = useState(null);
  const [imageFiles, setImageFiles] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = createFormData(movieData, videoFile, imageFiles);

    try {
      const response = await MovieApi.create(formData);
      console.log("Movie created:", response);
      alert(response.message);
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
          <Autocomplete
            multiple
            options={actors}
            getOptionLabel={(option) => option.name}
            value={movieData.selectedActors}
            onChange={handleInputChange}
            renderInput={(params) => (
              <TextField {...params} label="Diễn viên" variant="outlined" />
            )}
            sx={{ width: "400px" }}
          />
          <CustomDatePicker
            date={movieData.releaseDate}
            setDate={(newDate) =>
              setMovieData((prev) => ({ ...prev, releaseDate: newDate }))
            }
            label={"Ngày phát hành"}
          ></CustomDatePicker>
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
