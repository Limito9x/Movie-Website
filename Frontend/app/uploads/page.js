"use client";
import {
  TextField,
  Box,
  Button,
  Typography,
  Autocomplete,
} from "@mui/material";
import { useState, useEffect, use } from "react";
import MovieApi from "@/services/movie.api";
import ActorApi from "@/services/actor.api";
import GenreApi from "@/services/genre.api";
import { useApi } from "@/services/useApi";
import createFormData from "@/utils/createFormData";
import CustomDatePicker from "@/components/CustomDatePicker";
import CustomAutoComplete from "@/components/CustomAutoComplete";
import { genreInput, tagInput } from "@/utils/inputConfig";

export default function Uploads() {
  const [movieData, setMovieData] = useState({
    title: "",
    description: "",
    releaseDate: "", // ISO string
    selectedActors: [],
    selectedGenres: [],
  });

  const handleInputChange = (event, values, propName) => {
    if (values) {
      console.log("Thuộc tính đã chọn:", propName);
      console.log(`${propName} đã chọn:`, values);
      setMovieData((prev) => ({
        ...prev,
        [propName]: values.map((value) => value.id),
      }));

      return;
    }
    const  {name,value}  = event.target;
    setMovieData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (movieData.selectedActors)
      console.log("Diễn viên đã thêm:", movieData.selectedActors);
    if(movieData.selectedGenres)
      console.log("Thể loại đã thêm:", movieData.selectedGenres);
    console.log("Thông tin phim:", movieData);
  }, [movieData.selectedActors, movieData.selectedGenres]);

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
          <CustomAutoComplete
            serviceType={ActorApi}
            name="selectedActors"
            handleChange={handleInputChange}
            label="Diễn viên"
          />
          <CustomAutoComplete
            serviceType={GenreApi}
            name="selectedGenres"
            inputs={genreInput}
            label="Thể loại"
          />
          <CustomAutoComplete
            inputs={tagInput}
            label="Tag"
          />
          <CustomDatePicker
            date={movieData.releaseDate}
            setDate={(newDate) =>
              setMovieData((prev) => ({ ...prev, releaseDate: newDate }))
            }
            label={"Ngày phát hành"}
          />
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
